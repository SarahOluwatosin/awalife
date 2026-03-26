-- Split CompanyNews hero title into 3-part dark/gradient/dark pattern
-- Old single 'title' row had value 'News Center'; now title is empty dark prefix

UPDATE page_content
SET value = '', label = 'Hero Title Prefix (dark)'
WHERE page = 'news' AND section = 'hero' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('news', 'hero', 'title_highlight', 'Hero Title Highlight (gradient)', 'News',   'text'),
  ('news', 'hero', 'title_suffix',    'Hero Title Suffix (dark)',         ' Center', 'text')
ON CONFLICT (page, section, key) DO NOTHING;
