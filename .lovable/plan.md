

# Inline Image Replacement for Admins

## Overview
When an admin is signed in and browsing the public site, images will show an edit overlay on hover. Clicking it opens a dialog to upload a replacement file directly -- no need to visit the admin panel.

## How It Works

1. A global `AdminImageOverlay` component is added to the `Layout`. It listens for mouse hover on any `<img>` element whose `src` points to the cloud storage base URL.
2. On hover, a small "Replace" button appears over the image corner.
3. Clicking it opens a dialog with a file picker. The admin selects a new file, which overwrites the existing storage path using `uploadAndReplace`.
4. The image on the page refreshes immediately with a cache-busting timestamp.

This approach avoids modifying every component that uses images -- it works globally by detecting storage-hosted images in the DOM.

## Implementation Steps

### 1. Create `AdminImageOverlay` component
**New file: `src/components/admin/AdminImageOverlay.tsx`**

- Uses `useAuth()` to check if user is admin; renders nothing if not
- Attaches a global `mouseover` event listener on the document
- When hovering an `<img>` with a `src` matching the storage base URL (`/storage/v1/object/public/media/assets/`), shows a floating "Replace" button positioned over the image
- Extracts the file path from the image `src` to know which storage file to replace
- On click, opens a small dialog/popover with:
  - File upload input (accept `image/*`)
  - Upload progress indicator
  - Confirmation toast on success
- After upload, updates the `<img>` element's `src` with a cache-busting param so it refreshes instantly

### 2. Add to Layout
**Edit: `src/components/layout/Layout.tsx`**

- Import and render `<AdminImageOverlay />` inside the Layout so it's active on every page

### 3. Reuse existing `uploadAndReplace` from `src/lib/storage.ts`
No changes needed -- the existing function already handles `upsert: true` and cache-busting URLs.

## Technical Details

- The overlay uses `document.addEventListener('mouseover', ...)` with event delegation to avoid per-image bindings
- The floating button is rendered via a React portal positioned using `getBoundingClientRect()` of the hovered image
- Only images whose `src` contains the storage base path get the overlay -- other images (external URLs, SVGs, etc.) are ignored
- The component cleans up its event listener on unmount
- Uses `position: fixed` for the overlay button so it works regardless of scroll position

## Files Changed

| File | Change |
|---|---|
| `src/components/admin/AdminImageOverlay.tsx` | New -- global hover overlay for admin image replacement |
| `src/components/layout/Layout.tsx` | Add `<AdminImageOverlay />` |

