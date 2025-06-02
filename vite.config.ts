import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const base = isBuild ? '/static/chat' : '/chat'
  const outDir = isBuild ? `../../public/${base}` : './build'

  return {
    plugins: [react(), tsconfigPaths()],
    base,
    server: {
      port: 3000,
    },
    css: {
    postcss: {
      plugins: [
        tailwindcssPostcss,
        autoprefixer,
      ],
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
    cssCodeSplit: true,
  },
}
})