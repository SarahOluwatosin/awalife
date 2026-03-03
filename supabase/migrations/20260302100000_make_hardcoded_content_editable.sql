-- Migration: make all hardcoded page content editable via the CMS
-- Adds DB rows for arrays/lists that were previously hardcoded in page components.
-- Components fall back to hardcoded values when these rows are missing, so this
-- migration is safe to run at any time.

INSERT INTO page_content (page, section, key, label, value, type) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- BLOOD ANALYSIS  (page = 'blood')
-- ─────────────────────────────────────────────────────────────────────────────

-- Categories
('blood', 'categories', 'cat_1_title', 'WBC Category Title',
 'WBC: up to 9-part Differential', 'text'),
('blood', 'categories', 'cat_1_desc', 'WBC Category Description',
 'More granular white blood cell differentiation to support deeper review beyond basic differentials.', 'text'),
('blood', 'categories', 'cat_1_items', 'WBC Items (one per line)',
 E'Band Neutrophils (NST#)\nSegmented Neutrophils (NSG#)\nHypersegmented Neutrophils (NSH#)\nSmall Lymphocytes (SLYM# %)\nLarge Lymphocytes (LLYM# %)\nAtypical WBC (AWBC#)', 'text'),

('blood', 'categories', 'cat_2_title', 'RBC Category Title',
 'RBC: up to 7-part Differential', 'text'),
('blood', 'categories', 'cat_2_desc', 'RBC Category Description',
 'Richer red blood cell morphology categories for more informative interpretation and documentation.', 'text'),
('blood', 'categories', 'cat_2_items', 'RBC Items (one per line)',
 E'Reticulocytes (RET# RET%)\nNucleated RBC (NRBC# NRBC/WBC)\nGhost Cells (ETG# ETG%)\nSpherocytes (SPH# SPH%)\nAcanthocytes (AC#)\nRBC Clump (AGG#)\nHeinz Bodies (HEB# HEB%)', 'text'),

('blood', 'categories', 'cat_3_title', 'Platelet Category Title',
 'Platelet clump recognition', 'text'),
('blood', 'categories', 'cat_3_desc', 'Platelet Category Description',
 'Recognizes platelet clumps and converts clumped platelets into single-platelet equivalents for platelet enumeration.', 'text'),
('blood', 'categories', 'cat_3_items', 'Platelet Items (one per line)',
 E'Total Platelets Count (PLT)\nPlatelets Count (PLT#)\nPlatelets Clump Count (APLT#)', 'text'),

-- How It Works bullets
('blood', 'how_it_works', 'bullet_1', 'How It Works – Bullet 1',
 '10μL blood, allows instant capture of 200,000 to 500,000 cells, with full reports.', 'text'),
