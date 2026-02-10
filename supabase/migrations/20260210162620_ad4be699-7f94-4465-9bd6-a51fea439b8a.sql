
-- Fix: Drop restrictive SELECT policies and recreate as permissive

-- news_articles
DROP POLICY IF EXISTS "Public read news" ON public.news_articles;
CREATE POLICY "Public read news"
  ON public.news_articles FOR SELECT
  USING (true);

-- resources
DROP POLICY IF EXISTS "Public read resources" ON public.resources;
CREATE POLICY "Public read resources"
  ON public.resources FOR SELECT
  USING (true);

-- faq_items
DROP POLICY IF EXISTS "Public read faq" ON public.faq_items;
CREATE POLICY "Public read faq"
  ON public.faq_items FOR SELECT
  USING (true);

-- user_roles (also fix for admin check)
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
