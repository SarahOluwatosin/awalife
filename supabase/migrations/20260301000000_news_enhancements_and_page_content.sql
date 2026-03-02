-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Enhance news_articles with publishing, SEO, and sorting fields
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.news_articles
  ADD COLUMN IF NOT EXISTS status       TEXT NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS slug         TEXT,
  ADD COLUMN IF NOT EXISTS meta_title   TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS meta_desc    TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS sort_order   INT  NOT NULL DEFAULT 0;

-- Unique slug constraint (allow nulls, only enforce uniqueness on non-null values)
CREATE UNIQUE INDEX IF NOT EXISTS news_articles_slug_unique
  ON public.news_articles (slug)
  WHERE slug IS NOT NULL AND slug <> '';

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Page Content table — editable text for every page section
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_content (
  id         UUID                     NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page       TEXT                     NOT NULL,   -- e.g. 'home', 'about', 'contact'
  section    TEXT                     NOT NULL,   -- e.g. 'hero', 'cta'
  key        TEXT                     NOT NULL,   -- e.g. 'title', 'subtitle'
  label      TEXT                     NOT NULL DEFAULT '',  -- human-readable name shown in admin
  value      TEXT                     NOT NULL DEFAULT '',
  type       TEXT                     NOT NULL DEFAULT 'text',  -- 'text' | 'richtext' | 'url'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (page, section, key)
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read page_content"   ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Admin insert page_content"  ON public.page_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin update page_content"  ON public.page_content FOR UPDATE USING (true);
CREATE POLICY "Admin delete page_content"  ON public.page_content FOR DELETE USING (true);

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. Seed default page content (current hardcoded text as starting values)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.page_content (page, section, key, label, value, type) VALUES

-- HOME
('home', 'hero',   'badge',          'Hero Badge',           'AI-Powered Veterinary Diagnostics',                                  'text'),
('home', 'hero',   'title_line1',    'Hero Title Line 1',    'Advanced Morphology',                                                'text'),
('home', 'hero',   'title_line2',    'Hero Title Line 2',    'Intelligence for Veterinary Care',                                   'text'),
('home', 'hero',   'subtitle',       'Hero Subtitle',        'Awalife combines precision imaging with AI-driven analysis to help veterinary teams standardize workflows, document findings clearly, and deliver consistent diagnostic value — across blood, urine, feces, and body fluids.',  'text'),
('home', 'hero',   'cta_primary',    'Primary CTA Text',     'Explore Products',                                                   'text'),
('home', 'hero',   'cta_secondary',  'Secondary CTA Text',   'Contact Us',                                                         'text'),

('home', 'why_us', 'badge',          'Why Us Badge',         'Why Choose Awalife',                                                 'text'),
('home', 'why_us', 'title',          'Why Us Title',         'Built for the Demands of Modern Veterinary Practice',                'text'),
('home', 'why_us', 'subtitle',       'Why Us Subtitle',      'From busy mixed-practice clinics to specialist referral centres, our platform adapts to your workflow.',  'text'),

('home', 'cta',    'title',          'CTA Section Title',    'Ready to Standardize Your Diagnostic Workflow?',                    'text'),
('home', 'cta',    'subtitle',       'CTA Subtitle',         'Join thousands of veterinary professionals using Awalife to deliver consistent, review-ready morphology results.',  'text'),
('home', 'cta',    'button_text',    'CTA Button Text',      'Get in Touch',                                                       'text'),

-- ABOUT
('about', 'hero',   'title',         'Page Hero Title',      'About Awalife',                                                      'text'),
('about', 'hero',   'subtitle',      'Page Hero Subtitle',   'Pioneering AI-powered morphology diagnostics',                       'text'),

('about', 'story',  'badge',         'Story Badge',          'Our Story',                                                          'text'),
('about', 'story',  'title',         'Story Title',          'Pioneering AI-Powered Morphology Diagnostics',                       'text'),
('about', 'story',  'body',          'Story Body',           'Awalife is a dedicated innovator in AI-powered morphology for veterinary diagnostics, with a long-term focus on formed element analysis. By pairing high-quality microscopy imaging with AI-assisted morphology recognition, we help clinics standardize workflows and document findings with clarity — through review-ready reports with images and counts across blood, urine, feces, and body fluids.',  'text'),

('about', 'global', 'badge',         'Global Section Badge', 'Global Reach',                                                       'text'),
('about', 'global', 'title',         'Global Section Title', 'Scaling Globally Through Partners Who Deliver Locally',              'text'),
('about', 'global', 'body',          'Global Section Body',  'From product design to service processes, Awalife is built for international deployment. With standardized workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams deliver consistent clinical value across regions and practice settings.',  'text'),

-- CONTACT
('contact', 'hero',  'badge',         'Hero Badge',           'Get in Touch',                                                       'text'),
('contact', 'hero',  'title',         'Hero Title',           'Contact Us',                                                         'text'),
('contact', 'hero',  'description',   'Hero Description',     'If you''re interested in learning more about Awalife''s products or exploring potential business opportunities, feel free to reach out and we''ll respond as soon as possible.',  'text'),
('contact', 'hero',  'support_text',  'Support Text',         'Our dedicated customer support team is always ready to assist you:',  'text'),

('contact', 'form',  'title',         'Form Title',           'Interested in Our Products?',                                        'text'),
('contact', 'form',  'subtitle',      'Form Subtitle',        'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.',  'text'),
('contact', 'form',  'submit_label',  'Submit Button Text',   'Submit',                                                             'text'),

-- RESOURCES
('resources', 'hero', 'badge',        'Hero Badge',           'Explore Resources',                                                  'text'),
('resources', 'hero', 'title',        'Hero Title',           'Welcome to Resource Center',                                        'text'),
('resources', 'hero', 'description',  'Hero Description',     'Explore case studies, videos, white papers, and sample reports designed to help you evaluate and standardize morphology workflows — across blood, urine, feces, and fluids.',  'text'),

-- NEWS
('news', 'hero',  'badge',            'Hero Badge',           'Get Updates',                                                        'text'),
('news', 'hero',  'title',            'Hero Title',           'News Center',                                                        'text'),
('news', 'hero',  'description',      'Hero Description',     'Explore company updates, product announcements, and industry events to stay informed on Awalife''s latest milestones and innovations.',  'text'),

-- PRODUCTS
('products', 'hero',  'badge',        'Hero Badge',           'Our Product Line',                                                   'text'),
('products', 'hero',  'title',        'Hero Title',           'AI-Powered Veterinary Analyzers',                                    'text'),
('products', 'hero',  'subtitle',     'Hero Subtitle',        'Precision imaging meets intelligent morphology recognition.',        'text'),

-- FOOTER
('footer', 'tagline', 'text',         'Footer Tagline',       'Advancing veterinary care through intelligent diagnostics.',         'text'),
('footer', 'address', 'line1',        'Address Line 1',       'Shenzhen Anlv Medical Technology Co., Ltd',                          'text'),
('footer', 'address', 'line2',        'Address Line 2',       'Shenzhen, China',                                                    'text'),
('footer', 'address', 'email',        'Contact Email',        'info@awalife.com.cn',                                                'text')

ON CONFLICT (page, section, key) DO NOTHING;
