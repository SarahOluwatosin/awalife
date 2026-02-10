import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import heroDiagnosticLab from '@/assets/hero-diagnostic-lab.jpg';
import ai100vetImg from '@/assets/ai-100vet.png';
import speciesCanineFeline from '@/assets/species-canine-feline.jpg';
import speciesSmallMammals from '@/assets/species-small-mammals.jpg';
import speciesExoticPets from '@/assets/species-exotic-pets.jpg';

const CompanyNews = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-[18px]';

  const categories = ['All', 'Exhibition', 'Conference', 'Product Update', 'Business', 'Training'];

  const newsItems = [
    {
      id: 1,
      title: 'AWALIFE at KSFM Conference 2024',
      excerpt: 'AWALIFE showcased its latest AI-100Vet analyzer at the KSFM exhibition held in Seoul, South Korea, receiving enthusiastic responses from veterinary professionals.',
      date: '2024-11-21',
      category: 'Exhibition',
      location: 'Seoul, South Korea',
      image: heroDiagnosticLab,
    },
    {
      id: 2,
      title: 'AWALIFE Participated in the ASASC',
      excerpt: 'AWALIFE announced participation in the Asian Small Animal Specialist Conference, demonstrating innovative diagnostic solutions for veterinary practices.',
      date: '2024-10-15',
      category: 'Conference',
      location: 'Bangkok, Thailand',
      image: speciesSmallMammals,
    },
    {
      id: 3,
      title: 'Singapore Vet Show Success',
      excerpt: 'Singapore VetShow 2024 was a tremendous success for AWALIFE, connecting with Asia’s premier veterinary professionals and showcasing our latest innovations.',
      date: '2024-10-08',
      category: 'Exhibition',
      location: 'Singapore',
      image: speciesCanineFeline,
    },
    {
      id: 4,
      title: 'New AI-100Vet Firmware Update',
      excerpt: 'We are pleased to announce a major firmware update for the AI-100Vet analyzer, introducing enhanced blood cell recognition accuracy and faster processing times.',
      date: '2024-09-20',
      category: 'Product Update',
      location: 'Shenzhen, China',
      image: ai100vetImg,
    },
    {
      id: 5,
      title: 'AWALIFE Expands European Distribution',
      excerpt: 'AWALIFE announces new distribution partnerships across Germany, France, and Spain, bringing AI-powered veterinary diagnostics to more European clinics.',
      date: '2024-08-15',
      category: 'Business',
      location: 'Europe',
      image: speciesExoticPets,
    },
    {
      id: 6,
      title: 'Training Workshop for Distributors',
      excerpt: 'AWALIFE hosted an intensive training workshop for our global distributor partners, covering product features, maintenance, and customer support best practices.',
      date: '2024-07-10',
      category: 'Training',
      location: 'Shenzhen, China',
      image: heroDiagnosticLab,
    },
  ];

  return (
    <Layout>
      <PageHero
        title="News Center"
        subtitle="Company updates, product news, and events"
        breadcrumb={[
          { label: 'Company', path: '/company/about' },
          { label: 'News Center', path: '/company/news' },
        ]}
      />

      {/* News Intro */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={heroDiagnosticLab} alt="News cover" className="w-full max-h-80 object-contain" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">News Center</h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed`}>
                Explore company updates, product announcements, and industry events to stay informed on Awalife’s latest
                milestones and innovations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat, index) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === 0
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
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Interested in Our Products?
          </h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-2xl mx-auto mb-10`}>
            Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                Contact us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyNews;
