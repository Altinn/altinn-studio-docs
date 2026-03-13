#!/usr/bin/env node

/**
 * generate-component-docs.js
 *
 * Generates markdown documentation for Altinn UI components from their JSON Schema.
 *
 * Usage:
 *   node generate-component-docs.js <ComponentName>   # Single component
 *   node generate-component-docs.js --all              # All components
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT_SCHEMA_URL =
  'https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json';

const CACHE_DIR = path.join(__dirname, '.schema-cache');
const OUTPUT_DIR = path.join(__dirname, '../../content/altinn-studio/v10/develop-a-service/look-and-feel/components');

// ---------------------------------------------------------------------------
// HTTP fetch (returns parsed JSON)
// ---------------------------------------------------------------------------
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Invalid JSON from ${url}: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// Disk cache
// ---------------------------------------------------------------------------
function cacheKey(url) {
  // Convert URL to a safe filename
  return url.replace(/[^a-z0-9]/gi, '_') + '.json';
}

function loadFromCache(url) {
  const file = path.join(CACHE_DIR, cacheKey(url));
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return null;
}

function saveToCache(url, data) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const file = path.join(CACHE_DIR, cacheKey(url));
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

async function fetchWithCache(url) {
  const cached = loadFromCache(url);
  if (cached) {
    return cached;
  }
  console.log(`  Fetching: ${url}`);
  const data = await fetchJson(url);
  saveToCache(url, data);
  return data;
}

// ---------------------------------------------------------------------------
// $ref resolver
// ---------------------------------------------------------------------------
class Resolver {
  constructor() {
    // Map of base URL -> schema object
    this.schemas = new Map();
  }

  async loadSchema(url) {
    if (!this.schemas.has(url)) {
      const schema = await fetchWithCache(url);
      this.schemas.set(url, schema);
    }
    return this.schemas.get(url);
  }

  /**
   * Resolve a $ref string relative to a base URL.
   * Returns { schema, baseUrl } for the referenced location.
   */
  async resolveRef(ref, baseUrl) {
    let targetUrl = baseUrl;
    let pointer = '';

    if (ref.startsWith('#')) {
      pointer = ref.slice(1);
    } else {
      const [urlPart, hashPart] = ref.split('#');
      targetUrl = new URL(urlPart, baseUrl).toString();
      pointer = hashPart ? hashPart : '';
    }

    const schema = await this.loadSchema(targetUrl);
    const resolved = pointer ? jsonPointerGet(schema, pointer) : schema;
    return { node: resolved, baseUrl: targetUrl };
  }

  /**
   * Fully resolve a schema node, following $ref and merging allOf.
   * Returns a plain schema object with no $ref remaining at the top level.
   * `visited` prevents infinite loops.
   */
  async resolve(node, baseUrl, visited = new Set()) {
    if (!node || typeof node !== 'object') return node;

    // Follow $ref
    if (node.$ref) {
      const refKey = `${baseUrl}||${node.$ref}`;
      if (visited.has(refKey)) {
        // Circular — return a stub
        return { type: 'object', description: '(circular reference)' };
      }
      visited = new Set(visited);
      visited.add(refKey);

      const { node: refNode, baseUrl: refBase } = await this.resolveRef(node.$ref, baseUrl);
      // Merge sibling keywords with the resolved ref (JSON Schema §8.2.3)
      const siblings = { ...node };
      delete siblings.$ref;
      const merged = Object.keys(siblings).length
        ? { allOf: [refNode, siblings] }
        : refNode;
      return this.resolve(merged, refBase, visited);
    }

    // Merge allOf into a single object
    if (node.allOf) {
      const merged = await this.mergeAllOf(node.allOf, baseUrl, visited);
      const rest = { ...node };
      delete rest.allOf;
      return this.resolve(mergeSchemas(merged, rest), baseUrl, visited);
    }

    return node;
  }

  async mergeAllOf(schemas, baseUrl, visited) {
    let merged = {};
    for (const sub of schemas) {
      const resolved = await this.resolve(sub, baseUrl, visited);
      merged = mergeSchemas(merged, resolved);
    }
    return merged;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate a JSON Pointer (e.g. /definitions/Foo) into an object. */
function jsonPointerGet(obj, pointer) {
  if (!pointer || pointer === '/') return obj;
  const parts = pointer.split('/').slice(1).map((p) => p.replace(/~1/g, '/').replace(/~0/g, '~'));
  let cur = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') {
      throw new Error(`Cannot traverse pointer segment "${part}"`);
    }
    cur = cur[part];
  }
  return cur;
}

