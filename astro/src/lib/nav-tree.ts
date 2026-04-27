import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const indexRoot = resolve(here, "../../.astro/nav-index");

export interface NavNode {
  url: string;
  title: string;
  linktitle: string;
  weight: number;
  hidden: boolean;
  alwaysopen: boolean;
  pre: string;
  post: string;
  titleSup: string;
  isIndex: boolean;
  children: NavNode[];
}

export interface ProductNav {
  product: string;
  url: string;
  title: string;
  tree: NavNode | null;
  versions: string[];
  versionTrees: Record<string, NavNode>;
}

export function loadProductNav(lang: string, product: string): ProductNav | null {
  const file = resolve(indexRoot, lang, `${product}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, "utf8"));
}

export function loadProducts(lang: string): Array<{ product: string; url: string; title: string; hasVersions: boolean }> {
  const file = resolve(indexRoot, lang, "products.json");
  if (!existsSync(file)) return [];
  return JSON.parse(readFileSync(file, "utf8"));
}

export function loadVersions(lang: string): Record<string, string[]> {
  const file = resolve(indexRoot, lang, "versions.json");
  if (!existsSync(file)) return {};
  return JSON.parse(readFileSync(file, "utf8"));
}
