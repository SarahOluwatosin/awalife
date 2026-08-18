#!/usr/bin/env node
// One-off data export for migrating off Lovable Cloud onto self-hosted infrastructure.
// Uses only the anon key already in .env — no Supabase dashboard/service-role access needed.
//
// Usage:
//   node scripts/export-db.mjs                          # public tables only
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/export-db.mjs   # also pulls contact_submissions

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

const OUT_DIR = process.env.EXPORT_DIR || path.join(__dirname, '..', '..', 'db-export');
mkdirSync(OUT_DIR, { recursive: true });

const PUBLIC_TABLES = [
  'page_content',
  'news_articles',
  'resources',
  'faq_items',
  'site_images',
  'site_videos',
  'site_media_overrides',
  'application_carousel_images',
];

async function fetchAllRows(table, headers) {
  const rows = [];
  const pageSize = 1000;
  let from = 0;
  for (;;) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.asc.nullsfirst`, {
      headers: {
        ...headers,
        Range: `${from}-${from + pageSize - 1}`,
        Prefer: 'count=exact',
      },
    });
    if (!res.ok) {
      // fall back without order-by in case the table has no created_at column
      const res2 = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
        headers: { ...headers, Range: `${from}-${from + pageSize - 1}` },
      });
      if (!res2.ok) throw new Error(`${table}: ${res2.status} ${await res2.text()}`);
      const batch = await res2.json();
      rows.push(...batch);
      if (batch.length < pageSize) break;
      from += pageSize;
      continue;
    }
    const batch = await res.json();
    rows.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return rows;
}

async function getAdminJWT(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Admin login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

async function main() {
  const anonHeaders = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };

  console.log(`Exporting from ${SUPABASE_URL} -> ${OUT_DIR}\n`);

  for (const table of PUBLIC_TABLES) {
    try {
      const rows = await fetchAllRows(table, anonHeaders);
      writeFileSync(path.join(OUT_DIR, `${table}.json`), JSON.stringify(rows, null, 2));
      console.log(`  ${table}: ${rows.length} rows`);
    } catch (err) {
      console.error(`  ${table}: FAILED — ${err.message}`);
    }
  }

  if (env.ADMIN_EMAIL || process.env.ADMIN_EMAIL) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      console.log('\nSkipping contact_submissions — set both ADMIN_EMAIL and ADMIN_PASSWORD to include it.');
    } else {
      try {
        const jwt = await getAdminJWT(email, password);
        const adminHeaders = { apikey: ANON_KEY, Authorization: `Bearer ${jwt}` };
        const rows = await fetchAllRows('contact_submissions', adminHeaders);
        writeFileSync(path.join(OUT_DIR, 'contact_submissions.json'), JSON.stringify(rows, null, 2));
        console.log(`  contact_submissions: ${rows.length} rows`);
      } catch (err) {
        console.error(`  contact_submissions: FAILED — ${err.message}`);
      }
    }
  } else {
    console.log('\nSkipping contact_submissions (contains customer PII, needs admin auth) —');
    console.log('re-run with ADMIN_EMAIL and ADMIN_PASSWORD env vars set to include it.');
  }

  console.log('\nDone. Note: this does NOT export Supabase Storage files (images/media) or Auth users —');
  console.log('those need a separate step. See the migration runbook for details.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
