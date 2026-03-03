-- ─────────────────────────────────────────────────────────────────────────────
-- Seed page_content rows for all remaining hardcoded sections:
--   • Home: about_section, partners, products
--   • About page: story badge/title, journey/principles headers, metrics labels,
--     global badge, vision items (3), core values (4)
--   • Application pages: FAQ Q&As for blood, urine, feces, exotic, pleural
--   • ExoticAnimals: species_coverage, low_volume section headers
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.page_content (page, section, key, label, value, type) VALUES

-- ── HOME / About Section (AboutSection.tsx) ────────────────────────────────
('home', 'about_section', 'badge',        'About Badge',         'About Awalife',            'text'),
('home', 'about_section', 'title',        'About Title',         'World''s First AI-Powered', 'text'),
('home', 'about_section', 'title_highlight', 'About Title Highlight', 'Morphological POCT Platform', 'text'),
('home', 'about_section', 'body_1',       'About Body 1',        'Awalife becomes the first to enable intelligent morphological analysis of various pet samples—advancing the application and standardization of AI technology in pet diagnostic scenarios.', 'text'),
('home', 'about_section', 'body_2',       'About Body 2',        'The best part of our technology is spending less time with it. Save time and streamline your practice with our in-house analyzers.', 'text'),
('home', 'about_section', 'card_1_title', 'Card 1 Title',        'AI-Powered Innovation',   'text'),
('home', 'about_section', 'card_1_desc',  'Card 1 Description',  'Integrates cell morphology, biochemistry, microfluidics, optics, and AI technologies.', 'text'),
('home', 'about_section', 'card_2_title', 'Card 2 Title',        'Multi-Sample Testing',    'text'),
('home', 'about_section', 'card_2_desc',  'Card 2 Description',  'Analyzes blood, feces, urine, and abdominal fluid samples automatically.', 'text'),
('home', 'about_section', 'card_3_title', 'Card 3 Title',        'Fully Automated',         'text'),
('home', 'about_section', 'card_3_desc',  'Card 3 Description',  'Simple sample preparation delivers "sample in, result out" workflow.', 'text'),
('home', 'about_section', 'card_4_title', 'Card 4 Title',        'Multi-Species Support',   'text'),
('home', 'about_section', 'card_4_desc',  'Card 4 Description',  'Supports companion animals, small mammals, and exotic pets.', 'text'),

-- ── HOME / Global Partners Section (GlobalPartnersSection.tsx) ─────────────
('home', 'partners', 'badge', 'Partners Badge', 'Global Partners', 'text'),
('home', 'partners', 'body',  'Partners Body',  'From product design to service processes, Awalife is built for international deployment. With standardized workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams deliver consistent clinical value across regions and practice settings.', 'text'),

-- ── HOME / Products Section (ProductsSection.tsx) ──────────────────────────
('home', 'products', 'badge',         'Products Badge',   'Featured Products', 'text'),
('home', 'products', 'title',         'Products Title',   'Diagnostics Tools Built for', 'text'),
('home', 'products', 'product_1_name','Product 1 Name',   'Awalife AI Series Morphology Analyzer', 'text'),
('home', 'products', 'product_1_desc','Product 1 Description', 'Awalife AI Series Morphology Analyzer is an AI-powered veterinary system that automatically analyzes blood, urine, feces, and body fluids in one workflow. It combines multi-focus imaging, rapid liquid-based staining, AI-assisted morphology recognition, and report generation with true-to-life images and quantitative results—supported by an expandable parameter set for deeper clinical insight.', 'text'),
('home', 'products', 'product_1_cta', 'Product 1 CTA',    'Explore product', 'text'),
('home', 'products', 'product_2_name','Product 2 Name',   'DM-03 Microscope Workstation', 'text'),
('home', 'products', 'product_2_desc','Product 2 Description', 'An integrated imaging and reporting workflow built for veterinary practice. The Awalife Microscope Workstation brings imaging, measurement, cell counting, and documentation into a streamlined workflow with built-in tools to annotate, add scales, and generate reports in one click.', 'text'),
('home', 'products', 'product_2_cta', 'Product 2 CTA',    'Explore product', 'text'),

