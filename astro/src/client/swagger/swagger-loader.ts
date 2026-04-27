/**
 * Klientside-loader for Swagger-spec. Initialiserer global state (window.swaggerSpec
 * og en handler-liste) som SwaggerDisplayOperation/Entity bruker.
 */
import SwaggerClient from "swagger-client";
import { generateSchemaDefinitionList, normalizeSchema, resolveRef, linkifyDescription, getRefName, getTypeDescription } from "./swagger-utils";
import { renderOperation } from "./swagger-display-operation";

declare global {
  interface Window {
    swaggerSpec?: any;
    swaggerOnloadHandlers?: ((spec: any) => void)[];
    addSwaggerOnloadHandler?: (fn: (spec: any) => void) => void;
    swaggerLoad?: (uri: string) => void;
    swaggerUtils?: any;
  }
}

window.swaggerOnloadHandlers = window.swaggerOnloadHandlers || [];
window.addSwaggerOnloadHandler = (fn) => {
  window.swaggerOnloadHandlers!.push(fn);
};

window.swaggerUtils = {
  generateSchemaDefinitionList,
  normalizeSchema,
  resolveRef,
  linkifyDescription,
  getRefName,
  getTypeDescription,
};

window.swaggerLoad = function (uri: string) {
  const containers = document.querySelectorAll(".swagger-entity-display-container, .swagger-operation-display-container-outer");
  containers.forEach((c) => {
    c.innerHTML = '<div class="sed-loader">Laster API-definisjon...</div>';
  });

  new SwaggerClient(uri).then(
    (client: any) => {
      window.swaggerSpec = client.spec;
      (window.swaggerOnloadHandlers || []).forEach((h) => h(client.spec));
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const target = document.getElementById(id);
        if (target) target.scrollIntoView();
      }
    },
    (reason: any) => {
      console.error("swaggerload: failed:", reason);
      containers.forEach((c) => {
        c.innerHTML = `<div class="notice notice-warning">Klarte ikke å laste swagger fra ${uri}.</div>`;
      });
    },
  );
};

// Auto-init: hvis siden inneholder en eksplisitt URI på <body data-swagger-uri="...">
// eller hvis localStorage.selectedSwagger er satt (Dialogporten-mønster).
function init() {
  const explicit = document.body.dataset.swaggerUri;
  let uri = explicit || null;
  if (!uri) {
    try {
      uri = window.localStorage.getItem("selectedSwagger");
    } catch {}
  }
  // Eller: en SwaggerLoad-komponent har skrevet sin uri til en data-attr
  if (!uri) {
    const node = document.querySelector("[data-swagger-load-uri]") as HTMLElement | null;
    if (node) uri = node.dataset.swaggerLoadUri ?? null;
  }
  if (uri) window.swaggerLoad!(uri);
}

if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);

// Eksponer renderOperation til andre moduler
export { renderOperation };
