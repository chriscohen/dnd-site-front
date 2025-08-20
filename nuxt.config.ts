// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'http://localhost:8080/graphql'
            }
        }
    },
    compatibilityDate: '2025-07-15',
    css: [
        '~/assets/styles/app.scss'
    ],
    devtools: { enabled: true },
    icon: {
        customCollections: [
            {
                prefix: 'dnd',
                dir: './app/assets/icons/dnd'
            }
        ]
    },
    imports: {
        dirs: ['types']
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxtjs/apollo',
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        apiUrl: 'http://localhost:8080',
    },
    typescript: {
        strict: true
    }
})
