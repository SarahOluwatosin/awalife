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
      color: 'bg-primary/10 text-primary',
      features: ['Complete Blood Count (CBC)', 'White Blood Cell Differential', 'Red Blood Cell Morphology', 'Platelet Analysis'],
    },
    {
      icon: Bug,
      name: t.applications.feces.name,
      description: t.applications.feces.description,
      fullDescription: t.applications.feces.fullDescription,
      color: 'bg-primary/10 text-primary',
      features: ['Parasite Detection', 'Bacterial Analysis', 'Crystal Identification', 'Cellular Components'],
    },
    {
      icon: TestTubes,
      name: t.applications.urine.name,
      description: t.applications.urine.description,
      fullDescription: t.applications.urine.fullDescription,
      color: 'bg-primary/10 text-primary',
      features: ['Sediment Analysis', 'Cell Identification', 'Cast Detection', 'Microorganism Screening'],
    },
    {
      icon: Scan,
      name: t.applications.skin.name,
      description: t.applications.skin.description,
      fullDescription: t.applications.skin.fullDescription,
      color: 'bg-primary/10 text-primary',
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
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              {t.applications.subtitle}
            </span>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.applications.description}
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-20 lg:py-28 pb-28 lg:pb-36">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="space-y-16 lg:space-y-24">
            {applications.map((app, index) => (
              <div key={app.name} className="group">
                <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  {/* Content */}
                  <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/80 mb-4">
                      0{index + 1} / 0{applications.length}
                    </span>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${app.color} mb-5`}>
                      <app.icon className="w-7 h-7" />
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                      {app.name}
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed text-base lg:text-lg">
                      {app.fullDescription}
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {app.features.map((feature) => (
                        <div 
                          key={feature} 
                          className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                            <Check className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="btn-gradient group/btn" size="lg" asChild>
                      <Link to="/products">
                        {t.products.learnMore}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>

                  {/* Visual */}
                  <div className={`relative min-h-[300px] lg:min-h-[400px] bg-gradient-to-br from-secondary/50 via-secondary/30 to-secondary/50 rounded-2xl flex items-center justify-center overflow-hidden ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className={`relative z-10 w-32 h-32 lg:w-40 lg:h-40 rounded-3xl ${app.color} flex items-center justify-center`}>
                      <app.icon className="w-16 h-16 lg:w-20 lg:h-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t.cta.title} <span className="gradient-text">{t.cta.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              {t.cta.description}
            </p>
            <Button className="btn-gradient" size="lg" asChild>
              <Link to="/contact">{t.cta.button}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Applications;
