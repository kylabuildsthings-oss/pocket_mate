#!/usr/bin/env node
/**
 * Fails if any file with a "use client" directive reads process.env for a non–NEXT_PUBLIC key.
 * Server-only secrets must stay in Route Handlers, pages/api, or server components without "use client".
 */
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const roots = ["app", "src"];
const ext = /\.(tsx|ts|jsx|js)$/;

function* walk(dir) {
  let names;
  try {
    names = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of names) {
    if (name === "node_modules" || name === ".next" || name === "dist") continue;
    const p = join(dir, name);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) yield* walk(p);
    else if (ext.test(name)) yield p;
  }
}

function isClientFile(content) {
  const head = content.slice(0, 800);
  return /^\s*["']use client["'];/m.test(head);
}

const violations = [];

for (const root of roots) {
  for (const file of walk(join(process.cwd(), root))) {
    const content = readFileSync(file, "utf8");
    if (!isClientFile(content)) continue;
    const re = /process\.env\.([A-Z_][A-Z0-9_]*)/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      const key = m[1];
      if (key.startsWith("NEXT_PUBLIC_")) continue;
      violations.push({ file, key });
    }
  }
}

if (violations.length > 0) {
  console.error("Client components must not read non–NEXT_PUBLIC env keys:\n");
  for (const v of violations) {
    console.error(`  ${v.file}: ${v.key}`);
  }
  process.exit(1);
}

console.info("check-client-env: OK (no secret env keys in client boundaries).");
