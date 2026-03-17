-- Content audit fixes (2026-03-17)
-- Makes previously hardcoded labels CMS-editable

-- 1. "Download the sample report" button label (per application page)
INSERT INTO page_content (page, section, key, label, value, type)
VALUES
  ('blood',   'classification', 'download_report_label', 'Download Button Label', 'Download the sample report', 'text'),
  ('urine',   'classification', 'download_report_label', 'Download Button Label', 'Download the sample report', 'text'),
  ('pleural', 'overview',       'download_report_label', 'Download Button Label', 'Download the sample report', 'text'),
  ('exotic',  'overview',       'download_report_label', 'Download Button Label', 'Download the sample report', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- 2. "Read More" button label on news cards
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('news', 'hero', 'read_more', 'Read More Button Label', 'Read More', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- 3. Footer nav link labels (Quick Links)
INSERT INTO page_content (page, section, key, label, value, type)
VALUES
  ('footer', 'nav', 'link_ai_analyzer', 'Quick Link: AI Analyzer',       'AI Morphology Analyzer',         'text'),
  ('footer', 'nav', 'link_dm03',        'Quick Link: DM-03',              'DM-03 Microscope Workstation',   'text'),
  ('footer', 'nav', 'link_blood',       'Quick Link: Blood',              'Blood Analysis',                 'text'),
  ('footer', 'nav', 'link_urine',       'Quick Link: Urine',              'Urine Analysis',                 'text'),
  ('footer', 'nav', 'link_feces',       'Quick Link: Feces',              'Feces Analysis',                 'text'),
  ('footer', 'nav', 'link_fluid',       'Quick Link: Fluid',              'Fluid Analysis',                 'text'),
  ('footer', 'nav', 'link_exotic',      'Quick Link: Exotic',             'Exotic Animals',                 'text'),
  ('footer', 'nav', 'link_about',       'Company Link: About',            'About Awalife',                  'text'),
  ('footer', 'nav', 'link_news',        'Company Link: News',             'News Center',                    'text'),
  ('footer', 'nav', 'link_resources',   'Company Link: Resources',        'Resources',                      'text'),
  ('footer', 'nav', 'link_contact',     'Company Link: Contact',          'Contact',                        'text')
ON CONFLICT (page, section, key) DO NOTHING;
