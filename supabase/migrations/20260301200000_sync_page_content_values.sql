-- ─────────────────────────────────────────────────────────────────────────────
-- Sync page_content DB values with the actual current website text.
-- Prior migration seeded rows with outdated/placeholder text. This migration
-- updates them to match what the components currently render, so the admin
-- "Page Text" panel shows the same text as the live website.
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.page_content (page, section, key, label, value, type) VALUES

-- ── HOME ──────────────────────────────────────────────────────────────────
-- Hero: badge + animated H1 lines + subtitle + CTAs
('home', 'hero', 'badge',         'Hero Badge',         'Pioneering AI-Powered Morphology Diagnostics', 'text'),
('home', 'hero', 'title_line1',   'Hero Title Line 1',  'Morphology Isn''t a Feature for Us,',          'text'),
('home', 'hero', 'title_line2',   'Hero Title Line 2',  'It''s the Foundation',                         'text'),
('home', 'hero', 'subtitle',      'Hero Subtitle',      'We turn cellular morphology into visible, quantifiable, and review-ready evidence, helping veterinarians diagnose with greater depth and confidence.', 'text'),
('home', 'hero', 'cta_primary',   'Primary CTA Text',   'Contact us',      'text'),
('home', 'hero', 'cta_secondary', 'Secondary CTA Text', 'Explore products', 'text'),

-- Why Us section
('home', 'why_us', 'badge',    'Why Us Badge',    'WHY AWALIFE', 'text'),
('home', 'why_us', 'title',    'Why Us Title',    'An Expandable AI Morphology Platform Grows with New Samples and Applications', 'text'),
('home', 'why_us', 'subtitle', 'Why Us Subtitle', '', 'text'),

-- Home CTA section (bottom of home page)
('home', 'cta', 'title',       'CTA Section Title', 'Ready to Standardize Your Diagnostic Workflow?',                                                          'text'),
('home', 'cta', 'subtitle',    'CTA Subtitle',      'Join thousands of veterinary professionals using Awalife to deliver consistent, review-ready morphology results.', 'text'),
('home', 'cta', 'button_text', 'CTA Button Text',   'Get in Touch', 'text'),

-- ── ABOUT ─────────────────────────────────────────────────────────────────
('about', 'hero',   'title',    'Page Hero Title',    'About Awalife',                              'text'),
('about', 'hero',   'subtitle', 'Page Hero Subtitle', 'Pioneering AI-powered morphology diagnostics', 'text'),

('about', 'story',  'badge',    'Story Badge', 'Our Story',                           'text'),
('about', 'story',  'title',    'Story Title', 'Pioneering AI-Powered Morphology Diagnostics', 'text'),
('about', 'story',  'body',     'Story Body',  'Awalife is a dedicated innovator in AI-powered morphology for veterinary diagnostics, with a long-term focus on formed element analysis. By pairing high-quality microscopy imaging with AI-assisted morphology recognition, we help clinics standardize workflows and document findings with clarity—through review-ready reports with images and counts across blood, urine, feces, and body fluids. We continue to expand this platform through ongoing innovation and updates.', 'text'),

('about', 'global', 'badge',   'Global Section Badge', 'Global Reach',                                        'text'),
('about', 'global', 'title',   'Global Section Title', 'Scaling Globally Through Partners Who Deliver Locally', 'text'),
('about', 'global', 'body',    'Global Section Body',  'From product design to service processes, Awalife is built for international deployment. With standardized workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams deliver consistent clinical value across regions and practice settings.', 'text'),

('about', 'cta',    'title',   'CTA Title', 'Interested in Our Products?',                                                                                   'text'),
('about', 'cta',    'body',    'CTA Body',  'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text'),

-- ── CONTACT ───────────────────────────────────────────────────────────────
('contact', 'hero', 'badge',        'Hero Badge',       'Get in Touch',    'text'),
('contact', 'hero', 'title',        'Hero Title',       'Contact Us',      'text'),
('contact', 'hero', 'description',  'Hero Description', 'If you''re interested in learning more about Awalife''s products or exploring potential business opportunities, feel free to reach out and we''ll respond as soon as possible.', 'text'),
('contact', 'hero', 'support_text', 'Support Text',     'Our dedicated customer support team is always ready to assist you:', 'text'),

('contact', 'form', 'title',        'Form Title',       'Interested in Our Products?',                                                                             'text'),
('contact', 'form', 'subtitle',     'Form Subtitle',    'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text'),
('contact', 'form', 'submit_label', 'Submit Button',    'Submit', 'text'),

-- ── NEWS (company news page) ──────────────────────────────────────────────
('news', 'hero', 'badge',       'Hero Badge',       'Get Updates',       'text'),
('news', 'hero', 'title',       'Hero Title',       'News Center',       'text'),
('news', 'hero', 'description', 'Hero Description', 'Explore company updates, product announcements, and industry events to stay informed on Awalife''s latest milestones and innovations.', 'text'),

-- ── RESOURCES ─────────────────────────────────────────────────────────────
('resources', 'hero', 'badge',       'Hero Badge',       'Explore Resources',    'text'),
('resources', 'hero', 'title',       'Hero Title',       'Welcome to Resource Center', 'text'),
('resources', 'hero', 'description', 'Hero Description', 'Explore case studies, videos, white papers, and sample reports designed to help you evaluate and standardize morphology workflows — across blood, urine, feces, and fluids.', 'text'),

-- ── FOOTER ────────────────────────────────────────────────────────────────
('footer', 'tagline', 'text',  'Footer Tagline', 'Awalife is a dedicated innovator in AI-powered visible morphology, building veterinary diagnostics solutions that turn what clinicians see into review-ready reports with images and counts.', 'text'),
('footer', 'address', 'line1', 'Address Line 1',  'Shenzhen Anlv Medical Technology Co., Ltd', 'text'),
('footer', 'address', 'line2', 'Address Line 2',  'Shenzhen, China',    'text'),
('footer', 'address', 'email', 'Contact Email',   'info@awalife.com.cn', 'text'),
('footer', 'address', 'phone', 'Contact Phone',   '(86) 13332902078',   'text')

ON CONFLICT (page, section, key) DO UPDATE
  SET value = EXCLUDED.value,
      label = EXCLUDED.label;
