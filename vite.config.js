import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  build: { rollupOptions: { input: { index: resolve(root,'index.html'), registro: resolve(root,'registro.html'), top10: resolve(root,'top10.html'), explorar: resolve(root,'explorar.html'), subir: resolve(root,'subir.html') } } }
});
