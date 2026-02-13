
-- Store media overrides: when an image slot should display a video instead
CREATE TABLE public.site_media_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  storage_path TEXT NOT NULL UNIQUE,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video_upload', 'video_embed')),
  media_url TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_media_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media overrides are publicly readable"
ON public.site_media_overrides FOR SELECT
USING (true);

CREATE POLICY "Admins can insert media overrides"
ON public.site_media_overrides FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update media overrides"
ON public.site_media_overrides FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete media overrides"
ON public.site_media_overrides FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_site_media_overrides_updated_at
BEFORE UPDATE ON public.site_media_overrides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
