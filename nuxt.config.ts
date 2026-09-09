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
      title: "Overcomer Emiator - Passionate Developer",
      meta: [
        { name: "theme-color", content: "#000000" },
        { name: "robots", content: "index, follow" },
        { 
          name: "description", 
          content: "Overcomer Emiator - Full Stack Developer & Creative Technologist" 
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/icon.jpg" }
      ],
    },
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "@vueuse/nuxt",
  ],

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
          additionalData:
            '@use "@/assets/styling/variables.scss" as *;',
        },
      },
    },
  },
});
