import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useResourcesCMS } from '@/contexts/ResourcesCMSContext';
import { images } from '@/lib/images';

const CompanyNews = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);

  const { data } = useResourcesCMS();
  const newsItems = data.news;

  const categories = ['All', ...Array.from(new Set(newsItems.map((n) => n.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? newsItems : newsItems.filter((n) => n.category === activeCategory);

  const isExternalLink = (url: string) =>
  /^(https?:)?\/\//i.test(url) || url.startsWith('mailto:') || url.startsWith('tel:');
  const ctaLink = data.cta.buttonUrl?.trim() || '/contact';

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
                Get Updates
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                <span className="gradient-text">News</span> Center
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Explore company updates, product announcements, and industry events to stay informed on Awalife's latest
                milestones and innovations.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img src={images.heroDiagnosticLab} alt="News cover" data-override-id="news-hero" className="w-full h-full max-h-[400px] object-cover rounded-3xl" loading="eager" decoding="async" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-12">
            {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat ?
              'bg-primary text-primary-foreground shadow-lg shadow-primary/25' :
              'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/30 hover:border-primary/30'}`
              }>

                {cat}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="pt-8 lg:pt-12 pb-28 lg:pb-36">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          {filtered.length ?
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filtered.map((item) =>
            <article key={item.id} className="group">
                  <div className="overflow-hidden rounded-2xl border border-border/30 hover:border-primary/30 transition-colors h-full flex flex-col bg-secondary/10">
                    <div className="relative h-56 lg:h-64 overflow-hidden bg-secondary/30">
                      {item.imageUrl ?
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async" /> :


                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-sm">
                          No image
                        </div>
                  }
                      <div className="absolute top-5 left-5">
                        <span className="px-4 py-1.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 lg:p-7 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        {item.date &&
                    <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-primary/70" />
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                    }
                        {item.location &&
                    <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-primary/70" />
                            {item.location}
                          </span>
                    }
                      </div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed">
                        {item.excerpt}
                      </p>
                      <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary group/btn w-fit" asChild>
                        <Link to={`/company/news/${item.id}`}>
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
            )}
            </div> :

          <div className="rounded-xl border border-dashed border-border/40 bg-secondary/5 py-16 text-center">
              <p className="text-muted-foreground">No news items in this category.</p>
            </div>
          }
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Interested in <span className="gradient-text">Our Products</span>?</h2>
          <p className="text-lg text-muted-foreground max-w-5xl mx-auto mb-10">{data.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              {isExternalLink(ctaLink) ?
              <a href={ctaLink} target="_blank" rel="noreferrer">
                  {data.cta.buttonLabel}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a> :

              <Link to={ctaLink}>
                  {data.cta.buttonLabel}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              }
            </Button>
          </div>
        </div>
      </section>
    </Layout>);

};

export default CompanyNews;