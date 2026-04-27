/**
 * Port av swaggerdisplayoperation.html til klientside-modul.
 * Registrerer en onload-handler som finner sin <div> og rendrer operasjonen.
 */
import { resolveRef, normalizeSchema, getRefName, getTypeDescription, linkifyDescription, generateSchemaDefinitionList } from "./swagger-utils";
import { marked } from "marked";

function renderMarkdown(md: string | undefined): string {
  if (!md) return "";
  try {
    return marked.parse(md, { gfm: true, breaks: true, async: false }) as string;
  } catch {
    return md.replaceAll("\n", "<br>");
  }
}

function getRequestBodyHtml(spec: any, operationId: string, operation: any): string {
  const requestBody = resolveRef(spec, operation.requestBody);
  if (!requestBody || !requestBody.content) return "";
  const description = requestBody.description
    ? `<div class="swagger-operation-request-body-description">${linkifyDescription(requestBody.description)}</div>`
    : "";
  let contentHtml = "";
  for (const [contentType, mediaType] of Object.entries(requestBody.content) as any) {
    const schema = mediaType ? mediaType.schema : null;
    if (!schema) continue;
    const schemaName =
      requestBody["x-name"] ||
      getRefName(schema) ||
      `request_body_${contentType.replaceAll(/[^a-zA-Z0-9]+/g, "_")}`;
    const definition = generateSchemaDefinitionList(
      spec,
      `${operationId}_${schemaName}`,
      schema,
      { showTitle: false, wrapperClass: "swagger-operation-request-body-schema", columnHeader: "Property" },
    );
    contentHtml += `<div class="swagger-operation-request-body-content">${definition}</div>`;
  }
  if (!contentHtml) return "";
  return `<div class="swagger-operation-request-body"><h4>Request body</h4>${description}${contentHtml}</div>`;
}

function getValidFormatExample(format: string): string {
  switch (format) {
    case "date-time":
      return `Datetime in <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> format, eg: <code class="sed-enum">${new Date().toISOString()}</code>`;
    case "int32":
      return `A positive integer, eg: <code class="sed-enum">123</code>`;
    default:
      return format;
  }
}

export function renderOperation(spec: any, operationId: string, displayName: string, operation: any): string {
  let html = "";
  if (operation.parameters) {
    html += `<dl class="swagger-entity-display">`;
    for (const parameter of operation.parameters.filter((x: any) => x.in === "path")) {
      const description = parameter.description ? parameter.description.replaceAll(/\n\s*?\n/g, "<br><br>") : "(undescribed)";
      const statusLabels = [];
      if (parameter.required) statusLabels.push("Required");
      if (parameter.schema?.nullable) statusLabels.push("Nullable");
      const statusBadge = statusLabels.length > 0 ? `<span class="sed-status-badge">${statusLabels.join(", ")}</span>` : "";
      const example = parameter.schema?.example ? `<span class="sed-ex-header">Example</span><code class="sed-ex">${parameter.schema.example}</code>` : "";
      const validFormat = parameter.schema?.format ? `<span class="sed-enum-header">Accepted format:</span>${getValidFormatExample(parameter.schema.format)}` : "";
      const anchor = `${operationId}_${parameter.name}`;
      html += `<dt>${statusBadge}<span class="sed-prop"><a href="#${anchor}" id="${anchor}">${parameter.name}</a></span></dt><dd><span class="sed-desc">${description}</span>${validFormat}${example}</dd>`;
    }
    for (const parameter of operation.parameters.filter((x: any) => x.in === "query")) {
      const description = parameter.description ? parameter.description.replaceAll(/\n\s*?\n/g, "<br><br>") : "(undescribed)";
      let parameterSchema = parameter.schema ?? {};
      if (parameterSchema.oneOf) {
        const nullable = parameterSchema.nullable;
        parameterSchema = parameterSchema.oneOf[0];
        parameterSchema.nullable = nullable;
      }
      const statusLabels = [];
      if (parameter.required) statusLabels.push("Required");
      if (parameterSchema.nullable) statusLabels.push("Nullable");
      const statusBadge = statusLabels.length > 0 ? `<span class="sed-status-badge">${statusLabels.join(", ")}</span>` : "";
      const example = parameterSchema.example ? `<span class="sed-ex-header">Example</span><code class="sed-ex">${parameterSchema.example}</code>` : "";
      const enumNames = parameterSchema.items?.enum ? `<span class="sed-enum-header">Valid values</span><code class="sed-enum">${parameterSchema.items.enum.join(", ")}</code>` : "";
      const validFormat = parameterSchema.format ? `<span class="sed-enum-header">Accepted format:</span>${getValidFormatExample(parameterSchema.format)}` : "";
      const anchor = `${operationId}_${parameter.name}`;
      html += `<dt>${statusBadge}<span class="sed-prop"><a href="#${anchor}" id="${anchor}">${parameter.name}</a></span></dt><dd><span class="sed-desc">${description}</span>${validFormat}${example}${enumNames}</dd>`;
    }
    html += "</dl>";
  }

  let parameterHtml = "";
  if (html) {
    parameterHtml = `<dl class="swagger-entity-display sed-head"><dt>Parameter</dt><dd>Description</dd></dl>${html}`;
  }
  let descriptionHtml = "";
  if (operation.description && operation.description !== operation.summary) {
    descriptionHtml = `<details><summary>Show/hide description</summary>${renderMarkdown(operation.description)}</details>`;
  }
  const requestBodyHtml = getRequestBodyHtml(spec, operationId, operation);
  return `<div class="swagger-operation-display-container"><h3>${displayName}</h3><h4>${operation.summary ?? ""}</h4>${descriptionHtml}${parameterHtml}${requestBodyHtml}</div>`;
}

// Auto-registrer handler for hver SwaggerDisplayOperation-komponent
function registerHandlers() {
  const elements = document.querySelectorAll<HTMLElement>(".swagger-operation-display-container-outer");
  elements.forEach((el) => {
    const method = el.dataset.method ?? "get";
    const path = el.dataset.path ?? "";
    const operationId = `${method}${path.replaceAll("/", "_").replaceAll("{", "_").replaceAll("}", "_")}`;
    el.id = `swagger-operation-display-container-${operationId}`;
    if (window.addSwaggerOnloadHandler) {
      window.addSwaggerOnloadHandler((spec: any) => {
        const container = document.getElementById(`swagger-operation-display-container-${operationId}`);
        if (!container) return;
        const pathObj = spec.paths?.[path];
        if (!pathObj) {
          container.innerHTML = `<div class="notice notice-warning">Path "${path}" ikke i spec</div>`;
          return;
        }
        const operation = pathObj[method];
        if (!operation) {
          container.innerHTML = `<div class="notice notice-warning">Operation "${method}" på "${path}" ikke i spec</div>`;
          return;
        }
        const displayName = `${method.toUpperCase()} ${path}`;
        container.innerHTML = renderOperation(spec, operationId, displayName, operation);
      });
    }
  });
}

if (document.readyState !== "loading") registerHandlers();
else document.addEventListener("DOMContentLoaded", registerHandlers);
