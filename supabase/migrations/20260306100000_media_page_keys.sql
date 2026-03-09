-- Add page_key column to site_images and site_videos for page-based media organization
ALTER TABLE public.site_images ADD COLUMN IF NOT EXISTS page_key text NOT NULL DEFAULT 'general';
ALTER TABLE public.site_videos ADD COLUMN IF NOT EXISTS page_key text NOT NULL DEFAULT 'general';

-- Populate page_key for site_images based on existing category/label values
UPDATE public.site_images SET page_key = 'home'         WHERE key IN ('heroDiagnosticLab', 'heroBg', 'heroMedtech') OR category = 'Home';
UPDATE public.site_images SET page_key = 'ai-analyzer'  WHERE key ILIKE '%analyzer%' OR key ILIKE '%ai100%' OR key ILIKE '%ai80%' OR key ILIKE '%emerald%' OR key ILIKE '%reagent%' OR key ILIKE '%awalifeAnalyzer%';
UPDATE public.site_images SET page_key = 'dm-03'        WHERE key ILIKE '%dm03%' OR key ILIKE '%microscope%' OR key ILIKE '%digital%';
UPDATE public.site_images SET page_key = 'blood'        WHERE key ILIKE '%blood%';
UPDATE public.site_images SET page_key = 'urine'        WHERE key ILIKE '%urine%';
UPDATE public.site_images SET page_key = 'feces'        WHERE key ILIKE '%feces%' OR key ILIKE '%stool%';
UPDATE public.site_images SET page_key = 'pleural'      WHERE key ILIKE '%pleural%' OR key ILIKE '%fluid%' OR key ILIKE '%bodyflu%';
UPDATE public.site_images SET page_key = 'exotic'       WHERE key ILIKE '%exotic%' OR key ILIKE '%species%';
UPDATE public.site_images SET page_key = 'about'        WHERE key ILIKE '%about%' OR key ILIKE '%awal%' OR category = 'About';
UPDATE public.site_images SET page_key = 'news'         WHERE key ILIKE '%news%';
UPDATE public.site_images SET page_key = 'general'      WHERE category = 'Logo';

-- Populate page_key for site_videos based on existing category
UPDATE public.site_videos SET page_key = LOWER(REPLACE(category, ' ', '-')) WHERE category != 'Uncategorized';
