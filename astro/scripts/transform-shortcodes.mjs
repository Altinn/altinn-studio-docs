#!/usr/bin/env node
/**
 * transform-shortcodes.mjs
 *
 * Bytter Hugo-shortcodes til MDX-komponentbruk og lagrer resultatet som .mdx.
 *
 * Strategi:
 *   1. Først bygges en map over alle sider (slug → full URL) ved å skanne det
 *      komponerte src/content/docs-treet. Brukes til å resolve {{< relref >}}.
 *   2. For hver markdown-fil:
 *      a. Parse frontmatter, behold som-er.
 *      b. Replace inline {{< relref "X" >}} / {{< ref "X" >}} med resolved URL.
 *      c. Replace block-shortcodes ({{< name args >}}...{{< /name >}}) med
 *         MDX-komponentbruk. Ukjente blir <UnimplementedShortcode>.
 *      d. Replace self-closing {{< name args >}} (eller {{< name args />}})
 *         med selv-lukkende JSX.
 *      e. Inject import av brukte komponenter øverst.
 *      f. Skriv som .mdx (slett .md-versjonen).
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { dirname, resolve, relative, join, basename, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import fg from "fast-glob";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const astroRoot = resolve(here, "..");
const docsRoot = resolve(astroRoot, "src/content/docs");

// Last sources.config.yaml for å finne kilderepoenes innholds-rot.
// "insert"-shortcoden refererer til content-filer relativt til kilderepoens
// rot (f.eks. "content/notifications/shared/...").
const _cfg = parseYaml(readFileSync(resolve(astroRoot, "sources.config.yaml"), "utf8"));
const _sourceRoots = _cfg.sources
  .filter((s) => s.type === "local")
  .map((s) => resolve(astroRoot, s.path));

function log(msg) {
  process.stdout.write(`[shortcodes] ${msg}\n`);
}

function toPosix(p) {
  return p.split(sep).join("/");
}

// Mapping fra shortcode-navn til Astro-komponent.
// "wrap" = paired (har inner content), "self" = self-closing.
// "args" beskriver hvordan posisjonelle Hugo-argumenter mappes til props.
const KNOWN_SHORTCODES = {
  // Notiser
  notice: { component: "Notice", form: "wrap", args: ["type", "id"] },
  note: { component: "Note", form: "wrap", args: [] },
  warning: { component: "Warning", form: "wrap", args: [] },
  tip: { component: "Tip", form: "wrap", args: [] },
  info: { component: "Info", form: "wrap", args: [] },
  alert: { component: "Alert", form: "wrap", args: ["type"] },

  // Kode og kollapsbart
  code: { component: "Code", form: "wrap", args: ["language", "title"] },
  expand: { component: "Expand", form: "wrap", args: ["title"] },
  expandsmall: { component: "Expand", form: "wrap", args: ["title"], extraProps: { size: "small" } },
  expandlarge: { component: "Expand", form: "wrap", args: ["title"], extraProps: { size: "large" } },
  expandbold: { component: "Expand", form: "wrap", args: ["title"], extraProps: { bold: true } },

  // Ikoner og lenker
  icon: { component: "Icon", form: "self", args: ["name"] },
  link: { component: "Link", form: "wrap", args: ["href"] },
  button: { component: "Button", form: "wrap", args: ["href"] },

  // Bilder og diagrammer
  image: { component: "Image", form: "self", args: ["src", "alt"] },
  mermaid: { component: "Mermaid", form: "wrap", args: [] },
  figure: { component: "Figure", form: "self", args: ["src", "alt", "title"] },

  // Lister og oppgaver
  children: { component: "Children", form: "self", args: [] },
  task: { component: "Task", form: "wrap", args: [] },
  tasklist: { component: "Tasklist", form: "wrap", args: [] },
  panel: { component: "Panel", form: "wrap", args: ["title", "type"] },

  // Innholds-versjonering
  "content-version-container": { component: "ContentVersionContainer", form: "wrap", args: ["version-label"], propRename: { "version-label": "versionLabel" } },
  "content-version-selector": { component: "ContentVersionSelector", form: "wrap", args: ["classes"] },

  // Nyhetskort
  "news-card": { component: "NewsCard", form: "self", args: [] },

  // Swagger
  swaggerload: { component: "SwaggerLoad", form: "self", args: ["uri"] },
  swaggerdisplayoperation: { component: "SwaggerDisplayOperation", form: "self", args: ["method", "path"] },
  swaggerdisplayentity: { component: "SwaggerDisplayEntity", form: "self", args: ["name"] },
  dialogportenswaggerselector: { component: "DialogportenSwaggerSelector", form: "self", args: [] },
};

const COMPONENT_PATHS = {
  Notice: "@components/shortcodes/Notice.astro",
  Note: "@components/shortcodes/Note.astro",
  Warning: "@components/shortcodes/Warning.astro",
  Tip: "@components/shortcodes/Tip.astro",
  Info: "@components/shortcodes/Info.astro",
  Alert: "@components/shortcodes/Alert.astro",
  Code: "@components/shortcodes/Code.astro",
  Expand: "@components/shortcodes/Expand.astro",
  Icon: "@components/shortcodes/Icon.astro",
  Link: "@components/shortcodes/Link.astro",
  Button: "@components/shortcodes/Button.astro",
  Image: "@components/shortcodes/Image.astro",
  Mermaid: "@components/shortcodes/Mermaid.astro",
  Figure: "@components/shortcodes/Figure.astro",
  Children: "@components/shortcodes/Children.astro",
  Task: "@components/shortcodes/Task.astro",
  Tasklist: "@components/shortcodes/Tasklist.astro",
  Panel: "@components/shortcodes/Panel.astro",
  ContentVersionContainer: "@components/shortcodes/ContentVersionContainer.astro",
  ContentVersionSelector: "@components/shortcodes/ContentVersionSelector.astro",
  NewsCard: "@components/shortcodes/NewsCard.astro",
  SwaggerLoad: "@components/shortcodes/SwaggerLoad.astro",
  SwaggerDisplayOperation: "@components/shortcodes/SwaggerDisplayOperation.astro",
  SwaggerDisplayEntity: "@components/shortcodes/SwaggerDisplayEntity.astro",
  DialogportenSwaggerSelector: "@components/shortcodes/DialogportenSwaggerSelector.astro",
  UnimplementedShortcode: "@components/shortcodes/UnimplementedShortcode.astro",
};

/** Bygger { slugPath: url } map fra alle .md i docsRoot */
async function buildSlugMap() {
  const files = await fg(["**/*.md"], { cwd: docsRoot, onlyFiles: true });
  const map = new Map(); // key: posix path uten extension/lang → "/lang/url/"
  for (const rel of files) {
    const posix = toPosix(rel);
    // posix er f.eks. "nb/altinn-studio/v10/index.md" eller "nb/altinn-studio/v10/app.md".
    // Astros content layer lowercaser ider, så slugMap-er må også være lowercase
    // for at lookup mot brukerens relref-target (uansett case) skal matche routen.
    const lang = posix.split("/")[0];
    const rest = posix.slice(lang.length + 1).replace(/\.md$/, "").toLowerCase();
    // index → mappens URL
    let urlPath = rest === "index" ? "" : rest.endsWith("/index") ? rest.slice(0, -"/index".length) : rest;
    const url = `/${lang}/${urlPath}${urlPath ? "/" : ""}`;
    // Lagre flere oppslagsformer:
    // - "/altinn-studio/v10/app/" (Hugo relref)
    // - "altinn-studio/v10/app"
    // - språkprefiks
    map.set(`${lang}::${urlPath}`, url);
    map.set(`${lang}::/${urlPath}`, url);
    map.set(`${lang}::/${urlPath}/`, url);
  }
  return map;
}