('blood', 'how_it_works', 'bullet_2', 'How It Works – Bullet 2',
 'Nano-precision optic swiftly captures 1000+ fields within 8 minutes.', 'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- FECES ANALYSIS  (page = 'feces')
-- ─────────────────────────────────────────────────────────────────────────────

-- Categories
('feces', 'categories', 'cat_1_title', 'Category 1 Title',
 'Intestinal Protozoa', 'text'),
('feces', 'categories', 'cat_1_items', 'Category 1 Items (one per line)',
 E'TRI (Trichomonas)\nGIA (Giardia)\nGIT (Giardia Trophozoite)\nGIC (Giardia Cyst)\nCOC (Coccidia)', 'text'),

('feces', 'categories', 'cat_2_title', 'Category 2 Title',
 'Pathogen', 'text'),
('feces', 'categories', 'cat_2_items', 'Category 2 Items (one per line)',
 E'COS (Cocci)\nBAC (Bacillus)\nSPR (Spirochetes)\nHEL (Helicobacter)\nYEA (Yeast)', 'text'),

('feces', 'categories', 'cat_3_title', 'Category 3 Title',
 'Parasite', 'text'),
('feces', 'categories', 'cat_3_items', 'Category 3 Items (one per line)',
 E'ASC (Roundworm)\nHOO (Hookworm)\nTAP (Tapeworm)\nSPI (Spirometra)\nWHP (Whipworm)', 'text'),

('feces', 'categories', 'cat_4_title', 'Category 4 Title',
 'Cells', 'text'),
('feces', 'categories', 'cat_4_items', 'Category 4 Items (one per line)',
 E'RBC\nWBC\nEPC (Epithelial Cell)', 'text'),

('feces', 'categories', 'cat_5_title', 'Category 5 Title',
 'Digestive Function', 'text'),
('feces', 'categories', 'cat_5_items', 'Category 5 Items (one per line)',
 E'STA (Starch Granule)\nFAT (Lipid Droplet)\nPLN (Plant Fiber)\nMUS (Muscle Fiber)', 'text'),

-- Direct Sampling bullets
('feces', 'direct_sampling', 'bullet_1', 'Direct Sampling – Bullet 1',
 'Broader coverage with more reportable parameters/findings.', 'text'),
('feces', 'direct_sampling', 'bullet_2', 'Direct Sampling – Bullet 2',
 'Best for: Routine screening and fast workflow.', 'text'),
('feces', 'direct_sampling', 'bullet_3', 'Direct Sampling – Bullet 3',
 'Recommended when: You want a quick, comprehensive review with minimal preparation.', 'text'),

-- Flotation bullets
('feces', 'flotation', 'bullet_1', 'Flotation – Bullet 1',
 'Uses a horizontal centrifuge to concentrate eggs/cysts.', 'text'),
('feces', 'flotation', 'bullet_2', 'Flotation – Bullet 2',
 'Best for: Targeted parasite enrichment and low-burden/intermittent shedding cases.', 'text'),
('feces', 'flotation', 'bullet_3', 'Flotation – Bullet 3',
 'Key advantage: Improved recovery of common parasites, especially: Roundworm eggs, Hookworm eggs, Tapeworm eggs, Whipworm eggs, Coccidia oocysts, Giardia cysts.', 'text'),
('feces', 'flotation', 'bullet_4', 'Flotation – Bullet 4',
 'Recommended when: The sample is low concentration, or parasite enrichment is clinically important.', 'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- URINE ANALYSIS  (page = 'urine')
-- ─────────────────────────────────────────────────────────────────────────────

-- Categories
('urine', 'categories', 'cat_1_title', 'Category 1 Title',
 'Crystal', 'text'),
('urine', 'categories', 'cat_1_items', 'Category 1 Items (one per line)',
 E'MAP (Struvite Crystal)\nCOM (Calcium Oxalate Monohydrate Crystal)\nCOD (Calcium Oxalate Dihydrate Crystal)\nCAP (Calcium Phosphate Crystal)\nUAC (Uric Acid Crystal)\nCYS (Cystine Crystal)\nBIL (Bilirubin Crystal)\nAMU (Ammonium Urate Crystal)', 'text'),

('urine', 'categories', 'cat_2_title', 'Category 2 Title',
 'Cells', 'text'),
('urine', 'categories', 'cat_2_items', 'Category 2 Items (one per line)',
 E'RBC\nWBC\nRTE (Renal Tubular Epithelial Cell)\nSEC (Squamous Epithelial Cell)\nTEC (Transitional Epithelial Cell)\nSPE (Sperm)', 'text'),

('urine', 'categories', 'cat_3_title', 'Category 3 Title',
 'Casts', 'text'),
('urine', 'categories', 'cat_3_items', 'Category 3 Items (one per line)',
 E'HYA (Hyaline Cast)\nCEC (Cellular Cast)\nGRA (Granular Cast)\nWAX (Waxy Cast)', 'text'),

('urine', 'categories', 'cat_4_title', 'Category 4 Title',
 'Pathogen', 'text'),
('urine', 'categories', 'cat_4_items', 'Category 4 Items (one per line)',
 E'COC (Cocci)\nBAC (Rods)\nYEA (Yeast)', 'text'),

('urine', 'categories', 'cat_5_title', 'Category 5 Title',
 'Others', 'text'),
('urine', 'categories', 'cat_5_items', 'Category 5 Items (one per line)',
 E'FAT (Lipid Droplet)\nMUH (Mucus Filament)', 'text'),

-- How It Works bullets
('urine', 'how_it_works', 'bullet_1', 'How It Works – Bullet 1',
 'Focus particles help the system rapidly lock focus on formed elements, minimizing manual adjustments.', 'text'),
('urine', 'how_it_works', 'bullet_2', 'How It Works – Bullet 2',
 'Centrifugation is optional for routine samples.', 'text'),
('urine', 'how_it_works', 'bullet_3', 'How It Works – Bullet 3',
 'For very dilute/clear urine, centrifugation is recommended to concentrate formed elements.', 'text'),
('urine', 'how_it_works', 'bullet_4', 'How It Works – Bullet 4',
 'For very turbid samples or hematuria, dilution is recommended to improve imaging and recognition.', 'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- EXOTIC ANIMALS  (page = 'exotic')
-- ─────────────────────────────────────────────────────────────────────────────

-- Low Volume bullets
('exotic', 'low_volume', 'bullet_1', 'Low Volume – Bullet 1',
 'A safer diagnostic experience for animals.', 'text'),
('exotic', 'low_volume', 'bullet_2', 'Low Volume – Bullet 2',
 'A more efficient diagnostic workflow.', 'text'),

-- Species table – column headers
('exotic', 'species_table', 'col_1', 'Column 1 Header',
 'Companion & Small Mammals', 'text'),
('exotic', 'species_table', 'col_2', 'Column 2 Header',
 'Avian', 'text'),
('exotic', 'species_table', 'col_3', 'Column 3 Header',
 'Reptile', 'text'),
('exotic', 'species_table', 'col_4', 'Column 4 Header',
 'Livestock & Large Animals', 'text'),

-- Species table – row 1 (Blood)
('exotic', 'species_table', 'row_1_label', 'Row 1 Label', 'Blood', 'text'),
('exotic', 'species_table', 'row_1_col1', 'Row 1 – Col 1 Value', '+', 'text'),
('exotic', 'species_table', 'row_1_col2', 'Row 1 – Col 2 Value', '+', 'text'),
('exotic', 'species_table', 'row_1_col3', 'Row 1 – Col 3 Value', '+', 'text'),
('exotic', 'species_table', 'row_1_col4', 'Row 1 – Col 4 Value', '+', 'text'),

-- Species table – row 2 (Feces)
('exotic', 'species_table', 'row_2_label', 'Row 2 Label', 'Feces', 'text'),
('exotic', 'species_table', 'row_2_col1', 'Row 2 – Col 1 Value', 'Dog, Cat', 'text'),
('exotic', 'species_table', 'row_2_col2', 'Row 2 – Col 2 Value', '/', 'text'),
('exotic', 'species_table', 'row_2_col3', 'Row 2 – Col 3 Value', '/', 'text'),
('exotic', 'species_table', 'row_2_col4', 'Row 2 – Col 4 Value', '/', 'text'),

-- Species table – row 3 (Urine)
('exotic', 'species_table', 'row_3_label', 'Row 3 Label', 'Urine', 'text'),
('exotic', 'species_table', 'row_3_col1', 'Row 3 – Col 1 Value', 'Dog, Cat', 'text'),
('exotic', 'species_table', 'row_3_col2', 'Row 3 – Col 2 Value', '/', 'text'),
('exotic', 'species_table', 'row_3_col3', 'Row 3 – Col 3 Value', '/', 'text'),
('exotic', 'species_table', 'row_3_col4', 'Row 3 – Col 4 Value', '/', 'text'),

-- Species table – row 4 (Fluid)
('exotic', 'species_table', 'row_4_label', 'Row 4 Label', 'Fluid', 'text'),
('exotic', 'species_table', 'row_4_col1', 'Row 4 – Col 1 Value', 'Dog, Cat', 'text'),
('exotic', 'species_table', 'row_4_col2', 'Row 4 – Col 2 Value', '/', 'text'),
('exotic', 'species_table', 'row_4_col3', 'Row 4 – Col 3 Value', '/', 'text'),
('exotic', 'species_table', 'row_4_col4', 'Row 4 – Col 4 Value', '/', 'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- AI SERIES MORPHOLOGY ANALYZER  (page = 'ai-analyzer')
-- ─────────────────────────────────────────────────────────────────────────────

-- Capabilities
('ai-analyzer', 'capabilities', 'cap_1_title', 'Capability 1 Title', 'Multi-Sample Analysis', 'text'),
('ai-analyzer', 'capabilities', 'cap_1_desc',  'Capability 1 Description', 'Blood, urine, feces, and body fluid samples in one workflow.', 'text'),
('ai-analyzer', 'capabilities', 'cap_2_title', 'Capability 2 Title', 'Multi-Species Support', 'text'),
('ai-analyzer', 'capabilities', 'cap_2_desc',  'Capability 2 Description', 'Companion animals, small mammals, avian species, reptiles, and more.', 'text'),
('ai-analyzer', 'capabilities', 'cap_3_title', 'Capability 3 Title', 'True-to-Life Microscopy Imaging', 'text'),
('ai-analyzer', 'capabilities', 'cap_3_desc',  'Capability 3 Description', 'High-resolution imaging for diagnostic-level clarity.', 'text'),
('ai-analyzer', 'capabilities', 'cap_4_title', 'Capability 4 Title', 'AI-Assisted Recognition & Counting', 'text'),
('ai-analyzer', 'capabilities', 'cap_4_desc',  'Capability 4 Description', 'Rapid classification with automated quantification.', 'text'),
('ai-analyzer', 'capabilities', 'cap_5_title', 'Capability 5 Title', 'Continuous AI Improvement', 'text'),
('ai-analyzer', 'capabilities', 'cap_5_desc',  'Capability 5 Description', 'Models improve with real-world data and iteration.', 'text'),
('ai-analyzer', 'capabilities', 'cap_6_title', 'Capability 6 Title', 'Three-Step Sample Preparation', 'text'),
('ai-analyzer', 'capabilities', 'cap_6_desc',  'Capability 6 Description', 'Streamlined prep from sample to result.', 'text'),
('ai-analyzer', 'capabilities', 'cap_7_title', 'Capability 7 Title', 'Microfluidic Cell Layering', 'text'),
('ai-analyzer', 'capabilities', 'cap_7_desc',  'Capability 7 Description', 'Consistent smearing and staining quality.', 'text'),
('ai-analyzer', 'capabilities', 'cap_8_title', 'Capability 8 Title', 'Comprehensive Reporting', 'text'),
('ai-analyzer', 'capabilities', 'cap_8_desc',  'Capability 8 Description', 'Images, annotations, and quantitative results included.', 'text'),
('ai-analyzer', 'capabilities', 'cap_9_title', 'Capability 9 Title', 'LIS Integration', 'text'),
('ai-analyzer', 'capabilities', 'cap_9_desc',  'Capability 9 Description', 'Connects to lab systems for seamless data exchange.', 'text'),

-- Workflow steps
('ai-analyzer', 'workflow', 'step_1_label', 'Workflow Step 1 Label', 'Load and prepare', 'text'),
('ai-analyzer', 'workflow', 'step_1_desc',  'Workflow Step 1 Description', 'Simple sample prep with guided steps for blood, urine, feces, and effusion samples.', 'text'),
('ai-analyzer', 'workflow', 'step_2_label', 'Workflow Step 2 Label', 'AI morphological scan', 'text'),
('ai-analyzer', 'workflow', 'step_2_desc',  'Workflow Step 2 Description', 'High-resolution imaging and AI recognition identify cells and elements in minutes.', 'text'),
('ai-analyzer', 'workflow', 'step_3_label', 'Workflow Step 3 Label', 'Standardized report', 'text'),
('ai-analyzer', 'workflow', 'step_3_desc',  'Workflow Step 3 Description', 'Multi-parameter results with references, annotations, and share-ready outputs.', 'text'),

-- FAQ
('ai-analyzer', 'faq', 'q1', 'FAQ 1 Question', 'What sample types can the AI Series Morphology Analyzer process?', 'text'),
('ai-analyzer', 'faq', 'a1', 'FAQ 1 Answer', 'It supports blood, urine, feces, and body fluid samples with standardized preparation and analysis steps.', 'text'),
('ai-analyzer', 'faq', 'q2', 'FAQ 2 Question', 'How long does a typical analysis take?', 'text'),
('ai-analyzer', 'faq', 'a2', 'FAQ 2 Answer', 'Most workflows complete within minutes, depending on sample type and required parameters.', 'text'),
('ai-analyzer', 'faq', 'q3', 'FAQ 3 Question', 'Does the system support multi-species diagnostics?', 'text'),
('ai-analyzer', 'faq', 'a3', 'FAQ 3 Answer', 'Yes. It is designed for companion animals and supports a broad range of exotic species and livestock.', 'text'),
('ai-analyzer', 'faq', 'q4', 'FAQ 4 Question', 'Can reports be integrated with LIS systems?', 'text'),
('ai-analyzer', 'faq', 'a4', 'FAQ 4 Answer', 'Yes. The platform supports LIS integration for efficient data exchange and reporting.', 'text'),

-- ─────────────────────────────────────────────────────────────────────────────
-- DM-03 MICROSCOPE WORKSTATION  (page = 'dm-03')
-- ─────────────────────────────────────────────────────────────────────────────

-- Capabilities
('dm-03', 'capabilities', 'cap_1_title', 'Capability 1 Title', 'High-Performance Hardware', 'text'),
('dm-03', 'capabilities', 'cap_1_desc',  'Capability 1 Description', 'Infinity optics, 4K imaging, and stable illumination for clarity.', 'text'),
('dm-03', 'capabilities', 'cap_2_title', 'Capability 2 Title', 'Workflow Software', 'text'),
('dm-03', 'capabilities', 'cap_2_desc',  'Capability 2 Description', 'Capture, measure, annotate, count, and report in one streamlined flow.', 'text'),
('dm-03', 'capabilities', 'cap_3_title', 'Capability 3 Title', 'One-Click Reporting', 'text'),
('dm-03', 'capabilities', 'cap_3_desc',  'Capability 3 Description', 'Generate standardized reports with images and measurements.', 'text'),
('dm-03', 'capabilities', 'cap_4_title', 'Capability 4 Title', 'Teaching Image Library', 'text'),
('dm-03', 'capabilities', 'cap_4_desc',  'Capability 4 Description', 'Built-in library supports faster onboarding and training.', 'text'),

-- Hardware features
('dm-03', 'hardware', 'feat_1_title', 'Hardware Feature 1 Title', 'Infinity Optical System', 'text'),
('dm-03', 'hardware', 'feat_1_desc',  'Hardware Feature 1 Description', 'It delivers clear, high-quality imaging with minimal chromatic aberration, ensuring accurate and detailed observation.', 'text'),
('dm-03', 'hardware', 'feat_2_title', 'Hardware Feature 2 Title', 'High-Brightness LED Light Source', 'text'),
('dm-03', 'hardware', 'feat_2_desc',  'Hardware Feature 2 Description', 'It provides a uniform cold light illumination, ensuring clear visibility while offering an extended lifespan.', 'text'),
('dm-03', 'hardware', 'feat_3_title', 'Hardware Feature 3 Title', '4K HD Camera', 'text'),
('dm-03', 'hardware', 'feat_3_desc',  'Hardware Feature 3 Description', 'It delivers ultra-high-definition imaging and supports efficient digital management for precise observation and record-keeping.', 'text'),
('dm-03', 'hardware', 'feat_4_title', 'Hardware Feature 4 Title', 'Swivel Eyepiece Tube', 'text'),
('dm-03', 'hardware', 'feat_4_desc',  'Hardware Feature 4 Description', 'It provides comfortable viewing, helping to reduce eye strain during extended use.', 'text'),

-- Image Hub bullets
('dm-03', 'image_hub', 'bullet_1', 'Image Hub – Bullet 1', 'Compatible with Leica and Olympus microscopes (models as applicable)', 'text'),
('dm-03', 'image_hub', 'bullet_2', 'Image Hub – Bullet 2', 'Plug-and-play connection to PC', 'text'),
('dm-03', 'image_hub', 'bullet_3', 'Image Hub – Bullet 3', 'Unlock user friendly software: capture, measure, annotate, count, report', 'text'),
('dm-03', 'image_hub', 'bullet_4', 'Image Hub – Bullet 4', 'Standardize documentation across users and sites', 'text'),
('dm-03', 'image_hub', 'bullet_5', 'Image Hub – Bullet 5', 'Built-in teaching image library for onboarding', 'text'),

-- Sample type labels
('dm-03', 'sample_types', 'label_1', 'Sample Type 1 Label', 'Urine', 'text'),
('dm-03', 'sample_types', 'label_2', 'Sample Type 2 Label', 'Fecal', 'text'),
('dm-03', 'sample_types', 'label_3', 'Sample Type 3 Label', 'Ear Canal', 'text'),
('dm-03', 'sample_types', 'label_4', 'Sample Type 4 Label', 'Blood', 'text'),
('dm-03', 'sample_types', 'label_5', 'Sample Type 5 Label', 'Skin', 'text'),
('dm-03', 'sample_types', 'label_6', 'Sample Type 6 Label', 'Tissue', 'text'),
('dm-03', 'sample_types', 'label_7', 'Sample Type 7 Label', 'Serous Cavity', 'text'),
('dm-03', 'sample_types', 'label_8', 'Sample Type 8 Label', 'Effusion', 'text'),

-- FAQ
('dm-03', 'faq', 'q1', 'FAQ 1 Question', 'What is the DM-03 Microscope Workstation?', 'text'),
('dm-03', 'faq', 'a1', 'FAQ 1 Answer', 'DM-03 Microscope Workstation is a microscope workstation equipped with a 4K camera and an intelligent system for one-click capture, reporting, annotation, counting, and measurement.', 'text'),
('dm-03', 'faq', 'q2', 'FAQ 2 Question', 'What are the key benefits of the DM-03 Microscope Workstation?', 'text'),
('dm-03', 'faq', 'a2', 'FAQ 2 Answer', 'Faster documentation, automated reports, a built-in reference library (542+ canine/feline images), SOP support, and improved communication, training, and collaboration.', 'text'),
('dm-03', 'faq', 'q3', 'FAQ 3 Question', 'Can I buy only the camera module?', 'text'),
('dm-03', 'faq', 'a3', 'FAQ 3 Answer', 'Yes. If you have an infinity optical microscope, the camera module can be customized and supplied separately.', 'text'),
('dm-03', 'faq', 'q4', 'FAQ 4 Question', 'What tools are included?', 'text'),
('dm-03', 'faq', 'a4', 'FAQ 4 Answer', 'Cell counting, multi-shape annotation, real-time measurement with a digital scale, customizable templates, and multi-account management.', 'text'),
('dm-03', 'faq', 'q5', 'FAQ 5 Question', 'Can I upload my own SOPs or reference images?', 'text'),
('dm-03', 'faq', 'a5', 'FAQ 5 Answer', 'Yes. DM-03 Microscope Workstation supports personalized uploads of reference images, videos, and SOPs.', 'text')

ON CONFLICT (page, section, key) DO NOTHING;
