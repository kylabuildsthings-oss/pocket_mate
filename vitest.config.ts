import path from "path";
import { defineConfig } from "vitest/config";

const root = path.resolve(__dirname);

/** Mirrors `tsconfig` path aliases for PocketMate + pages tests. */
const aliases = [
  { find: /^@\/lib\/(.*)$/, replacement: path.join(root, "src/lib", "$1") },
  { find: /^@\/store\/(.*)$/, replacement: path.join(root, "src/store", "$1") },
  { find: /^@\/data\/(.*)$/, replacement: path.join(root, "src/data", "$1") },
  {
    find: /^@\/components\/(.*)$/,
    replacement: path.join(root, "src/components", "$1"),
  },
  {
    find: /^@\/services\/(.*)$/,
    replacement: path.join(root, "src/services", "$1"),
  },
  { find: /^@\/hooks\/(.*)$/, replacement: path.join(root, "src/hooks", "$1") },
  { find: /^@\/(.*)$/, replacement: path.join(root, "$1") },
];

export default defineConfig({
  resolve: {
    alias: aliases,
  },
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts", "pages/**/*.test.ts"],
    exclude: ["e2e/**", "node_modules/**"],
    pool: "forks",
    maxConcurrency: 2,
  },
});
