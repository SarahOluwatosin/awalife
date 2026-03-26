-- Add contact/social section so social media accounts are editable from the Contact page CMS panel

INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('contact', 'social', 'email',         'Email Address',    'info@awalife.com.cn',                                         'text'),
  ('contact', 'social', 'linkedin_url',  'LinkedIn URL',     'https://www.linkedin.com/company/awalife',                    'text'),
  ('contact', 'social', 'facebook_url',  'Facebook URL',     'https://www.facebook.com/profile.php?id=61575919264554',      'text'),
  ('contact', 'social', 'instagram_url', 'Instagram URL',    'https://www.instagram.com/awalife_es',                       'text')
ON CONFLICT (page, section, key) DO NOTHING;