/** Shallow-merge two schema objects, combining properties/required. */
function mergeSchemas(a, b) {
  // Boolean schemas (true = allow-all, false = deny-all) carry no useful
  // type info for documentation — skip them entirely.
  if (typeof b !== 'object' || b === null) return a;
  if (typeof a !== 'object' || a === null) return b;
  const result = { ...a, ...b };
  if (a.properties || b.properties) {
    const aProps = a.properties || {};
    const bProps = b.properties || {};
    const merged = { ...aProps };
    for (const [key, val] of Object.entries(bProps)) {
      // Boolean schemas (true/false) are allowlist entries used with
      // additionalProperties:false — they carry no type info, so don't
      // let them overwrite a real property definition already in `a`.
      if (typeof val !== 'boolean') {
        merged[key] = val;
      }
    }
    result.properties = merged;
  }
  if (a.required || b.required) {
    result.required = [...new Set([...(a.required || []), ...(b.required || [])])];
  }
  return result;
}

/** Return a human-readable type string for a schema node (async, resolves $refs in variants). */
async function typeString(schema, resolver, baseUrl) {
  if (!schema) return '—';

  if (schema.enum) {
    if (schema.type) return Array.isArray(schema.type) ? schema.type.join(' \\| ') : schema.type;
    return 'string';
  }
  if (schema.const !== undefined) {
    return `\`${JSON.stringify(schema.const)}\``;
  }
  if (schema.oneOf || schema.anyOf) {
    const variants = schema.oneOf || schema.anyOf;
    const types = await Promise.all(
      variants.map(async (v) => {
        const resolved = await resolver.resolve(v, baseUrl);
        return typeString(resolved, resolver, baseUrl);
      })
    );
    return [...new Set(types)].join(' \\| ');
  }
  if (schema.type) {
    if (schema.type === 'array' && schema.items) {
      const resolvedItems = await resolver.resolve(schema.items, baseUrl);
      return `${await typeString(resolvedItems, resolver, baseUrl)}[]`;
    }
    return Array.isArray(schema.type) ? schema.type.join(' \\| ') : schema.type;
  }
  if (schema.properties) return 'object';
  return '—';
}

/** Extract enum values from a schema, including from oneOf/anyOf variants. */
async function extractEnumValues(schema, resolver, baseUrl) {
  if (!schema || typeof schema !== 'object') return '';
  if (schema.enum) {
    return schema.enum.map((v) => `\`${JSON.stringify(v)}\``).join(', ');
  }
  if (schema.const !== undefined) {
    return `\`${JSON.stringify(schema.const)}\``;
  }
  if (schema.oneOf || schema.anyOf) {
    const variants = schema.oneOf || schema.anyOf;
    const allEnums = [];
    for (const v of variants) {
      const resolved = await resolver.resolve(v, baseUrl);
      if (resolved && resolved.enum) {
        allEnums.push(...resolved.enum.filter((e) => e !== null).map((e) => `\`${JSON.stringify(e)}\``));
      } else if (resolved && resolved.const !== undefined && resolved.const !== null) {
        allEnums.push(`\`${JSON.stringify(resolved.const)}\``);
      }
    }
    return allEnums.join(', ');
  }
  return '';
}

/** Escape pipe characters in markdown table cells. */
function mdEscape(str) {
  if (!str) return '';
  return str
    .replace(/<i\s*\/>/gi, '</i>') // known malformed tag in schema descriptions that breaks markdown parsing, fix it on the way through
    .replace(/<(?!\/?(?:br|i)\b)[^>]+>/gi, (tag) =>
      tag.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    )
   .replace(/\|/g, '\\|')
   .replace(/\n/g, ' ');
}

