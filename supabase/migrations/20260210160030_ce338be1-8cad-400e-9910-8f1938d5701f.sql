
-- News articles table
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT NOT NULL DEFAULT 'Exhibition',
  location TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Resources table
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'how-to',
  product_id TEXT NOT NULL DEFAULT 'all',
  media_type TEXT NOT NULL DEFAULT 'link',
  media_url TEXT NOT NULL DEFAULT '',
  media_name TEXT NOT NULL DEFAULT '',
  media_mime TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- FAQ items table
CREATE TABLE public.faq_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read news" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Public read faq" ON public.faq_items FOR SELECT USING (true);

-- Open write for now (to be secured with auth later)
CREATE POLICY "Allow insert news" ON public.news_articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update news" ON public.news_articles FOR UPDATE USING (true);
CREATE POLICY "Allow delete news" ON public.news_articles FOR DELETE USING (true);

CREATE POLICY "Allow insert resources" ON public.resources FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update resources" ON public.resources FOR UPDATE USING (true);
CREATE POLICY "Allow delete resources" ON public.resources FOR DELETE USING (true);

CREATE POLICY "Allow insert faq" ON public.faq_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update faq" ON public.faq_items FOR UPDATE USING (true);
CREATE POLICY "Allow delete faq" ON public.faq_items FOR DELETE USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON public.news_articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON public.faq_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
