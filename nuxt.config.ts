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

  // 如部署到 GitHub Pages 子路径，取消注释并修改：
  // app: {
  //   baseURL: '/3CCam/',
  // },
})
