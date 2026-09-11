import { PROFILE } from "~/utils/seo";

/** Desktop: copy + toast near CTA + mailto. Mobile: mailto only. */
export const useContactEmail = () => {
  const { showToast } = useToast();

  const contactViaEmail = async (event?: Event) => {
    event?.preventDefault();

    const email = PROFILE.email;
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1025px)").matches;

    // Capture before any await — currentTarget is cleared after the event turns
    const el = event?.currentTarget;
    const rect =
      el instanceof HTMLElement ? el.getBoundingClientRect() : null;
    const toastAnchor = rect
      ? {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        }
      : null;

    if (isDesktop) {
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email copied", { anchor: toastAnchor });
      } catch {
        showToast(email, { anchor: toastAnchor });
      }
    }

    // Opens the default mail client when one is registered
    window.location.href = `mailto:${email}`;
  };

  return {
    email: PROFILE.email,
    mailtoHref: `mailto:${PROFILE.email}`,
    contactViaEmail,
  };
};
