import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
    root: path.resolve(__dirname),
    cacheDir: path.resolve(__dirname, '../../node_modules/.vite/landing'),
    base: '/',
    build: {
        outDir: path.resolve(__dirname, '../../dist'),
        emptyOutDir: false
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
            '@shared': path.resolve(__dirname, '../shared')
        }
    },
    plugins: [react(), svgr()],
})
