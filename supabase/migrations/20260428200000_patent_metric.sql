-- Add 4th metric (Patents Granted) to home hero section

INSERT INTO page_content (page, section, key, label, value, type) VALUES
('home', 'hero', 'metric_4_value',    'Metric 4: Number',  '96',              'text'),
('home', 'hero', 'metric_4_suffix',   'Metric 4: Suffix',  '+',               'text'),
('home', 'hero', 'metric_4_label',    'Metric 4: Label',   'Patents Granted',  'text'),
('home', 'hero', 'metric_4_decimals', 'Metric 4: Decimals','0',               'text')
ON CONFLICT (page, section, key) DO NOTHING;
