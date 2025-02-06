import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Lisää alias src-hakemistolle
    },
  },
  base: '/malminlanit/',  // Muokkaa tämä, jos käytät GitHub Pagesia tai muuta isännöintipalvelua
});
