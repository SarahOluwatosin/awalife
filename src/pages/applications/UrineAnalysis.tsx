import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TestTubes, Check, ArrowRight, Clock, Target, Zap, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';

const UrineAnalysis = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clinicalScenarios = [
    {
      title: 'Urinary Tract Infections',
      description: 'Rapid detection of bacteria, WBCs, and other indicators of urinary tract infections for prompt treatment.',
      icon: TestTubes,
    },
    {
      title: 'Kidney Disease Monitoring',
      description: 'Analysis of casts, cells, and crystals helps monitor chronic kidney disease progression and treatment response.',
      icon: Target,
    },
    {
      title: 'Bladder Stone Detection',
      description: 'Crystal identification aids in diagnosing and preventing urinary calculi formation in pets.',
      icon: Zap,
    },
    {
      title: 'Diabetes Screening',
      description: 'Glucose and ketone detection supports diabetes diagnosis and monitoring in veterinary patients.',
      icon: Droplets,
    },
  ];

  const analysisCapabilities = {
    casts: ['Hyaline cast', 'Cellular cast', 'Waxy cast', 'Granular cast'],
    crystals: ['Struvite', 'Uric acid', 'Cystine', 'Calcium oxalate monohydrate', 'Calcium oxalate dihydrate', 'Calcium phosphate'],
    cells: ['Renal tubular epithelial cells', 'Squamous epithelial cells', 'Transitional epithelial cells', 'Sperm'],
    pathogens: ['Cocci', 'Rods', 'Yeast'],
    others: ['Lipid droplet', 'Mucus'],
  };

  return (
    <Layout>
      <PageHero
        title="Urine Sediment Analysis"
        subtitle="Comprehensive results. Expedited clinical decisions."
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Urine Analysis', path: '/applications/urine' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                No Centrifugation Required
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                High-Quality Urine Sediment Examination
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Eliminating the need for traditional centrifugation, the process starts just 15 seconds after sample loading. A full report is generated within 9 minutes, enabling timely support for diagnosing urinary system diseases and significantly enhancing clinical responsiveness.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Start Time', value: '15 sec' },
                  { label: 'Full Report', value: '9 min' },
                  { label: 'Centrifugation', value: 'Not Needed' },
                  { label: 'AI-Assisted', value: 'Yes' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="text-xl font-bold text-blue-400">{stat.value}</div>
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
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Urine Analyzer" className="w-full max-h-80 object-contain" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Complete Sediment Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TestTubes className="w-5 h-5 text-blue-400" />
                Casts
              </h3>
              <ul className="space-y-2">
                {analysisCapabilities.casts.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                Crystals
              </h3>
              <ul className="space-y-2">
                {analysisCapabilities.crystals.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                Cells
              </h3>
              <ul className="space-y-2">
                {analysisCapabilities.cells.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-blue-400" />
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
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 h-full">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <scenario.icon className="w-7 h-7 text-blue-400" />
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
            Expedite Your <span className="gradient-text">Clinical Decisions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Get comprehensive urine sediment results in minutes, not hours.
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

export default UrineAnalysis;
