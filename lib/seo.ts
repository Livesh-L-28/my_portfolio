export const DEFAULT_SITE_URL = "https://livesh-portfolio.vercel.app";

export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);

  if (envUrl) {
    let trimmed = envUrl.trim();
    if (!trimmed.startsWith("http")) {
      trimmed = `https://${trimmed}`;
    }
    trimmed = trimmed.replace("livesh-porfolio.vercel.app", "livesh-portfolio.vercel.app");
    return trimmed;
  }

  return DEFAULT_SITE_URL;
}

export function getAbsoluteUrl(path: string = ""): string {
  const base = getSiteUrl().replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
