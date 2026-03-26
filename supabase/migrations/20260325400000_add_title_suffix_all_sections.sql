-- Add title_suffix rows to all sections that now support the 3-part title pattern
-- (dark text / gradient highlight / dark text)
-- Uses ON CONFLICT DO NOTHING so re-running is safe.

INSERT INTO page_content (page, section, key, label, value, type) VALUES

-- about page
('about', 'journey',    'title_suffix', 'Journey Title Suffix',    '',  'text'),
('about', 'principles', 'title_suffix', 'Principles Title Suffix', '',  'text'),
('about', 'cta',        'title_suffix', 'CTA Title Suffix',        '?', 'text'),

-- blood page
('blood', 'classification',  'title_suffix', 'Classification Title Suffix',   ' - Built for Clinical Review', 'text'),
('blood', 'clinical_images', 'title',        'Clinical Images Title',          '',                             'text'),
('blood', 'clinical_images', 'title_suffix', 'Clinical Images Title Suffix',   ', Ready for Review',           'text'),
('blood', 'faq',             'title_suffix', 'FAQ Title Suffix',               '',                             'text'),
('blood', 'cta',             'title_suffix', 'CTA Title Suffix',               '?',                            'text'),

-- urine page
('urine', 'classification',  'title_suffix', 'Classification Title Suffix',   ' - across Users and Sites', 'text'),
('urine', 'clinical_images', 'title',        'Clinical Images Title',          '',                          'text'),
('urine', 'clinical_images', 'title_suffix', 'Clinical Images Title Suffix',   ', Ready for Review',        'text'),
('urine', 'faq',             'title_suffix', 'FAQ Title Suffix',               '',                          'text'),
('urine', 'cta',             'title_suffix', 'CTA Title Suffix',               '?',                         'text'),

-- feces page
('feces', 'overview',        'title_suffix', 'Overview Title Suffix',          '',                    'text'),
('feces', 'classification',  'title_suffix', 'Classification Title Suffix',    '',                    'text'),
('feces', 'clinical_images', 'title',        'Clinical Images Title',          '',                    'text'),
('feces', 'clinical_images', 'title_suffix', 'Clinical Images Title Suffix',   ', Ready for Review',  'text'),
('feces', 'faq',             'title_suffix', 'FAQ Title Suffix',               '',                    'text'),
('feces', 'cta',             'title_suffix', 'CTA Title Suffix',               '?',                   'text'),

-- pleural page
('pleural', 'overview',        'title_suffix', 'Overview Title Suffix',          '',                   'text'),
('pleural', 'classification',  'title_suffix', 'Classification Title Suffix',    '',                   'text'),
('pleural', 'clinical_images', 'title',        'Clinical Images Title',          '',                   'text'),
('pleural', 'clinical_images', 'title_suffix', 'Clinical Images Title Suffix',   ', Ready for Review', 'text'),
('pleural', 'faq',             'title_suffix', 'FAQ Title Suffix',               '',                   'text'),
('pleural', 'cta',             'title_suffix', 'CTA Title Suffix',               '?',                  'text'),

-- exotic page
('exotic', 'overview',    'title_suffix', 'Overview Title Suffix',    '',  'text'),
('exotic', 'species',     'title_suffix', 'Species Title Suffix',     '',  'text'),
('exotic', 'low_volume',  'title_suffix', 'Low Volume Title Suffix',  '',  'text'),
('exotic', 'faq',         'title_suffix', 'FAQ Title Suffix',         '',  'text'),
('exotic', 'cta',         'title_suffix', 'CTA Title Suffix',         '?', 'text'),

-- ai-analyzer page
('ai-analyzer', 'hero',         'title_suffix', 'Hero Title Suffix',         '', 'text'),
('ai-analyzer', 'capabilities', 'title_suffix', 'Capabilities Title Suffix', '', 'text'),
('ai-analyzer', 'faq',          'title_suffix', 'FAQ Title Suffix',          '', 'text'),

-- dm-03 page
('dm-03', 'hero', 'title_suffix', 'Hero Title Suffix', '', 'text'),
('dm-03', 'faq',  'title_suffix', 'FAQ Title Suffix',  '', 'text'),

-- contact page
('contact', 'hero', 'title',        'Hero Title Prefix (dark)',      '',  'text'),
('contact', 'form', 'title',        'Form Title Prefix (dark)',       '',  'text'),

-- home: about_section
('home', 'about_section', 'title_suffix', 'About Section Title Suffix', '', 'text')

ON CONFLICT (page, section, key) DO NOTHING;
