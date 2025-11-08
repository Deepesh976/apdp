import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { createServer } from "./server";

export default defineConfig(() => ({
  // ✅ Serve the app from /client
  root: path.resolve(__dirname, "client"),

  server: {
    host: "::",
    port: 8080,
    fs: {
      // ✅ Only allow what you need
      allow: [
        path.resolve(__dirname, "client"),
        path.resolve(__dirname, "shared"),
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },

  // ✅ Put built SPA outside client (matches your pkg setup)
  build: {
    outDir: path.resolve(__dirname, "dist/spa"),
    emptyOutDir: true,
  },

  // (optional) if you use /public at repo root
  publicDir: path.resolve(__dirname, "public"),

  plugins: [react(), expressPlugin()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      // ✅ Mount API only under /api so Vite serves '/' and React routes
      server.middlewares.use("/api", app);
    },
  };
}
