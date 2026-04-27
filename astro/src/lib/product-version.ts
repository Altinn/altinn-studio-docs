/**
 * Port av themes/hugo-theme-altinn/layouts/partials/get-current-product.html.
 * Ut fra en pathname returnerer { product, version }.
 */
export interface ProductInfo {
  product: string | null;
  version: string | null;
}

export function getCurrentProduct(
  pathname: string,
  supportedLanguages: string[],
): ProductInfo {
  const trimmed = pathname.replace(/^\/+|\/+$/g, "");
  const parts = trimmed.split("/").filter(Boolean);
  if (parts.length === 0) return { product: null, version: null };

  let i = 0;
  if (supportedLanguages.includes(parts[0])) i = 1;

  const product = parts[i] ?? null;
  let version: string | null = null;
  if (parts[i + 1] && /^v\d+/.test(parts[i + 1])) {
    version = parts[i + 1];
  }
  return { product, version };
}
