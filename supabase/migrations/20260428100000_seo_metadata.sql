-- Seed SEO (TDK) rows into page_content using section='seo'
-- keys: title, description, keywords
-- These are editable via the existing CMS admin (Content > any page > SEO section)

INSERT INTO page_content (page, section, key, label, value, type) VALUES

-- Home
('home', 'seo', 'title',       'Page Title',       'AWALIFE - AI-Powered Veterinary Diagnostics | Morphology Analysis', 'text'),
('home', 'seo', 'description', 'Meta Description', 'AWALIFE delivers AI-powered veterinary in-vitro diagnostic analyzers for blood, feces, and urine morphology analysis at pet clinics, animal hospitals, and laboratories worldwide.', 'textarea'),
('home', 'seo', 'keywords',    'Meta Keywords',    'veterinary diagnostics, AI morphology analyzer, IVD, blood analysis, feces analysis, urine analysis, AWALIFE, AI-100Vet, animal hospital equipment', 'text'),

-- About
('about', 'seo', 'title',       'Page Title',       'About AWALIFE | AI-Powered Veterinary Diagnostics Company', 'text'),
('about', 'seo', 'description', 'Meta Description', 'Learn about AWALIFE and our mission to transform veterinary morphology diagnostics with AI-powered in-vitro diagnostic solutions for clinics and hospitals worldwide.', 'textarea'),
('about', 'seo', 'keywords',    'Meta Keywords',    'about AWALIFE, veterinary AI company, IVD manufacturer, animal diagnostic solutions, Shenzhen Anlv Medical Technology', 'text'),

-- Contact
('contact', 'seo', 'title',       'Page Title',       'Contact AWALIFE | Get in Touch with Our Veterinary Diagnostics Team', 'text'),
('contact', 'seo', 'description', 'Meta Description', 'Contact the AWALIFE team for pricing, demonstrations, and technical specifications for our AI-powered veterinary diagnostic analyzers.', 'textarea'),
('contact', 'seo', 'keywords',    'Meta Keywords',    'contact AWALIFE, veterinary diagnostic sales, AI analyzer inquiry, IVD pricing, demo request', 'text'),

-- News / Company News
('news', 'seo', 'title',       'Page Title',       'AWALIFE News | AI-Powered Veterinary Diagnostics Updates', 'text'),
('news', 'seo', 'description', 'Meta Description', 'Stay updated with the latest AWALIFE news, product releases, and advancements in AI-powered veterinary morphology diagnostics.', 'textarea'),
('news', 'seo', 'keywords',    'Meta Keywords',    'AWALIFE news, veterinary diagnostics news, AI analyzer updates, IVD industry news', 'text'),

-- Resources
('resources', 'seo', 'title',       'Page Title',       'AWALIFE Resources | Veterinary Diagnostic Documentation & Reports', 'text'),
('resources', 'seo', 'description', 'Meta Description', 'Download AWALIFE product documentation, clinical reports, and technical resources for our AI-powered veterinary diagnostic analyzers.', 'textarea'),
('resources', 'seo', 'keywords',    'Meta Keywords',    'AWALIFE resources, veterinary diagnostic documentation, clinical reports, AI analyzer specs, IVD brochure', 'text'),

-- Blood Analysis
('blood', 'seo', 'title',       'Page Title',       'AI Blood Morphology Analysis | AWALIFE Veterinary Diagnostics', 'text'),
('blood', 'seo', 'description', 'Meta Description', 'AWALIFE AI-powered blood morphology analysis delivers review-ready CBC differential results for pet clinics and animal hospitals. Accurate, fast, and consistent hematology diagnostics.', 'textarea'),
('blood', 'seo', 'keywords',    'Meta Keywords',    'veterinary blood analysis, AI hematology, CBC differential, blood morphology, animal blood test, AWALIFE blood', 'text'),

-- Urine Analysis
('urine', 'seo', 'title',       'Page Title',       'AI Urine Sediment Analysis | AWALIFE Veterinary Diagnostics', 'text'),
('urine', 'seo', 'description', 'Meta Description', 'AWALIFE AI urine sediment analysis automates microscopic examination for pet clinics, delivering precise urinalysis results without manual microscopy.', 'textarea'),
('urine', 'seo', 'keywords',    'Meta Keywords',    'veterinary urine analysis, AI urinalysis, urine sediment, animal urine test, AWALIFE urine, automated urinalysis', 'text'),

-- Feces Analysis
('feces', 'seo', 'title',       'Page Title',       'AI Fecal Morphology Analysis | AWALIFE Veterinary Diagnostics', 'text'),
('feces', 'seo', 'description', 'Meta Description', 'AWALIFE AI-powered fecal morphology analysis detects parasites, eggs, and cysts with a slide-free workflow. Supports direct and flotation sampling methods.', 'textarea'),
('feces', 'seo', 'keywords',    'Meta Keywords',    'veterinary fecal analysis, AI parasite detection, feces morphology, flotation method, direct sampling, AWALIFE feces', 'text'),

-- Pleural Effusion
('pleural', 'seo', 'title',       'Page Title',       'AI Pleural & Body Fluid Analysis | AWALIFE Veterinary Diagnostics', 'text'),
('pleural', 'seo', 'description', 'Meta Description', 'AWALIFE AI-powered pleural and body fluid cytology analysis provides rapid, accurate cell classification for veterinary clinical decisions.', 'textarea'),
('pleural', 'seo', 'keywords',    'Meta Keywords',    'veterinary pleural effusion, body fluid cytology, AI cell classification, animal fluid analysis, AWALIFE pleural', 'text'),

-- Exotic Animals
('exotic', 'seo', 'title',       'Page Title',       'Exotic Animal Diagnostics | AWALIFE AI Veterinary Analysis', 'text'),
('exotic', 'seo', 'description', 'Meta Description', 'AWALIFE supports exotic and non-traditional animal diagnostics with AI-powered morphology analysis for reptiles, birds, rodents, and more.', 'textarea'),
('exotic', 'seo', 'keywords',    'Meta Keywords',    'exotic animal diagnostics, reptile blood analysis, avian diagnostics, AI morphology exotic, AWALIFE exotic animals', 'text'),

-- AI Analyzer product page
('ai-analyzer', 'seo', 'title',       'Page Title',       'AI Morphology Analyzer (AI-100Vet) | AWALIFE Veterinary Diagnostics', 'text'),
('ai-analyzer', 'seo', 'description', 'Meta Description', 'The AWALIFE AI Morphology Analyzer (AI-100Vet) delivers automated blood, urine, and feces morphology analysis for veterinary clinics worldwide. Slide-free, review-ready results.', 'textarea'),
('ai-analyzer', 'seo', 'keywords',    'Meta Keywords',    'AI-100Vet, AI morphology analyzer, veterinary analyzer, automated diagnostics, AWALIFE product, IVD analyzer', 'text'),

-- DM-03 product page
('dm-03', 'seo', 'title',       'Page Title',       'DM-03 Digital Microscope | AWALIFE Veterinary Diagnostics', 'text'),
('dm-03', 'seo', 'description', 'Meta Description', 'The AWALIFE DM-03 digital microscope delivers high-resolution imaging and AI-assisted morphology review for veterinary laboratories and clinics.', 'textarea'),
('dm-03', 'seo', 'keywords',    'Meta Keywords',    'DM-03 microscope, digital microscope veterinary, AI microscope, AWALIFE DM-03, veterinary laboratory equipment', 'text')

ON CONFLICT (page, section, key) DO NOTHING;
