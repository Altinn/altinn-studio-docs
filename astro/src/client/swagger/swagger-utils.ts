/**
 * Hjelpefunksjoner for Swagger-rendering. Port fra
 * themes/hugo-theme-altinn/layouts/shortcodes/swaggerload.html
 */

export function resolveRef(spec: any, schemaOrRef: any): any {
  if (!schemaOrRef || typeof schemaOrRef !== "object") return schemaOrRef;
  const ref = schemaOrRef.$ref || schemaOrRef.$$ref;
  if (!ref || !ref.startsWith("#/")) return schemaOrRef;
  const path = ref.substring(2).split("/");
  let resolved: any = spec;
  for (const segment of path) {
    if (typeof resolved !== "object" || resolved === null || !(segment in resolved)) {
      return schemaOrRef;
    }
    resolved = resolved[segment];
  }
  if (typeof resolved !== "object" || resolved === null) return schemaOrRef;
  const merged = { ...resolved, ...schemaOrRef };
  delete merged.$ref;
  delete merged.$$ref;
  return merged;
}

export function normalizeSchema(spec: any, schema: any): any {
  if (!schema || typeof schema !== "object") return schema;
  let normalized = resolveRef(spec, schema);
  if (normalized.oneOf && normalized.oneOf.length > 0) {
    const nullable = normalized.nullable;
    normalized = resolveRef(spec, normalized.oneOf[0]);
    if (nullable !== undefined) normalized = { ...normalized, nullable };
  }
  return normalized;
}

export function getRefName(schemaOrRef: any): string | null {
  if (!schemaOrRef || typeof schemaOrRef !== "object") return null;
  const ref = schemaOrRef.$ref || schemaOrRef.$$ref;
  return ref ? ref.split("/").pop() : null;
}

export function linkifyDescription(description: string | undefined): string {
  if (!description) return "(undescribed)";
  return description
    .replaceAll(/\n\s*?\n/g, "<br><br>")
    .replace(/https:\/\/[^\s]+/g, (url) => {
      try {
        const u = new URL(url);
        let display = `${u.origin}/...${u.pathname + u.hash}`;
        if (display.length > 50) display = `${u.origin}/...${(u.pathname + u.hash).slice(-20)}`;
        return `<a href="${url}">${display}</a>`;
      } catch {
        return url;
      }
    });
}

export function getTypeDescription(spec: any, schema: any): string {
  const n = normalizeSchema(spec, schema) || {};
  const type = n.type || "unknown";
  if (type === "array") {
    const itemSchema = normalizeSchema(spec, n.items) || {};
    const childType = getRefName(n.items) || itemSchema.title || itemSchema.type || "unknown";
    return `List of ${childType}${itemSchema.format ? ` (${itemSchema.format})` : ""}`;
  }
  if (type === "object") {
    const objectName = getRefName(schema) || n.title || (n.properties ? "object" : "unknown");
    return n.format ? `${objectName} (${n.format})` : objectName;
  }
  return n.format ? `${type} (${n.format})` : type;
}

export function generateSchemaDefinitionList(
  spec: any,
  entityname: string,
  entity: any,
  options: any = {},
  indentLevel = 0,
  parentName = "",
): string {
  const norm = normalizeSchema(spec, entity);
  let html = "";
  const indentClass = indentLevel > 0 ? ` sed-indent sed-indent-${indentLevel}` : "";

  if (norm && norm.type === "object" && norm.properties) {
    html += `<dl class="swagger-entity-display${indentClass}">`;
    for (const [propertyName, rawSchema] of Object.entries(norm.properties)) {
      const ps = normalizeSchema(spec, rawSchema);
      const description = linkifyDescription(ps.description);
      const isRequired = Array.isArray(norm.required) && norm.required.includes(propertyName);
      const statusLabels: string[] = [];
      if (isRequired) statusLabels.push("Required");
      if (ps.nullable) statusLabels.push("Nullable");
      const statusBadge = statusLabels.length > 0
        ? `<span class="sed-status-badge">${statusLabels.join(", ")}</span>`
        : "";
      const example = ps.example ? `<span class="sed-ex-header">Example</span><code class="sed-ex">${ps.example}</code>` : "";
      const enumNames = ps.enum ? `<span class="sed-enum-header">Valid values</span><code class="sed-enum">${ps.enum.join(", ")}</code>` : "";
      const typeDesc = getTypeDescription(spec, rawSchema);
      const type = ps.type || "unknown";
      const anchor = `${entityname}${parentName ? "_" + parentName : ""}_${propertyName}`;
      let nestedHtml = "";

      const itemSchema = type === "array" && ps.items ? normalizeSchema(spec, ps.items) : null;
      if (type === "object" || (type === "array" && itemSchema && itemSchema.type === "object")) {
        const nestedSchema = type === "object" ? ps : itemSchema;
        const nestedSummary = type === "array" ? "Show item properties" : "Show nested properties";
        nestedHtml = generateSchemaDefinitionList(
          spec,
          entityname,
          nestedSchema,
          options,
          indentLevel + 1,
          (parentName ? parentName + "_" : "") + propertyName,
        );
        nestedHtml = `<details class="sed-nested-schema"><summary>${nestedSummary}</summary>${nestedHtml}</details>`;
      }
      html += `<dt>${statusBadge}<span class="sed-prop"><a href="#${anchor}" id="${anchor}">${propertyName}</a></span><span class="sed-type" title="${typeDesc}">${typeDesc}</span></dt>`;
      html += `<dd><span class="sed-desc">${description}</span>${example}${enumNames}${nestedHtml}</dd>`;
    }
    html += "</dl>";
  } else if (norm && norm.type === "array" && norm.items) {
    html += generateSchemaDefinitionList(spec, entityname, norm.items, options, indentLevel, parentName);
  }

  if (indentLevel === 0) {
    const wrapperClass = options.wrapperClass || "swagger-entity-display-container";
    const headingLevel = options.headingLevel || "h3";
    const columnHeader = options.columnHeader || "Property";
    const titleHtml = options.showTitle === false ? "" : `<${headingLevel}>${entityname}</${headingLevel}>`;
    html = `<div class="${wrapperClass}">${titleHtml}<dl class="swagger-entity-display sed-head"><dt>${columnHeader}</dt><dd>Description</dd></dl>${html}</div>`;
  }
  return html;
}
