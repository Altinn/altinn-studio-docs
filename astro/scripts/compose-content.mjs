#!/usr/bin/env node
/**
 * compose-content.mjs
 *
 * Leser sources.config.yaml og bygger et samlet innholdssett under
 * src/content/docs/<lang>/... fra én eller flere kilder.
 *
 * For hver markdown:
 *   - Trekker språk fra filnavn (.nb.md / .en.md). Filer uten språkkode antas
 *     å være default-språket.
 *   - Hugo "_index.<lang>.md" blir til "index.md" i Astro-mappen.
 *   - Hugo "side.<lang>.md" blir til "side.md".
 *   - Beriker frontmatter med _source, _snapshot, _lang, _origPath.
 *
 * For hver assets-fil (alt som ikke er .md i en page-bundle):
 *   - Kopieres inn til hver språk-katalog som inneholder en markdown-fil i
 *     samme mappe. Det er den enkleste måten å la Astro løse "./bilde.png"
 *     relativt fra MD-filen.
 *
 * i18n YAML-filer slås sammen fra alle aktive snapshots til
 * src/i18n/<lang>.yaml.
 */
import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync, rmSync, copyFileSync, readdirSync } from "node:fs";
import { dirname, resolve, relative, join, basename, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import matter from "gray-matter";
import fg from "fast-glob";

const here = dirname(fileURLToPath(import.meta.url));
const astroRoot = resolve(here, "..");
const configPath = resolve(astroRoot, "sources.config.yaml");
const docsOut = resolve(astroRoot, "src/content/docs");
const i18nOut = resolve(astroRoot, "src/i18n");

function log(msg) {
  process.stdout.write(`[compose] ${msg}\n`);
}

function loadConfig() {
  if (!existsSync(configPath)) {
    throw new Error(`sources.config.yaml not found at ${configPath}`);
  }
  return parseYaml(readFileSync(configPath, "utf8"));
}

function resolveLocalSource(src) {
  if (src.type !== "local") {
    throw new Error(`source '${src.name}': type=${src.type} not implemented yet`);
  }
  const sourceRoot = resolve(astroRoot, src.path);
  return {
    sourceRoot,
    contentRoot: resolve(sourceRoot, src.contentDir),
    staticRoot: src.staticDir ? resolve(sourceRoot, src.staticDir) : null,
    i18nRoot: src.i18nDir ? resolve(sourceRoot, src.i18nDir) : null,
  };
}

/** Splitter "foo.nb.md" → { stem: "foo", lang: "nb", ext: ".md" } */
function splitLang(filename, languages) {
  const ext = extname(filename);
  if (ext !== ".md") return null;
  const base = filename.slice(0, -ext.length);
  for (const lang of languages) {
    if (base.endsWith(`.${lang}`)) {
      return { stem: base.slice(0, -(lang.length + 1)), lang, ext };
    }
  }
  return { stem: base, lang: null, ext };
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function clean(dir) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function toPosix(p) {
  return p.split(sep).join("/");
}

async function processSource(src, defaultLang, languages) {
  const { contentRoot, i18nRoot } = resolveLocalSource(src);
  if (!existsSync(contentRoot)) {
    throw new Error(`source '${src.name}': contentRoot not found: ${contentRoot}`);
  }
  log(`source '${src.name}' contentRoot=${contentRoot}`);

  // Hver source har én eller flere snapshots. For "local" mounter vi det
  // samme contentRoot for alle aktive snapshots, men markerer hvilken
  // snapshot innholdet kom fra i frontmatter.
  for (const snap of src.snapshots) {
    if (!(snap.active ?? true)) continue;

    const mdFiles = await fg(["**/*.md"], { cwd: contentRoot, dot: false });
    log(`  snapshot '${snap.id}': ${mdFiles.length} markdown files`);

    let copied = 0;
    let assetsCopied = 0;

    // Først: kopier markdown og bygg en mengde av (lang, dir) som faktisk
    // har innhold — slik at vi kan kopiere assets bare dit.
    const langDirsWithMd = new Map(); // key: `${lang}|${dirRel}` -> true

    for (const relPath of mdFiles) {
      const full = resolve(contentRoot, relPath);
      const fname = basename(relPath);
      const split = splitLang(fname, languages);
      if (!split) continue;
      const lang = split.lang ?? defaultLang;
      const dirRel = dirname(relPath);

      // _index.<lang>.md → index.md, ellers <stem>.md
      const newName = split.stem === "_index" ? "index.md" : `${split.stem}.md`;
      const targetDir = resolve(docsOut, lang, src.mount.replace(/^\//, ""), dirRel);
      const targetPath = resolve(targetDir, newName);
      ensureDir(targetDir);

      const raw = readFileSync(full, "utf8");
      const parsed = matter(raw);
      parsed.data._source = src.name;
      parsed.data._snapshot = snap.id;
      parsed.data._lang = lang;
      parsed.data._origPath = toPosix(relPath);
      parsed.data._mount = src.mount;

      // Hugo "tags" kan være satt til streng eller liste — normaliser til liste
      if (parsed.data.tags && !Array.isArray(parsed.data.tags)) {
        parsed.data.tags = [parsed.data.tags];
      }

      const out = matter.stringify(parsed.content, parsed.data);
      writeFileSync(targetPath, out, "utf8");
      copied++;
      langDirsWithMd.set(`${lang}|${toPosix(dirRel)}`, targetDir);
    }

    // Nå: kopier alle ikke-MD-filer (bilder, video, json osv) inn i hver
    // målkatalog som har en MD-fil i tilsvarende kilde-katalog.
    const allFiles = await fg(["**/*"], { cwd: contentRoot, dot: false, onlyFiles: true });
    const assetExts = new Set([
      ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp", ".ico",
      ".pdf", ".mp4", ".webm", ".mp3", ".ogg", ".wav",
      ".json", ".yaml", ".yml", ".csv",
      ".bpmn", ".xml", ".zip",
    ]);

    for (const relPath of allFiles) {
      const ext = extname(relPath).toLowerCase();
      if (!assetExts.has(ext)) continue;
      const dirRel = toPosix(dirname(relPath));
      const fname = basename(relPath);
      const full = resolve(contentRoot, relPath);

      for (const lang of languages) {
        const key = `${lang}|${dirRel}`;
        const targetDir = langDirsWithMd.get(key);
        if (!targetDir) continue;
        const targetPath = resolve(targetDir, fname);
        ensureDir(dirname(targetPath));
        copyFileSync(full, targetPath);
        assetsCopied++;
      }
    }

    log(`  snapshot '${snap.id}': wrote ${copied} md + ${assetsCopied} assets`);
  }

  // Slå sammen i18n YAML.
  // Hugo bruker liste-format: [{id, translation}, ...]. Vi smelter sammen til
  // én liste pr språk, der senere kilder kan overstyre id-er fra tidligere.
  if (i18nRoot && existsSync(i18nRoot)) {
    for (const lang of languages) {
      const file = resolve(i18nRoot, `${lang}.yaml`);
      if (!existsSync(file)) continue;
      const out = resolve(i18nOut, `${lang}.yaml`);
      ensureDir(dirname(out));

      let mergedById = new Map();
      if (existsSync(out)) {
        const existing = parseYaml(readFileSync(out, "utf8")) ?? [];
        for (const entry of Array.isArray(existing) ? existing : Object.values(existing)) {
          if (entry && typeof entry === "object" && entry.id) {
            mergedById.set(entry.id, entry);
          }
        }
      }
      const incoming = parseYaml(readFileSync(file, "utf8")) ?? [];
      const incomingArr = Array.isArray(incoming) ? incoming : Object.values(incoming);
      for (const entry of incomingArr) {
        if (!entry || typeof entry !== "object" || !entry.id) continue;
        if (mergedById.has(entry.id)) {
          process.stderr.write(
            `[compose] i18n: key '${entry.id}' from source '${src.name}' overrides existing for lang=${lang}\n`,
          );
        }
        mergedById.set(entry.id, entry);
      }
      writeFileSync(out, stringifyYaml([...mergedById.values()]), "utf8");
    }
  }
}

async function main() {
  const cfg = loadConfig();
  const defaultLang = cfg.site.defaultLang;
  const languages = cfg.site.languages;

  log("cleaning previous output");
  clean(docsOut);
  clean(i18nOut);

  for (const src of cfg.sources) {
    await processSource(src, defaultLang, languages);
  }

  log("done");
}

main().catch((err) => {
  process.stderr.write(`[compose] FATAL: ${err.stack || err.message}\n`);
  process.exit(1);
});
