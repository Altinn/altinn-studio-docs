import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const cfg = parseYaml(
  readFileSync(resolve(here, "../../sources.config.yaml"), "utf8"),
);

export const site = cfg.site as {
  baseURL: string;
  defaultLang: string;
  languages: string[];
  title: Record<string, string>;
  editURL: string;
};
