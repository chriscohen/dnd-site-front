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
            commandPalette: {
                slots: {
                    content: 'absolute top-full left-0 bg-gray-950',
                    input: 'text-lg',
                    item: 'text-lg',
                    label: 'hidden',
                    root: 'relative'
                }
            },
            link: {
                variants: {
                    disabled: {
                        true: 'text-dimmed'
                    }
                }
            },
            popover: {
                slots: {
                    content: 'bg-yellow-100 px-4 py-2 rounded-lg text-gray-900 max-w-128'
                }
            },
            tooltip: {
                slots: {
                    content: 'text-xl max-w-128 bg-yellow-100 px-4 py-2 rounded-lg'
                }
            }
        }
    },
    compatibilityDate: '2025-07-15',
    css: [
        '~/assets/css/main.css',
        '~/assets/css/default/styles.scss'
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
        '@nuxt/ui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate'
    ],
    nitro: {
        devProxy: {
            '/api-proxy': {
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
                target: 'http://localhost:8080'
            }
        }
    },
    postcss: {
        plugins: {
            autoprefixer: {},
            '@tailwindcss/postcss': {}
        }
    },
    runtimeConfig: {
        public: {
            apiBase: '/api-proxy',
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
