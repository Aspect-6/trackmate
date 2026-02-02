import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
    root: path.resolve(__dirname),
    cacheDir: path.resolve(__dirname, "../../node_modules/.vite/academic"),
    base: "/academic/",
    server: {
        port: 5174,
        strictPort: true
    },
    build: {
        outDir: path.resolve(__dirname, "../../dist/academic"),
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom", "react-router-dom"],
                    "firebase-vendor": ["firebase/app", "firebase/auth", "firebase/firestore"],
                    "ui-vendor": ["lucide-react", "@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities", "date-fns"]
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname),
            "@shared": path.resolve(__dirname, "../shared")
        }
    },
    plugins: [react()],
})
