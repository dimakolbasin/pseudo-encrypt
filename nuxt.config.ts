export default defineNuxtConfig({
  app: {
    baseURL: '/pseudo-encrypt/',
    buildAssetsDir: 'assets',
    head: {
      title: 'pseudo-encrypt',
    },
  },

  devtools: {
    enabled: true
  },

  modules: ['@nuxtjs/tailwindcss'],

  css: [
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  tailwindcss: {
    configPath: 'tailwind.config.js',
    cssPath: '~/assets/css/tailwind.css'

  },

  ssr: false,
  compatibilityDate: '2025-01-06',
})