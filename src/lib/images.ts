const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/assets`;

export const images = {
  // Hero & backgrounds
  heroDiagnosticLab: `${STORAGE_BASE}/hero-diagnostic-lab.jpg`,
  heroBg: `${STORAGE_BASE}/hero-bg.jpg`,
  heroMedtech: `${STORAGE_BASE}/hero-medtech.png`,

  // Logo
  awalifeLogo: `${STORAGE_BASE}/awalife-logo.png`,

  // Analyzers
  ai100vet: `${STORAGE_BASE}/ai-100vet.png`,
  ai100vetElite: `${STORAGE_BASE}/ai-100vet-elite.png`,
  ai100vetNew: `${STORAGE_BASE}/ai-100vet-new.png`,
  ai80vet: `${STORAGE_BASE}/ai-80vet.png`,
  awalifeAnalyzerHero: `${STORAGE_BASE}/awalife-analyzer-hero.jpg`,
  awalifeAnalyzerProducts: `${STORAGE_BASE}/awalife-analyzer-products.png`,

  // Microscope & workstation
  dm03Microscope: `${STORAGE_BASE}/dm03-microscope.png`,
  dm03Medtech: `${STORAGE_BASE}/dm03-medtech.png`,
  digitalMicroscope: `${STORAGE_BASE}/digital-microscope.png`,
  microscopeStation: `${STORAGE_BASE}/microscope-station.png`,

  // Species
  speciesCanineFeline: `${STORAGE_BASE}/species-canine-feline.jpg`,
  speciesExoticPets: `${STORAGE_BASE}/species-exotic-pets.jpg`,
  speciesSmallMammals: `${STORAGE_BASE}/species-small-mammals.jpg`,

  // Products
  reagents: `${STORAGE_BASE}/reagents.png`,
  emeraldHeroProduct: `${STORAGE_BASE}/emerald-hero-product.png`,
  awalHero: `${STORAGE_BASE}/awal-hero.webp`,
} as const;
