-- Seed all newly wired CMS keys from hardcoded-to-editable conversion
-- Covers: About timeline, story/journey/principles/global titles, Contact titles,
--         Footer address, Resources hero, application FAQ titles, ExoticAnimals species table

-- ─── ABOUT: story title parts ─────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('about', 'story', 'title_highlight', 'Story Title Highlight (gradient)', 'AI-Powered Morphology', 'text'),
  ('about', 'story', 'title_suffix',    'Story Title Suffix',               'Diagnostics',           'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── ABOUT: journey title + CMS-editable timeline ─────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('about', 'journey', 'title_highlight', 'Journey Title Highlight (gradient)', 'Shaped Awalife', 'text'),
  -- year_count controls how many cards the page renders; increment to add a new year
  ('about', 'journey', 'year_count', 'Number of Timeline Years', '7', 'text'),
  -- Year 1 — 2020
  ('about', 'journey', 'year_1',           'Year 1',           '2020',     'text'),
  ('about', 'journey', 'year_1_highlight', 'Year 1 Highlight', 'Founded',  'text'),
  ('about', 'journey', 'year_1_items',     'Year 1 Milestones (one per line)',
   'Jul 7 — Awalife established.', 'textarea'),
  -- Year 2 — 2021
  ('about', 'journey', 'year_2',           'Year 2',           '2021',          'text'),
  ('about', 'journey', 'year_2_highlight', 'Year 2 Highlight', 'First Product', 'text'),
  ('about', 'journey', 'year_2_items',     'Year 2 Milestones (one per line)',
   'Apr — Successful development of the first Morphology Analyzer.
Aug — Microscope Workstation launched in China.', 'textarea'),
  -- Year 3 — 2022
  ('about', 'journey', 'year_3',           'Year 3',           '2022',   'text'),
  ('about', 'journey', 'year_3_highlight', 'Year 3 Highlight', 'Funded', 'text'),
  ('about', 'journey', 'year_3_items',     'Year 3 Milestones (one per line)',
   'Feb — Secured Angel funding.
Aug — First AI-100Vet Morphology Analyzer installed in China.', 'textarea'),
  -- Year 4 — 2023
  ('about', 'journey', 'year_4',           'Year 4',           '2023',         'text'),
  ('about', 'journey', 'year_4_highlight', 'Year 4 Highlight', 'Rapid Growth', 'text'),
  ('about', 'journey', 'year_4_items',     'Year 4 Milestones (one per line)',
   'Apr — Fecal Morphology Detection launched; monthly sales surpassed RMB 1M.
Dec — Secured Series A funding.', 'textarea'),
  -- Year 5 — 2024
  ('about', 'journey', 'year_5',           'Year 5',           '2024',             'text'),
  ('about', 'journey', 'year_5_highlight', 'Year 5 Highlight', 'Global Expansion', 'text'),
  ('about', 'journey', 'year_5_items',     'Year 5 Milestones (one per line)',
   'Apr — First international AI-100Vet installed in Malaysia.
May — Effusion Analysis launched.
Nov — Blood Morphology for exotic animals launched.
Dec — Global monthly sales exceeded RMB 10M. Recognized as a Shenzhen Specialized and Sophisticated SME.', 'textarea'),
  -- Year 6 — 2025
  ('about', 'journey', 'year_6',           'Year 6',           '2025',            'text'),
  ('about', 'journey', 'year_6_highlight', 'Year 6 Highlight', 'Industry Leader', 'text'),
  ('about', 'journey', 'year_6_items',     'Year 6 Milestones (one per line)',
   'Jan — Global installations reached 3,000 units.
Apr — New products launched: DM-03 Microscope Workstation, AI-80Vet, AI-100Vet Elite, JH-01 Thermo Mixer.
Oct — Global installations reached 7,000 units.
Dec — Recognized as a Guangdong Provincial High-Quality & High-Tech Product. The Awalife-led industry standard for Formed Element Analyzers was officially published by the CVMA.', 'textarea'),
  -- Year 7 — 2026 and Beyond
  ('about', 'journey', 'year_7',           'Year 7',           '2026 and Beyond', 'text'),
  ('about', 'journey', 'year_7_highlight', 'Year 7 Highlight', 'Future',          'text'),
  ('about', 'journey', 'year_7_items',     'Year 7 Milestones (one per line)',
   'Continued global growth with continuous innovation and new applications in development.', 'textarea')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── ABOUT: principles + vision + values + global title parts ─────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('about', 'principles', 'title_highlight', 'Principles Title Highlight (gradient)', 'Core Values',                      'text'),
  ('about', 'vision',     'label',           'Vision Section Label',                  'Vision',                           'text'),
  ('about', 'values',     'label',           'Core Values Section Label',             'Core Values',                      'text'),
  ('about', 'global',     'title',           'Global Section Title',                  'Scaling',                          'text'),
  ('about', 'global',     'title_highlight', 'Global Title Highlight (primary color)','Globally',                         'text'),
  ('about', 'global',     'title_suffix',    'Global Title Suffix',                   'Through Partners Who Deliver',     'text'),
  ('about', 'global',     'title_highlight2','Global Title Gradient Text',            'Locally',                          'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── CONTACT: title parts + form section titles + success messages ─────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('contact', 'hero', 'title_highlight', 'Hero Title Highlight (gradient)', 'Contact',          'text'),
  ('contact', 'hero', 'title_suffix',    'Hero Title Suffix',               'Us',               'text'),
  ('contact', 'form', 'title_highlight', 'Form Title Highlight (gradient)', 'Interested in',    'text'),
  ('contact', 'form', 'title_suffix',    'Form Title Suffix',               'Our Products?',    'text'),
  ('contact', 'form', 'success_title',   'Success Title',                   'Message Sent!',    'text'),
  ('contact', 'form', 'success_body',    'Success Body',                    'Thank you for reaching out. We''ll respond to your inquiry as soon as possible.', 'text'),
  ('contact', 'form', 'success_cta',     'Success Button',                  'Send another message', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── FOOTER: address / contact info ───────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('footer', 'address', 'phone',     'Phone Number', '0755-27206973',                                                                         'text'),
  ('footer', 'address', 'email',     'Email Address','info@awalife.com.cn',                                                                    'text'),
  ('footer', 'address', 'location',  'Location',     'Shenzhen, China',                                                                       'text'),
  ('footer', 'address', 'copyright', 'Copyright',    '2026 SHENZHEN ANLV MEDICAL TECHNOLOGY CO., LTD. All rights reserved.',                  'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── RESOURCES: hero badge + title parts ──────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('resources', 'hero', 'badge',          'Hero Badge',                        'Explore resources', 'text'),
  ('resources', 'hero', 'title',          'Hero Title',                        'Welcome to',        'text'),
  ('resources', 'hero', 'title_highlight','Hero Title Highlight (gradient)',    'Resource',          'text'),
  ('resources', 'hero', 'title_suffix',   'Hero Title Suffix',                 'Center',            'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── APPLICATION PAGES: FAQ section title (shared pattern) ────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('blood',   'faq', 'title',          'FAQ Section Title',          'Frequently Asked', 'text'),
  ('blood',   'faq', 'title_highlight','FAQ Title Highlight (gradient)','Questions',     'text'),
  ('urine',   'faq', 'title',          'FAQ Section Title',          'Frequently Asked', 'text'),
  ('urine',   'faq', 'title_highlight','FAQ Title Highlight (gradient)','Questions',     'text'),
  ('feces',   'faq', 'title',          'FAQ Section Title',          'Frequently Asked', 'text'),
  ('feces',   'faq', 'title_highlight','FAQ Title Highlight (gradient)','Questions',     'text'),
  ('pleural', 'faq', 'title',          'FAQ Section Title',          'Frequently Asked', 'text'),
  ('pleural', 'faq', 'title_highlight','FAQ Title Highlight (gradient)','Questions',     'text'),
  ('exotic',  'faq', 'title',          'FAQ Section Title',          'Frequently Asked', 'text'),
  ('exotic',  'faq', 'title_highlight','FAQ Title Highlight (gradient)','Questions',     'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── EXOTIC ANIMALS: species table cells ──────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('exotic', 'species_table', 'group_species',       'Table Group: Species Support',  'Species Support',                                                        'text'),
  ('exotic', 'species_table', 'row_supported_label', 'Supported Species Row Label',   'Supported species',                                                      'text'),
  ('exotic', 'species_table', 'companion_species',   'Companion & Small Mammals List','Dogs, Cats, Rabbits, Guinea Pigs, Ferrets, Chinchillas, Rats, Mice, Hamsters', 'text'),
  ('exotic', 'species_table', 'avian_species',       'Avian Species List',            'Parrots, Pigeons',                                                       'text'),
  ('exotic', 'species_table', 'reptile_species',     'Reptile Species List',          'Turtles, Snakes, Lizards',                                               'text'),
  ('exotic', 'species_table', 'livestock_species',   'Livestock & Large Animals List','Horses, Alpacas, Camels, Pigs, Cattle, Sheep',                           'text'),
  ('exotic', 'species_table', 'group_samples',       'Table Group: Sample Types',     'Sample Types',                                                           'text')
ON CONFLICT (page, section, key) DO NOTHING;
