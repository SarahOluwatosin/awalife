-- Fix: "Flotation Sampling" heading on feces page had gradient on wrong word.
-- Before: "Flotation" (plain) + "Sampling" (gradient) + "(Centrifugal Flotation)" (plain suffix)
-- After:  "" (plain) + "Flotation" (gradient) + " Sampling (Centrifugal Flotation)" (plain suffix)

UPDATE page_content SET value = ''
  WHERE page = 'feces' AND section = 'flotation' AND key = 'title';

UPDATE page_content SET value = 'Flotation'
  WHERE page = 'feces' AND section = 'flotation' AND key = 'title_highlight';

UPDATE page_content SET value = ' Sampling (Centrifugal Flotation)'
  WHERE page = 'feces' AND section = 'flotation' AND key = 'title_suffix';
