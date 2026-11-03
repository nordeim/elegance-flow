import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit-test layer for the pure domain seams (SQLite path normalization,
// scrypt/HMAC auth + password seams, Zod schema families, the login rate
// limiter, boot env, body-parsing guards) plus the source-contract pins
// over the EleganceFlow surfaces (comment-stripped source reads).
// Browser/E2E coverage lives in
// tests/e2e/*.spec.ts (Playwright — never picked up by this config, which
// matches *.test.ts only).
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
});
