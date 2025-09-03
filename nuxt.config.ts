// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

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
        '~/assets/css/main.css',
        '~/assets/css/styles.scss',
    ],
    devtools: { enabled: true },
    fonts: {
        defaults: {
            weights: [400, 700],
            styles: ['normal', 'italic'],
            subsets: ['latin', 'latin-ext'],
        },
        families: [
            { name: 'Roboto', provider: 'google', weights: [400, 700], styles: ['normal'] },
        ]
    },
    icon: {
        customCollections: [
            {
                prefix: 'dnd',
                dir: './app/assets/icons/dnd'
            }
        ],
        serverBundle: {
            collections: ['lucide']
        }
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
        public: {
            apiUrl: 'http://localhost:8080',
        }
    },
    typescript: {
        strict: true
    },
    ui: {
    },
    vite: {
        plugins: [
            tailwindcss(),
        ]
    }
})
