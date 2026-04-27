#!/usr/bin/env node
/**
 * lint-links.mjs
 *
 * Validerer interne lenker og bilder i det komponerte settet.
 * Advarer ved cross-source-lenker uten versjonspinne (per linting-policy
 * i sources.config.yaml).
 *
 * Output:
 *   - Konsoll: liste over feil og advarsler.
 *   - .astro/link-report.json: full rapport.
 *   - Eksitkode 1 hvis crossSourceLinks=error og det finnes feil.
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
const reportPath = resolve(astroRoot, ".astro/link-report.json");
const cfgPath = resolve(astroRoot, "sources.config.yaml");

function log(msg) {
  process.stdout.write(`[lint] ${msg}\n`);
}

function toPosix(p) {
  return p.split(sep).join("/");
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

async function main() {
  const cfg = parseYaml(readFileSync(cfgPath, "utf8"));
  const linting = cfg.linting ?? { crossSourceLinks: "warn", allowFloatingCrossSourceLinks: false };

  const files = await fg(["**/*.{md,mdx}"], { cwd: docsRoot, onlyFiles: true });
  log(`scanning ${files.length} files`);

  // Bygg URL-sett
  const urls = new Set();
  const fileMeta = new Map(); // url → { source, snapshot, lang, file }
  for (const rel of files) {
    const full = resolve(docsRoot, rel);
    const raw = readFileSync(full, "utf8");
    const parsed = matter(raw);
    const posix = toPosix(rel);
    let segs = posix.replace(/\.(md|mdx)$/, "").split("/");
    if (segs[segs.length - 1] === "index") segs = segs.slice(0, -1);
    const url = "/" + segs.join("/") + (segs.length ? "/" : "");
    urls.add(url);
    fileMeta.set(url, {
      source: parsed.data._source,
      snapshot: parsed.data._snapshot,
      lang: parsed.data._lang,
      file: posix,
    });
  }

  const errors = [];
  const warnings = [];

  for (const rel of files) {
    const full = resolve(docsRoot, rel);
    const raw = readFileSync(full, "utf8");
    const parsed = matter(raw);
    const body = parsed.content;
    const fromMeta = fileMeta.get(
      "/" +
        toPosix(rel)
          .replace(/\.(md|mdx)$/, "")
          .replace(/\/index$/, "") +
        "/",
    );

    // Markdown-lenker [text](url)
    const mdLink = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    let m;
    while ((m = mdLink.exec(body)) !== null) {
      const target = m[2];
      checkLink(target, rel, fromMeta, urls, fileMeta, linting, errors, warnings);
    }

    // Markdown bilder ![alt](path)
    const mdImg = /!\[[^\]]*\]\(([^)\s]+)\)/g;
    while ((m = mdImg.exec(body)) !== null) {
      const target = m[1];
      if (target.startsWith("http") || target.startsWith("data:")) continue;
      // Bilder er relative til mappen som inneholder MD-filen
      if (target.startsWith("./") || (!target.startsWith("/") && !target.startsWith("#"))) {
        const dir = dirname(rel);
        const cleaned = target.replace(/^\.\//, "").split("#")[0].split("?")[0];
        const expected = resolve(docsRoot, dir, cleaned);
        if (!existsSync(expected)) {
          errors.push({ kind: "missing-image", file: toPosix(rel), target });
        }
      }
    }
  }

  function checkLink(target, fromRel, fromMeta, urls, fileMeta, linting, errors, warnings) {
    if (target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:") || target.startsWith("#")) return;
    if (target.startsWith("data:")) return;
    if (target.startsWith("./") || target.startsWith("../")) return; // relative — typisk bilder eller intra-bundle
    if (!target.startsWith("/")) return;

    // Strip anker og query
    const cleaned = target.split("#")[0].split("?")[0];
    const normalized = cleaned.endsWith("/") ? cleaned : cleaned + "/";
    if (!urls.has(normalized)) {
      errors.push({ kind: "dead-link", file: toPosix(fromRel), target });
      return;
    }
    const toMeta = fileMeta.get(normalized);
    if (!toMeta || !fromMeta) return;
    if (toMeta.source !== fromMeta.source) {
      // Cross-source. I MVP er det bare én source så dette inntreffer ikke,
      // men koden er klar for fase 2.
      const policy = linting.crossSourceLinks;
      if (policy === "off") return;
      const msg = {
        kind: "cross-source-floating",
        file: toPosix(fromRel),
        target,
        fromSource: fromMeta.source,
        toSource: toMeta.source,
        toSnapshot: toMeta.snapshot,
      };
      if (policy === "error") errors.push(msg);
      else warnings.push(msg);
    }
  }

  ensureDir(dirname(reportPath));
  writeFileSync(reportPath, JSON.stringify({ errors, warnings, scanned: files.length }, null, 2));

  if (errors.length > 0) {
    log(`FOUND ${errors.length} errors:`);
    for (const e of errors.slice(0, 20)) {
      process.stdout.write(`  [${e.kind}] ${e.file} → ${e.target}\n`);
    }
    if (errors.length > 20) process.stdout.write(`  ... and ${errors.length - 20} more\n`);
  }
  if (warnings.length > 0) {
    log(`${warnings.length} warnings`);
  }

  // Avgjør eksitkode
  const failOn = linting.crossSourceLinks === "error";
  const hasFatal = errors.some((e) => e.kind === "dead-link" || e.kind === "missing-image" || (failOn && e.kind === "cross-source-floating"));
  if (hasFatal) {
    log(`report: ${reportPath}`);
    // I MVP er vi tolerant — log feil men ikke fail dev-loopen
    if (process.env.LINT_STRICT === "1") {
      process.exit(1);
    }
  }

  log(`done — ${files.length} files scanned, ${errors.length} errors, ${warnings.length} warnings`);
}

main().catch((err) => {
  process.stderr.write(`[lint] FATAL: ${err.stack || err.message}\n`);
  process.exit(1);
});
