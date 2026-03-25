-- Split Why Us section title into title + title_highlight for gradient emphasis
-- Update existing title to remove the gradient portion
UPDATE page_content
SET value = 'An Expandable AI Morphology Platform Grows with'
WHERE page = 'home' AND section = 'why_us' AND key = 'title';

-- Add title_highlight for the gradient span
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('home', 'why_us', 'title_highlight', 'Why Us Title Highlight (gradient)', 'New Samples and Applications', 'text')
ON CONFLICT (page, section, key) DO NOTHING;
