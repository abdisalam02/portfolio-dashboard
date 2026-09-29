#!/usr/bin/env node
// Scans src/ for strings that must never ship to production.
// Run via: node scripts/check-legal.mjs
// Exits non-zero if any banned pattern is found.

import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname } from "path";

const ROOT = join(process.cwd(), "src");

const BANNED = [
  { pattern: /href="#"/g, label: 'Dead link: href="#"' },
  { pattern: /lorem ipsum/gi, label: "Lorem ipsum placeholder copy" },
  { pattern: /48 hours to 1 week/gi, label: "Old turnaround claim (48 hours to 1 week)" },
  { pattern: /agencies in oslo charge/gi, label: "Unsourced agency price claim" },
  { pattern: /Bygdin gate/gi, label: "Real Oslo address in demo (Bygdin gate)" },
  { pattern: /SMS-kvittering/gi, label: "Unbuilt SMS confirmation claim" },
  { pattern: /SMS-bekreftelse/gi, label: "Unbuilt SMS confirmation claim" },
  { pattern: /Mobil for Vipps.*SMS/gi, label: "Unbuilt SMS/Vipps placeholder" },
  { pattern: /Mobil \(SMS/gi, label: "Unbuilt SMS placeholder" },
  // Only flag as error if it's rendered text, not a comment
  // (We allow TODO-VERIFY comments in source)
];

// Extensions to scan
const EXTS = new Set([".tsx", ".ts", ".js", ".jsx", ".mdx"]);

function walk(dir) {
  let files = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "node_modules") continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files = files.concat(walk(full));
    } else if (EXTS.has(extname(name))) {
      files.push(full);
    }
  }
  return files;
}

let errorCount = 0;

for (const file of walk(ROOT)) {
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");

  for (const { pattern, label } of BANNED) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip lines that are purely comments
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) continue;
      if (pattern.test(line)) {
        const rel = file.replace(process.cwd() + "/", "").replace(process.cwd() + "\\", "");
        console.error(`\n  FAIL  ${label}`);
        console.error(`        ${rel}:${i + 1}`);
        console.error(`        ${line.trim()}`);
        errorCount++;
      }
      pattern.lastIndex = 0;
    }
  }
}

if (errorCount > 0) {
  console.error(`\n${errorCount} legal issue(s) found. Fix before deploying.\n`);
  process.exit(1);
} else {
  console.log("\n  OK  check:legal — no banned strings found.\n");
}
