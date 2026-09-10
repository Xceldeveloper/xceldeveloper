const CAL_LINK = "overcomeremiator/coffee-chat";
const CAL_NAMESPACE = "coffee-chat";
const CAL_ORIGIN = "https://cal.com";
const CAL_EMBED_JS = "https://app.cal.com/embed/embed.js";

declare global {
  interface Window {
    Cal?: {
      (...args: unknown[]): void;
      loaded?: boolean;
      ns?: Record<string, { (...args: unknown[]): void; q?: unknown[] }>;
      q?: unknown[];
    };
  }
}

let initialized = false;

const ensureCalEmbed = () => {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  // Official Cal.com embed bootstrap
  // https://cal.com/help/embedding/adding-embed
  (function (C: Window, A: string, L: string) {
    const p = (a: { q?: unknown[] }, ar: unknown[]) => {
      a.q = a.q || [];
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      (function (...ar: unknown[]) {
        const cal = C.Cal!;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function (...args: unknown[]) {
            p(api, args);
          } as { (...args: unknown[]): void; q?: unknown[] };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns![namespace] = cal.ns![namespace] || api;
            p(cal.ns![namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      } as Window["Cal"]);
  })(window, CAL_EMBED_JS, "init");

  window.Cal!("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
  window.Cal!.ns![CAL_NAMESPACE]!("ui", {
    theme: "dark",
    hideEventTypeDetails: false,
    layout: "month_view",
  });
};

/** Cal.com popup embed for Coffee Chat CTAs */
export const useCalEmbed = () => {
  const calHref = `${CAL_ORIGIN}/${CAL_LINK}`;

  onMounted(() => {
    ensureCalEmbed();
  });

  const openCoffeeChat = (event?: Event) => {
    event?.preventDefault();
    ensureCalEmbed();

    const ns = window.Cal?.ns?.[CAL_NAMESPACE];
    if (ns) {
      ns("modal", {
        calLink: CAL_LINK,
        config: {
          layout: "month_view",
          theme: "dark",
        },
      });
      return;
    }

    // Embed not ready — same-tab fallback (never target=_blank)
    window.location.assign(calHref);
  };

  return {
    calHref,
    openCoffeeChat,
  };
};
