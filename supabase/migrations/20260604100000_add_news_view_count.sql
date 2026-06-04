-- Add view_count column to track article readership
ALTER TABLE news_articles
  ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;

-- Atomic increment function callable by anonymous users (read tracking)
CREATE OR REPLACE FUNCTION increment_news_view_count(article_id UUID)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE news_articles
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = article_id;
$$;

GRANT EXECUTE ON FUNCTION increment_news_view_count(UUID) TO anon, authenticated;
