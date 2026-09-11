import { PRODUCTION_HOST } from "~/utils/seo";

const LANDING_KEY = "oe_land_from";
const viewedKey = (section: string) => `oe_viewed_${section}`;

function normalizeHost(hostname: string) {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

/** Capture landing source once per tab (UTM > referrer > direct). */
export function captureLandingSource() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(LANDING_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const utm =
      params.get("utm_source") || params.get("ref") || params.get("source");
    if (utm?.trim()) {
      sessionStorage.setItem(LANDING_KEY, utm.trim().toLowerCase().slice(0, 64));
      return;
    }

    const raw = document.referrer;
    if (raw) {
      try {
        const host = normalizeHost(new URL(raw).hostname);
        if (host && host !== PRODUCTION_HOST) {
          sessionStorage.setItem(LANDING_KEY, host.slice(0, 64));
          return;
        }
      } catch {
        /* ignore bad referrer */
      }
    }

    sessionStorage.setItem(LANDING_KEY, "direct");
  } catch {
    /* private mode */
  }
}

function landingFrom(): string {
  if (typeof window === "undefined") return "direct";
  try {
    captureLandingSource();
    return sessionStorage.getItem(LANDING_KEY) || "direct";
  } catch {
    return "direct";
  }
}

/**
 * Custom event = action name; single `from` prop = landing source.
 * Umami Hobby: each property counts as an extra event — keep to one.
 */
export function trackAction(name: string) {
  if (typeof window === "undefined") return;
  captureLandingSource();
  void umTrackEvent(name, { from: landingFrom() });
}

/** Fire once per session the first time a named section is seen. */
export function trackViewSection(section: string) {
  if (typeof window === "undefined" || !section) return;
  const key = viewedKey(section);
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    /* still track */
  }
  trackAction(`view_${section}`);
}

export const useAnalytics = () => {
  onMounted(() => {
    captureLandingSource();
  });

  return {
    trackAction,
    trackViewSection,
    landingFrom,
  };
};
