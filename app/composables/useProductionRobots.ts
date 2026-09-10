import {
  INDEXING_ENABLED,
  PRODUCTION_HOST,
} from "~/utils/seo";

export function useIsProductionSite() {
  const url = useRequestURL();

  return computed(() => {
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    return host === PRODUCTION_HOST;
  });
}

/** `index, follow` on overcomeremiator.com when enabled; otherwise `noindex, nofollow`. */
export function useProductionRobots() {
  const isProduction = useIsProductionSite();

  return computed(() =>
    INDEXING_ENABLED && isProduction.value
      ? "index, follow"
      : "noindex, nofollow",
  );
}
