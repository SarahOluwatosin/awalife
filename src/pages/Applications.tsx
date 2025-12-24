import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Bug, TestTubes, Scan, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';

const Applications = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const applications = [
    {
      icon: Droplets,
      name: t.applications.blood.name,
      description: t.applications.blood.description,
      fullDescription: t.applications.blood.fullDescription,
      color: 'bg-red-500/10 text-red-400',
      features: ['Complete Blood Count (CBC)', 'White Blood Cell Differential', 'Red Blood Cell Morphology', 'Platelet Analysis'],
    },
    {
      icon: Bug,
      name: t.applications.feces.name,
      description: t.applications.feces.description,
      fullDescription: t.applications.feces.fullDescription,
      color: 'bg-amber-500/10 text-amber-400',
      features: ['Parasite Detection', 'Bacterial Analysis', 'Crystal Identification', 'Cellular Components'],
    },
    {
      icon: TestTubes,
      name: t.applications.urine.name,
      description: t.applications.urine.description,
      fullDescription: t.applications.urine.fullDescription,
      color: 'bg-blue-500/10 text-blue-400',
      features: ['Sediment Analysis', 'Cell Identification', 'Cast Detection', 'Microorganism Screening'],
    },
    {
      icon: Scan,
      name: t.applications.skin.name,
      description: t.applications.skin.description,
      fullDescription: t.applications.skin.fullDescription,
      color: 'bg-purple-500/10 text-purple-400',
      features: ['Mite Detection', 'Fungal Analysis', 'Bacterial Cultures', 'Cell Abnormalities'],
    },
  ];

  return (
    <Layout>
      <PageHero
        title={t.pageHero.applications.title}
        subtitle={t.pageHero.applications.subtitle}
        breadcrumb={[{ label: t.nav.applications, path: '/applications' }]}
      />

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
            {t.applications.description}
          </p>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {applications.map((app, index) => (
              <div key={app.name} className="glow-card overflow-hidden">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={`p-8 lg:p-12 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${app.color} mb-6`}>
                      <app.icon className="w-7 h-7" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {app.name}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {app.fullDescription}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {app.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="btn-gradient group" asChild>
                      <Link to="/products">
                        {t.products.learnMore}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>

                  {/* Visual */}
                  <div className={`relative h-64 lg:h-auto bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className={`w-32 h-32 rounded-3xl ${app.color} flex items-center justify-center`}>
                      <app.icon className="w-16 h-16" />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-primary/5 animate-float" />
                    <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '2s' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.cta.title} <span className="gradient-text">{t.cta.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.cta.description}
          </p>
          <Button className="btn-gradient" size="lg" asChild>
            <Link to="/contact">{t.cta.button}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Applications;
