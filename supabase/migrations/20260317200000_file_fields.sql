-- Add file-type CMS fields for brochure + sample report downloads

-- AI Analyzer brochure
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('ai-analyzer', 'hero', 'brochure_url', 'Brochure File URL', '', 'file')
ON CONFLICT (page, section, key) DO NOTHING;

-- DM-03 brochure
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('dm-03', 'hero', 'brochure_url', 'Brochure File URL', '', 'file')
ON CONFLICT (page, section, key) DO NOTHING;

-- Blood Analysis sample report
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('blood', 'classification', 'sample_report_url', 'Sample Report File URL',
  'https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013016271-paiyw3.pdf', 'file')
ON CONFLICT (page, section, key) DO NOTHING;

-- Urine Analysis sample report
INSERT INTO page_content (page, section, key, label, value, type)
VALUES ('urine', 'classification', 'sample_report_url', 'Sample Report File URL',
  'https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013094726-jpuaxn.pdf', 'file')
ON CONFLICT (page, section, key) DO NOTHING;