/**
 * Resolver Hugo {{< relref "path" >}}-target til en URL.
 * Hugo støtter både absolutte ("/foo/bar") og relative ("../baz")-stier.
 * For MVP: håndter absolutte og noen relative.
 */
function resolveRelref(target, currentLang, currentSlug, slugMap) {
  let t = target.replace(/^["']|["']$/g, "").trim();
  // strip ankertegn
  let anchor = "";
  const hashIdx = t.indexOf("#");
  if (hashIdx >= 0) {
    anchor = t.slice(hashIdx);
    t = t.slice(0, hashIdx);
  }
  t = t.replace(/\.md$/, "").replace(/\/_index$/, "");
  // SlugMap lagrer alt i lowercase (matcher Astros content-layer-id-er),
  // så lookup gjøres også på lowercase. URL returnert blir lowercase.
  t = t.toLowerCase();

  // Absolut sti
  if (t.startsWith("/")) {
    const trimmed = t.replace(/^\/+|\/+$/g, "");
    const url = slugMap.get(`${currentLang}::${trimmed}`) ?? slugMap.get(`${currentLang}::/${trimmed}/`);
    if (url) return url + anchor;
    return `/${currentLang}/${trimmed}/${anchor}`;
  }

  // Relativ — fall tilbake til best effort: bli med currentSlug-mappa
  const baseDir = currentSlug.split("/").slice(0, -1).join("/").toLowerCase();
  const combined = baseDir ? `${baseDir}/${t}` : t;
  // Normaliser ../ og ./
  const parts = [];
  for (const p of combined.split("/")) {
    if (p === "" || p === ".") continue;
    if (p === "..") parts.pop();
    else parts.push(p);
  }
  const trimmed = parts.join("/");
  const url = slugMap.get(`${currentLang}::${trimmed}`);
  if (url) return url + anchor;
  return `/${currentLang}/${trimmed}/${anchor}`;
}

/** Parse argumentliste fra en Hugo-shortcode (positional + named) */
function parseArgs(argsStr) {
  const positional = [];
  const named = {};
  if (!argsStr) return { positional, named };
  const re = /([a-zA-Z_][\w-]*)\s*=\s*"([^"]*)"|([a-zA-Z_][\w-]*)\s*=\s*'([^']*)'|"([^"]*)"|'([^']*)'|(\S+)/g;
  let m;
  while ((m = re.exec(argsStr)) !== null) {
    if (m[1] !== undefined) named[m[1]] = m[2];
    else if (m[3] !== undefined) named[m[3]] = m[4];
    else if (m[5] !== undefined) positional.push(m[5]);
    else if (m[6] !== undefined) positional.push(m[6]);
    else if (m[7] !== undefined) positional.push(m[7]);
  }
  return { positional, named };
}

