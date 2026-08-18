# Migrating the Awalife Backend to Alibaba Cloud

This is a step-by-step guide for moving the site's database, storage, and auth off Lovable Cloud and onto your own Alibaba Cloud account. It's written so your team can execute every step independently — no access to the Lovable project is required on your end.

You will receive, alongside this document:
- `db-export/` — a full JSON export of every content table (site copy, resources, news, images metadata, etc.)
- `db-export/import.sql` — the same data as ready-to-run SQL `INSERT` statements
- `storage-export/` — every file currently in the site's media library, with a `_manifest.json` mapping each file to its current URL
- `supabase/migrations/*.sql` — the full schema history (already in the GitHub repo you have access to)

## What's being moved

| Piece | Currently | Moving to |
|---|---|---|
| Database (content, resources, news, contact form leads) | Lovable Cloud (Postgres) | ApsaraDB for PostgreSQL |
| API layer the frontend talks to | Lovable Cloud (PostgREST-compatible) | Self-hosted PostgREST + GoTrue on your ECS |
| Media files (images) | Lovable Cloud Storage | Alibaba OSS |
| Admin login | Lovable Cloud Auth | Self-hosted GoTrue (same tech, your infrastructure) |

The frontend code (`@/lib/db`, `@supabase/supabase-js`) doesn't need to change — PostgREST and GoTrue are the same open-source components Supabase/Lovable Cloud run internally, so pointing the app at your own instance of them is a config change, not a rewrite.

## Step 1 — Provision ApsaraDB for PostgreSQL

- Create an ApsaraDB for PostgreSQL instance (PostgreSQL 15+).
- Region: your choice — pick based on where your users/clinics are and any data residency requirement driving this move.
- Enable the `pgcrypto` and `uuid-ossp` extensions (used by `gen_random_uuid()` in the schema).
- Note the connection details (host, port, database name, admin user/password) — you'll need these for the next two steps, but they don't need to leave your team.

## Step 2 — Apply the schema

Run every file in `supabase/migrations/` **in filename order** (they're timestamped, so a simple sort works) against the new database:

```bash
for f in supabase/migrations/*.sql; do
  psql "$DATABASE_URL" -f "$f"
done
```

Where `$DATABASE_URL` is something like `postgresql://user:password@host:5432/dbname`.

## Step 3 — Import the data

```bash
psql "$DATABASE_URL" -f db-export/import.sql
```

This inserts all rows exported from the current tables (`page_content`, `news_articles`, `resources`, `faq_items`, `site_images`, `site_videos`, `site_media_overrides`, `application_carousel_images`, and `contact_submissions` if included). It uses `ON CONFLICT DO NOTHING` so it's safe to re-run.

## Step 4 — Migrate media files to OSS

1. Create an OSS bucket and make it publicly readable (matching the current setup — the media bucket is public today).
2. Upload every file from `storage-export/` to the new bucket, preserving the folder structure (`assets/`, `brochures/`, `carousel/`, `news/`, `news-content/`).
3. Using `storage-export/_manifest.json` (maps each file to its old Supabase Storage URL) and your new OSS bucket URL, run a find/replace across the database to update stored image URLs:

```sql
UPDATE public.page_content SET value = replace(value, '<old-supabase-storage-base-url>', '<new-oss-base-url>') WHERE value LIKE '%<old-supabase-storage-base-url>%';
-- repeat for: application_carousel_images.image_url, site_images.url (or equivalent column),
-- news_articles.image_url, resources image columns, etc. — check each table's exported JSON
-- for which columns actually contain storage URLs.
```

## Step 5 — Stand up PostgREST + GoTrue on your ECS

Deploy the open-source Supabase stack (just the API/auth pieces, pointed at your ApsaraDB instance instead of a bundled Postgres container) via Docker Compose. Reference: [Supabase self-hosting docs](https://supabase.com/docs/guides/self-hosting/docker) — use their `docker-compose.yml` as a base, remove the `db` service, and point `DATABASE_URL`/`POSTGRES_*` env vars at your ApsaraDB instance instead.

At minimum you need:
- `postgrest` — serves the REST API the frontend calls
- `gotrue` (Auth) — handles admin login
- `storage-api` (optional, only if you want the Storage REST API rather than serving files directly from OSS via public URLs)

## Step 6 — Recreate the admin account

Auth users are not part of the data export (Lovable Cloud's Auth password hashes can't be extracted via the API). Create a new admin user directly through GoTrue's admin API or signup endpoint, then insert their role:

```sql
INSERT INTO public.user_roles (user_id, role) VALUES ('<new-user-uuid>', 'admin');
```

## Step 7 — Point the app at the new backend

Update the deployment's environment variables (`docker-compose.yml` / wherever the frontend container is built):

```
VITE_SUPABASE_URL=https://<your-new-postgrest-gotrue-endpoint>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-new-anon-key>
VITE_SUPABASE_PROJECT_ID=<anything, not used for self-hosted>
```

Rebuild and redeploy (`docker compose up -d --build`).

## Step 8 — Verify

- Load the live site and confirm content renders (pulls from the new database).
- Log into `/admin` with the recreated admin account.
- Submit a test contact form entry and confirm it appears in `/admin/contacts`.
- Spot-check a few images load correctly from the new OSS URLs.
- Once confirmed, the Lovable project can be safely decommissioned.
