-- Migration: Add missing section badge/title fields so all section headers are CMS-editable
-- These were hardcoded in page components. Components fall back to hardcoded values when rows
-- are missing, so this migration is safe to run at any time.

INSERT INTO page_content (page, section, key, label, value, type) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- BLOOD ANALYSIS
-- ─────────────────────────────────────────────────────────────────────────────
('blood', 'how_it_works', 'badge',  'Section Badge', 'How It Works', 'text'),
('blood', 'how_it_works', 'title',  'Section Title',  'More Count',  'text'),
('blood', 'faq',          'badge',  'Section Badge',  'FAQ',         'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- FECES ANALYSIS
-- ─────────────────────────────────────────────────────────────────────────────
('feces', 'direct_sampling', 'badge', 'Section Badge', 'How It Works',   'text'),
('feces', 'direct_sampling', 'title', 'Section Title', 'Direct Sampling', 'text'),
('feces', 'flotation',       'badge', 'Section Badge', 'How It Works',   'text'),
('feces', 'flotation',       'title', 'Section Title', 'Flotation Sampling (Centrifugal Flotation)', 'text'),
('feces', 'faq',             'badge', 'Section Badge', 'FAQ',            'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- URINE ANALYSIS
-- ─────────────────────────────────────────────────────────────────────────────
('urine', 'how_it_works', 'badge', 'Section Badge', 'How It Works',                         'text'),
('urine', 'how_it_works', 'title', 'Section Title', 'From Sample to Report - in Under 10 minutes', 'text'),
('urine', 'faq',          'badge', 'Section Badge', 'FAQ',                                  'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- EXOTIC ANIMALS
-- ─────────────────────────────────────────────────────────────────────────────
('exotic', 'faq', 'badge', 'Section Badge', 'FAQ', 'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- PLEURAL EFFUSION
-- ─────────────────────────────────────────────────────────────────────────────
('pleural', 'faq', 'badge', 'Section Badge', 'FAQ', 'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- AI ANALYZER product page
-- ─────────────────────────────────────────────────────────────────────────────
('ai-analyzer', 'capabilities', 'badge', 'Capabilities Badge', 'AI Capabilities', 'text'),
('ai-analyzer', 'workflow',     'badge', 'Workflow Badge',      'How It Works',    'text'),
('ai-analyzer', 'workflow',     'title', 'Workflow Title',      'Simple 3-Step Workflow', 'text'),
('ai-analyzer', 'faq',          'badge', 'Section Badge',       'FAQ',             'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- DM-03 MICROSCOPE product page
-- ─────────────────────────────────────────────────────────────────────────────
('dm-03', 'capabilities',  'badge', 'Capabilities Badge', 'Capabilities',   'text'),
('dm-03', 'hardware',      'badge', 'Hardware Badge',      'Hardware',       'text'),
('dm-03', 'hardware',      'title', 'Hardware Title',      'Built for Precision and Reliability', 'text'),
('dm-03', 'image_hub',     'badge', 'Image Hub Badge',     'Image Hub',      'text'),
('dm-03', 'image_hub',     'title', 'Image Hub Title',     'Comprehensive Image Management', 'text'),
('dm-03', 'sample_types',  'badge', 'Sample Types Badge',  'Sample Types',   'text'),
('dm-03', 'sample_types',  'title', 'Sample Types Title',  'Supported Sample Types', 'text'),
('dm-03', 'faq',           'badge', 'Section Badge',       'FAQ',            'text')

ON CONFLICT (page, section, key) DO NOTHING;
