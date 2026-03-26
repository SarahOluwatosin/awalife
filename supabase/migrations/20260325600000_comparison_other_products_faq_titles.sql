-- Make hardcoded section headers CMS-editable:
-- ProductComparison badge + title, ProductDetail other_products, Resources FAQ

-- ─── AI-ANALYZER: comparison section header ──────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'comparison', 'badge',          'Comparison Section Badge',              'Compare Products',  'text'),
  ('ai-analyzer', 'comparison', 'title',          'Comparison Title (dark)',                'Find the',          'text'),
  ('ai-analyzer', 'comparison', 'title_highlight','Comparison Title Highlight (gradient)',  'Right Solution',    'text'),
  ('ai-analyzer', 'comparison', 'title_suffix',   'Comparison Title Suffix (dark)',         '',                  'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── AI-ANALYZER: other products section ─────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'other_products', 'badge',          'Other Products Badge',              'Explore More', 'text'),
  ('ai-analyzer', 'other_products', 'title',          'Other Products Title (dark)',        'Other',        'text'),
  ('ai-analyzer', 'other_products', 'title_highlight','Other Products Title Highlight',     'Products',     'text'),
  ('ai-analyzer', 'other_products', 'title_suffix',   'Other Products Title Suffix',        '',             'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03: other products section ───────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'other_products', 'badge',          'Other Products Badge',              'Explore More', 'text'),
  ('dm-03', 'other_products', 'title',          'Other Products Title (dark)',        'Other',        'text'),
  ('dm-03', 'other_products', 'title_highlight','Other Products Title Highlight',     'Products',     'text'),
  ('dm-03', 'other_products', 'title_suffix',   'Other Products Title Suffix',        '',             'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── RESOURCES: FAQ section ───────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('resources', 'faq', 'badge',          'FAQ Section Badge',              'FAQ',              'text'),
  ('resources', 'faq', 'title',          'FAQ Title (dark)',                'Frequently Asked', 'text'),
  ('resources', 'faq', 'title_highlight','FAQ Title Highlight (gradient)',  'Questions',        'text'),
  ('resources', 'faq', 'title_suffix',   'FAQ Title Suffix (dark)',         '',                 'text')
ON CONFLICT (page, section, key) DO NOTHING;
