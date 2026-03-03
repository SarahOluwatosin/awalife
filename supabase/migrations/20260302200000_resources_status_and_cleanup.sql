-- Add status column to resources table
ALTER TABLE public.resources
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
  CHECK (status IN ('published', 'draft'));

-- Remove about_section rows from home page CMS
-- (AboutSection component is not rendered on the homepage)
DELETE FROM public.page_content
WHERE page = 'home' AND section = 'about_section';