-- ── ABOUT PAGE — Story section ─────────────────────────────────────────────
('about', 'story',    'badge',   'Story Badge',  'Our Story',                                     'text'),
('about', 'story',    'title',   'Story Title',  'Pioneering',                                    'text'),

-- ── ABOUT PAGE — Global section badge (body already seeded) ────────────────
('about', 'global',   'badge',   'Global Badge', 'Global Reach', 'text'),

-- ── ABOUT PAGE — Metrics labels ───────────────────────────────────────────
('about', 'metrics',  'label_1', 'Metric 1 Label', 'Images for AI Model Training', 'text'),
('about', 'metrics',  'label_2', 'Metric 2 Label', 'Reports Generated',            'text'),
('about', 'metrics',  'label_3', 'Metric 3 Label', 'Installations Worldwide',      'text'),

-- ── ABOUT PAGE — Journey section header ────────────────────────────────────
('about', 'journey',  'badge',   'Journey Badge', 'Our Journey',     'text'),
('about', 'journey',  'title',   'Journey Title', 'Key Moments That', 'text'),
('about', 'journey',  'desc',    'Journey Description', 'From a bold idea in 2020 to a global presence — every milestone reflects our commitment to innovation.', 'text'),

-- ── ABOUT PAGE — Principles section header ─────────────────────────────────
('about', 'principles', 'badge',  'Principles Badge', 'Our Principles',       'text'),
('about', 'principles', 'title',  'Principles Title', 'Our Vision and',       'text'),
('about', 'principles', 'desc',   'Principles Description', 'The guiding principles that drive every decision, product, and partnership at Awalife.', 'text'),

-- ── ABOUT PAGE — Vision items (3) ─────────────────────────────────────────
('about', 'vision', 'item_1_title', 'Vision 1 Title', 'Future-proof Veterinary Diagnostic Tools', 'text'),
('about', 'vision', 'item_1_desc',  'Vision 1 Description', 'Shaping the next generation of veterinary diagnostics through forward-thinking technology.', 'text'),
('about', 'vision', 'item_2_title', 'Vision 2 Title', 'Delivering Innovation to Empower Our Customers', 'text'),
('about', 'vision', 'item_2_desc',  'Vision 2 Description', 'Continuous R&D to provide cutting-edge solutions that drive clinical excellence.', 'text'),
('about', 'vision', 'item_3_title', 'Vision 3 Title', 'Creating Shared Value with Our Customers', 'text'),
('about', 'vision', 'item_3_desc',  'Vision 3 Description', 'Building partnerships where mutual growth leads to better outcomes for all.', 'text'),

-- ── ABOUT PAGE — Core Values (4) ──────────────────────────────────────────
('about', 'values', 'item_1_title', 'Value 1 Title', 'Integrity with Humility', 'text'),
('about', 'values', 'item_1_desc',  'Value 1 Description', 'Honest and grounded in everything we do.', 'text'),
('about', 'values', 'item_2_title', 'Value 2 Title', 'Practical Innovation', 'text'),
('about', 'values', 'item_2_desc',  'Value 2 Description', 'Real-world solutions, not just ideas.', 'text'),
('about', 'values', 'item_3_title', 'Value 3 Title', 'Serving Clients, Growing Together', 'text'),
('about', 'values', 'item_3_desc',  'Value 3 Description', 'Success shared across our community.', 'text'),
('about', 'values', 'item_4_title', 'Value 4 Title', 'Lifelong Learning and Ethical Excellence', 'text'),
('about', 'values', 'item_4_desc',  'Value 4 Description', 'Always evolving with integrity.', 'text'),

