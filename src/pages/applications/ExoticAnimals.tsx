import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bird, Check, ArrowRight, Microscope, Heart, Stethoscope, Shield } from 'lucide-react';
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
      title: 'Avian Blood Analysis',
      description: 'Specialized analysis for birds including heterophil/lymphocyte ratios and nucleated red blood cells unique to avian species.',
      icon: Bird,
    },
    {
      title: 'Reptile Diagnostics',
      description: 'Comprehensive blood cell analysis adapted for reptilian physiology, including ectotherm-specific parameters.',
      icon: Shield,
    },
    {
      title: 'Small Mammal Care',
      description: 'Tailored analysis for rabbits, ferrets, guinea pigs, and other small mammals with species-specific reference ranges.',
      icon: Heart,
    },
    {
      title: 'Zoo Animal Health',
      description: 'Support for diverse species in zoological settings, enabling health monitoring across a wide range of exotic animals.',
      icon: Stethoscope,
    },
  ];

  const supportedSpecies = {
    avian: ['Parrots', 'Raptors', 'Waterfowl', 'Songbirds', 'Poultry'],
    reptiles: ['Snakes', 'Lizards', 'Turtles', 'Tortoises', 'Crocodilians'],
    smallMammals: ['Rabbits', 'Ferrets', 'Guinea pigs', 'Hamsters', 'Hedgehogs'],
    other: ['Amphibians', 'Fish', 'Primates', 'Wildlife'],
  };

  return (
    <Layout>
      <PageHero
        title="Exotic Animal Analysis"
        subtitle="Specialized diagnostics for non-traditional veterinary patients"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Exotic Animals', path: '/applications/exotic' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                Multi-Species Support
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Beyond Dogs & Cats
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                AWALIFE analyzers are equipped with specialized algorithms for exotic animal diagnostics. Our AI models recognize the unique cell morphology of birds, reptiles, small mammals, and other non-traditional species, providing accurate results with species-specific reference ranges.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Species Covered', value: '50+' },
                  { label: 'Reference Ranges', value: 'Species-specific' },
                  { label: 'Cell Recognition', value: 'AI-optimized' },
                  { label: 'Sample Size', value: 'Minimal' },
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

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Species */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Species Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Comprehensive Coverage</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bird className="w-5 h-5 text-amber-400" />
                Avian
              </h3>
              <ul className="space-y-2">
                {supportedSpecies.avian.map((item) => (
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
                Reptiles
              </h3>
              <ul className="space-y-2">
                {supportedSpecies.reptiles.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-400" />
                Small Mammals
              </h3>
              <ul className="space-y-2">
                {supportedSpecies.smallMammals.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-amber-400" />
                Other
              </h3>
              <ul className="space-y-2">
                {supportedSpecies.other.map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Specialized Diagnostics</h2>
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
            Expand Your <span className="gradient-text">Exotic Practice</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Deliver comprehensive diagnostics for all your exotic patients with AI-powered analysis.
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