// ---------------------------------------------------------------------------
// Flatten resolved schema properties into rows
// ---------------------------------------------------------------------------
async function flattenProperties(schema, resolver, baseUrl, prefix = '', requiredSet = new Set(), depth = 0) {
  if (depth > 10) return []; // safety limit

  const rows = [];

  if (!schema || typeof schema !== 'object') return rows;

  // Handle oneOf / anyOf at top level by merging all variants' properties
  const variants = schema.oneOf || schema.anyOf;
  if (variants && !schema.properties) {
    const seen = new Set();
    for (const variant of variants) {
      const resolved = await resolver.resolve(variant, baseUrl);
      const subRows = await flattenProperties(resolved, resolver, baseUrl, prefix, requiredSet, depth + 1);
      for (const row of subRows) {
        if (!seen.has(row.name)) {
          seen.add(row.name);
          rows.push(row);
        }
      }
    }
    return rows;
  }

  const properties = schema.properties || {};
  const required = new Set([...requiredSet, ...(schema.required || [])]);

  for (const [key, rawProp] of Object.entries(properties)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const prop = await resolver.resolve(rawProp, baseUrl);

    // Boolean schemas (true/false) and other non-objects have no useful doc info
    if (!prop || typeof prop !== 'object') continue;

    const isRequired = required.has(key);
    // Discard titles that are internal TypeScript type names (PascalCase, no spaces)
    const title = prop.title && /^[A-Z][a-zA-Z0-9]*$/.test(prop.title) ? '' : prop.title;
    const description = mdEscape(prop.description || title || '');
    const type = await typeString(prop, resolver, baseUrl);
    const enumValues = mdEscape(await extractEnumValues(prop, resolver, baseUrl));

    rows.push({
      name: fullKey,
      type,
      required: isRequired,
      description,
      enumValues,
    });

    // Recurse into object properties
    if (prop.properties) {
      const nested = await flattenProperties(prop, resolver, baseUrl, fullKey, new Set(prop.required || []), depth + 1);
      rows.push(...nested);
    } else if ((prop.oneOf || prop.anyOf) && !prop.enum) {
      const nested = await flattenProperties(prop, resolver, baseUrl, fullKey, new Set(), depth + 1);
      rows.push(...nested);
    } else if (prop.type === 'array' && prop.items) {
      const items = await resolver.resolve(prop.items, baseUrl);
      if (items && items.properties) {
        const nested = await flattenProperties(items, resolver, baseUrl, `${fullKey}[]`, new Set(items.required || []), depth + 1);
        rows.push(...nested);
      }
    }
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Find all component definitions in the root schema
// ---------------------------------------------------------------------------
async function findComponents(rootSchema, resolver, rootUrl) {
  /**
   * Component types are listed in the enum on #/definitions/AnyComponent.
   * Each component type (e.g. "Input") maps to a definition named "CompInput"
   * under #/definitions.
   */
  const defs = rootSchema.definitions || rootSchema.$defs || {};

  const anyComponent = defs['AnyComponent'];
  if (!anyComponent) {
    throw new Error('Could not find #/definitions/AnyComponent in the schema.');
  }

  // The enum may be nested inside a `type` property or directly on AnyComponent
  const resolvedAny = await resolver.resolve(anyComponent, rootUrl);
  const componentTypes = resolvedAny.enum
    || (resolvedAny.properties && resolvedAny.properties.type && resolvedAny.properties.type.enum);

  if (!componentTypes || !Array.isArray(componentTypes)) {
    throw new Error('Could not find component type enum on #/definitions/AnyComponent.');
  }

  const components = {};

  for (const componentType of componentTypes) {
    const defName = `Comp${componentType}`;
    const defSchema = defs[defName];

    if (!defSchema) {
      console.warn(`  Warning: no definition found for "${defName}", skipping.`);
      continue;
    }

    try {
      const resolved = await resolver.resolve(defSchema, rootUrl);
      components[componentType] = {
        defName,
        schema: resolved,
        title: resolved.title || componentType,
        description: resolved.description || '',
      };
    } catch (e) {
      console.warn(`  Warning: could not resolve "${defName}": ${e.message}`);
    }
  }

  return components;
}

// ---------------------------------------------------------------------------
// Markdown generation
// ---------------------------------------------------------------------------
function renderTable(rows, lines) {
  lines.push('| Property | Description | Allowed Values |');
  lines.push('|----------|-------------|----------------|');
  for (const row of rows) {
    const desc = row.required
      ? (row.description ? `${row.description} Required.` : 'Required.')
      : row.description;
    lines.push(`| \`${row.name}\` | ${desc} | ${row.enumValues} |`);
  }
  if (rows.length === 0) {
    lines.push('| — | No properties found | — |');
  }
}

/** Convert a camelCase property key to a readable section heading. */
function camelToHeading(str) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());
}

/** Derive a markdown anchor from a rendered heading string (matches Hugo/Goldmark behaviour). */
function headingToAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function stripPrefix(name, prefix) {
  return name.startsWith(prefix + '.') ? name.slice(prefix.length + 1) : name;
}

