
-- Table for carousel images per application page
CREATE TABLE public.application_carousel_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL, -- e.g. 'blood', 'feces', 'urine', 'pleural-effusion', 'body-fluids', 'exotic-animals'
  image_url TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.application_carousel_images ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read carousel images"
ON public.application_carousel_images
FOR SELECT
USING (true);

-- Admin insert
CREATE POLICY "Admins can insert carousel images"
ON public.application_carousel_images
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update
CREATE POLICY "Admins can update carousel images"
ON public.application_carousel_images
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete
CREATE POLICY "Admins can delete carousel images"
ON public.application_carousel_images
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for fast page lookups
CREATE INDEX idx_carousel_images_page_key ON public.application_carousel_images(page_key);

-- Trigger for updated_at
CREATE TRIGGER update_carousel_images_updated_at
BEFORE UPDATE ON public.application_carousel_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
