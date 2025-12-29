import { useEffect } from 'react';
import { Zap, Target, Lightbulb, Shield, Users, Award, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    { icon: Zap, title: t.about.value1.title, desc: t.about.value1.desc },
    { icon: Target, title: t.about.value2.title, desc: t.about.value2.desc },
    { icon: Lightbulb, title: t.about.value3.title, desc: t.about.value3.desc },
    { icon: Shield, title: t.about.value4.title, desc: t.about.value4.desc },
  ];

  const stats = [
    { value: t.stats.sampleTypes, label: t.stats.sampleTypesLabel },
    { value: t.stats.patents, label: t.stats.patentsLabel },
    { value: t.stats.markets, label: t.stats.marketsLabel },
    { value: t.stats.installations, label: t.stats.installationsLabel },
  ];

  return (
    <Layout>
      <PageHero
        title={t.pageHero.about.title}
        subtitle={t.pageHero.about.subtitle}
        breadcrumb={[{ label: t.nav.about, path: '/about' }]}
      />

      {/* Description */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              {t.about.title}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">{t.about.subtitle}</h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-16">{t.about.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative stat-card text-center p-8">
                    <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm lg:text-base text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Core Principles
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{t.about.subtitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value) => (
              <div key={value.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 lg:p-10 text-center h-full flex flex-col items-center">
                  <div className="icon-glow mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="group relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl blur-3xl opacity-50" />
            <div className="relative glow-card p-12 lg:p-16 text-center overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
              <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-accent/5 blur-2xl" />
              
              <div className="relative z-10">
                <div className="icon-glow mx-auto mb-8">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Global Presence</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                  AWALIFE products and solutions are trusted by veterinary professionals across Asia, Europe, and the Americas. Our commitment to quality and innovation has made us a preferred partner for animal healthcare worldwide.
                </p>
                <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                  {[
                    { icon: Users, label: '500+ Installations', value: 'Active Deployments' },
                    { icon: Globe, label: '20+ Markets', value: 'Worldwide Reach' },
                    { icon: Award, label: '50+ Patents', value: 'Certified Technology' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-secondary/30 border border-border/30 min-w-[160px]">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg font-semibold text-foreground">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;