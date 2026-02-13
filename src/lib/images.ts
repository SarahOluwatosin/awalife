const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media/assets`;

export type ImageAssetConfig = {
  key: string;
  label: string;
  category: string;
  fileName: string;
};

export const IMAGE_ASSET_CONFIG: ImageAssetConfig[] = [
  // Hero & Backgrounds
  { key: 'heroDiagnosticLab', label: 'Hero - Diagnostic Lab', category: 'Hero & Backgrounds', fileName: 'hero-diagnostic-lab.jpg' },
  { key: 'heroBg', label: 'Hero - Background', category: 'Hero & Backgrounds', fileName: 'hero-bg.jpg' },
  { key: 'heroMedtech', label: 'Hero - Medtech', category: 'Hero & Backgrounds', fileName: 'hero-medtech.png' },
  // Logo
  { key: 'awalifeLogo', label: 'AWALIFE Logo', category: 'Logo', fileName: 'awalife-logo.png' },
  // Analyzers
  { key: 'ai100vet', label: 'AI-100 VET', category: 'Analyzers', fileName: 'ai-100vet.png' },
  { key: 'ai100vetElite', label: 'AI-100 VET Elite', category: 'Analyzers', fileName: 'ai-100vet-elite.png' },
  { key: 'ai100vetNew', label: 'AI-100 VET (New)', category: 'Analyzers', fileName: 'ai-100vet-new.png' },
  { key: 'ai80vet', label: 'AI-80 VET', category: 'Analyzers', fileName: 'ai-80vet.png' },
  { key: 'awalifeAnalyzerHero', label: 'Analyzer Hero', category: 'Analyzers', fileName: 'awalife-analyzer-hero.jpg' },
  { key: 'awalifeAnalyzerProducts', label: 'Analyzer Products', category: 'Analyzers', fileName: 'awalife-analyzer-products.png' },
  // Microscope & Workstation
  { key: 'dm03Microscope', label: 'DM03 Microscope', category: 'Microscopes', fileName: 'dm03-microscope.png' },
  { key: 'dm03Medtech', label: 'DM03 Medtech', category: 'Microscopes', fileName: 'dm03-medtech.png' },
  { key: 'digitalMicroscope', label: 'Digital Microscope', category: 'Microscopes', fileName: 'digital-microscope.png' },
  { key: 'microscopeStation', label: 'Microscope Station', category: 'Microscopes', fileName: 'microscope-station.png' },
  // Species
  { key: 'speciesCanineFeline', label: 'Canine & Feline', category: 'Species', fileName: 'species-canine-feline.jpg' },
  { key: 'speciesExoticPets', label: 'Exotic Pets', category: 'Species', fileName: 'species-exotic-pets.jpg' },
  { key: 'speciesSmallMammals', label: 'Small Mammals', category: 'Species', fileName: 'species-small-mammals.jpg' },
  // Products
  { key: 'reagents', label: 'Reagents', category: 'Products', fileName: 'reagents.png' },
  { key: 'emeraldHeroProduct', label: 'Emerald Hero Product', category: 'Products', fileName: 'emerald-hero-product.png' },
  { key: 'awalHero', label: 'AWAL Hero', category: 'Products', fileName: 'awal-hero.webp' },
];

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
