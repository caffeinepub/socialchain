import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// II_URL is injected at build time via vite.config.js define block.
// The define block guarantees a string literal — never undefined.
// Additionally hardcode the production fallback here as a safety net
// so sign-in works even if the build-time injection somehow fails.
const PRODUCTION_II_URL = "https://identity.internetcomputer.org/";
const II_URL: string =
  (process.env.II_URL as string | undefined) || PRODUCTION_II_URL;

// Log the II URL being used so any future issues are easy to diagnose.
if (typeof window !== "undefined") {
  console.info("[SocialChain] Internet Identity URL:", II_URL);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider
      createOptions={{
        loginOptions: {
          // Explicitly pass the identity provider URL — this prevents silent
          // failures when II_URL is missing from env.json at runtime.
          identityProvider: II_URL,
        },
      }}
    >
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
