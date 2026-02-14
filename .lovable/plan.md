

# Bring the Site to Life: Animated Hero, Particles, Living Gradients, and Brighter Colors

This plan addresses three client feedback points: (1) make the site feel alive with motion (particles, animated gradients), (2) animate the homepage hero, and (3) brighten the color scheme.

---

## 1. Floating Particle System (Hero Background)

Create a new `FloatingParticles` component using framer-motion that renders 20-30 small translucent circles (emerald/teal tones) that drift slowly across the hero area. Each particle will have randomized size (2-6px), position, opacity, and animation duration for an organic feel. This is lightweight (no canvas/WebGL needed) and uses CSS + framer-motion `animate` with `repeat: Infinity`.

**File:** `src/components/animations/FloatingParticles.tsx`

---

## 2. Animated Gradient Background

Create an `AnimatedGradientBg` component that renders a full-section div with a multi-stop radial/linear gradient that shifts position over time using framer-motion's `animate` on `backgroundPosition`. This gives the hero (and optionally CTA section) a living, breathing gradient wash.

**File:** `src/components/animations/AnimatedGradientBg.tsx`

---

## 3. Hero Section Overhaul

Update `src/components/sections/HeroSection.tsx`:
- Replace static CSS `animate-fade-in` classes with framer-motion `motion.div` variants for staggered entry (pill badge, then h1, then paragraph, then buttons, then metrics)
- Add the `FloatingParticles` component behind the content
- Add `AnimatedGradientBg` as the base background layer
- Add a subtle parallax effect on the hero image using `useScroll` + `useTransform` from framer-motion (image moves at 0.85x scroll speed)
- Add a soft scale-in + slight rotation entry for the hero image container
- The decorative corner square gets a gentle floating animation

---

## 4. Brighter Color Scheme

Update `src/index.css` CSS variables for light mode:
- **Primary:** `160 65% 30%` becomes `160 70% 36%` (brighter emerald)
- **Accent:** `152 60% 42%` becomes `152 68% 48%` (more vivid green)
- **Muted foreground:** `160 10% 40%` becomes `160 12% 35%` (slightly richer)
- **Gradient primary:** Use the brighter values for more vibrant gradient text and buttons
- **Button glow:** Increase glow intensity on hover from `0.4` to `0.5`
- **Background:** Keep pure white but increase gradient-hero opacity from `0.04` to `0.07` for a subtle emerald wash

Dark mode stays mostly unchanged (already vibrant).

---

## 5. Image Containers - More Exquisite

Update image containers across the homepage sections (`WhyUsSection`, `ProductsSection`, `GlobalPartnersSection`):
- Add a subtle `hover:scale-[1.02]` with `transition-transform duration-500` on image wrappers
- Add a soft emerald glow on hover via `hover:shadow-[0_0_40px_hsl(152_60%_42%/0.15)]`
- These are small CSS additions, no layout changes

---

## 6. Section Transitions - Softer and More Alive

Update `src/pages/Index.tsx`:
- Wrap the entire page in framer-motion `MotionConfig` (already done)
- Ensure each section wrapper uses slightly staggered delays for a cascading effect on scroll

---

## 7. CTA Section Enhancement

Update `src/components/sections/CTASection.tsx`:
- Add the `AnimatedGradientBg` behind the CTA for a living background
- Wrap content in motion.div with a gentle scale-in animation on scroll

---

## Technical Details

### Files to create:
- `src/components/animations/FloatingParticles.tsx` - Pure framer-motion particle system (no dependencies needed)
- `src/components/animations/AnimatedGradientBg.tsx` - Animated gradient layer

### Files to modify:
- `src/components/sections/HeroSection.tsx` - Add particles, gradient bg, framer-motion entry animations, parallax on image
- `src/index.css` - Brighten light mode CSS variables (primary, accent, gradients)
- `src/components/sections/WhyUsSection.tsx` - Add hover glow/scale to image containers
- `src/components/sections/ProductsSection.tsx` - Add hover glow to image containers
- `src/components/sections/GlobalPartnersSection.tsx` - Add hover glow to image container
- `src/components/sections/CTASection.tsx` - Add animated gradient background
- `src/pages/Index.tsx` - Minor: ensure hero uses updated component

### No new dependencies required
Everything uses framer-motion (already installed) and CSS.