/** Escape en streng for å være trygg i JSX-attributter (double-quoted) */
function jsxAttr(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, "&quot;").replace(/\n/g, "\\n");
}

function buildPropString(positional, named, spec) {
  const props = {};
  // Map positional til navngitte iht. args-listen
  for (let i = 0; i < positional.length; i++) {
    const propName = spec.args[i];
    if (propName) {
      props[propName] = positional[i];
    } else {
      // Overflødige positional samles til _extra
      props._extra = (props._extra ? props._extra + " " : "") + positional[i];
    }
  }
  Object.assign(props, named);
  if (spec.extraProps) Object.assign(props, spec.extraProps);
  if (spec.propRename) {
    for (const [from, to] of Object.entries(spec.propRename)) {
      if (from in props) {
        props[to] = props[from];
        delete props[from];
      }
    }
  }
  // Rename hyphenated keys to camelCase for JSX
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    const safe = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[safe] = v;
  }
  return Object.entries(out)
    .map(([k, v]) => {
      if (typeof v === "boolean") return v ? k : "";
      return `${k}="${jsxAttr(v)}"`;
    })
    .filter(Boolean)
    .join(" ");
}

/**
 * Hugo "insert"-shortcoden trekker innholdet fra en annen markdown-fil inn på
 * stedet, fjerner frontmatter, og erstatter {0}, {1}, ... med argumentene.
 * Bruk: {{% insert "content/path/file.nb.md" arg0 arg1 ... %}}
 */
function processInserts(s, currentLang) {
  const re = /\{\{[<%]\s*insert\s+([^%>]*?)\s*[>%]\}\}/g;
  // Iterér med begrensning for å unngå uendelig løkke ved sirkulære inserts
  for (let pass = 0; pass < 5; pass++) {
    let changed = false;
    s = s.replace(re, (_match, argsStr) => {
      const { positional } = parseArgs(argsStr);
      if (positional.length === 0) return "";
      const filePath = positional[0];
      // Resolve mot første source-rot som har filen
      let resolved = null;
      for (const root of _sourceRoots) {
        const p = resolve(root, filePath);
        if (existsSync(p)) {
          resolved = p;
          break;
        }
      }
      if (!resolved) {
        return `<UnimplementedShortcode name="insert" args={${JSON.stringify(JSON.stringify({ positional, named: {} }))}} />`;
      }
      let content = readFileSync(resolved, "utf8");
      // Fjern frontmatter — alt mellom første og andre "---" på egen linje
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (fmMatch) content = fmMatch[2];
      // Erstatt {0}, {1}, ... med påfølgende argumenter
      for (let i = 1; i < positional.length; i++) {
        content = content.replaceAll(`{${i - 1}}`, positional[i]);
      }
      changed = true;
      // Wrap i blank linje slik at det fortsatt er gyldig markdown
      return `\n\n${content}\n\n`;
    });
    if (!changed) break;
  }
  return s;
}

