-- Sample report URL fields (type: file) for pages that were missing them
-- feces/classification already has download_report_label via 20260317300000 but was missing URL
-- pleural/exotic were missing URL entirely

INSERT INTO page_content (page, section, key, label, value, type)
VALUES
  ('feces',   'classification', 'sample_report_url',   'Sample Report PDF',   'https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013179540-cxqmcu.pdf', 'file'),
  ('feces',   'classification', 'download_report_label','Download Button Label','Download the sample report', 'text'),
  ('pleural', 'overview',       'sample_report_url',   'Sample Report PDF',   'https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013242151-23x4mi.pdf', 'file'),
  ('exotic',  'overview',       'sample_report_url',   'Sample Report PDF',   'https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013290352-bha0kp.pdf', 'file')
ON CONFLICT (page, section, key) DO NOTHING;
