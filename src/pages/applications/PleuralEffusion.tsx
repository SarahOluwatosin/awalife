import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Check, ArrowRight, Microscope, Clock, Target, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ai100vetImg from '@/assets/ai-100vet.png';

const PleuralEffusion = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clinicalScenarios = [
    {
      title: 'Cardiac Disease Assessment',
      description: 'Accurate fluid analysis helps differentiate between transudates and exudates for cardiac condition evaluation.',
      icon: Droplets,
    },
    {
      title: 'Neoplastic Detection',
      description: 'Cytological examination identifies malignant cells in effusions, aiding in cancer diagnosis and staging.',
      icon: Microscope,
    },
    {
      title: 'Infection Identification',
      description: 'Rapid detection of bacterial, fungal, or viral pathogens in body fluids for targeted treatment.',
      icon: Target,
    },
    {
      title: 'Inflammatory Conditions',
      description: 'Cell differential analysis distinguishes between acute and chronic inflammatory processes.',
      icon: FlaskConical,
    },
  ];

  const analysisCapabilities = {
    cellTypes: ['Neutrophils', 'Lymphocytes', 'Macrophages', 'Mesothelial cells', 'Eosinophils', 'Mast cells'],
    characteristics: ['Cell count', 'Cell morphology', 'Nuclear features', 'Cytoplasmic details', 'Cell clustering'],
    pathogens: ['Bacteria', 'Fungi', 'Parasites', 'Viral inclusions'],
  };

  return (
    <Layout>
      <PageHero
        title="Pleural Effusion Analysis"
        subtitle="Comprehensive body fluid cytology for accurate diagnosis"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Pleural Effusion', path: '/applications/pleural-effusion' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
                Advanced Cytology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Body Fluid Analysis Excellence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                AWALIFE's AI-powered analysis provides comprehensive examination of pleural, peritoneal, and pericardial effusions. Our system delivers rapid, accurate cell identification and classification, enabling clinicians to make informed diagnostic decisions.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Analysis Time', value: '< 10 min' },
                  { label: 'Cell Types', value: '15+ identified' },
                  { label: 'AI Accuracy', value: '98%+' },
                  { label: 'Sample Volume', value: 'Minimal' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="text-xl font-bold text-purple-400">{stat.value}</div>
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
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Capabilities */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Detection Range
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Complete Fluid Analysis</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-purple-400" />
                Cell Types
              </h3>
              <ul className="space-y-2">
                {analysisCapabilities.cellTypes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-purple-400" />
                Characteristics
              </h3>
              <ul className="space-y-2">
                {analysisCapabilities.characteristics.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Pathogens
              </h3>
              <ul className="space-y-2">
                {analysisCapabilities.pathogens.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-400" />
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
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 h-full">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                    <scenario.icon className="w-7 h-7 text-purple-400" />
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
            Enhance Your <span className="gradient-text">Fluid Cytology</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Get comprehensive body fluid analysis with AI-powered precision.
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

export default PleuralEffusion;