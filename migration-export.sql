-- =============================================================
-- FULL DATABASE MIGRATION EXPORT — Awalife Lovable Cloud
-- Generated: 2026-03-03
-- Run this on your new Supabase project via SQL Editor
-- =============================================================

-- ── 1. ENUM TYPES ──────────────────────────────────────────────
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- ── 2. FUNCTIONS ───────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ── 3. TABLES ──────────────────────────────────────────────────

-- user_roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- page_content
CREATE TABLE public.page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  page text NOT NULL,
  section text NOT NULL,
  key text NOT NULL,
  label text NOT NULL DEFAULT '',
  value text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'text'
);

-- news_articles
CREATE TABLE public.news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  sort_order integer NOT NULL DEFAULT 0,
  date date NOT NULL DEFAULT CURRENT_DATE,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Exhibition',
  location text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'published',
  slug text,
  meta_title text NOT NULL DEFAULT '',
  meta_desc text NOT NULL DEFAULT ''
);

-- resources
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  kind text NOT NULL DEFAULT 'how-to',
  product_id text NOT NULL DEFAULT 'all',
  media_type text NOT NULL DEFAULT 'link',
  media_url text NOT NULL DEFAULT '',
  media_name text NOT NULL DEFAULT '',
  media_mime text NOT NULL DEFAULT ''
);

-- faq_items
CREATE TABLE public.faq_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  question text NOT NULL,
  answer text NOT NULL
);

-- site_images
CREATE TABLE public.site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  key text NOT NULL,
  label text NOT NULL,
  category text NOT NULL DEFAULT 'Uncategorized',
  file_name text NOT NULL
);

-- site_videos
CREATE TABLE public.site_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  key text NOT NULL,
  label text NOT NULL,
  category text NOT NULL DEFAULT 'Uncategorized',
  video_type text NOT NULL DEFAULT 'embed',
  video_url text NOT NULL DEFAULT '',
  file_name text NOT NULL DEFAULT '',
  thumbnail_url text NOT NULL DEFAULT ''
);

-- site_media_overrides
CREATE TABLE public.site_media_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  storage_path text NOT NULL,
  media_type text NOT NULL DEFAULT 'image',
  media_url text NOT NULL DEFAULT '',
  thumbnail_url text NOT NULL DEFAULT ''
);

-- application_carousel_images
CREATE TABLE public.application_carousel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  page_key text NOT NULL,
  image_url text NOT NULL,
  label text NOT NULL DEFAULT ''
);

-- ── 4. ROW LEVEL SECURITY ──────────────────────────────────────

-- user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- page_content
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read page_content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Admin insert page_content" ON public.page_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin update page_content" ON public.page_content FOR UPDATE USING (true);
CREATE POLICY "Admin delete page_content" ON public.page_content FOR DELETE USING (true);

-- news_articles
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read news" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Admins can insert news" ON public.news_articles FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update news" ON public.news_articles FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete news" ON public.news_articles FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- resources
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Admins can insert resources" ON public.resources FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update resources" ON public.resources FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete resources" ON public.resources FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- faq_items
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faq" ON public.faq_items FOR SELECT USING (true);
CREATE POLICY "Admins can insert faq" ON public.faq_items FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update faq" ON public.faq_items FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete faq" ON public.faq_items FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- site_images
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site images are publicly readable" ON public.site_images FOR SELECT USING (true);
CREATE POLICY "Admins can insert site images" ON public.site_images FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site images" ON public.site_images FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site images" ON public.site_images FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- site_videos
ALTER TABLE public.site_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site videos are publicly readable" ON public.site_videos FOR SELECT USING (true);
CREATE POLICY "Admins can insert site videos" ON public.site_videos FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site videos" ON public.site_videos FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site videos" ON public.site_videos FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- site_media_overrides
ALTER TABLE public.site_media_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Media overrides are publicly readable" ON public.site_media_overrides FOR SELECT USING (true);
CREATE POLICY "Admins can insert media overrides" ON public.site_media_overrides FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media overrides" ON public.site_media_overrides FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media overrides" ON public.site_media_overrides FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- application_carousel_images
ALTER TABLE public.application_carousel_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read carousel images" ON public.application_carousel_images FOR SELECT USING (true);
CREATE POLICY "Admins can insert carousel images" ON public.application_carousel_images FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update carousel images" ON public.application_carousel_images FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete carousel images" ON public.application_carousel_images FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- ── 5. STORAGE BUCKET ──────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- ── DONE ────────────────────────────────────────────────────────
-- After running this, use pg_dump to export DATA from your old DB
-- and psql to import it into the new one.
-- =============================================================
