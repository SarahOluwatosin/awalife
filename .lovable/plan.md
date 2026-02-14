

# Starsfield Effect: Canvas-Based Star Fly-Through Background

Replace the current simple `FloatingParticles` with a performant HTML5 Canvas-based starfield that creates the "warp speed" fly-through effect seen in the Framer Starsfield component. Stars stream outward from a central vanishing point, leaving short motion trails and twinkling as they move.

---

## What It Looks Like

Stars appear at the center of the viewport and accelerate outward toward the edges, creating a sense of forward motion through space. Each star leaves a short trail, grows slightly as it approaches, and fades in/out naturally. The color palette uses the site's emerald/teal theme colors rather than white stars.

---

## Implementation

### 1. Create `Starfield` Canvas Component

**File:** `src/components/animations/Starfield.tsx`

A new component using an HTML5 `<canvas>` element with `requestAnimationFrame` for smooth 60fps rendering. This is far more performant than rendering 100+ individual DOM nodes with framer-motion.

Each star has:
- A random starting position near the center
- A velocity vector pointing outward from center
- Increasing size as it "approaches" the viewer
- A short motion trail (2-3px line behind it)
- Emerald/teal color tones matching the site palette
- Respects `prefers-reduced-motion` (falls back to static dots)

Props:
- `starCount` (default: 150) -- number of stars
- `speed` (default: 0.5) -- base speed multiplier
- `className` -- for positioning

### 2. Update Hero Section

**File:** `src/components/sections/HeroSection.tsx`

- Replace `<FloatingParticles count={22} />` with the new `<Starfield />` component
- Keep `AnimatedGradientBg` as the base layer (starfield renders on top with transparency)
- No layout or content changes

### 3. Optionally Add to Layout (Subtle Global Version)

**File:** `src/components/layout/Layout.tsx`

- Add a very subtle, slow starfield behind the global layout (low star count ~40, low speed ~0.15, low opacity) to give the entire site a living background
- This is optional and can be toggled easily

---

## Technical Details

### Canvas Rendering Logic

```text
On each animation frame:
  1. Clear canvas with transparent fill
  2. For each star:
     a. Move star outward from center based on velocity
     b. Increase size slightly as distance from center grows
     c. Draw a short line (trail) from previous position to current
     d. If star exits viewport bounds, reset to center with new random velocity
  3. requestAnimationFrame(loop)
```

### Files to Create
- `src/components/animations/Starfield.tsx` -- Canvas-based starfield component

### Files to Modify
- `src/components/sections/HeroSection.tsx` -- Swap FloatingParticles for Starfield
- `src/components/layout/Layout.tsx` -- Add subtle global starfield (optional, low opacity)

### No New Dependencies
Pure HTML5 Canvas + React. No libraries needed.
