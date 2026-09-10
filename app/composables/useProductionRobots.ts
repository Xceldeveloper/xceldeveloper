import { INDEXING_ENABLED, PRODUCTION_HOST } from "~/utils/seo";

function normalizeHost(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const host = raw.split(",")[0]?.trim().toLowerCase();
  if (!host) return null;
  return host.replace(/^www\./, "").split(":")[0] || null;
}

function collectHosts() {
  const url = useRequestURL();
  const headers = useRequestHeaders(["host", "x-forwarded-host"]);
  return [
    normalizeHost(url.hostname),
    normalizeHost(headers.host),
    normalizeHost(headers["x-forwarded-host"]),
  ].filter(Boolean) as string[];
}

export function useIsProductionSite() {
  return computed(() => collectHosts().includes(PRODUCTION_HOST));
}

function isNetlifySubdomain(host: string) {
  return host.endsWith(".netlify.app");
}

function isLocalHost(host: string) {
  return host === "localhost" || host === "127.0.0.1";
}

/**
 * Index only the real domain. Always noindex *.netlify.app so Google
 * stops ranking xceldeveloper.netlify.app ahead of overcomeremiator.com.
 */
export function useProductionRobots() {
  const config = useRuntimeConfig();

  return computed(() => {
    if (!INDEXING_ENABLED) return "noindex, nofollow";

    const hosts = collectHosts();
    const onProductionHost = hosts.includes(PRODUCTION_HOST);
    const onNetlifyApp = hosts.some(isNetlifySubdomain);
    const onLocal = hosts.some(isLocalHost);

    // Hard rule: never let the Netlify subdomain stay in Google
    if (onNetlifyApp && !onProductionHost) {
      return "noindex, nofollow";
    }

    if (onLocal && !onProductionHost) {
      return "noindex, nofollow";
    }

    if (onProductionHost || config.public.allowIndexing) {
      return "index, follow";
    }

    return "noindex, nofollow";
  });
}
