-- Seed remaining hardcoded-to-editable content
-- Covers: Contact form labels, Footer nav headers,
--         ProductDetail (ai-analyzer + dm-03) all hardcoded section text

-- ─── CONTACT: form field labels + submit button ───────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('contact', 'form', 'label_name',     'Form Label: Full Name',                 'Full Name *',                     'text'),
  ('contact', 'form', 'label_position', 'Form Label: Position',                  'Position *',                      'text'),
  ('contact', 'form', 'label_company',  'Form Label: Company',                   'Company / Hospital / Clinic *',   'text'),
  ('contact', 'form', 'label_email',    'Form Label: Email',                     'Email Address *',                 'text'),
  ('contact', 'form', 'label_whatsapp', 'Form Label: WhatsApp',                  'WhatsApp Number',                 'text'),
  ('contact', 'form', 'label_country',  'Form Label: Country',                   'Country / Region *',              'text'),
  ('contact', 'form', 'label_message',  'Form Label: Message',                   'Your Message *',                  'text'),
  ('contact', 'form', 'btn_submit',     'Submit Button Text',                    'Submit',                          'text'),
  ('contact', 'form', 'btn_sending',    'Sending State Button Text',             'Sending...',                      'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── FOOTER: navigation section headers ──────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('footer', 'nav', 'label_quicklinks', 'Footer Nav Header: Quick Links', 'Quick Links', 'text'),
  ('footer', 'nav', 'label_company',    'Footer Nav Header: Company',     'Company',     'text'),
  ('footer', 'nav', 'label_contact',    'Footer Nav Header: Contact',     'Contact',     'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── AI-ANALYZER: hero badge + title parts + CTAs ────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'hero', 'badge',         'Hero Badge',                         'Product Overview',       'text'),
  ('ai-analyzer', 'hero', 'title',         'Hero Title (plain)',                  'AI Series',              'text'),
  ('ai-analyzer', 'hero', 'title_highlight','Hero Title Highlight (gradient)',    'Morphology Analyzer',    'text'),
  ('ai-analyzer', 'hero', 'cta_primary',   'Hero Primary CTA',                   'Contact us',             'text'),
  ('ai-analyzer', 'hero', 'cta_secondary', 'Hero Secondary CTA',                 'Download brochure',      'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── AI-ANALYZER: capabilities section ───────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'capabilities', 'badge',          'Capabilities Badge',                    'Key Features',                              'text'),
  ('ai-analyzer', 'capabilities', 'title',          'Capabilities Title',                    'AI Series Morphology Analyzer from',        'text'),
  ('ai-analyzer', 'capabilities', 'title_highlight','Capabilities Title Highlight (gradient)','Sample to Diagnosis',                      'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── AI-ANALYZER: workflow section ───────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'workflow', 'badge',          'Workflow Badge',                        'Workflow',                                           'text'),
  ('ai-analyzer', 'workflow', 'title',          'Workflow Title',                        'From Sample to Insight,',                            'text'),
  ('ai-analyzer', 'workflow', 'title_highlight','Workflow Title Highlight (gradient)',   'One Workflow',                                        'text'),
  ('ai-analyzer', 'workflow', 'title_suffix',   'Workflow Title Suffix',                'for Multiple Sample Types',                           'text'),
  ('ai-analyzer', 'workflow', 'body',           'Workflow Body Text',                   'Awalife''s workflow supports consistent results across blood, urine, feces, and pleural fluid analysis.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── AI-ANALYZER: FAQ title parts ────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'faq', 'title',          'FAQ Section Title',            'Frequently Asked', 'text'),
  ('ai-analyzer', 'faq', 'title_highlight','FAQ Title Highlight (gradient)','Questions',       'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── AI-ANALYZER: CTA section ────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'cta', 'title',          'CTA Title',                     'Interested in',          'text'),
  ('ai-analyzer', 'cta', 'title_highlight','CTA Title Highlight (gradient)', 'Our Products',           'text'),
  ('ai-analyzer', 'cta', 'title_suffix',   'CTA Title Suffix',              '?',                      'text'),
  ('ai-analyzer', 'cta', 'body',           'CTA Body Text',                 'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text'),
  ('ai-analyzer', 'cta', 'cta_text',       'CTA Button Text',               'Contact us',             'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: hero badge + title parts + CTAs ──────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'hero', 'badge',          'Hero Badge',                        'Digital Microscope',    'text'),
  ('dm-03', 'hero', 'title',          'Hero Title (plain)',                 'Smarter Imaging,',      'text'),
  ('dm-03', 'hero', 'title_highlight','Hero Title Highlight (gradient)',    'Effortless Operation',  'text'),
  ('dm-03', 'hero', 'cta_primary',    'Hero Primary CTA',                  'Contact us',            'text'),
  ('dm-03', 'hero', 'cta_secondary',  'Hero Secondary CTA',                'Download brochure',     'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: sample_types section ─────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'sample_types', 'badge',          'Sample Types Badge',                    'Sample Types',                                                                    'text'),
  ('dm-03', 'sample_types', 'title_highlight','Sample Types Title Highlight (gradient)','Samples',                                                                        'text'),
  ('dm-03', 'sample_types', 'title_suffix',   'Sample Types Title Suffix',             'Supported',                                                                       'text'),
  ('dm-03', 'sample_types', 'subtitle',       'Sample Types Subtitle',                 'Common veterinary sample types that can be captured and documented with the workstation.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: hardware section ─────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'hardware', 'badge',        'Hardware Badge',                 'Hardware',          'text'),
  ('dm-03', 'hardware', 'title',        'Hardware Title (gradient part)', 'High-performance',  'text'),
  ('dm-03', 'hardware', 'title_suffix', 'Hardware Title Suffix',          'Hardware',          'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: capabilities (software) section ──────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'capabilities', 'badge',          'Software Badge',                        'Software',                                                                                                                       'text'),
  ('dm-03', 'capabilities', 'title_highlight','Software Title Highlight (gradient)',   'User-friendly Software',                                                                                                         'text'),
  ('dm-03', 'capabilities', 'title_suffix',   'Software Title Suffix',                 'Built for Veterinary Workflows',                                                                                                 'text'),
  ('dm-03', 'capabilities', 'body',           'Software Body Text',                    'It integrates tools for cell counting, scale bars, annotations, and one-click report generation, with an embedded teaching image library for faster training.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: image_hub section ────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'image_hub', 'badge',          'Image Hub Badge',                       'Upgrade Option',                                                                                            'text'),
  ('dm-03', 'image_hub', 'title',          'Image Hub Title',                       'Already Have a Microscope?',                                                                                'text'),
  ('dm-03', 'image_hub', 'title_highlight','Image Hub Title Highlight (gradient)',  'Upgrade it with Awalife Microscope Image Hub.',                                                              'text'),
  ('dm-03', 'image_hub', 'body',           'Image Hub Body Text',                   'Keep your Leica or Olympus microscope and unlock the same Awalife software workflow—capture, measure, annotate, count, and report on a PC.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: FAQ title parts ──────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'faq', 'title',          'FAQ Section Title',             'Frequently Asked', 'text'),
  ('dm-03', 'faq', 'title_highlight','FAQ Title Highlight (gradient)', 'Questions',       'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: CTA section ──────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'cta', 'title',          'CTA Title',                     'Interested in',  'text'),
  ('dm-03', 'cta', 'title_highlight','CTA Title Highlight (gradient)', 'Our Products',  'text'),
  ('dm-03', 'cta', 'title_suffix',   'CTA Title Suffix',              '?',              'text'),
  ('dm-03', 'cta', 'body',           'CTA Body Text',                 'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text'),
  ('dm-03', 'cta', 'cta_text',       'CTA Button Text',               'Contact us',     'text')
ON CONFLICT (page, section, key) DO NOTHING;
