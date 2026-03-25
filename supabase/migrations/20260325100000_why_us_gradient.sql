-- Split Why Us section title into 3 parts: dark / gradient / dark
-- title = "An Expandable AI Morphology Platform"
-- title_highlight = "Grows with New Samples"  (gradient span)
-- title_suffix = "and Applications"

UPDATE page_content
SET value = 'An Expandable AI Morphology Platform'
WHERE page = 'home' AND section = 'why_us' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type)
VALUES
  ('home', 'why_us', 'title_highlight', 'Why Us Title Highlight (gradient)', 'Grows with New Samples', 'text'),
  ('home', 'why_us', 'title_suffix',    'Why Us Title Suffix (after gradient)', 'and Applications', 'text')
ON CONFLICT (page, section, key) DO NOTHING;
