
-- Create site_videos table for video uploads and embed URLs
CREATE TABLE public.site_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Uncategorized',
  video_type TEXT NOT NULL DEFAULT 'embed' CHECK (video_type IN ('embed', 'upload')),
  video_url TEXT NOT NULL DEFAULT '',
  file_name TEXT NOT NULL DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_videos ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Site videos are publicly readable"
ON public.site_videos FOR SELECT
USING (true);

-- Admin insert
CREATE POLICY "Admins can insert site videos"
ON public.site_videos FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update
CREATE POLICY "Admins can update site videos"
ON public.site_videos FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete
CREATE POLICY "Admins can delete site videos"
ON public.site_videos FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Updated_at trigger
CREATE TRIGGER update_site_videos_updated_at
BEFORE UPDATE ON public.site_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
