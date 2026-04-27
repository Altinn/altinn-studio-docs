import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, isAbsolute } from "node:path";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(here, "../../sources.config.yaml");

export type LintMode = "off" | "warn" | "error";

export interface SnapshotConfig {
  id: string;
  ref: string;
  label?: string;
  active?: boolean;
  versionsFromFolders?: boolean;
}

export interface SourceConfig {
  name: string;
  type: "local" | "git";
  path?: string;
  repo?: string;
  contentDir: string;
  staticDir?: string;
  i18nDir?: string;
  mount: string;
  include?: string[];
  snapshots: SnapshotConfig[];
}

export interface SiteConfig {
  baseURL: string;
  defaultLang: string;
  languages: string[];
  title: Record<string, string>;
  editURL?: string;
}

export interface LintingConfig {
  crossSourceLinks: LintMode;
  allowFloatingCrossSourceLinks: boolean;
}

export interface RootConfig {
  site: SiteConfig;
  linting: LintingConfig;
  sources: SourceConfig[];
}

export interface ResolvedSnapshot {
  source: string;
  sourceType: "local" | "git";
  snapshotId: string;
  ref: string;
  label: string;
  mount: string;
  active: boolean;
  versionsFromFolders: boolean;
  contentRoot: string;
  staticRoot?: string;
  i18nRoot?: string;
}

let cached: RootConfig | null = null;

export function loadRootConfig(): RootConfig {
  if (cached) return cached;
  if (!existsSync(configPath)) {
    throw new Error(`sources.config.yaml not found at ${configPath}`);
  }
  const raw = readFileSync(configPath, "utf8");
  const parsed = parseYaml(raw) as Partial<RootConfig>;

  if (!parsed.site) throw new Error("sources.config.yaml: missing 'site'");
  if (!parsed.sources || parsed.sources.length === 0) {
    throw new Error("sources.config.yaml: at least one source required");
  }

  const linting: LintingConfig = {
    crossSourceLinks: parsed.linting?.crossSourceLinks ?? "warn",
    allowFloatingCrossSourceLinks:
      parsed.linting?.allowFloatingCrossSourceLinks ?? false,
  };

  for (const src of parsed.sources) {
    if (!src.name) throw new Error("source missing 'name'");
    if (!src.snapshots || src.snapshots.length === 0) {
      throw new Error(`source '${src.name}' missing snapshots`);
    }
    if (src.type === "git") {
      throw new Error(
        `source '${src.name}': type=git is designed but not yet implemented. Use type=local for now.`,
      );
    }
  }

  cached = {
    site: parsed.site as SiteConfig,
    linting,
    sources: parsed.sources as SourceConfig[],
  };
  return cached;
}

export function loadSiteConfig(): SiteConfig {
  return loadRootConfig().site;
}

export function resolveSnapshots(): ResolvedSnapshot[] {
  const cfg = loadRootConfig();
  const astroRoot = resolve(here, "../..");
  const out: ResolvedSnapshot[] = [];

  for (const src of cfg.sources) {
    if (src.type !== "local") continue;
    if (!src.path) {
      throw new Error(`local source '${src.name}' missing 'path'`);
    }
    const sourceRoot = isAbsolute(src.path) ? src.path : resolve(astroRoot, src.path);
    const contentRoot = resolve(sourceRoot, src.contentDir);
    const staticRoot = src.staticDir ? resolve(sourceRoot, src.staticDir) : undefined;
    const i18nRoot = src.i18nDir ? resolve(sourceRoot, src.i18nDir) : undefined;

    for (const snap of src.snapshots) {
      out.push({
        source: src.name,
        sourceType: src.type,
        snapshotId: snap.id,
        ref: snap.ref,
        label: snap.label ?? snap.id,
        mount: src.mount,
        active: snap.active ?? true,
        versionsFromFolders: snap.versionsFromFolders ?? false,
        contentRoot,
        staticRoot,
        i18nRoot,
      });
    }
  }

  return out;
}
