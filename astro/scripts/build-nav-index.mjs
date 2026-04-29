#!/usr/bin/env node
/**
 * build-nav-index.mjs
 *
 * Skanner src/content/docs/<lang>/... og produserer:
 *   .astro/nav-index/<lang>/<product>.json   — hierarkisk tre per produkt
 *   .astro/nav-index/<lang>/products.json    — liste over produkter
 *   .astro/nav-index/<lang>/versions.json    — versjoner per produkt
 *
 * "Produkt" = første URL-segment etter språk (altinn-studio, api, ...).
 * "Versjon" = andre URL-segment hvis det matcher /^v\d+/, og produktets
 *             snapshot har versionsFromFolders = true.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import fg from "fast-glob";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const astroRoot = resolve(here, "..");
const docsRoot = resolve(astroRoot, "src/content/docs");
const indexOut = resolve(astroRoot, ".astro/nav-index");
const cfgPath = resolve(astroRoot, "sources.config.yaml");

function log(msg) {
  process.stdout.write(`[nav-index] ${msg}\n`);
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function toPosix(p) {
  return p.split(sep).join("/");
}

function isVersion(seg) {
  return /^v\d+/.test(seg);
}

async function main() {
  ensureDir(indexOut);
  const cfg = parseYaml(readFileSync(cfgPath, "utf8"));
  const languages = cfg.site.languages;

  // Bygg metadata per snapshot for å vite om versionsFromFolders er på
  const snapshotMeta = new Map(); // source name → { versionsFromFolders }
  for (const src of cfg.sources) {
    for (const snap of src.snapshots) {
      if (!(snap.active ?? true)) continue;
      snapshotMeta.set(`${src.name}::${snap.id}`, {
        versionsFromFolders: snap.versionsFromFolders ?? false,
        label: snap.label ?? snap.id,
      });
    }
  }

  for (const lang of languages) {
    const langRoot = resolve(docsRoot, lang);
    if (!existsSync(langRoot)) continue;

    const files = await fg(["**/*.{md,mdx}"], { cwd: langRoot, onlyFiles: true });
    log(`lang=${lang}: ${files.length} files`);

    // Bygg en flat node-liste først
    const nodes = []; // { url, urlSegments, frontmatter, isIndex }
    for (const rel of files) {
      const posix = toPosix(rel);
      const full = resolve(langRoot, rel);
      const raw = readFileSync(full, "utf8");
      const parsed = matter(raw);
      // Hopp over hidden alltid; drafts kun når ASTRO_SKIP_DRAFTS=1
      if (parsed.data.hidden === true) continue;
      if (parsed.data.headless === true) continue;
      if (process.env.ASTRO_SKIP_DRAFTS === "1" && parsed.data.draft === true) continue;
      // urlSegments = stien uten .md/.mdx, uten trailing /index.
      // Astros content layer lowercaser ider på disk, så URL-er må også
      // være lowercase for å matche getStaticPaths.
      let segs = posix.replace(/\.(md|mdx)$/, "").toLowerCase().split("/");
      const isIndex = segs[segs.length - 1] === "index";
      if (isIndex) segs = segs.slice(0, -1);
      const url = `/${lang}/${segs.join("/")}${segs.length ? "/" : ""}`;
      nodes.push({ url, urlSegments: segs, frontmatter: parsed.data, isIndex });
    }

    // Gruppér etter produkt (første segment)
    const products = new Map();
    for (const n of nodes) {
      if (n.urlSegments.length === 0) continue; // selve forsiden
      const product = n.urlSegments[0];
      if (!products.has(product)) products.set(product, []);
      products.get(product).push(n);
    }

    // Bygg tre per produkt
    const langOut = resolve(indexOut, lang);
    ensureDir(langOut);
    const productList = [];
    const versionsByProduct = {};

    for (const [product, productNodes] of products) {
      // Sjekk om dette produktet har versjon-subfolders
      const meta = [...snapshotMeta.values()][0]; // MVP: én snapshot
      const versionsFromFolders = meta?.versionsFromFolders ?? false;
      const versions = new Set();
      const versionLabels = {}; // f.eks. { v8: "Gjeldende (V8)" }

      if (versionsFromFolders) {
        for (const n of productNodes) {
          if (n.urlSegments.length >= 2 && isVersion(n.urlSegments[1])) {
            versions.add(n.urlSegments[1]);
          }
        }
        // For hver versjon, bruk breadcrumbText fra rotnodens frontmatter som label
        for (const v of versions) {
          const versionRoot = productNodes.find(
            (n) => n.urlSegments.length === 2 && n.urlSegments[1] === v && n.isIndex,
          );
          versionLabels[v] = versionRoot?.frontmatter?.breadcrumbText ?? v;
        }
      }

      // Bygg trestruktur. Nøkkel = full URL-sti
      const nodeMap = new Map();
      for (const n of productNodes) {
        const key = n.urlSegments.join("/");
        nodeMap.set(key, {
          url: n.url,
          title: n.frontmatter.title ?? n.urlSegments[n.urlSegments.length - 1],
          linktitle: n.frontmatter.linktitle ?? n.frontmatter.title ?? n.urlSegments[n.urlSegments.length - 1],
          weight: typeof n.frontmatter.weight === "number" ? n.frontmatter.weight : 9999,
          hidden: !!n.frontmatter.hidden,
          alwaysopen: !!n.frontmatter.alwaysopen,
          pre: n.frontmatter.pre ?? "",
          post: n.frontmatter.post ?? "",
          titleSup: n.frontmatter.titleSup ?? "",
          isIndex: n.isIndex,
          children: [],
        });
      }

      // Lenk barn til foreldre
      for (const [key, node] of nodeMap) {
        const segs = key.split("/");
        if (segs.length === 0) continue;
        const parentKey = segs.slice(0, -1).join("/");
        if (parentKey && nodeMap.has(parentKey)) {
          if (key !== parentKey) nodeMap.get(parentKey).children.push(node);
        }
      }

      // Sortér barn
      function sortRec(n) {
        n.children.sort((a, b) => {
          if (a.weight !== b.weight) return a.weight - b.weight;
          return (a.linktitle || "").localeCompare(b.linktitle || "");
        });
        n.children.forEach(sortRec);
      }
      const root = nodeMap.get(product);
      if (root) sortRec(root);

      // Finn også sub-trees for hver versjon (for sidebar når man er inne i v10)
      const versionTrees = {};
      if (versionsFromFolders) {
        for (const v of versions) {
          const versionKey = `${product}/${v}`;
          if (nodeMap.has(versionKey)) {
            versionTrees[v] = nodeMap.get(versionKey);
          }
        }
      }

      const productData = {
        product,
        url: root?.url ?? `/${lang}/${product}/`,
        title: root?.title ?? product,
        tree: root,
        versions: versionsFromFolders ? [...versions].sort().reverse() : [],
        versionLabels,
        versionTrees,
      };

      writeFileSync(
        resolve(langOut, `${product}.json`),
        JSON.stringify(productData, null, 2),
        "utf8",
      );
      productList.push({ product, url: productData.url, title: productData.title, hasVersions: productData.versions.length > 0 });
      versionsByProduct[product] = productData.versions;
    }

    writeFileSync(resolve(langOut, "products.json"), JSON.stringify(productList, null, 2), "utf8");
    writeFileSync(resolve(langOut, "versions.json"), JSON.stringify(versionsByProduct, null, 2), "utf8");
    log(`lang=${lang}: ${productList.length} products written`);
  }

  log("done");
}

main().catch((err) => {
  process.stderr.write(`[nav-index] FATAL: ${err.stack || err.message}\n`);
  process.exit(1);
});
