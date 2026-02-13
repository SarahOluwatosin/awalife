

# Replace All Website Images with High-Resolution Versions

## Overview

The website currently uses **24 image assets** in `src/assets/` referenced across **23+ components**. The best approach is to upload high-res images to cloud storage (the `media` bucket already exists) and serve them with proper optimization, rather than bundling large files into the app build.

## Why Cloud Storage Over Local Assets

Bundling heavy high-res images into `src/assets/` causes:
- **Bloated build size** -- Vite bundles all imported assets, increasing initial load time significantly
- **No CDN caching** -- local assets are re-downloaded on every deploy
- **No responsive serving** -- every device downloads the same oversized file

Using the existing `media` storage bucket gives you CDN delivery, caching, and the ability to swap images without redeploying.

## Implementation Steps

### Step 1: Upload High-Res Images to Cloud Storage

Create a helper page or use the admin panel to upload all replacement images to the `media` bucket under an `assets/` folder. Each file would get a public URL like:
```
https://<project>.supabase.co/storage/v1/object/public/media/assets/hero-diagnostic-lab.jpg
```

### Step 2: Create a Centralized Image Map

Create `src/lib/images.ts` -- a single file mapping all asset keys to their storage URLs. This makes future swaps trivial (change one URL, not 23 files).

```typescript
const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/assets`;

export const images = {
  heroLab: `${STORAGE_BASE}/hero-diagnostic-lab.jpg`,
  ai100vet: `${STORAGE_BASE}/ai-100vet.png`,
  ai100vetElite: `${STORAGE_BASE}/ai-100vet-elite.png`,
  dm03Microscope: `${STORAGE_BASE}/dm03-microscope.png`,
  // ... all 24 images
} as const;
```

### Step 3: Update All Component Imports

Replace local asset imports with the centralized map across all 23 files:

```typescript
// Before
import heroBg from '@/assets/hero-diagnostic-lab.jpg';

// After
import { images } from '@/lib/images';
// then use images.heroLab
```

**Files to update:**
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/WhyUsSection.tsx`
- `src/components/sections/ProductsSection.tsx`
- `src/components/sections/GlobalPartnersSection.tsx`
- `src/components/layout/Header.tsx` (logo)
- `src/pages/ProductDetail.tsx`
- `src/pages/landing/EmeraldLanding.tsx`
- `src/pages/landing/ModernLanding.tsx`
- `src/pages/landing/MedTechLanding.tsx`
- `src/pages/landing/FizensLanding.tsx`
- `src/pages/landing/HealthSyncLanding.tsx`
- `src/pages/solutions/PetClinics.tsx`
- `src/pages/solutions/Distributors.tsx`
- `src/pages/applications/BloodAnalysis.tsx`
- `src/pages/applications/UrineAnalysis.tsx`
- `src/pages/applications/FecesAnalysis.tsx`
- `src/pages/applications/BodyFluids.tsx`
- `src/pages/applications/PleuralEffusion.tsx`
- `src/pages/applications/ExoticAnimals.tsx`
- And remaining files referencing assets

### Step 4: Add Performance Safeguards

Since images will be high-res, add loading optimizations:

- **Hero/above-fold images**: Keep `fetchPriority="high"` and `loading="eager"`
- **All other images**: Use `loading="lazy"` and `decoding="async"` (most already do)
- **Explicit dimensions**: Keep `width`/`height` attributes to prevent layout shift

### Step 5: Clean Up Old Assets

After verifying everything works, remove the old files from `src/assets/` (keeping only the favicon and logo if needed for offline/fallback).

## What You Need To Do

You will need to **provide the high-resolution replacement images**. You can:
1. Upload them directly through chat (recommended for a few at a time)
2. Or provide URLs to the source images

Once images are provided, they will be uploaded to the `media` storage bucket and the code will be updated to reference them.

## Technical Summary

| Aspect | Current | After |
|---|---|---|
| Storage | Bundled in `src/assets/` | Cloud storage CDN |
| Image swap | Edit code, redeploy | Change URL in one file |
| Build size | Heavy | Minimal |
| Caching | Per-deploy | Long-lived CDN cache |
| Files changed | -- | ~20 components + 1 new `images.ts` |

