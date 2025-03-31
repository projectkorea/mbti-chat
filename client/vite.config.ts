import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'types': path.resolve(__dirname, './src/types'),
      'pages': path.resolve(__dirname, './src/pages'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'utils': path.resolve(__dirname, './src/utils'),
      'store': path.resolve(__dirname, './src/store'),
      'assets': path.resolve(__dirname, './src/assets'),
      'routes': path.resolve(__dirname, './src/routes'),
      'common': path.resolve(__dirname, './src/components/common')
    }
  }
})