async function generateMarkdown(componentType, info, resolver, rootUrl, basePropertyNames = new Set()) {
  const { schema, description } = info;

  const rows = await flattenProperties(schema, resolver, rootUrl, '', new Set(schema.required || []));

  const specificRows = rows.filter((r) => !basePropertyNames.has(r.name.split('.')[0]));
  const baseRows = rows.filter((r) => basePropertyNames.has(r.name.split('.')[0]));

  // Find root-level object properties that have child rows, in order of first appearance.
  // Skip array roots (e.g. `rowsBefore[]`) — those stay in the main table.
  const objectRoots = [];
  const seenRoots = new Set();
  for (const row of specificRows) {
    const dotIdx = row.name.indexOf('.');
    if (dotIdx !== -1) {
      const root = row.name.slice(0, dotIdx);
      if (!root.includes('[') && !seenRoots.has(root)) {
        seenRoots.add(root);
        objectRoots.push(root);
      }
    }
  }

  const objectRootSet = new Set(objectRoots);

  // Main table: scalar/array properties, plus one row per object root (without its children).
  // Object root rows get their description extended with a link to the dedicated section.
  const mainRows = specificRows
    .filter((r) => {
      const root = r.name.split('.')[0];
      return !objectRootSet.has(root) || r.name === root;
    })
    .map((r) => {
      if (!objectRootSet.has(r.name)) return r;
      const heading = `${camelToHeading(r.name)} (${r.name})`;
      const anchor = headingToAnchor(heading);
      const ref = `See [${camelToHeading(r.name)}](#${anchor}).`;
      return { ...r, description: r.description ? `${r.description} ${ref}` : ref };
    });

  const lines = [];
  lines.push('---');
  lines.push(`title: ${componentType}`);
  lines.push('draft: true');
  lines.push('---');
  lines.push('');
  if (description) {
    lines.push(description);
    lines.push('');
  }

  lines.push('## Properties');
  lines.push('');
  renderTable(mainRows, lines);

  for (const key of objectRoots) {
    // Omit the parent row itself, only show sub-properties with prefix stripped
    const sectionRows = specificRows
      .filter((r) => r.name.split('.')[0] === key && r.name !== key)
      .map((r) => ({ ...r, name: stripPrefix(r.name, key) }));

    if (sectionRows.length > 0) {
      lines.push('');
      lines.push(`## ${camelToHeading(key)} (\`${key}\`)`);
      lines.push('');
      renderTable(sectionRows, lines);
    }
  }

  if (baseRows.length > 0) {
    lines.push('');
    lines.push('## Common properties');
    lines.push('');
    renderTable(baseRows, lines);
  }

  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage:');
    console.error('  node generate-component-docs.js <ComponentName>');
    console.error('  node generate-component-docs.js --all');
    process.exit(1);
  }

  const doAll = args[0] === '--all';
  const singleComponent = doAll ? null : args[0];

  console.log('Loading root schema...');
  const resolver = new Resolver();
  const rootSchema = await resolver.loadSchema(ROOT_SCHEMA_URL);

  console.log('Discovering components...');
  const components = await findComponents(rootSchema, resolver, ROOT_SCHEMA_URL);

  const componentNames = Object.keys(components).sort();
  console.log(`Found ${componentNames.length} components: ${componentNames.join(', ')}\n`);

  // Resolve ComponentBase to determine which properties are shared by all components
  const defs = rootSchema.definitions || rootSchema.$defs || {};
  let basePropertyNames = new Set();
  if (defs['ComponentBase']) {
    const resolvedBase = await resolver.resolve(defs['ComponentBase'], ROOT_SCHEMA_URL);
    basePropertyNames = new Set(Object.keys(resolvedBase.properties || {}));
  }

  if (!doAll && singleComponent) {
    // Case-insensitive lookup
    const match = componentNames.find(
      (n) => n.toLowerCase() === singleComponent.toLowerCase()
    );
    if (!match) {
      console.error(`Component "${singleComponent}" not found.`);
      console.error(`Available: ${componentNames.join(', ')}`);
      process.exit(1);
    }

    await writeComponent(match, components[match], resolver, ROOT_SCHEMA_URL, basePropertyNames);
  } else {
    for (const name of componentNames) {
      await writeComponent(name, components[name], resolver, ROOT_SCHEMA_URL, basePropertyNames);
    }
    console.log(`\nDone! ${componentNames.length} files written to ${OUTPUT_DIR}`);
  }
}

async function writeComponent(name, info, resolver, rootUrl, basePropertyNames) {
  const md = await generateMarkdown(name, info, resolver, rootUrl, basePropertyNames);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outFile = path.join(OUTPUT_DIR, `${name}.md`);
  fs.writeFileSync(outFile, md, 'utf8');
  console.log(`  ✓ ${outFile}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});