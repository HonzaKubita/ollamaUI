// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ssr: false,
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      title: "Ollama UI",
      link: [
        { rel: 'icon', href: '/logo.svg' }
      ]
    }
  }
})