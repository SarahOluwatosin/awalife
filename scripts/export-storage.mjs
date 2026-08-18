#!/usr/bin/env node
// Downloads every file in the public "media" Storage bucket, preserving folder
// structure, so it can be re-uploaded to Alibaba OSS (or any other storage).
// Uses only the anon key already in .env — the bucket is publicly readable.
//
// Usage:
//   node scripts/export-storage.mjs [output-dir]

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => {
      const [k, ...rest] = l.split('=');
      return [k.trim(), rest.join('=').trim().replace(/^"|"$/g, '')];
    })
);

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const ANON_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;
const BUCKET = 'media';
const OUT_DIR = process.argv[2] || path.join(__dirname, '..', '..', 'storage-export');

const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, 'Content-Type': 'application/json' };

async function listFolder(prefix) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ prefix, limit: 1000, sortBy: { column: 'name', order: 'asc' } }),
  });
  if (!res.ok) throw new Error(`list ${prefix}: ${res.status} ${await res.text()}`);
  return res.json();
}

let fileCount = 0;
let manifest = [];

async function walk(prefix) {
  const entries = await listFolder(prefix);
  for (const entry of entries) {
    const entryPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.id === null) {
      // folder
      await walk(entryPath);
    } else {
      const url = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${entryPath}`;
      const localPath = path.join(OUT_DIR, entryPath);
      mkdirSync(path.dirname(localPath), { recursive: true });
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`  FAILED ${entryPath}: ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      writeFileSync(localPath, buf);
      manifest.push({ path: entryPath, bytes: buf.length, publicUrl: url });
      fileCount++;
      if (fileCount % 20 === 0) console.log(`  ...${fileCount} files so far`);
    }
  }
}

async function main() {
  console.log(`Downloading bucket "${BUCKET}" from ${SUPABASE_URL} -> ${OUT_DIR}\n`);
  mkdirSync(OUT_DIR, { recursive: true });
  await walk('');
  writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${fileCount} files downloaded.`);
  console.log(`_manifest.json lists each file's original public URL — use it to`);
  console.log(`find/replace old Supabase storage URLs with new Alibaba OSS URLs`);
  console.log(`in the imported database rows after re-uploading.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
