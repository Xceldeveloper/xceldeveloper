import { INDEXING_ENABLED, PRODUCTION_HOST } from "~/utils/seo";

function normalizeHost(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const host = raw.split(",")[0]?.trim().toLowerCase();
  if (!host) return null;
  return host.replace(/^www\./, "").split(":")[0] || null;
}

function isNetlifySubdomain(host: string) {
  return host.endsWith(".netlify.app");
}

function isLocalHost(host: string) {
  return host === "localhost" || host === "127.0.0.1";
}

function hostsFrom(url: URL, headers: Record<string, string | undefined>) {
  return [
    normalizeHost(url.hostname),
    normalizeHost(headers.host),
    normalizeHost(headers["x-forwarded-host"]),
  ].filter(Boolean) as string[];
}

export function useIsProductionSite() {
  // Call Nuxt composables in setup — not inside computed
  const url = useRequestURL();
  const headers = useRequestHeaders(["host", "x-forwarded-host"]);

  return computed(() =>
    hostsFrom(url, headers).includes(PRODUCTION_HOST),
  );
}

/**
 * Index only the real domain. Always noindex *.netlify.app so Google
 * stops ranking *.netlify.app ahead of overcomeremiator.com.
 */
export function useProductionRobots() {
  const config = useRuntimeConfig();
  const url = useRequestURL();
  const headers = useRequestHeaders(["host", "x-forwarded-host"]);

  return computed(() => {
    if (!INDEXING_ENABLED) return "noindex, nofollow";

    const hosts = hostsFrom(url, headers);
    const onProductionHost = hosts.includes(PRODUCTION_HOST);
    const onNetlifyApp = hosts.some(isNetlifySubdomain);
    const onLocal = hosts.some(isLocalHost);

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
