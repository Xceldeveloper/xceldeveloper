/** Marketing production host — Netlify previews / localhost stay noindex. */
export const PRODUCTION_HOST = "overcomeremiator.com";
/** Public origin for og:url, og:image, canonical, and JSON-LD — never localhost. */
export const SITE_URL = "https://overcomeremiator.com";

/** Set false to block crawlers site-wide (e.g. pre-launch). */
export const INDEXING_ENABLED = true;

/**
 * Origin used in share / SEO tags.
 * Always the real domain so WhatsApp/Facebook don't canonicalise to
 * localhost or *.netlify.app when those hosts are scraped.
 */
export const resolvePublicOrigin = () => SITE_URL;

/** Shared profile SEO — name search + social identity + contact */
export const PROFILE = {
  name: "Overcomer Emiator",
  givenName: "Overcomer",
  familyName: "Emiator",
  jobTitle: "Builder & Solution Architect",
  email: "overcomer@emiator.com",
  coffeeChatUrl: "https://cal.com/overcomeremiator/coffee-chat",
  description:
    "Overcomer Emiator is a builder and solution architect, and founder of Sleekware. He designs and ships software systems for real-world constraints—currently founding Sleekware and building at Piggyvest.",
  /** Short line for OG/Twitter when space is tight */
  tagline: "Builder, solution architect, and founder of Sleekware.",
  imagePath: "/og-image.jpg",
  /** WhatsApp / Facebook large preview standard (same as Buque) */
  imageWidth: 1200,
  imageHeight: 630,
  imageType: "image/jpeg",
  worksFor: [
    {
      name: "Sleekware",
      url: "https://sleekware.io",
      role: "Founder & CEO",
    },
    {
      name: "Piggyvest",
      url: "https://www.piggyvest.com",
      role: "Frontend Engineer",
    },
  ],
  /** Public profiles Google can associate with this Person */
  sameAs: [
    "https://www.linkedin.com/in/overcomeremiator",
    "https://github.com/Xceldeveloper",
    "https://x.com/ovemiator",
    "https://www.instagram.com/overcomeremiator",
    "https://cal.com/overcomeremiator/coffee-chat",
  ],
} as const;

export const socialLinks = [
  {
    href: "https://www.linkedin.com/in/overcomeremiator",
    label: "LinkedIn",
    icon: "lucide:linkedin",
  },
  {
    href: "https://www.instagram.com/overcomeremiator",
    label: "Instagram",
    icon: "lucide:instagram",
  },
  {
    href: "https://github.com/Xceldeveloper",
    label: "GitHub",
    icon: "lucide:github",
  },
  {
    href: "https://x.com/ovemiator",
    label: "X",
    icon: "simple-icons:x",
  },
] as const;

/** schema.org ContactPoint nodes for email + scheduling */
export const contactPoints = [
  {
    "@type": "ContactPoint" as const,
    contactType: "customer support",
    email: PROFILE.email,
    url: `mailto:${PROFILE.email}`,
    name: "Email",
  },
  {
    "@type": "ContactPoint" as const,
    contactType: "scheduling",
    url: PROFILE.coffeeChatUrl,
    name: "Coffee Chat",
  },
];
