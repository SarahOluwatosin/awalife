-- Comprehensive seed for all page content rows missing from previous migrations
-- Fixes: card content not showing, section titles not editable, missing hero/overview/cta rows

-- ─── Remove redundant home about_section rows (not on homepage) ───────────────
DELETE FROM page_content WHERE page = 'home' AND section = 'about_section';

-- ─── HOME ─────────────────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  -- hero
  ('home', 'hero', 'badge',        'Hero Badge',         'Pioneering AI-Powered Veterinary Morphology Diagnostics', 'text'),
  ('home', 'hero', 'subtitle',     'Hero Subtitle',      'We turn cellular morphology into visible, quantifiable, and review-ready evidence, helping veterinarians diagnose with greater depth and confidence.', 'text'),
  ('home', 'hero', 'cta_primary',  'Hero CTA Primary',   'Contact us',      'text'),
  ('home', 'hero', 'cta_secondary','Hero CTA Secondary', 'Explore products','text'),
  -- why_us
  ('home', 'why_us', 'badge',       'Section Badge',  'WHY AWALIFE', 'text'),
  ('home', 'why_us', 'title',       'Section Title',  'An Expandable AI Morphology Platform Grows with New Samples and Applications', 'text'),
  ('home', 'why_us', 'card_1_title','Card 1 Title',   'One platform that expands from multi-species analysis to multi-parameter evidence', 'text'),
  ('home', 'why_us', 'card_1_desc', 'Card 1 Description', 'It supports companion animals and small mammals, as well as large animals and a broad variety of exotic pets, making it suitable for a wide range of veterinary scenarios. In addition, it is capable of automatically analyzing blood, feces, urine, and pleural effusion samples, helping deliver efficient, accurate, and reliable results for daily clinical use.', 'text'),
  ('home', 'why_us', 'card_2_title','Card 2 Title',   'True-to-life morphology you can trust, capturing diagnostic details with clarity', 'text'),
  ('home', 'why_us', 'card_2_desc', 'Card 2 Description', 'With 40x optics, a 6.5 MP imaging system, and a wide field of view, Awalife preserves fine cellular detail while 1,000+ fields of view help ensure representative coverage. Liquid-based staining supports cell integrity for confident review and reporting.', 'text'),
  ('home', 'why_us', 'card_3_title','Card 3 Title',   'Morphology-first AI validated by real-world usage and rapid iteration', 'text'),
  ('home', 'why_us', 'card_3_desc', 'Card 3 Description', 'It is validated through real-world usage and rapid iteration, with over 15 million images used for AI training and more than 2.4 million diagnostic reports generated. Backed by 100+ innovations and patent updates, it continues to improve in performance and reliability with global field feedback.', 'text'),
  ('home', 'why_us', 'card_4_title','Card 4 Title',   'Support that scales: from day-to-day help to expert clinical guidance', 'text'),
  ('home', 'why_us', 'card_4_desc', 'Card 4 Description', 'Awalife offers responsive online support to keep workflows running smoothly, plus access to a clinical expert network for interpretive assistance. For distributors and partners, we provide a dedicated 1-on-1 support channel to streamline onboarding, technical escalation, and ongoing enablement.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── ABOUT ────────────────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('about', 'hero',  'subtitle', 'Hero Subtitle', 'Pioneering AI-powered morphology diagnostics', 'text'),
  ('about', 'story', 'body',     'Story Body',    'Awalife is a dedicated innovator in AI-powered morphology for veterinary diagnostics, with a long-term focus on formed element analysis. By pairing high-quality microscopy imaging with AI-assisted morphology recognition, we help clinics standardize workflows and document findings with clarity—through review-ready reports with images and counts across blood, urine, feces, and body fluids. We continue to expand this platform through ongoing innovation and updates.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── BLOOD ANALYSIS ───────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('blood', 'hero',  'title',             'Page Title',           'Blood Analysis',         'text'),
  ('blood', 'hero',  'subtitle',          'Page Subtitle',        'The most extensive Complete Blood Count (CBC) in veterinary medicine', 'text'),
  ('blood', 'overview', 'badge',          'Section Badge',        'Blood Analysis',         'text'),
  ('blood', 'overview', 'title',          'Section Title',        'Standardized Blood Smear Review', 'text'),
  ('blood', 'overview', 'title_highlight','Section Title Highlight (gradient)','Images and Counts','text'),
  ('blood', 'overview', 'body',           'Body Text',            'Awalife delivers a clinic-ready blood smear workflow with AI-assisted recognition and counting. Results are reported with review-ready images and quantitative outputs, enabling consistent decisions across teams and sites.', 'text'),
  ('blood', 'overview', 'cta_primary',    'CTA Primary Button',   'Contact us',             'text'),
  ('blood', 'overview', 'cta_secondary',  'CTA Secondary Button', 'See it in action',       'text'),
  ('blood', 'classification', 'badge',    'Section Badge',        'AI-Powered Classification','text'),
  ('blood', 'classification', 'title',    'Section Title',        'Deeper Blood',           'text'),
  ('blood', 'classification', 'title_highlight','Section Title Highlight (gradient)','Morphology Classification','text'),
  ('blood', 'classification', 'subtitle', 'Section Subtitle',     'Powered by our latest AI model, continuously improving with regular updates.', 'text'),
  ('blood', 'clinical_images', 'badge',   'Section Badge',        'Clinical Images',        'text'),
  ('blood', 'clinical_images', 'title_highlight','Section Title Highlight (gradient)','True-to-life Images','text'),
  ('blood', 'clinical_images', 'subtitle','Section Subtitle',     'Review your report and verify the images with confidence - and tap into Awalife''s clinical specialists whenever needed.', 'text'),
  ('blood', 'cta',  'title',              'CTA Title',            'Interested in Our Products?', 'text'),
  ('blood', 'cta',  'body',               'CTA Body',             'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── URINE ANALYSIS ───────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('urine', 'hero',  'title',             'Page Title',           'Urine Sediment Analysis','text'),
  ('urine', 'hero',  'subtitle',          'Page Subtitle',        'Comprehensive results. Expedited clinical decisions.', 'text'),
  ('urine', 'overview', 'badge',          'Section Badge',        'Urine Analysis',         'text'),
  ('urine', 'overview', 'title',          'Section Title',        'Standardized Urine Sediment Review', 'text'),
  ('urine', 'overview', 'title_highlight','Section Title Highlight (gradient)','Images and Counts','text'),
  ('urine', 'overview', 'body',           'Body Text',            'Awalife brings a repeatable, clinic-ready workflow for urine formed elements. From sample processing to imaging and AI-assisted recognition, results are delivered as review-ready reports with images and quantified outputs, helping teams work faster and more consistently.', 'text'),
  ('urine', 'overview', 'cta_primary',    'CTA Primary Button',   'Contact us',             'text'),
  ('urine', 'overview', 'cta_secondary',  'CTA Secondary Button', 'See it in action',       'text'),
  ('urine', 'classification', 'badge',    'Section Badge',        'AI-Powered Analysis',    'text'),
  ('urine', 'classification', 'title',    'Section Title',        'Make Urine Sediment',    'text'),
  ('urine', 'classification', 'title_highlight','Section Title Highlight (gradient)','Consistent','text'),
  ('urine', 'classification', 'subtitle', 'Section Subtitle',     'Powered by our latest AI model, continuously improving with regular updates.', 'text'),
  ('urine', 'clinical_images', 'badge',   'Section Badge',        'Clinical Images',        'text'),
  ('urine', 'clinical_images', 'title_highlight','Section Title Highlight (gradient)','True-to-life Images','text'),
  ('urine', 'clinical_images', 'subtitle','Section Subtitle',     'Review your report and verify the images with confidence - and tap into Awalife''s clinical specialists whenever needed.', 'text'),
  ('urine', 'cta',  'title',              'CTA Title',            'Interested in Our Products?', 'text'),
  ('urine', 'cta',  'body',               'CTA Body',             'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── FECES ANALYSIS ───────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('feces', 'hero',  'title',             'Page Title',           'Feces Analysis',         'text'),
  ('feces', 'hero',  'subtitle',          'Page Subtitle',        'From repetitive inefficiency to simple efficiency', 'text'),
  ('feces', 'overview', 'badge',          'Section Badge',        'Fecal Analysis',         'text'),
  ('feces', 'overview', 'title',          'Section Title',        'Slide-free Fecal Analysis', 'text'),
  ('feces', 'overview', 'title_highlight','Section Title Highlight (gradient)','Results within 30 Minutes','text'),
  ('feces', 'overview', 'body',           'Body Text',            'Awalife streamlines fecal screening with a slide-free workflow and two sampling options, delivering review-ready images and actionable findings in under 30 minutes - designed for consistent interpretation and documentation.', 'text'),
  ('feces', 'overview', 'cta_primary',    'CTA Primary Button',   'Contact us',             'text'),
  ('feces', 'overview', 'cta_secondary',  'CTA Secondary Button', 'See it in action',       'text'),
  ('feces', 'classification', 'badge',    'Section Badge',        'AI-Powered Analysis',    'text'),
  ('feces', 'classification', 'title',    'Section Title',        'AI-Powered',             'text'),
  ('feces', 'classification', 'title_highlight','Section Title Highlight (gradient)','Fecal Analysis','text'),
  ('feces', 'classification', 'subtitle', 'Section Subtitle',     'Powered by our latest AI model, continuously improving with regular updates.', 'text'),
  ('feces', 'clinical_images', 'badge',   'Section Badge',        'Clinical Images',        'text'),
  ('feces', 'clinical_images', 'title_highlight','Section Title Highlight (gradient)','True-to-life Images','text'),
  ('feces', 'clinical_images', 'subtitle','Section Subtitle',     'Review your report and verify the images with confidence - and tap into Awalife''s clinical specialists whenever needed.', 'text'),
  ('feces', 'cta',  'title',              'CTA Title',            'Interested in Our Products?', 'text'),
  ('feces', 'cta',  'body',               'CTA Body',             'Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic''s needs.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── PLEURAL EFFUSION ─────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('pleural', 'hero',  'title',             'Page Title',    'Pleural Effusion Analysis',  'text'),
  ('pleural', 'hero',  'subtitle',          'Page Subtitle', 'Comprehensive body fluid cytology for accurate diagnosis', 'text'),
  ('pleural', 'overview', 'badge',          'Section Badge', 'Body Fluid Analysis',        'text'),
  ('pleural', 'overview', 'title',          'Section Title', 'Review-ready Morphology in a','text'),
  ('pleural', 'overview', 'title_highlight','Section Title Highlight (gradient)','Standardized Workflow','text'),
  ('pleural', 'overview', 'body',           'Body Text',     'Awalife helps standardize pleural and abdominal effusion review by combining high-quality microscopy imaging with AI-assisted morphology recognition. Results are delivered as a review-ready report with images and structured findings, including up to 19 reportable items.', 'text'),
  ('pleural', 'overview', 'cta_primary',    'CTA Button',    'Contact us',                 'text'),
  ('pleural', 'classification', 'badge',    'Section Badge', 'Cell Counting',              'text'),
  ('pleural', 'classification', 'title',    'Section Title', 'Morphology-based',           'text'),
  ('pleural', 'classification', 'title_highlight','Section Title Highlight (gradient)','TNCC Enumeration','text'),
  ('pleural', 'classification', 'subtitle', 'Section Subtitle', 'In many workflows, TNCC is approximated using total WBC counts, which can overlook non-WBC formed elements and introduce variability across operators and methods. Awalife takes a morphology-first approach: it captures true-to-life microscopy images and performs morphology-based TNCC enumeration, counting nucleated cells based on what is actually present in the sample.', 'text'),
  ('pleural', 'clinical_images', 'badge',   'Section Badge', 'Clinical Images',            'text'),
  ('pleural', 'clinical_images', 'title_highlight','Section Title Highlight (gradient)','True-to-life Images','text'),
  ('pleural', 'clinical_images', 'subtitle','Section Subtitle', 'Review your report and verify the images with confidence - and tap into Awalife''s clinical specialists whenever needed.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── EXOTIC ANIMALS ───────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('exotic', 'hero',  'title',             'Page Title',    'Exotics, Small Mammals & Large Animals', 'text'),
  ('exotic', 'hero',  'subtitle',          'Page Subtitle', 'Supporting more species with review-ready morphology', 'text'),
  ('exotic', 'overview', 'badge',          'Section Badge', 'Multi-Species Support',      'text'),
  ('exotic', 'overview', 'title',          'Section Title', 'Exotics, Small Mammals &',   'text'),
  ('exotic', 'overview', 'title_highlight','Section Title Highlight (gradient)','Large Animals','text'),
  ('exotic', 'overview', 'body',           'Body Text',     'Awalife extends morphology-first, AI-assisted analysis beyond dogs and cats—supporting a wider range of species with review-ready reports that combine images and quantitative results. Capabilities may vary by species and sample type.', 'text'),
  ('exotic', 'overview', 'cta_primary',    'CTA Button',    'Contact us',                 'text'),
  ('exotic', 'species', 'title_highlight',    'Species Title Highlight (gradient)', 'Large Animals', 'text'),
  ('exotic', 'low_volume', 'title_highlight', 'Low Volume Title Highlight (gradient)', 'CBC Testing', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── AI ANALYZER ──────────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('ai-analyzer', 'hero',     'name',        'Product Name',    'AI Series Morphology Analyzer', 'text'),
  ('ai-analyzer', 'hero',     'tagline',     'Product Tagline', 'AI-powered morphology analyzer for veterinary diagnostics', 'text'),
  ('ai-analyzer', 'overview', 'description', 'Overview Description', 'Awalife AI Series Morphology Analyzer combines high-resolution imaging with AI-assisted morphology recognition to deliver standardized, review-ready reports across blood, urine, feces, and body fluid samples.', 'text'),
  ('ai-analyzer', 'workflow', 'step_1_label','Step 1 Label',    'Load and prepare',       'text'),
  ('ai-analyzer', 'workflow', 'step_1_desc', 'Step 1 Description','Simple sample prep with guided steps for blood, urine, feces, and effusion samples.','text'),
  ('ai-analyzer', 'workflow', 'step_1_gif',  'Step 1 GIF/Image URL','',                  'text'),
  ('ai-analyzer', 'workflow', 'step_1_gif_alt','Step 1 Image Alt Text','Load and prepare workflow','text'),
  ('ai-analyzer', 'workflow', 'step_2_label','Step 2 Label',    'AI morphological scan',  'text'),
  ('ai-analyzer', 'workflow', 'step_2_desc', 'Step 2 Description','High-resolution imaging and AI recognition identify cells and elements in minutes.','text'),
  ('ai-analyzer', 'workflow', 'step_2_gif',  'Step 2 GIF/Image URL','',                  'text'),
  ('ai-analyzer', 'workflow', 'step_2_gif_alt','Step 2 Image Alt Text','AI morphological scan','text'),
  ('ai-analyzer', 'workflow', 'step_3_label','Step 3 Label',    'Standardized report',    'text'),
  ('ai-analyzer', 'workflow', 'step_3_desc', 'Step 3 Description','Multi-parameter results with references, annotations, and share-ready outputs.','text'),
  ('ai-analyzer', 'workflow', 'step_3_gif',  'Step 3 GIF/Image URL','',                  'text'),
  ('ai-analyzer', 'workflow', 'step_3_gif_alt','Step 3 Image Alt Text','Standardized report','text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── DM-03 MICROSCOPE ─────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('dm-03', 'hero',     'name',        'Product Name',    'DM-03 Microscope Workstation', 'text'),
  ('dm-03', 'hero',     'tagline',     'Product Tagline', 'Professional veterinary microscopy with one-click reporting', 'text'),
  ('dm-03', 'overview', 'description', 'Overview Description', 'Awalife Microscope Workstation is more than a standard veterinary microscope—it brings imaging, measurement, cell counting, and documentation into one streamlined workflow. With built-in software to add scale bars, annotate findings, and generate a report in one click, it helps clinics capture consistent results with less manual effort. An embedded teaching image library also makes onboarding faster and day-to-day training easier.', 'text'),
  ('dm-03', 'sample_types', 'label_1', 'Sample Type 1',  'Urine',                       'text'),
  ('dm-03', 'sample_types', 'label_2', 'Sample Type 2',  'Fecal',                       'text'),
  ('dm-03', 'sample_types', 'label_3', 'Sample Type 3',  'Ear Canal',                   'text'),
  ('dm-03', 'sample_types', 'label_4', 'Sample Type 4',  'Blood',                       'text'),
  ('dm-03', 'sample_types', 'label_5', 'Sample Type 5',  'Skin',                        'text'),
  ('dm-03', 'sample_types', 'label_6', 'Sample Type 6',  'Tissue',                      'text'),
  ('dm-03', 'sample_types', 'label_7', 'Sample Type 7',  'Serous Cavity',               'text'),
  ('dm-03', 'sample_types', 'label_8', 'Sample Type 8',  'Effusion',                    'text'),
  ('dm-03', 'hardware', 'feat_1_title','Feature 1 Title', 'Infinity Optical System',     'text'),
  ('dm-03', 'hardware', 'feat_1_desc', 'Feature 1 Description', 'It delivers clear, high-quality imaging with minimal chromatic aberration, ensuring accurate and detailed observation.', 'text'),
  ('dm-03', 'hardware', 'feat_2_title','Feature 2 Title', 'High-Brightness LED Light Source', 'text'),
  ('dm-03', 'hardware', 'feat_2_desc', 'Feature 2 Description', 'It provides a uniform cold light illumination, ensuring clear visibility while offering an extended lifespan.', 'text'),
  ('dm-03', 'hardware', 'feat_3_title','Feature 3 Title', '4K HD Camera',               'text'),
  ('dm-03', 'hardware', 'feat_3_desc', 'Feature 3 Description', 'It delivers ultra-high-definition imaging and supports efficient digital management for precise observation and record-keeping.', 'text'),
  ('dm-03', 'hardware', 'feat_4_title','Feature 4 Title', 'Swivel Eyepiece Tube',       'text'),
  ('dm-03', 'hardware', 'feat_4_desc', 'Feature 4 Description', 'It provides comfortable viewing, helping to reduce eye strain during extended use.', 'text'),
  ('dm-03', 'image_hub', 'bullet_1',  'Image Hub Bullet 1', 'Compatible with Leica and Olympus microscopes (models as applicable)', 'text'),
  ('dm-03', 'image_hub', 'bullet_2',  'Image Hub Bullet 2', 'Plug-and-play connection to PC', 'text'),
  ('dm-03', 'image_hub', 'bullet_3',  'Image Hub Bullet 3', 'Unlock user friendly software: capture, measure, annotate, count, report', 'text'),
  ('dm-03', 'image_hub', 'bullet_4',  'Image Hub Bullet 4', 'Standardize documentation across users and sites', 'text'),
  ('dm-03', 'image_hub', 'bullet_5',  'Image Hub Bullet 5', 'Built-in teaching image library for onboarding', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── CONTACT ──────────────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('contact', 'hero', 'badge',        'Section Badge',   'Get in Touch', 'text'),
  ('contact', 'hero', 'description',  'Description',     'If you''re interested in learning more about Awalife''s products or exploring potential business opportunities, feel free to reach out and we''ll respond as soon as possible.', 'text'),
  ('contact', 'hero', 'support_text', 'Support Text',    'Our dedicated customer support team is always ready to assist you:', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── NEWS ─────────────────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('news', 'hero', 'badge',       'Section Badge', 'Get Updates', 'text'),
  ('news', 'hero', 'description', 'Description',   'Explore company updates, product announcements, and industry events to stay informed on Awalife''s latest milestones and innovations.', 'text')
ON CONFLICT (page, section, key) DO NOTHING;

-- ─── FOOTER ───────────────────────────────────────────────────────────────────
INSERT INTO page_content (page, section, key, label, value, type) VALUES
  ('footer', 'tagline', 'text', 'Tagline', 'AI-Powered Veterinary Morphology Diagnostics', 'text')
ON CONFLICT (page, section, key) DO NOTHING;