/**
 * Normaliser raw HTML for MDX:
 *   - Void-elementer uten / (img, br, hr, input, ...) → self-closing.
 *   - Mismatched/raw < som ikke er HTML, escapes ikke (lar de feile på enkeltsider).
 */
const VOID_TAGS = ["img", "br", "hr", "input", "meta", "link", "area", "base", "col", "embed", "source", "track", "wbr"];

function normalizeVoidTags(s) {
  for (const tag of VOID_TAGS) {
    // <tag attrs> → <tag attrs />
    // Ikke endre dersom allerede self-closing (slutter med /> eller har en lukketagg).
    const re = new RegExp(`<${tag}(\\s+[^>]*?)?(?<!\\/)>`, "gi");
    s = s.replace(re, (m, attrs) => `<${tag}${attrs ?? ""} />`);
  }
  return s;
}

/** HTML-kommentarer er ugyldige i MDX. Bytter til MDX-kommentarer. */
function convertHtmlComments(s) {
  return s.replace(/<!--([\s\S]*?)-->/g, (_m, inner) => `{/*${inner}*/}`);
}

/**
 * Hugo/Pandoc-attributter `{.class}` og `{#anchor}` brytes av MDX som JSX-
 * uttrykk og feiler. Strip standalone-linjer og trailing-attributter på
 * overskrifter. Vi mister CSS-class og eksplisitt anker, men siden rendrer.
 */
