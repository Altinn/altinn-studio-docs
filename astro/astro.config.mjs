import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const cfg = parseYaml(
  readFileSync(resolve(here, "sources.config.yaml"), "utf8"),
);
const site = cfg.site;

export default defineConfig({
  site: site.baseURL,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale: site.defaultLang,
    locales: site.languages,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [mdx(), sitemap()],
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
});
