import tailwindcss from '@tailwindcss/vite'
import process from 'process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/styles/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@primevue/nuxt-module'],
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
    },
  },
})