-- ── BLOOD ANALYSIS — FAQ ───────────────────────────────────────────────────
('blood', 'faq', 'q1', 'FAQ Question 1', 'Which species are supported for blood analysis?', 'text'),
('blood', 'faq', 'a1', 'FAQ Answer 1',   'Companion animals: Dog, Cat. Small mammals: Rabbit, Chinchilla, Hamster, Rat, Mouse, Ferret, Guinea Pig. Large animals: Alpaca, Camel, Horse, Pig, Cattle, Sheep. Avian: Pigeon, Parrot. Reptiles: Turtle, Snake, Lizard.', 'text'),
('blood', 'faq', 'q2', 'FAQ Question 2', 'What advanced parameters are available beyond a traditional 5-part differential?', 'text'),
('blood', 'faq', 'a2', 'FAQ Answer 2',   '9-part WBC differential, including band neutrophils, segmented neutrophils, hypersegmented neutrophils, large lymphocytes, and atypical leukocytes. Estimated platelet count and large platelet count (may interfere with CBC analyzers). 7-part RBC differential, including reticulocytes, nucleated RBCs, spherocytes, ghost RBCs, Heinz bodies, acanthocytes, and agglutinated RBCs.', 'text'),
('blood', 'faq', 'q3', 'FAQ Question 3', 'How do I choose the sample volume for anemic animals?', 'text'),
('blood', 'faq', 'a3', 'FAQ Answer 3',   'The default volume is 10 µL. If anemia is obvious (e.g., pale mucous membranes) or the sample looks diluted, select 40 µL.', 'text'),
('blood', 'faq', 'q4', 'FAQ Question 4', 'Can blood parasites be detected?', 'text'),
('blood', 'faq', 'a4', 'FAQ Answer 4',   'Coming soon: Heartworm (Dirofilaria immitis) and Hepatozoon.', 'text'),

