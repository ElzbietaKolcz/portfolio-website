import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact({ devReactRefresh: false }), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['preact', 'preact/compat', 'preact/hooks'],
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
});
