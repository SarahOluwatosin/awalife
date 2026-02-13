

# Add Site Images Management to Admin Panel

## Overview
Add a new "Site Images" tab to the existing admin dashboard (`/admin/resources`) that lets admins view, upload, and replace the website's static images (hero backgrounds, product photos, logos, etc.) without needing developer access.

## How It Works

The 21 images in `src/lib/images.ts` each map to a fixed file path in cloud storage (e.g., `assets/hero-diagnostic-lab.jpg`). Replacing an image means uploading a new file to the same path -- all pages automatically show the new version.

## Implementation Steps

### Step 1: Create an Image Assets Configuration

Add an `IMAGE_ASSET_CONFIG` array to `src/lib/images.ts` that describes each image with a human-readable label, its storage key, and a category for grouping in the admin UI.

```
{ key: "heroDiagnosticLab", label: "Hero - Diagnostic Lab", category: "Hero & Backgrounds", fileName: "hero-diagnostic-lab.jpg" }
```

### Step 2: Add "Site Images" Tab to ResourcesAdmin

Add a fourth tab alongside News, Resources, and FAQ:

- **Grid layout** showing all images organized by category (Hero, Analyzers, Microscopes, Species, Products)
- Each card shows:
  - Current image thumbnail
  - Image label/name
  - "Replace" button that opens a file picker
  - Upload progress indicator
- On file select, upload to `media/assets/{fileName}` with `upsert: true` (overwrite existing)
- After upload, append a cache-busting query param (`?t=timestamp`) to force the browser to reload the new version

### Step 3: Update Storage Upload Helper

Modify `src/lib/storage.ts` to add an `uploadAndReplace` function that uses `upsert: true` to overwrite existing files at the same path, instead of generating unique filenames.

### Step 4: Add Cache Busting

After a replacement upload, update a local state timestamp so the admin preview immediately shows the new image. Public visitors will see the update on next page load (CDN cache typically refreshes within minutes).

## Files Changed

| File | Change |
|---|---|
| `src/lib/images.ts` | Add `IMAGE_ASSET_CONFIG` array with labels, categories, file names |
| `src/lib/storage.ts` | Add `uploadAndReplace()` function with upsert support |
| `src/pages/ResourcesAdmin.tsx` | Add "Site Images" tab with grid of image cards and replace functionality |

## User Experience

1. Admin logs in and navigates to the admin dashboard
2. Clicks the "Site Images" tab
3. Sees all website images organized by category in a grid
4. Clicks "Replace" on any image, selects a new file
5. File uploads and overwrites the old one -- preview updates immediately
6. All public pages automatically show the new image

