export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Resume Studio",
      meta: [
        {
          name: "description",
          content: "A Nuxt resume builder with live preview, templates, autosave, and PDF export."
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    }
  }
});