function stripMarkdownAttrs(s) {
  // Standalone-linjer: bare `{.foo}` eller `{#foo}` (eventuelt flere klasser).
  s = s.replace(/^[ \t]*\{[#.][^\n}]+\}[ \t]*$/gm, "");
  // Trailing på overskrifter: `## Title {#anchor}` → `## Title`
  s = s.replace(/^(\s{0,3}#{1,6}\s+.+?)\s+\{[#.][^\n}]+\}\s*$/gm, "$1");
  return s;
}

/**
 * Escape stray `<` som MDX ellers ville tolket som start på JSX-tag.
 * Bruksområde: prosa som "<1 minutt", "<= 5", "x < y". Hopper over kode
 * (fenced, inline). Bevarer ekte tags `<a>`, `</a>`, `<!`, `<>`.
 */
function escapeStrayLessThans(s) {
  // Splitt rundt kodeblokker (fenced) og inline-code så de ikke berøres.
  const codeRegex = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`)/g;
  let lastEnd = 0;
  const parts = [];
  let m;
  while ((m = codeRegex.exec(s)) !== null) {
    parts.push({ text: s.substring(lastEnd, m.index), code: false });
    parts.push({ text: m[0], code: true });
    lastEnd = m.index + m[0].length;
  }
  parts.push({ text: s.substring(lastEnd), code: false });

  return parts
    .map((p) => {
      if (p.code) return p.text;
      // Tillatt etter `<`: bokstav, /, !, > (fragment). Alt annet → &lt;.
      return p.text.replace(/<(?![a-zA-Z\/!>])/g, "&lt;");
    })
    .join("");
}

/** Hovedtransform: bytt block-shortcodes og self-closing til MDX. */
function transformShortcodes(body, currentLang, currentSlug, slugMap, usedComponents) {
  let s = body;

  // -1. Insert-shortcode: trekker innhold fra annen fil inn på stedet
  s = processInserts(s, currentLang);

  // 0. Normaliser void HTML-tags og HTML-kommentarer for MDX
  s = convertHtmlComments(s);
  s = normalizeVoidTags(s);
  s = stripMarkdownAttrs(s);

  // 1. Inline {{< relref "X" >}} → resolved URL (også {{< ref "X" >}})
  s = s.replace(/\{\{[<%]\s*(?:relref|ref)\s+([^>%]+?)\s*[>%]\}\}/g, (_m, target) => {
    return resolveRelref(target, currentLang, currentSlug, slugMap);
  });

  // 2. Paired shortcodes: {{< name args >}}content{{< /name >}}
  // (handle %% variant også)
  // Repeat to handle nested shortcodes — outer first by iteration.
  let prev;
  do {
    prev = s;
    s = s.replace(
      /\{\{[<%]\s*([a-zA-Z][\w-]*)\s*([^%>]*?)\s*[>%]\}\}([\s\S]*?)\{\{[<%]\s*\/\1\s*[>%]\}\}/g,
      (match, name, argsStr, inner) => {
        return renderShortcode(name, argsStr, inner, usedComponents, "wrap");
      },
    );
  } while (s !== prev);

  // 3. Self-closing: {{< name args />}} eller {{< name args >}} (uten lukketag)
  // Bruk en parser-pass som matcher fra venstre
  s = s.replace(
    /\{\{[<%]\s*([a-zA-Z][\w-]*)\s*([^%>]*?)\s*\/?\s*[>%]\}\}/g,
    (match, name, argsStr) => {
      // Hopp over hvis det er en avslutningstagg vi ikke fanget
      if (name.startsWith("/")) return match;
      return renderShortcode(name, argsStr, null, usedComponents, "self");
    },
  );

  // 4. Etter alle shortcodes er resolved: escape gjenværende stray `<`
  //    i prosa (f.eks. "<1 minutt") så MDX ikke tolker det som JSX-tag.
  s = escapeStrayLessThans(s);

  return s;
}

function renderShortcode(name, argsStr, inner, usedComponents, fallbackForm) {
  const lname = name.toLowerCase();
  const spec = KNOWN_SHORTCODES[lname];
  const { positional, named } = parseArgs(argsStr);

  if (!spec) {
    // Ukjent: stub
    usedComponents.add("UnimplementedShortcode");
    const allArgs = JSON.stringify({ positional, named });
    if (inner !== null) {
      return `\n\n<UnimplementedShortcode name="${jsxAttr(name)}" args={${JSON.stringify(allArgs)}}>\n\n${inner}\n\n</UnimplementedShortcode>\n\n`;
    }
    return `<UnimplementedShortcode name="${jsxAttr(name)}" args={${JSON.stringify(allArgs)}} />`;
  }

  usedComponents.add(spec.component);
  const propString = buildPropString(positional, named, spec);

  if (spec.form === "wrap" && inner !== null) {
    return `\n\n<${spec.component}${propString ? " " + propString : ""}>\n\n${inner.trim()}\n\n</${spec.component}>\n\n`;
  }
  // Self-closing for både eksplisitt self og wrap-uten-inner
  return `<${spec.component}${propString ? " " + propString : ""} />`;
}

function buildImportBlock(usedComponents) {
  if (usedComponents.size === 0) return "";
  const lines = [];
  for (const c of [...usedComponents].sort()) {
    const path = COMPONENT_PATHS[c];
    if (!path) continue;
    lines.push(`import ${c} from "${path}";`);
  }
  return lines.join("\n") + "\n";
}

async function processFile(rel, slugMap) {
  const full = resolve(docsRoot, rel);
  const raw = readFileSync(full, "utf8");
  const parsed = matter(raw);

  const lang = parsed.data._lang ?? "nb";
  const posix = toPosix(rel);
  const langStripped = posix.slice(lang.length + 1);
  const currentSlug = langStripped.replace(/\.md$/, "").replace(/\/index$/, "");

  const used = new Set();
  const transformed = transformShortcodes(
    parsed.content,
    lang,
    currentSlug,
    slugMap,
    used,
  );

  const imports = buildImportBlock(used);
  const newBody = imports ? `${imports}\n${transformed}` : transformed;
  const out = matter.stringify(newBody, parsed.data);

  const mdxPath = full.replace(/\.md$/, ".mdx");
  writeFileSync(mdxPath, out, "utf8");
  rmSync(full);
}

async function main() {
  log("building slug map");
  const slugMap = await buildSlugMap();
  log(`  ${slugMap.size} entries`);

  const files = await fg(["**/*.md"], { cwd: docsRoot, onlyFiles: true });
  log(`transforming ${files.length} files`);

  let count = 0;
  for (const rel of files) {
    await processFile(rel, slugMap);
    count++;
    if (count % 200 === 0) log(`  ${count}/${files.length}`);
  }

  log(`done — ${count} files transformed to .mdx`);
}

main().catch((err) => {
  process.stderr.write(`[shortcodes] FATAL: ${err.stack || err.message}\n`);
  process.exit(1);
});
