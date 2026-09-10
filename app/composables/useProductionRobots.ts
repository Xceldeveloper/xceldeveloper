import { INDEXING_ENABLED, PRODUCTION_HOST } from "~/utils/seo";

function normalizeHost(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const host = raw.split(",")[0]?.trim().toLowerCase();
  if (!host) return null;
  return host.replace(/^www\./, "").split(":")[0] || null;
}

export function useIsProductionSite() {
  const url = useRequestURL();
  const headers = useRequestHeaders(["host", "x-forwarded-host"]);

  return computed(() => {
    const candidates = [
      normalizeHost(url.hostname),
      normalizeHost(headers.host),
      normalizeHost(headers["x-forwarded-host"]),
    ].filter(Boolean);

    return candidates.includes(PRODUCTION_HOST);
  });
}

/**
 * Allow crawl on Netlify production deploys (CONTEXT=production) or when
 * the request host is overcomeremiator.com. Local / deploy-previews stay noindex.
 */
export function useProductionRobots() {
  const config = useRuntimeConfig();
  const isProductionHost = useIsProductionSite();

  return computed(() => {
    if (!INDEXING_ENABLED) return "noindex, nofollow";
    if (config.public.allowIndexing || isProductionHost.value) {
      return "index, follow";
    }
    return "noindex, nofollow";
  });
}
