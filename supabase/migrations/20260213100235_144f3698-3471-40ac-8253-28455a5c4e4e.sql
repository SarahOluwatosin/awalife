
-- Create site_images table for dynamic image management
CREATE TABLE public.site_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Uncategorized',
  file_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Anyone can read site images (public website needs them)
CREATE POLICY "Site images are publicly readable"
  ON public.site_images FOR SELECT
  USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert site images"
  ON public.site_images FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update site images"
  ON public.site_images FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete site images"
  ON public.site_images FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_site_images_updated_at
  BEFORE UPDATE ON public.site_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with existing image assets (categorized by page)
INSERT INTO public.site_images (key, label, category, file_name) VALUES
  ('heroDiagnosticLab', 'Hero - Diagnostic Lab', 'Home', 'hero-diagnostic-lab.jpg'),
  ('heroBg', 'Hero - Background', 'Home', 'hero-bg.jpg'),
  ('heroMedtech', 'Hero - Medtech', 'Home', 'hero-medtech.png'),
  ('awalifeLogo', 'AWALIFE Logo', 'Logo', 'awalife-logo.png'),
  ('ai100vet', 'AI-100 VET', 'Products', 'ai-100vet.png'),
  ('ai100vetElite', 'AI-100 VET Elite', 'Products', 'ai-100vet-elite.png'),
  ('ai100vetNew', 'AI-100 VET (New)', 'Products', 'ai-100vet-new.png'),
  ('ai80vet', 'AI-80 VET', 'Products', 'ai-80vet.png'),
  ('awalifeAnalyzerHero', 'Analyzer Hero', 'Products', 'awalife-analyzer-hero.jpg'),
  ('awalifeAnalyzerProducts', 'Analyzer Products', 'Products', 'awalife-analyzer-products.png'),
  ('dm03Microscope', 'DM03 Microscope', 'Products', 'dm03-microscope.png'),
  ('dm03Medtech', 'DM03 Medtech', 'Products', 'dm03-medtech.png'),
  ('digitalMicroscope', 'Digital Microscope', 'Products', 'digital-microscope.png'),
  ('microscopeStation', 'Microscope Station', 'Products', 'microscope-station.png'),
  ('speciesCanineFeline', 'Canine & Feline', 'Applications', 'species-canine-feline.jpg'),
  ('speciesExoticPets', 'Exotic Pets', 'Applications', 'species-exotic-pets.jpg'),
  ('speciesSmallMammals', 'Small Mammals', 'Applications', 'species-small-mammals.jpg'),
  ('reagents', 'Reagents', 'Products', 'reagents.png'),
  ('emeraldHeroProduct', 'Emerald Hero Product', 'Products', 'emerald-hero-product.png'),
  ('awalHero', 'AWAL Hero', 'About', 'awal-hero.webp');
