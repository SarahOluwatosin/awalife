-- Add CMS-editable URL/path keys for all footer nav links
-- These pair with the existing link_* label keys so admin can select destination page

INSERT INTO page_content (page, section, key, label, value, type) VALUES
  -- Quick Links
  ('footer', 'nav', 'link_ai_analyzer_url', 'AI Analyzer Link URL', '/products/ai-analyzer',          'text'),
  ('footer', 'nav', 'link_dm03_url',         'DM-03 Link URL',       '/products/dm-03',                'text'),
  ('footer', 'nav', 'link_blood_url',        'Blood Link URL',        '/applications/blood',            'text'),
  ('footer', 'nav', 'link_urine_url',        'Urine Link URL',        '/applications/urine',            'text'),
  ('footer', 'nav', 'link_feces_url',        'Feces Link URL',        '/applications/feces',            'text'),
  ('footer', 'nav', 'link_fluid_url',        'Fluid Link URL',        '/applications/pleural-effusion', 'text'),
  ('footer', 'nav', 'link_exotic_url',       'Exotic Link URL',       '/applications/exotic-animals',   'text'),
  -- Company Links
  ('footer', 'nav', 'link_about_url',        'About Link URL',        '/company/about',                 'text'),
  ('footer', 'nav', 'link_news_url',         'News Link URL',         '/company/news',                  'text'),
  ('footer', 'nav', 'link_resources_url',    'Resources Link URL',    '/resources',                     'text'),
  ('footer', 'nav', 'link_contact_url',      'Contact Link URL',      '/contact',                       'text')
ON CONFLICT (page, section, key) DO NOTHING;
