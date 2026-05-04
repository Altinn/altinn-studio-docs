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
import { execFileSync } from "node:child_process";
import { parse as parseYaml, stringify as stringifyYaml } from "yaml";
import matter from "gray-matter";
import fg from "fast-glob";

const here = dirname(fileURLToPath(import.meta.url));
const astroRoot = resolve(here, "..");
const configPath = resolve(astroRoot, "sources.config.yaml");
const docsOut = resolve(astroRoot, "src/content/docs");
const i18nOut = resolve(astroRoot, "src/i18n");
// Public-mounting: assets kopieres også hit slik at HTML-tags som
// <img src="./bilde.png"> på en side /nb/foo/ kan løse mot
// public/nb/foo/bilde.png.
const publicOut = resolve(astroRoot, "public");

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
  const sourceRoot = resolve(astroRoot, src.path);
  return {
    sourceRoot,
    contentRoot: resolve(sourceRoot, src.contentDir),
    staticRoot: src.staticDir ? resolve(sourceRoot, src.staticDir) : null,
    i18nRoot: src.i18nDir ? resolve(sourceRoot, src.i18nDir) : null,
  };
}

// Parser ref-strenger fra config: "tags/v10.5.0", "heads/main", "heads/feat/x".
// Returnerer { kind: "tag" | "branch", name }. "working-tree" håndteres separat.
function parseRef(ref) {
  if (ref.startsWith("tags/")) return { kind: "tag", name: ref.slice(5) };
  if (ref.startsWith("heads/")) return { kind: "branch", name: ref.slice(6) };
  // Bare "main" eller "v1.0.0" — gjett branch som default.
  return { kind: "branch", name: ref };
}

function git(args, opts = {}) {
  return execFileSync("git", args, { stdio: "pipe", encoding: "utf8", ...opts });
}

// Klon eller oppdater en git-source til astro/.astro/sources/<name>/<snap>/.
// MVP: shallow clone (depth 1) per snapshot. Senere kan vi cache én bare-clone
// pr. repo og worktree pr. snapshot for å spare båndbredde.
function resolveGitSource(src, snap) {
  if (!src.repo) {
    throw new Error(`source '${src.name}': type=git krever 'repo'`);
  }
  if (!snap.ref || snap.ref === "working-tree") {
    throw new Error(`source '${src.name}' snapshot '${snap.id}': git-source krever 'ref' (tags/x eller heads/y)`);
  }
  const cacheRoot = resolve(astroRoot, ".astro/sources", src.name, snap.id);
  const ref = parseRef(snap.ref);

  if (!existsSync(resolve(cacheRoot, ".git"))) {
    ensureDir(dirname(cacheRoot));
    if (existsSync(cacheRoot)) rmSync(cacheRoot, { recursive: true, force: true });
    log(`  cloning ${src.repo} ${ref.kind}/${ref.name} → ${cacheRoot}`);
    git(["clone", "--depth", "1", "--branch", ref.name, src.repo, cacheRoot]);
  } else {
    log(`  fetching ${ref.kind}/${ref.name} in ${cacheRoot}`);
    git(["fetch", "--depth", "1", "origin", ref.name], { cwd: cacheRoot });
    git(["reset", "--hard", "FETCH_HEAD"], { cwd: cacheRoot });
    git(["clean", "-fdx"], { cwd: cacheRoot });
  }

  return {
    sourceRoot: cacheRoot,
    contentRoot: resolve(cacheRoot, src.contentDir),
    staticRoot: src.staticDir ? resolve(cacheRoot, src.staticDir) : null,
    i18nRoot: src.i18nDir ? resolve(cacheRoot, src.i18nDir) : null,
  };
}

function resolveSource(src, snap) {
  if (src.type === "local") return resolveLocalSource(src);
  if (src.type === "git") return resolveGitSource(src, snap);
  throw new Error(`source '${src.name}': ukjent type=${src.type}`);
}

