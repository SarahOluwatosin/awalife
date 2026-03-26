-- Fix remaining section titles to follow dark/gradient/dark pattern
-- Covers: how_it_works (blood, urine), direct_sampling + flotation (feces),
--         DM-03 sample_types, hardware, capabilities, image_hub

-- ─── URINE: how_it_works ─────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('urine', 'how_it_works', 'title',          'How It Works Title (dark)',           'From Sample to Report',   'text'),
  ('urine', 'how_it_works', 'title_highlight', 'How It Works Title Highlight (gradient)', 'in Under 10 minutes', 'text'),
  ('urine', 'how_it_works', 'title_suffix',   'How It Works Title Suffix',           '',                        'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- ─── BLOOD: how_it_works ─────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('blood', 'how_it_works', 'title',          'How It Works Title (dark)',           'More Count,',      'text'),
  ('blood', 'how_it_works', 'title_highlight', 'How It Works Title Highlight (gradient)', 'Faster Results', 'text'),
  ('blood', 'how_it_works', 'title_suffix',   'How It Works Title Suffix',           '',                 'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- ─── FECES: direct_sampling ──────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('feces', 'direct_sampling', 'title',          'Direct Sampling Title (dark)',           'Direct',    'text'),
  ('feces', 'direct_sampling', 'title_highlight', 'Direct Sampling Title Highlight (gradient)', 'Sampling', 'text'),
  ('feces', 'direct_sampling', 'title_suffix',   'Direct Sampling Title Suffix',           '',          'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- ─── FECES: flotation ────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('feces', 'flotation', 'title',          'Flotation Title (dark)',           'Flotation',                     'text'),
  ('feces', 'flotation', 'title_highlight', 'Flotation Title Highlight (gradient)', 'Sampling',                 'text'),
  ('feces', 'flotation', 'title_suffix',   'Flotation Title Suffix',           '(Centrifugal Flotation)',       'text')
ON CONFLICT (page, section, key) DO UPDATE SET value = EXCLUDED.value;

-- ─── DM-03: sample_types — add missing title prefix ──────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'sample_types', 'title', 'Sample Types Title Prefix (dark)', '', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: hardware — rename title → title_highlight, clear title prefix ────
-- Old 'title' row had value 'High-performance' (was mistakenly placed inside gradient span)
-- Add title_highlight with that content; reset title to empty dark prefix
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'hardware', 'title_highlight', 'Hardware Title Highlight (gradient)', 'High-performance', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

UPDATE page_content
SET value = '', label = 'Hardware Title Prefix (dark)'
WHERE page = 'dm-03' AND section = 'hardware' AND key = 'title';

-- ─── DM-03: capabilities (software) — add missing title prefix ───────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'capabilities', 'title', 'Capabilities Title Prefix (dark)', '', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: image_hub — add dark prefix/suffix for second heading ─────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'image_hub', 'title_2',     'Image Hub Subtitle Prefix (dark)',           '', 'text'),
  ('dm-03', 'image_hub', 'title_suffix','Image Hub Subtitle Suffix (dark)',            '', 'text')
ON CONFLICT (page, section, key) DO NOTHING;
