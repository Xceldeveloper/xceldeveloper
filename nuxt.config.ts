// https://nuxt.com/docs/api/configuration/nuxt-config
import { env } from "node:process";

export default defineNuxtConfig({
  compatibilityDate: "2026-09-09",
  devtools: { enabled: true },
  css: ["@/assets/styling/main.scss"],

  // Netlify: CONTEXT=production on the production branch, or force via env.
  runtimeConfig: {
    public: {
      allowIndexing:
        env.CONTEXT === "production" ||
        env.NUXT_PUBLIC_ALLOW_INDEXING === "true",
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Overcomer Emiator",
      meta: [
        { name: "theme-color", content: "#000000" },
        // robots set in app.vue
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "canonical", href: "https://overcomeremiator.com" },
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
