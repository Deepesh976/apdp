import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),

  plugins: [react()],

  server: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: path.resolve(__dirname, "dist/spa"),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
    },
  },
});
