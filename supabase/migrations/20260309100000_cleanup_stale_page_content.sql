-- Remove stale rows left behind by earlier migrations that were superseded
-- by newer key names. Components no longer read these keys.

-- home/cta: 'subtitle' replaced by 'body', 'button_text' replaced by 'cta_text'
DELETE FROM public.page_content
WHERE page = 'home' AND section = 'cta' AND key IN ('subtitle', 'button_text');

-- home/why_us: 'subtitle' seeded early but WhyUsSection does not use it
DELETE FROM public.page_content
WHERE page = 'home' AND section = 'why_us' AND key = 'subtitle';

-- contact/form: 'title' (single string) replaced by title_highlight+title_suffix split;
--               'submit_label' replaced by 'btn_submit'
DELETE FROM public.page_content
WHERE page = 'contact' AND section = 'form' AND key IN ('title', 'submit_label');
