import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact({ devReactRefresh: false }),
    tailwindcss(),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
    compression({ algorithm: "gzip", ext: ".gz" }),
    visualizer({ open: false, filename: "dist/stats.html" }),
  ],
  build: {
    target: "es2020",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/preact")) return "vendor";
          if (
            id.includes("node_modules/react-scroll") ||
            id.includes("node_modules/react-responsive") ||
            id.includes("node_modules/react-device-detect") ||
            id.includes("node_modules/focus-trap")
          )
            return "ui-libs";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});
