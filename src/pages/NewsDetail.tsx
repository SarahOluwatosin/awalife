import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { supabase } from '@/integrations/supabase/client';

const NewsDetail = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { newsId } = useParams<{ newsId: string }>();
  const { data } = useResourcesCMS();
  const item = data.news.find(n => n.id === newsId && n.status === 'published');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;
    supabase.rpc('increment_news_view_count', { article_id: item.id });
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const title = item.metaTitle || item.title;
    const desc = item.metaDesc || item.excerpt;
    const pageUrl = `${window.location.origin}/company/news/${newsId}`;
    const fallbackImage = 'https://www.awalife.com/og-cover.jpg';
    const ogImage = item.imageUrl || fallbackImage;
    document.title = title;
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setNameMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('og:title', title);
    setMeta('og:description', desc);
    setMeta('og:type', 'article');
    setMeta('og:url', pageUrl);
    setMeta('og:site_name', 'Awalife');
    setMeta('og:image', ogImage);
    setMeta('og:image:width', '1200');
    setMeta('og:image:height', '627');
    setNameMeta('twitter:card', 'summary_large_image');
    setNameMeta('twitter:title', title);
    setNameMeta('twitter:description', desc);
    setNameMeta('twitter:image', ogImage);
    return () => {
      document.title = 'Awalife';
      ['og:title', 'og:description', 'og:type', 'og:url', 'og:site_name', 'og:image', 'og:image:width', 'og:image:height']
        .forEach(p => document.querySelector(`meta[property="${p}"]`)?.remove());
      ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']
        .forEach(n => document.querySelector(`meta[name="${n}"]`)?.remove());
    };
  }, [item, newsId]);

  useEffect(() => {
    if (!contentRef.current) return;
    const imgs = contentRef.current.querySelectorAll<HTMLImageElement>('img');
    imgs.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        img.onerror = () => { img.style.display = 'none'; };
      }
    });
  }, [item?.content]);

  if (!item) {
    return (
      <Layout>
        <section className="pt-32 pb-24 lg:pt-36">
          <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Article not found</h1>
            <Button asChild variant="outline">
              <Link to="/company/news">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="pt-32 pb-24 lg:pt-36 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          {/* Back link */}
          <Button asChild variant="ghost" className="mb-8 -ml-3 text-muted-foreground hover:text-foreground">
            <Link to="/company/news">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
            </Link>
          </Button>

          <div className="max-w-3xl mx-auto">
            {/* Category badge */}
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
              {item.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {item.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              {item.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary/70" />
                  {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
              {item.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary/70" />
                  {item.location}
                </span>
              )}
            </div>

            {/* Excerpt as lead */}
            {item.excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                {item.excerpt}
              </p>
            )}

            {/* Full article content */}
            {item.content ? (
              <div
                ref={contentRef}
                className={[
                  'article-content',
                  'prose prose-neutral max-w-none',
                  'prose-headings:text-foreground prose-p:text-foreground',
                  'prose-strong:text-foreground prose-a:text-primary',
                  'prose-ul:list-disc prose-ol:list-decimal',
                  'prose-img:rounded-xl prose-img:mx-auto',
                ].join(' ')}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ) : (
              <div className="rounded-xl border border-dashed border-border/40 bg-secondary/5 py-12 text-center">
                <p className="text-muted-foreground">Full article content has not been added yet.</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default NewsDetail;
