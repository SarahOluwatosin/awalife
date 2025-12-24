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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">
            {t.news.description}
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'All'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <article key={item.id} className="glow-card overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary group/btn">
                    {t.news.readMore}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Subscribe to our newsletter for the latest product updates, event announcements, and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none text-foreground"
            />
            <Button className="btn-gradient">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
