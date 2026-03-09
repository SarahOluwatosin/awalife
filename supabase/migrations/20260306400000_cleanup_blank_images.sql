-- Remove blank / placeholder image rows that appear as grey boxes in the Media admin
-- These are DM-03 placeholder rows with no uploaded image file
DELETE FROM public.site_images
WHERE page_key = 'dm-03'
  AND label IN (
    'Dm 03 Gallery 0',
    'Dm 03 Gallery 1',
    'Dm 03 Gallery 2',
    'Dm 03 Gallery 3',
    'Dm 03 Gallery 4',
    'Dm03 Hardware',
    'Dm03 Imagehub'
  );
