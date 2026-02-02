import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import path from "path"

export default defineConfig({
    root: path.resolve(__dirname),
    cacheDir: path.resolve(__dirname, "../../node_modules/.vite/landing"),
    base: "/",
    server: {
        port: 5173,
        strictPort: true,
        proxy: {
            "/academic": {
                target: "http://localhost:5174",
                changeOrigin: true,
                ws: true
            }
        }
    },
    build: {
        outDir: path.resolve(__dirname, "../../dist"),
        emptyOutDir: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom", "react-router-dom"],
                    "firebase-vendor": ["firebase/app", "firebase/auth", "firebase/firestore"],
                    "ui-vendor": ["lucide-react"]
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
    plugins: [react(), svgr()],
})

