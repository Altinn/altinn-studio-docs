# Project Summary: Altinn Component Docs Generator

## What the script does

`generate-component-docs.js` is a zero-dependency Node.js script that generates markdown documentation for Altinn UI components by reading their JSON Schema.

**Usage:**
```bash
node generate-component-docs.js Input   # Single component
node generate-component-docs.js --all   # All components
```

**Output:** One markdown file per component written to `./docs/ComponentName.md`, each containing:
- Component type as heading
- Title and description
- A **Properties** table with component-specific properties (columns: Property | Type | Required | Description | Allowed Values)
- A **Common properties** table with properties inherited from `ComponentBase` (`id`, `hidden`, `grid`, `pageBreak` and their nested sub-properties)

---

## Schema source

Root schema URL:
```
https://altinncdn.no/toolkits/altinn-app-frontend/4/schemas/json/layout/layout.schema.v1.json
```

External `$ref` schemas are on the same domain. All fetched schemas are cached to disk under `.schema-cache/` to avoid re-fetching.

---

## How component discovery works

1. Read `#/definitions/AnyComponent` from the root schema — its `enum` array contains all valid component type names (e.g. `"Input"`, `"Dropdown"`, `"Button"`, etc.).
2. For each type name, look up `definitions["Comp" + typeName]` (e.g. `CompInput`) — this is the component's schema definition.
3. All other entries in `definitions` are shared sub-schemas used by components, not components themselves.

---

## How `$ref` resolution works

A `Resolver` class handles all reference resolution:
- Fetches schemas by URL (with disk cache)
- Follows `$ref` pointers (local `#/...` and external URLs)
- Merges `allOf` arrays into a single flat schema object (combining `properties` and `required`)
- Detects circular references and returns a stub to avoid infinite loops

Each component's schema is fully resolved before property extraction — meaning by the time we walk the properties, all `$ref`s should be expanded and `allOf`s merged.

---

## How property flattening works

`flattenProperties(schema, resolver, baseUrl, prefix, requiredSet, depth)` walks the resolved schema recursively:
- Top-level properties become rows with their name as-is
- Nested object properties are recursed into using dot notation (e.g. `grid.xs`)
- Array item schemas are recursed into with `[]` notation (e.g. `options[].value`)
- `oneOf`/`anyOf` at the top level of an object are handled by merging all variants' properties (deduplicating by name)
- Required status is tracked via the `required` array at each level

---

## How the two-table split works

`ComponentBase` in the root schema defines the properties shared by all components: `id`, `hidden`, `grid`, and `pageBreak`.

In `main()`, `ComponentBase` is resolved once to get its top-level property names. These are passed as a `Set` (`basePropertyNames`) through `writeComponent` → `generateMarkdown`.

In `generateMarkdown`, all flattened rows are split by checking whether the root segment of the property path (everything before the first `.`) is in `basePropertyNames`:
- Rows **not** in the set → **Properties** table (component-specific)
- Rows **in** the set → **Common properties** table (shared base properties, including all nested sub-properties like `grid.xs`, `grid.labelGrid.*`, etc.)

---

## Type column behaviour

- If a schema has an explicit `type`, that is used (e.g. `string`, `boolean`, `integer`, `object`)
- If a schema has an `enum` but **no** explicit `type`, the type is assumed to be `string` — the actual values are shown only in the Allowed Values column
- If a schema has an `enum` **and** an explicit `type`, the `type` value is used — again, values go only in Allowed Values
- `const` values (e.g. `"Button"` on the `type` property) still appear as the type string since they also double as the sole allowed value
- `oneOf`/`anyOf` variants are resolved and their types joined with ` \| `

---

## Output format

Example component-specific property (enum without explicit type):

| Property | Type | Required | Description | Allowed Values |
|----------|------|----------|-------------|----------------|
| `size` | string | | The size of the button | `"sm"`, `"md"`, `"lg"` |

Example common property (base):

| Property | Type | Required | Description | Allowed Values |
|----------|------|----------|-------------|----------------|
| `id` | string | ✅ | The component ID. Must be unique within all layouts/pages in a layout-set. | |

---

## Files

- `generate-component-docs.js` — the main script (no npm dependencies needed)
- `.schema-cache/` — auto-created, stores fetched JSON schemas to disk
- `docs/` — auto-created, output markdown files written here
