-- Update Installations Worldwide metric from 8,000+ to 10,000+
UPDATE page_content
SET value = '10000'
WHERE page = 'home' AND section = 'hero' AND key = 'metric_3_value';
