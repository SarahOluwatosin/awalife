-- Seed all home page CMS rows
-- Covers: Hero title lines + metrics, Products title parts,
--         Partners title parts, Certifications section, CTA section

-- ─── HERO: title lines ────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('home', 'hero', 'title_line1',   'Hero Title Line 1 (plain text)',    'Morphology Isn''t a Feature for Us,', 'text'),
  ('home', 'hero', 'title_line2',   'Hero Title Line 2 (gradient text)', 'It''s the Foundation',               'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── HERO: metrics ────────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('home', 'hero', 'metric_1_value',    'Metric 1 Number',   '15',                           'text'),
  ('home', 'hero', 'metric_1_suffix',   'Metric 1 Suffix',   'M+',                           'text'),
  ('home', 'hero', 'metric_1_label',    'Metric 1 Label',    'Images for AI Model Training', 'text'),
  ('home', 'hero', 'metric_1_decimals', 'Metric 1 Decimals', '0',                            'text'),
  ('home', 'hero', 'metric_2_value',    'Metric 2 Number',   '2.4',                          'text'),
  ('home', 'hero', 'metric_2_suffix',   'Metric 2 Suffix',   'M+',                           'text'),
  ('home', 'hero', 'metric_2_label',    'Metric 2 Label',    'Reports Generated',            'text'),
  ('home', 'hero', 'metric_2_decimals', 'Metric 2 Decimals', '1',                            'text'),
  ('home', 'hero', 'metric_3_value',    'Metric 3 Number',   '8000',                         'text'),
  ('home', 'hero', 'metric_3_suffix',   'Metric 3 Suffix',   '+',                            'text'),
  ('home', 'hero', 'metric_3_label',    'Metric 3 Label',    'Installations Worldwide',      'text'),
  ('home', 'hero', 'metric_3_decimals', 'Metric 3 Decimals', '0',                            'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── PRODUCTS: title gradient parts ──────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('home', 'products', 'title_highlight', 'Products Title Highlight (gradient)', 'Real-world Veterinary', 'text'),
  ('home', 'products', 'title_suffix',    'Products Title Suffix',               'Workflows',             'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── PARTNERS: title parts ────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('home', 'partners', 'title',          'Partners Title',                        'Scaling',                         'text'),
  ('home', 'partners', 'title_highlight', 'Partners Title Highlight (gradient)',  'Globally',                        'text'),
  ('home', 'partners', 'title_suffix',   'Partners Title Suffix',                 'through Partners Who Deliver',    'text'),
  ('home', 'partners', 'title_highlight2','Partners Title Highlight 2 (gradient)','Locally',                        'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── CERTIFICATIONS: all text ────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('home', 'certifications', 'badge',         'Certifications Badge',           'Regulatory Credibility',             'text'),
  ('home', 'certifications', 'title',         'Certifications Title',           'Certified for',                      'text'),
  ('home', 'certifications', 'title_highlight','Certifications Title Highlight', 'Global',                             'text'),
  ('home', 'certifications', 'title_suffix',  'Certifications Title Suffix',    'Veterinary Diagnostics',             'text'),
  ('home', 'certifications', 'cert_1_label',  'Certification 1 Label',          'CE Certification',                   'text'),
  ('home', 'certifications', 'cert_2_label',  'Certification 2 Label',          'ISO9001',                            'text'),
  ('home', 'certifications', 'cert_3_label',  'Certification 3 Label',          'ISO13485',                           'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── CTA: correct content ─────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('home', 'cta', 'title',          'CTA Title',                  'Ready to standardize your',  'text'),
  ('home', 'cta', 'title_highlight','CTA Title Highlight (gradient)', 'diagnostic workflow',     'text'),
  ('home', 'cta', 'title_suffix',   'CTA Title Suffix',           '',                            'text'),
  ('home', 'cta', 'body',           'CTA Body Text',              'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text'),
  ('home', 'cta', 'cta_text',       'CTA Button Text',            'Get in Touch',                'text')
ON CONFLICT (page, section, key) DO NOTHING;
