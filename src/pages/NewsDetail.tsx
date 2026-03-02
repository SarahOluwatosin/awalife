import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';

const NewsDetail = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { newsId } = useParams<{ newsId: string }>();
  const { data } = useResourcesCMS();
  const item = data.news.find(n => n.id === newsId);

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

            {/* Cover image */}
            {item.imageUrl && (
              <div className="rounded-2xl overflow-hidden border border-border/30 mb-10">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full aspect-video object-cover rounded-2xl"
                />
              </div>
            )}

            {/* Excerpt as lead */}
            {item.excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                {item.excerpt}
              </p>
            )}

            {/* Full article content */}
            {item.content ? (
              <div
                className="prose prose-lg max-w-none text-foreground leading-relaxed prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-foreground"
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
