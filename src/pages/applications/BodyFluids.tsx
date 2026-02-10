import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Check, ArrowRight, Microscope, Target, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';

const BodyFluids = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clinicalScenarios = [
    {
      title: 'Pleural Effusion Analysis',
      description: 'Determine fluid characteristics and cellular composition to differentiate between transudate and exudate.',
      icon: Beaker,
    },
    {
      title: 'Ascitic Fluid Examination',
      description: 'Analyze peritoneal fluid for infections, malignancies, and organ dysfunction indicators.',
      icon: Microscope,
    },
    {
      title: 'Skin Sample Analysis',
      description: 'Detect mites, fungi, bacteria, and cellular abnormalities in dermatological samples.',
      icon: Target,
    },
    {
      title: 'Complex Case Diagnosis',
      description: 'Multi-dimensional diagnostic insights for challenging cases requiring fluid cytology.',
      icon: Shield,
    },
  ];

  const analysisTypes = [
    {
      title: 'Pleural & Ascitic Fluids',
      description: 'AI-powered recognition and counting of cellular morphology in pleural and ascitic fluids assists veterinarians in determining fluid characteristics.',
      features: ['Cell morphology analysis', 'Fluid characterization', 'AI-powered counting', 'Diagnostic insights'],
      color: 'purple',
    },
    {
      title: 'Skin Samples',
      description: 'Comprehensive skin sample analysis for detecting parasites, fungi, bacteria, and cellular abnormalities in dermatological cases.',
      features: ['Mite detection', 'Fungal analysis', 'Bacterial identification', 'Cell abnormalities'],
      color: 'pink',
    },
  ];

  return (
    <Layout>
      <PageHero
        title="Body Fluids & Other Samples"
        subtitle="Multi-dimensional diagnostic insights for complex cases"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Body Fluids', path: '/applications/body-fluids' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Advanced Analysis
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Beyond Standard Sample Types
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                AWALIFE analyzers support analysis of pleural fluid, ascitic fluid, and skin samples. With AI-powered recognition and counting of cellular morphology, the system assists veterinarians in determining fluid characteristics and provides multi-dimensional diagnostic insights for complex cases.
              </p>
              
              <div className="space-y-4 mb-8">
                {['Pleural fluid cytology', 'Ascitic fluid analysis', 'Skin scraping examination', 'AI-powered cell counting'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
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
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Types */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Sample Types
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Specialized Analysis Capabilities</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {analysisTypes.map((type) => (
              <div key={type.title} className="group relative">
                <div className={`absolute -inset-2 bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative glow-card p-8 lg:p-10 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Beaker className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{type.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{type.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {type.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Scenarios */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Clinical Applications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Typical Clinical Scenarios</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {clinicalScenarios.map((scenario, index) => (
              <div key={scenario.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 h-full">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <scenario.icon className="w-7 h-7 text-primary" />
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
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Handle <span className="gradient-text">Complex Cases</span> with Confidence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Get multi-dimensional diagnostic insights for challenging cases requiring fluid cytology.
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

export default BodyFluids;
