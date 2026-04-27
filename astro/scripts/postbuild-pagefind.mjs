#!/usr/bin/env node
/**
 * postbuild-pagefind.mjs
 *
 * Kjører pagefind mot dist/ etter Astro-build. Output legges i
 * dist/pagefind/ og hentes inn av SearchBox.astro.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "../dist");

if (!existsSync(distDir)) {
  process.stderr.write(`[pagefind] dist/ not found — run build first\n`);
  process.exit(1);
}

process.stdout.write(`[pagefind] indexing ${distDir}\n`);
const r = spawnSync("npx", ["-y", "pagefind", "--site", distDir], {
  stdio: "inherit",
  shell: true,
});
process.exit(r.status ?? 0);
