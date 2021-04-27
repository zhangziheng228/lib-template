import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig({
  root: path.resolve(__dirname, './playground'),
  plugins: [vuePlugin()],
  server: {
    port: 8888,
  },
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: path.resolve(__dirname, 'src') + '/',
      },
    ],
  },
});
