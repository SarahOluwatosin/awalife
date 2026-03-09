-- Fix Global Partners badge text: 'Global Partners' → 'GLOBAL COVERAGE'
UPDATE page_content
SET value = 'GLOBAL COVERAGE'
WHERE page = 'home' AND section = 'partners' AND key = 'badge';
