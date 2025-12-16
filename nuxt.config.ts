// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    app: {
        head: {
            charset: "utf-8",
            htmlAttrs: {
                lang: "en",
            },
            title: 'D&D Site',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        }
    },
    appConfig: {
        ui: {
            link: {
                variants: {
                    disabled: {
                        true: 'text-dimmed'
                    }
                }
            }
        }
    },
    compatibilityDate: '2025-07-15',
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
        '@nuxt/ui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate'
    ],
    postcss: {
        plugins: {
            autoprefixer: {},
            '@tailwindcss/postcss': {}
        }
    },
    runtimeConfig: {
        public: {
            apiUrl: 'http://localhost:8080/api'
        }
    },
    typescript: {
        strict: true
    },
    vite: {
        build: {
            commonjsOptions: {
                include: [/dnd5e-ts/, /node_modules/]
            }
        },
        plugins: [
            tailwindcss(),
        ]
    }
})
