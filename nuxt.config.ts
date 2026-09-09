// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-09-09",
  devtools: { enabled: true },
  css: ["@/assets/styling/main.scss"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Overcomer Emiator",
      meta: [
        { name: "theme-color", content: "#000000" },
        { name: "robots", content: "index, follow" },
        {
          name: "description",
          content:
            "Overcomer Emiator — builder and solution architect. Founder of Sleekware.",
        },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Overcomer Emiator" },
        { property: "og:title", content: "Overcomer Emiator" },
        {
          property: "og:description",
          content:
            "Overcomer Emiator — builder and solution architect. Founder of Sleekware.",
        },
        { property: "og:image", content: "/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "The Overcomer — Overcomer Emiator" },
        // Twitter / X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Overcomer Emiator" },
        {
          name: "twitter:description",
          content:
            "Overcomer Emiator — builder and solution architect. Founder of Sleekware.",
        },
        { name: "twitter:image", content: "/og-image.png" },
        { name: "twitter:image:alt", content: "The Overcomer — Overcomer Emiator" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      ],
    },
  },

  modules: ["@nuxt/icon", "@nuxt/fonts", "@vueuse/nuxt"],

  icon: {
    class: "icon",
    serverBundle: {
      collections: ["mdi", "uil", "lucide", "simple-icons"],
    },
  },

  fonts: {
    families: [],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styling/variables.scss" as *;',
        },
      },
    },
  },
});
