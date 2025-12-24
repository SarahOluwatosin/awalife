import { useEffect } from 'react';
import { Zap, Target, Lightbulb, Shield, Users, Award, Globe, Cpu, Eye, Cog } from 'lucide-react';
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

  const features = [
    { icon: Cpu, title: t.about.feature1, desc: t.about.feature1Desc },
    { icon: Cog, title: t.about.feature2, desc: t.about.feature2Desc },
    { icon: Eye, title: t.about.feature3, desc: t.about.feature3Desc },
  ];

  const stats = [
    { value: '1M+', label: t.stats.pets },
    { value: '50+', label: t.stats.patents },
    { value: '30+', label: t.stats.hospitals },
    { value: '15+', label: t.stats.countries },
  ];

  return (
    <Layout>
      <PageHero
        title={t.pageHero.about.title}
        subtitle={t.pageHero.about.subtitle}
        breadcrumb={[{ label: t.nav.about, path: '/about' }]}
      />

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="glow-card p-8 md:p-10">
              <div className="icon-glow mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.about.mission}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.about.missionText}</p>
            </div>

            {/* Vision */}
            <div className="glow-card p-8 md:p-10">
              <div className="icon-glow mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t.about.vision}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.about.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.about.subtitle}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">{t.about.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.about.values}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={value.title} className="glow-card p-6 text-center">
                <div className="icon-glow mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="glow-card p-8">
                <div className="icon-glow mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Global Presence */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glow-card p-8 md:p-12 text-center">
            <div className="icon-glow mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Global Presence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              AWALIFE products and solutions are trusted by veterinary professionals across Asia, Europe, and the Americas. Our commitment to quality and innovation has made us a preferred partner for animal healthcare worldwide.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              {[
                { icon: Users, label: '500+ Partners' },
                { icon: Globe, label: '15+ Countries' },
                { icon: Award, label: '50+ Certifications' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
