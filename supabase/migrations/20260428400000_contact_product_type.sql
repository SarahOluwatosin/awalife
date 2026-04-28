-- Add product_type field to contact submissions and form CMS label

ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS product_type text;

INSERT INTO page_content (page, section, key, label, value, type) VALUES
('contact', 'form', 'label_product_type', 'Product Type Label', 'Product Type of Interest *', 'text')
ON CONFLICT (page, section, key) DO NOTHING;
