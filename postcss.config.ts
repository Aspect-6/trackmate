import type { AcceptedPlugin } from "postcss"

interface Config {
    plugins?: Record<string, any> | AcceptedPlugin[]
}

export default {
    plugins: {
        "@tailwindcss/postcss": {},
        autoprefixer: {},
    },
} satisfies Config