-- ── URINE ANALYSIS — FAQ ──────────────────────────────────────────────────
('urine', 'faq', 'q1', 'FAQ Question 1', 'Which species are supported for urine analysis?', 'text'),
('urine', 'faq', 'a1', 'FAQ Answer 1',   'Validated for dogs and cats.', 'text'),
('urine', 'faq', 'q2', 'FAQ Question 2', 'What parameters can urine analysis detect?', 'text'),
('urine', 'faq', 'a2', 'FAQ Answer 2',   '23 parameters, including:

Crystal: Struvite, Calcium oxalate monohydrate, Calcium oxalate dihydrate, Calcium phosphate, Uric acid, Cystine, Bilirubin, Ammonium urate

Cast: Hyaline cast, Cellular cast, Granular cast, Waxy cast

Cell: RBC, WBC, Sperm, Renal tubular epithelial cell, Transitional epithelial cell, Squamous epithelial cell

Microorganism: Cocci, Rods, Yeast

Others: Lipid droplets, Mucus', 'text'),
('urine', 'faq', 'q3', 'FAQ Question 3', 'Is the workflow easy to use?', 'text'),
('urine', 'faq', 'a3', 'FAQ Answer 3',   'Yes. Most samples do not require centrifugation. For very clear samples, centrifugation may be considered using the turbidity reference card as guidance.', 'text'),
('urine', 'faq', 'q4', 'FAQ Question 4', 'What are the limitations for certain urine samples?', 'text'),
('urine', 'faq', 'a4', 'FAQ Answer 4',   'Severe hematuria may obscure other components and reduce AI accuracy. Dilution may help, but accuracy is not guaranteed. Microscopic examination is recommended.', 'text'),

-- ── FECES ANALYSIS — FAQ ──────────────────────────────────────────────────
('feces', 'faq', 'q1', 'FAQ Question 1', 'Which species are supported for fecal analysis?', 'text'),
('feces', 'faq', 'a1', 'FAQ Answer 1',   'Validated for dogs and cats.', 'text'),
('feces', 'faq', 'q2', 'FAQ Question 2', 'What sample types are supported?', 'text'),
('feces', 'faq', 'a2', 'FAQ Answer 2',   'Fresh stool, lavage fluid, or anal swab (not recommended).', 'text'),
('feces', 'faq', 'q3', 'FAQ Question 3', 'What can the flotation method detect?', 'text'),
('feces', 'faq', 'a3', 'FAQ Answer 3',   '7 parasite parameters, including:

Eggs: Roundworm, Hookworm, Whipworm, Spirometra, Dipylidium caninum

Protozoa: Giardia cyst, Isospora (coccidia)', 'text'),
('feces', 'faq', 'q4', 'FAQ Question 4', 'What can the direct method detect?', 'text'),
('feces', 'faq', 'a4', 'FAQ Answer 4',   '33 parameters, including:

Parasites: Roundworm, Hookworm, Whipworm, Spirometra, Dipylidium caninum, Alaria alata

Protozoa: Trichomonas, Giardia trophozoite, Giardia cyst, Isospora (coccidia)

Microorganisms: Cocci, rods, cocci/rods ratio, curved rods, spore-forming rods, spirochetes, spiral-shaped rods, yeast

Cells: RBC, WBC, epithelial cells

Digestive contents: Starch granules, muscle fibers, plant fibers, lipid droplets', 'text'),
('feces', 'faq', 'q5', 'FAQ Question 5', 'What is the difference between flotation and direct methods?', 'text'),
('feces', 'faq', 'a5', 'FAQ Answer 5',   'Flotation: Higher sensitivity for parasite eggs/cysts, especially at low egg counts

Direct: Faster and simpler; also evaluates flora, digestion, and cells for quick screening', 'text'),

-- ── EXOTIC ANIMALS — Species Coverage & Low Volume sections ───────────────
('exotic', 'species',    'badge', 'Species Coverage Badge', 'Species Coverage', 'text'),
('exotic', 'species',    'title', 'Species Coverage Title', 'Supporting Species from Small Mammals to', 'text'),
('exotic', 'low_volume', 'badge', 'Low Volume Badge',       'Low Volume Sampling', 'text'),
('exotic', 'low_volume', 'title', 'Low Volume Title',       'Only 10 μL Blood samples Required for', 'text'),
('exotic', 'low_volume', 'body',  'Low Volume Body',        'Especially for exotic pets, critically ill, anemic, and recovering cats and dogs.', 'text'),

-- ── EXOTIC ANIMALS — FAQ ──────────────────────────────────────────────────
('exotic', 'faq', 'q1', 'FAQ Question 1', 'Which species are supported for blood analysis?', 'text'),
('exotic', 'faq', 'a1', 'FAQ Answer 1',   'Companion animals: Dog, Cat
Small mammals: Rabbit, Chinchilla, Hamster, Rat, Mouse, Ferret, Guinea Pig
Large animals: Alpaca, Camel, Horse, Pig, Cattle, Sheep
Avian: Pigeon, Parrot
Reptiles: Turtle, Snake, Lizard', 'text'),
('exotic', 'faq', 'q2', 'FAQ Question 2', 'Which species are supported for feces analysis?', 'text'),
('exotic', 'faq', 'a2', 'FAQ Answer 2',   'Companion animals: Dog, Cat', 'text'),
('exotic', 'faq', 'q3', 'FAQ Question 3', 'Which species are supported for urine analysis?', 'text'),
('exotic', 'faq', 'a3', 'FAQ Answer 3',   'Companion animals: Dog, Cat', 'text'),
('exotic', 'faq', 'q4', 'FAQ Question 4', 'Which species are supported for fluid analysis?', 'text'),
('exotic', 'faq', 'a4', 'FAQ Answer 4',   'Companion animals: Dog, Cat', 'text'),

-- ── PLEURAL EFFUSION — FAQ ────────────────────────────────────────────────
('pleural', 'faq', 'q1', 'FAQ Question 1', 'Which species are supported for fluid analysis?', 'text'),
('pleural', 'faq', 'a1', 'FAQ Answer 1',   'Validated for dogs and cats.', 'text'),
('pleural', 'faq', 'q2', 'FAQ Question 2', 'What parameters can fluid analysis detect?', 'text'),
('pleural', 'faq', 'a2', 'FAQ Answer 2',   '19 parameters, including:

Nucleated cells: Inflammatory cells, granulocytes, lymphocytes, macrophages, neutrophils, degenerative neutrophils, phagocytic cells, mesothelial cells, and unclassified nucleated cells

RBC-related: RBC, PCV

Microorganisms: Cocci, rods', 'text'),
('pleural', 'faq', 'q3', 'FAQ Question 3', 'What are the limitations for certain effusion samples?', 'text'),
('pleural', 'faq', 'a3', 'FAQ Answer 3',   'Neoplastic effusions: AI may flag suspicious cells but cannot confirm tumor cells—manual review is required.

Special effusions (e.g., biliary ascites or urinary ascites): Interpretation should be combined with biochemical testing.', 'text')

ON CONFLICT (page, section, key) DO UPDATE
  SET value = EXCLUDED.value,
      label = EXCLUDED.label;
