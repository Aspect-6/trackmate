import type { Config } from "tailwindcss";

export default {
    content: [
        "./packages/academic/index.html",
        "./packages/landing/index.html",
        "./packages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Config;