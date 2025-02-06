import { defineConfig } from 'vite';
import path from 'path';

// Vite-konfiguraatio, joka määrittelee aliasit ja muut asetukset
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')  // Alias @ viittaa src-hakemistoon
    }
  }
});