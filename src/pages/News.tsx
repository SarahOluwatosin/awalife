import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';

const News = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newsItems = [
    {
      id: 1,
      title: 'AWALIFE at KSFM Conference 2024',
      excerpt: 'AWALIFE showcased its latest AI-100Vet analyzer at the KSFM exhibition held in Seoul, South Korea, receiving enthusiastic responses from veterinary professionals.',
      date: '2024-11-21',
      category: 'Exhibition',
      location: 'Seoul, South Korea',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
    {
      id: 2,
      title: 'AWALIFE Participated in the ASASC',
      excerpt: 'AWALIFE announced participation in the Asian Small Animal Specialist Conference, demonstrating innovative diagnostic solutions for veterinary practices.',
      date: '2024-10-15',
      category: 'Conference',
      location: 'Bangkok, Thailand',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    },
    {
      id: 3,
      title: 'Singapore Vet Show Success',
      excerpt: 'Singapore VetShow 2024 was a tremendous success for AWALIFE, connecting with Asia\'s premier veterinary professionals and showcasing our latest innovations.',
      date: '2024-10-08',
      category: 'Exhibition',
      location: 'Singapore',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
    },
    {
      id: 4,
      title: 'New AI-100Vet Firmware Update',
      excerpt: 'We are pleased to announce a major firmware update for the AI-100Vet analyzer, introducing enhanced blood cell recognition accuracy and faster processing times.',
      date: '2024-09-20',
      category: 'Product Update',
      location: 'Shenzhen, China',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    },
    {
      id: 5,
      title: 'AWALIFE Expands European Distribution',
      excerpt: 'AWALIFE announces new distribution partnerships across Germany, France, and Spain, bringing AI-powered veterinary diagnostics to more European clinics.',
      date: '2024-08-15',
      category: 'Business',
      location: 'Europe',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    },
    {
      id: 6,
      title: 'Training Workshop for Distributors',
      excerpt: 'AWALIFE hosted an intensive training workshop for our global distributor partners, covering product features, maintenance, and customer support best practices.',
      date: '2024-07-10',
      category: 'Training',
      location: 'Shenzhen, China',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    },
  ];

  const categories = ['All', 'Exhibition', 'Conference', 'Product Update', 'Business', 'Training'];

  return (
    <Layout>
      <PageHero
        title={t.pageHero.news.title}
        subtitle={t.pageHero.news.subtitle}
        breadcrumb={[{ label: t.nav.news, path: '/news' }]}
      />

      {/* Introduction */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Latest Updates
            </span>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.news.description}
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  cat === 'All'
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/30 hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 lg:py-16 pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {newsItems.map((item) => (
              <article key={item.id} className="group">
                <div className="overflow-hidden rounded-2xl border border-border/30 hover:border-primary/30 transition-colors h-full flex flex-col bg-secondary/20">
                  {/* Image */}
                  <div className="relative h-56 lg:h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-5 left-5">
                      <span className="px-4 py-1.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary/70" />
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary/70" />
                        {item.location}
                      </span>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow leading-relaxed">
                      {item.excerpt}
                    </p>
                    
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary group/btn w-fit">
                      {t.news.readMore}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 lg:py-28 bg-secondary/20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Newsletter
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Subscribe to our newsletter for the latest product updates, event announcements, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl bg-background/50 border border-border/50 focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground/60"
              />
              <Button className="btn-gradient px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
