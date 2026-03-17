-- ============================================================
-- Feedback fixes (2026-03-17)
-- ============================================================

-- 1. Fix footer phone number
UPDATE page_content
SET value = '0755-27206973'
WHERE page = 'footer' AND section = 'address' AND key = 'phone';

-- 2. Split CTA title from "Interested in Our Products?" into
--    title = "Interested in" + title_highlight = "Our Products"
--    for all application pages + about

-- blood
UPDATE page_content SET value = 'Interested in'
WHERE page = 'blood' AND section = 'cta' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('blood', 'cta', 'title_highlight', 'CTA Title Highlight (gradient)', 'Our Products', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- urine
UPDATE page_content SET value = 'Interested in'
WHERE page = 'urine' AND section = 'cta' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('urine', 'cta', 'title_highlight', 'CTA Title Highlight (gradient)', 'Our Products', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- feces
UPDATE page_content SET value = 'Interested in'
WHERE page = 'feces' AND section = 'cta' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('feces', 'cta', 'title_highlight', 'CTA Title Highlight (gradient)', 'Our Products', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- pleural
UPDATE page_content SET value = 'Interested in'
WHERE page = 'pleural' AND section = 'cta' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('pleural', 'cta', 'title_highlight', 'CTA Title Highlight (gradient)', 'Our Products', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- exotic
UPDATE page_content SET value = 'Interested in'
WHERE page = 'exotic' AND section = 'cta' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('exotic', 'cta', 'title_highlight', 'CTA Title Highlight (gradient)', 'Our Products', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- about
UPDATE page_content SET value = 'Interested in'
WHERE page = 'about' AND section = 'cta' AND key = 'title';

INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('about', 'cta', 'title_highlight', 'CTA Title Highlight (gradient)', 'Our Products', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- 3. Add editable "title_suffix" for overview headings
--    blood: "…Images and Counts {in One Workflow}"
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('blood', 'overview', 'title_suffix', 'Section Title Suffix', 'in One Workflow', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

--    urine: "…Images and Counts {in One Workflow}"
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('urine', 'overview', 'title_suffix', 'Section Title Suffix', 'in One Workflow', 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;
