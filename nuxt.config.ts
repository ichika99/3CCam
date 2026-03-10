// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // 启用 Nuxt 4 目录约定（app/ 作为源目录）
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
    navigation: {
      fields: ['game', 'tags', 'status', 'camera_type', 'date', 'cover'],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  // 静态生成
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // 自定义域名部署时 baseURL 为 '/'
  // 如果不用自定义域名而用子路径，改为 '/3CCam/'
  app: {
    baseURL: '/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0f1117', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/favicon.webp' },
        { rel: 'apple-touch-icon', href: '/favicon.webp' },
      ],
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },
})
