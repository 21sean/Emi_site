const basePath = process.env.NODE_ENV === "production" ? "/Emi_site" : "";

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
