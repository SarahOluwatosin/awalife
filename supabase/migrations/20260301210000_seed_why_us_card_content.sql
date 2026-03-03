-- ─────────────────────────────────────────────────────────────────────────────
-- Seed page_content rows for the Why Us section feature cards (home page).
-- These allow the 4 sticky cards to be edited via the admin "Page Text" panel.
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO public.page_content (page, section, key, label, value, type) VALUES

-- Section header badge (already seeded, but included here for completeness)
('home', 'why_us', 'badge', 'Why Us Badge', 'WHY AWALIFE', 'text'),

-- Card 1
('home', 'why_us', 'card_1_title', 'Card 1 Title',
  'One platform that expands from multi-species analysis to multi-parameter evidence', 'text'),
('home', 'why_us', 'card_1_desc',  'Card 1 Description',
  'It supports companion animals and small mammals, as well as large animals and a broad variety of exotic pets, making it suitable for a wide range of veterinary scenarios. In addition, it is capable of automatically analyzing blood, feces, urine, and pleural effusion samples, helping deliver efficient, accurate, and reliable results for daily clinical use.', 'text'),

-- Card 2
('home', 'why_us', 'card_2_title', 'Card 2 Title',
  'True-to-life morphology you can trust, capturing diagnostic details with clarity', 'text'),
('home', 'why_us', 'card_2_desc',  'Card 2 Description',
  'With 40x optics, a 6.5 MP imaging system, and a wide field of view, Awalife preserves fine cellular detail while 1,000+ fields of view help ensure representative coverage. Liquid-based staining supports cell integrity for confident review and reporting.', 'text'),

-- Card 3
('home', 'why_us', 'card_3_title', 'Card 3 Title',
  'Morphology-first AI validated by real-world usage and rapid iteration', 'text'),
('home', 'why_us', 'card_3_desc',  'Card 3 Description',
  'It is validated through real-world usage and rapid iteration, with over 15 million images used for AI training and more than 2.4 million diagnostic reports generated. Backed by 100+ innovations and patent updates, it continues to improve in performance and reliability with global field feedback.', 'text'),

-- Card 4
('home', 'why_us', 'card_4_title', 'Card 4 Title',
  'Support that scales: from day-to-day help to expert clinical guidance', 'text'),
('home', 'why_us', 'card_4_desc',  'Card 4 Description',
  'Awalife offers responsive online support to keep workflows running smoothly, plus access to a clinical expert network for interpretive assistance. For distributors and partners, we provide a dedicated 1-on-1 support channel to streamline onboarding, technical escalation, and ongoing enablement.', 'text')

ON CONFLICT (page, section, key) DO UPDATE
  SET value = EXCLUDED.value,
      label = EXCLUDED.label;
