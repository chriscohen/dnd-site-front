/** @type {import('tailwindcss').Config} */

export default {
    content: [
        // These paths ensure Tailwind picks up classes in your files
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        // ✅ Add the plugin here
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('@tailwindcss/typography'),
    ],
}
