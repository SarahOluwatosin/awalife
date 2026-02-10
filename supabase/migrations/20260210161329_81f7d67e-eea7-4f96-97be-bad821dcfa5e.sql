
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 5. RLS on user_roles: admins can read, no public write
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 6. Restrict write policies on news_articles to admins only
DROP POLICY IF EXISTS "Allow insert news" ON public.news_articles;
DROP POLICY IF EXISTS "Allow update news" ON public.news_articles;
DROP POLICY IF EXISTS "Allow delete news" ON public.news_articles;

CREATE POLICY "Admins can insert news"
  ON public.news_articles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update news"
  ON public.news_articles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete news"
  ON public.news_articles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Restrict write policies on resources to admins only
DROP POLICY IF EXISTS "Allow insert resources" ON public.resources;
DROP POLICY IF EXISTS "Allow update resources" ON public.resources;
DROP POLICY IF EXISTS "Allow delete resources" ON public.resources;

CREATE POLICY "Admins can insert resources"
  ON public.resources FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resources"
  ON public.resources FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resources"
  ON public.resources FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Restrict write policies on faq_items to admins only
DROP POLICY IF EXISTS "Allow insert faq" ON public.faq_items;
DROP POLICY IF EXISTS "Allow update faq" ON public.faq_items;
DROP POLICY IF EXISTS "Allow delete faq" ON public.faq_items;

CREATE POLICY "Admins can insert faq"
  ON public.faq_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update faq"
  ON public.faq_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete faq"
  ON public.faq_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
