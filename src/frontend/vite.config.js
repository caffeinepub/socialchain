import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

// Always hardcode the production II URL as the fallback — this ensures sign-in
// works even when II_URL is absent at build time or env.json is unpopulated.
const HARDCODED_II_URL = "https://identity.internetcomputer.org/";

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : HARDCODED_II_URL;

// Set II_URL unconditionally so the bundle always has a valid string.
process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

// CANISTER_ID_BACKEND must always resolve to a string in the bundle.
// vite-plugin-environment exposes it as process.env.CANISTER_ID_BACKEND,
// but if the env var is absent at build time the expression evaluates to
// the JS `undefined` keyword — not the string "undefined" — which causes
// loadConfig() to throw and silently breaks the sign-in button.
// JSON.stringify guarantees it is always a string literal, never undefined.
const canisterIdBackend = process.env.CANISTER_ID_BACKEND || "";

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
  },
  define: {
    // Always inject as a JSON string so the bundle never sees bare `undefined`.
    "process.env.CANISTER_ID_BACKEND": JSON.stringify(canisterIdBackend),
    // Hardcode II_URL so sign-in survives any env injection failure.
    "process.env.II_URL": JSON.stringify(process.env.II_URL || HARDCODED_II_URL),
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"]
  },
});
