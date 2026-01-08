import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Check, ArrowRight, Microscope, Clock, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ai100vetImg from '@/assets/ai-100vet.png';

const ExoticAnimals = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clinicalScenarios = [
    {
      title: 'Avian Diagnostics',
      description: 'Specialized blood cell identification for birds including heterophils, eosinophils, and thrombocytes.',
      icon: PawPrint,
    },
    {
      title: 'Reptile Analysis',
      description: 'Adapted algorithms for reptilian blood cells with nucleated red blood cells and unique leukocyte morphology.',
      icon: Microscope,
    },
    {
      title: 'Small Mammal Testing',
      description: 'Optimized for rabbits, guinea pigs, ferrets, and other small mammals with species-specific references.',
      icon: Target,
    },
    {
      title: 'Zoo Animal Support',
      description: 'Comprehensive analysis for a wide range of zoo and wildlife species with customizable parameters.',
      icon: TrendingUp,
    },
  ];

  const speciesSupported = [
    'Birds (Parrots, Raptors)',
    'Reptiles (Snakes, Lizards)',
    'Rabbits & Rodents',
    'Ferrets & Hedgehogs',
    'Amphibians',
    'Zoo & Wildlife',
  ];

  const workflowBenefits = [
    { label: 'Species Database', value: '50+ species' },
    { label: 'Analysis Time', value: 'Complete in 8 minutes' },
    { label: 'Sample Volume', value: 'As low as 5μL' },
    { label: 'Reference Ranges', value: 'Species-specific' },
  ];

  return (
    <Layout>
      <PageHero
        title="Exotic Animals"
        subtitle="Specialized diagnostics for avian, reptile, and exotic species"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Exotic Animals', path: '/applications/exotic-animals' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-green-500/10 text-green-500 border border-green-500/20 mb-6">
                Exotic Species
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Multi-Species Diagnostic Platform
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                AWALIFE supports comprehensive diagnostics for exotic animals including birds, reptiles, small mammals, and zoo animals. Our AI algorithms are trained on species-specific morphology to deliver accurate results for non-traditional patients.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {speciesSupported.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="btn-gradient" size="lg" asChild>
                <Link to="/products/ai-morphological-analyzer">
                  View AI Morphological Analyzer
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative rounded-2xl p-10 bg-gradient-to-br from-secondary/50 to-card border border-border/30">
                <img src={ai100vetImg} alt="AI Exotic Animal Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Scenarios */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Specialized Applications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Exotic Animal Diagnostics</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {clinicalScenarios.map((scenario, index) => (
              <div key={scenario.title} className="group relative">
                <div className="relative rounded-2xl p-8 h-full bg-card/50 border border-border/30 hover:border-primary/30 transition-colors">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                    <scenario.icon className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{scenario.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{scenario.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Benefits */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Practical Workflow Benefits</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {workflowBenefits.map((benefit) => (
              <div key={benefit.label} className="rounded-2xl p-6 text-center bg-secondary/30 border border-border/30">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">{benefit.value}</div>
                <div className="text-sm text-muted-foreground">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-secondary/20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Expand Your <span className="text-primary">Exotic Animal Services</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Contact us to learn how AWALIFE analyzers can support your exotic animal practice.
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

export default ExoticAnimals;
