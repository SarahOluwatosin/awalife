import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bug, Check, ArrowRight, Clock, Target, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';

const FecesAnalysis = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clinicalScenarios = [
    {
      title: 'Parasite Screening',
      description: 'Routine fecal examinations for detecting common parasites like roundworms, hookworms, and tapeworms in pets.',
      icon: Bug,
    },
    {
      title: 'Gastrointestinal Issues',
      description: 'Diagnosing chronic diarrhea, vomiting, and digestive problems by identifying pathogens and cellular abnormalities.',
      icon: Target,
    },
    {
      title: 'Puppy/Kitten Wellness',
      description: 'Essential screening for young animals who are especially susceptible to parasitic infections.',
      icon: Shield,
    },
    {
      title: 'Post-Treatment Verification',
      description: 'Confirming successful treatment of parasitic infections through follow-up fecal examinations.',
      icon: Check,
    },
  ];

  const detectionCapabilities = {
    parasiteEggs: ['Ascaris egg', 'Hookworms egg', 'Dipylidium caninum egg', 'Spirometra egg', 'Alaria egg'],
    protozoa: ['Trichomonas', 'Giardia', 'Giardia trophozoite', 'Giardia cyst', 'Coccidia'],
    pathogens: ['Campylobacter', 'Bacillus', 'Helicobacter', 'Spirochete', 'Yeast'],
    digestive: ['Starch granules', 'Fat droplets', 'Plant fibers', 'Muscle fibers'],
  };

  return (
    <Layout>
      <PageHero
        title="Feces Analysis"
        subtitle="From repetitive inefficiency to simple efficiency"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Feces Analysis', path: '/applications/feces' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                Automated Detection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Complete Fecal Element Detection
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                The distinctive automated device has the capability to detect every element in fecal samples. The system automates the entire process including sample preparation, image recognition, and data analysis, significantly reducing human error and oversight. In just 9 minutes, it identifies critical indicators such as parasite eggs and microorganisms.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Analysis Time', value: '9 min' },
                  { label: 'Process', value: 'Fully Automated' },
                  { label: 'Detection', value: 'AI-Powered' },
                  { label: 'Accuracy', value: '99%+' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="text-xl font-bold text-amber-400">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Button className="btn-gradient" size="lg" asChild>
                <Link to="/products/ai-100vet">
                  View AI-100Vet
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="relative lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Feces Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Capabilities */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Detection Range
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What We Can Detect</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bug className="w-5 h-5 text-amber-400" />
                Parasite Eggs
              </h3>
              <ul className="space-y-2">
                {detectionCapabilities.parasiteEggs.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                Intestinal Protozoa
              </h3>
              <ul className="space-y-2">
                {detectionCapabilities.protozoa.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Pathogenic Microorganisms
              </h3>
              <ul className="space-y-2">
                {detectionCapabilities.pathogens.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Digestive Function
              </h3>
              <ul className="space-y-2">
                {detectionCapabilities.digestive.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Scenarios */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Clinical Applications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Typical Clinical Scenarios</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {clinicalScenarios.map((scenario, index) => (
              <div key={scenario.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 h-full">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                    <scenario.icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{scenario.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{scenario.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Automate Your <span className="gradient-text">Fecal Analysis</span> Workflow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Save time and reduce errors with AWALIFE's automated fecal analysis system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient" size="lg" asChild>
              <Link to="/contact">Request a Demo</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FecesAnalysis;
