// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: [
      '@nuxt/eslint',
      '@nuxt/icon',
      '@nuxt/image',
      '@nuxt/test-utils',
      '@nuxt/ui',
      '@nuxtjs/apollo',
      '@pinia/nuxt',
    ],

    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:8080/graphql'
            }
        }
    },

    icon: {
        customCollections: [
            {
                prefix: 'dnd',
                dir: './app/assets/icons/dnd'
            }
        ]
    },

    css: [
        '~/assets/styles/app.scss'
    ]
})
