import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/chat/',
  // base: "/static/chat/",
  css: {
    postcss: {
      plugins: [
        tailwindcssPostcss,
        autoprefixer,
      ],
    },
  },
  build: {
    outDir: '../build/react',
    // outDir: "../../public/static/chat",
    emptyOutDir: true,
    cssCodeSplit: true,
  },
})