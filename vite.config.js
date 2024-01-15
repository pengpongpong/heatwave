import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        hmr: { host: 'localhost' }
    },
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {
        exclude: ['js-big-decimal']
    },
    assetsInclude: ['**/*.glb'],
});
