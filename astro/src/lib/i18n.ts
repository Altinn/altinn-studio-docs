import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const i18nRoot = resolve(here, "../i18n");

const cache = new Map<string, Record<string, string>>();

function load(lang: string): Record<string, string> {
  if (cache.has(lang)) return cache.get(lang)!;
  const file = resolve(i18nRoot, `${lang}.yaml`);
  if (!existsSync(file)) {
    cache.set(lang, {});
    return {};
  }
  const data = parseYaml(readFileSync(file, "utf8")) as any;
  const flat: Record<string, string> = {};

  // Hugo bruker en liste av oppføringer med {id, translation} eller {id, other}.
  // Etter compose-content (som merger via key-merge) ender vi opp med et objekt
  // der nøklene er numeriske strenger ("0", "1", ...) og verdiene er
  // {id, translation}.
  if (Array.isArray(data)) {
    for (const entry of data) {
      if (entry && typeof entry === "object" && entry.id) {
        flat[entry.id] = entry.translation ?? entry.other ?? entry.id;
      }
    }
  } else if (data && typeof data === "object") {
    for (const v of Object.values(data)) {
      if (v && typeof v === "object" && (v as any).id) {
        const e = v as any;
        flat[e.id] = e.translation ?? e.other ?? e.id;
      } else if (typeof v === "string") {
        // flat key-value form (når vi ev. konverterer formatet senere)
      }
    }
    // Fallback: hvis det også er flate keys
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === "string") flat[k] = v;
    }
  }

  cache.set(lang, flat);
  return flat;
}

export function t(key: string, lang: string, fallback?: string): string {
  const dict = load(lang);
  return dict[key] ?? fallback ?? key;
}