// Bygger en "rediger på GitHub"-URL for én fil.
// Kilder: src.repo (kloneadresse), src.contentDir, snap.ref / snap.editBranch,
//         relPath (fil relativt til contentDir, original case beholdes).
// Returnerer null hvis vi ikke har nok info — da skjules edit-lenken.
function buildEditUrl(src, snap, relPath) {
  if (!src.repo) return null;
  // Strip .git suffix og evt. trailing slash så vi kan appende /blob/<ref>/...
  const baseRepo = src.repo.replace(/\.git$/, "").replace(/\/$/, "");
  // Branch-utledning:
  //   "heads/feat/x" → branch "feat/x"
  //   "tags/v1.0.0"  → tag "v1.0.0" (GitHub støtter /blob/<tag>/...)
  //   "working-tree" eller alt annet → krever snap.editBranch (ellers null)
  let ref;
  if (snap.ref?.startsWith("heads/")) ref = snap.ref.slice(6);
  else if (snap.ref?.startsWith("tags/")) ref = snap.ref.slice(5);
  else ref = snap.editBranch ?? null;
  if (!ref) return null;
  const contentSeg = (src.contentDir ?? "").replace(/^\/|\/$/g, "");
  const path = toPosix(relPath);
  const segs = [baseRepo, "blob", ref, contentSeg, path].filter(Boolean);
  return segs.join("/");
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

// Speil swagger-ui-dist sine css/js-filer til public/swagger-ui/ slik at
// /swagger-ui/swagger-ui.css og .../swagger-ui-bundle.js er tilgjengelige
// uten at vi går via Vite/MDX.
function mirrorSwaggerUiDist() {
  const src = resolve(astroRoot, "node_modules/swagger-ui-dist");
  if (!existsSync(src)) return;
  const dest = resolve(publicOut, "swagger-ui");
  ensureDir(dest);
  const files = [
    "swagger-ui.css",
    "swagger-ui-bundle.js",
    "swagger-ui-standalone-preset.js",
    "favicon-16x16.png",
    "favicon-32x32.png",
  ];
  for (const f of files) {
    const from = resolve(src, f);
    if (existsSync(from)) copyFileSync(from, resolve(dest, f));
  }
  log(`  mirrored ${files.length} swagger-ui-dist files to public/swagger-ui/`);
}

async function processSource(src, defaultLang, languages) {
  // Hver source har én eller flere snapshots. For "local" peker alle snapshots
  // mot samme working tree, mens "git" gir oss én sjekket-ut versjon pr.
  // snapshot under .astro/sources/<name>/<snap>/. Vi resolver derfor inne i
  // løkka, og kjører static- og i18n-merge per snapshot.
  for (const snap of src.snapshots) {
    if (!(snap.active ?? true)) continue;
    const { contentRoot, staticRoot, i18nRoot } = resolveSource(src, snap);
    if (!existsSync(contentRoot)) {
      throw new Error(`source '${src.name}' snapshot '${snap.id}': contentRoot ikke funnet: ${contentRoot}`);
    }
    log(`source '${src.name}' snapshot '${snap.id}' contentRoot=${contentRoot}`);

    // Kopier utvalgte statiske ressurser fra source/static/ til astro/public/.
    // Vi kopierer bare definerte underkataloger så vi ikke overskriver hånd-
    // kuraterte assets i public/ (fonts, images, css...). Foreløpig bare swagger/.
    if (staticRoot && existsSync(staticRoot)) {
      const dirsToMirror = ["swagger"];
      for (const sub of dirsToMirror) {
        const srcDir = resolve(staticRoot, sub);
        if (!existsSync(srcDir)) continue;
        const files = await fg(["**/*"], { cwd: srcDir, onlyFiles: true });
        for (const f of files) {
          const from = resolve(srcDir, f);
          const to = resolve(publicOut, sub, f);
          ensureDir(dirname(to));
          copyFileSync(from, to);
        }
        log(`  mirrored ${files.length} static files from ${sub}/`);
      }
    }

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
      // dirRelLc = lowercased for å matche Astros content-layer-id-er som
      // alltid er lowercase. Holder urler, asset-stier og IDer i synk på
      // case-sensitive filsystemer (Linux CI/build).
      const dirRel = dirname(relPath);
      const dirRelLc = toPosix(dirRel).toLowerCase();

      // _index.<lang>.md → index.md, ellers <stem>.md
      const newName = split.stem === "_index" ? "index.md" : `${split.stem}.md`;
      const targetDir = resolve(docsOut, lang, src.mount.replace(/^\//, ""), dirRelLc);
      const targetPath = resolve(targetDir, newName.toLowerCase());
      ensureDir(targetDir);

      const raw = readFileSync(full, "utf8");
      const parsed = matter(raw);
      parsed.data._source = src.name;
      parsed.data._snapshot = snap.id;
      parsed.data._lang = lang;
      parsed.data._origPath = toPosix(relPath);
      parsed.data._mount = src.mount;
      const editUrl = buildEditUrl(src, snap, relPath);
      if (editUrl) parsed.data._editURL = editUrl;

      // Hugo "tags" kan være satt til streng eller liste — normaliser til liste
      if (parsed.data.tags && !Array.isArray(parsed.data.tags)) {
        parsed.data.tags = [parsed.data.tags];
      }

      const out = matter.stringify(parsed.content, parsed.data);
      writeFileSync(targetPath, out, "utf8");
      copied++;
      langDirsWithMd.set(`${lang}|${dirRelLc}`, targetDir);
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
      const dirRelLc = toPosix(dirname(relPath)).toLowerCase();
      const fname = basename(relPath);
      const full = resolve(contentRoot, relPath);

      for (const lang of languages) {
        const key = `${lang}|${dirRelLc}`;
        const targetDir = langDirsWithMd.get(key);
        if (!targetDir) continue;
        const targetPath = resolve(targetDir, fname);
        ensureDir(dirname(targetPath));
        copyFileSync(full, targetPath);
        assetsCopied++;

        // Også kopier til public/<lang>/<sti>/<fil> slik at relative paths i
        // raw HTML kan løses av nettleseren. Stien lowercases for å matche
        // URL-rewrites og Astros content-id-er.
        const mountSegment = src.mount.replace(/^\/|\/$/g, "");
        const publicTarget = resolve(
          publicOut,
          lang,
          mountSegment,
          dirRelLc === "." ? "" : dirRelLc,
          fname,
        );
        ensureDir(dirname(publicTarget));
        copyFileSync(full, publicTarget);
      }
    }

    log(`  snapshot '${snap.id}': wrote ${copied} md + ${assetsCopied} assets`);

    // Slå sammen i18n YAML pr. snapshot.
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
}

async function main() {
  const cfg = loadConfig();
  const defaultLang = cfg.site.defaultLang;
  const languages = cfg.site.languages;

  log("cleaning previous output");
  clean(docsOut);
  clean(i18nOut);

  mirrorSwaggerUiDist();

  for (const src of cfg.sources) {
    await processSource(src, defaultLang, languages);
  }

  log("done");
}

main().catch((err) => {
  process.stderr.write(`[compose] FATAL: ${err.stack || err.message}\n`);
  process.exit(1);
});
