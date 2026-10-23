export const DEFAULT_SITE_URL = "https://myportfolio-livesh28s-projects.vercel.app";

export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);

  if (envUrl) {
    const trimmed = envUrl.trim();
    return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  }

  return DEFAULT_SITE_URL;
}

export function getAbsoluteUrl(path: string = ""): string {
  const base = getSiteUrl().replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
