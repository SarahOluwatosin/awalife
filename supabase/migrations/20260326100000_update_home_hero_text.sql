-- Update homepage hero title and subtitle to new copy
UPDATE page_content
SET value = 'Morphology Isn''t a Feature.'
WHERE page = 'home' AND section = 'hero' AND key = 'title_line1';

UPDATE page_content
SET value = 'It''s Where We Began and Where We Lead.'
WHERE page = 'home' AND section = 'hero' AND key = 'title_line2';

UPDATE page_content
SET value = 'From day one, we have built around AI-powered cellular morphology in veterinary diagnostics - not as an added feature, but as the foundation of everything we do. Refined through hundreds of model iterations and trained on tens of millions of morphology data points, our technology turns cellular morphology into visible, quantifiable, and review-ready evidence, helping veterinarians diagnose with greater depth and confidence.'
WHERE page = 'home' AND section = 'hero' AND key = 'subtitle';
