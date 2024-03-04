const {
  NODE_ENV
} = process.env

const isDevelopment = NODE_ENV === 'development'
const isProduction = NODE_ENV === 'production'

export default defineNuxtConfig({
  devtools: { 
    enabled: isDevelopment
  },
  debug: isDevelopment,
  ssr: false,
  modules: [
    '@pinia/nuxt',
    'dayjs-nuxt',
    '@/modules/antd',
    '@/modules/mdi',
  ],
  css: ['@/assets/scss/app.scss'],
  vite: {
    // build: {
    //   minify: isProduction,
    //   cssCodeSplit: isProduction,
    //   cssMinify: isProduction,
    // },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
        },
      },
    }
  },
  nitro: {
    storage: {
      cache: {
        driver: 'memory',
        memory: {
          base: 'cache'
        }
      }
    }
  },
  dayjs: {
    locales: ['en', 'id'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: 'Asia/Jakarta',
  }
})
