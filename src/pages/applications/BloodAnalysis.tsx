import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Check, ArrowRight, Microscope, Clock, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';

const BloodAnalysis = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clinicalScenarios = [
    {
      title: 'Anemia Diagnosis',
      description: 'Comprehensive RBC morphology analysis helps identify types of anemia including iron deficiency, hemolytic, and aplastic anemia.',
      icon: Droplets,
    },
    {
      title: 'Infection Detection',
      description: 'WBC differential count identifies bacterial, viral, or parasitic infections through neutrophil, lymphocyte, and eosinophil levels.',
      icon: Microscope,
    },
    {
      title: 'Pre-Surgical Screening',
      description: 'Complete blood count ensures patients are healthy enough for surgery by checking platelet counts and clotting factors.',
      icon: Target,
    },
    {
      title: 'Chronic Disease Monitoring',
      description: 'Regular blood analysis tracks disease progression and treatment response in conditions like leukemia or immune disorders.',
      icon: TrendingUp,
    },
  ];

  const wbcDifferential = [
    'White blood cell count (WBC)',
    'Neutrophils (NEU)',
    'Neutrophil stab granulocyte (NST)',
    'Neutrophil segmented granulocyte (NSG)',
    'Neutrophil hypersegmented granulocyte (NSH)',
    'Lymphocyte (LYM)',
    'Monocyte (MON)',
    'Eosinophil (EOS)',
    'Basophil (BAS)',
  ];

  const workflowBenefits = [
    { label: 'Sample Volume', value: 'Only 10μL required' },
    { label: 'Cells Captured', value: '200,000 - 500,000 in real-time' },
    { label: 'Analysis Time', value: 'Complete in 8 minutes' },
    { label: 'Accuracy Rate', value: '99%+ cell identification' },
  ];

  return (
    <Layout>
      <PageHero
        title="Blood Analysis"
        subtitle="The most extensive Complete Blood Count (CBC) in veterinary medicine"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Blood Analysis', path: '/applications/blood' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20 mb-6">
                Gold Standard
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                7-Part WBC Differential Analysis
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                AWALIFE blood analysis provides the most extensive Complete Blood Count (CBC) offered in veterinary medicine. Our AI-powered system captures 200,000 to 500,000 cells in real-time imaging and completes a full blood smear analysis within 8 minutes, providing robust clinical data support through high-precision morphological analysis.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {wbcDifferential.slice(0, 6).map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="btn-gradient" size="lg" asChild>
                <Link to="/products/ai-100vet-elite">
                  View AI-100Vet Elite
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Blood Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Scenarios */}
      <section className="py-16 lg:py-20 bg-card/50">
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
                <div className="absolute -inset-1 bg-gradient-to-br from-red-500/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 h-full">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6">
                    <scenario.icon className="w-7 h-7 text-red-400" />
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
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Practical Workflow Benefits</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {workflowBenefits.map((benefit) => (
              <div key={benefit.label} className="glow-card p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold gradient-text mb-2">{benefit.value}</div>
                <div className="text-sm text-muted-foreground">{benefit.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 glow-card p-8 lg:p-10">
            <h3 className="text-xl font-semibold text-foreground mb-6">How AWALIFE Products Support Blood Diagnosis</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Rapid Results</h4>
                  <p className="text-sm text-muted-foreground">Complete CBC analysis in under 8 minutes with AI-powered recognition</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">High Accuracy</h4>
                  <p className="text-sm text-muted-foreground">99%+ cell identification accuracy with automated smearing technology</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Microscope className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Minimal Sample</h4>
                  <p className="text-sm text-muted-foreground">Only 10μL blood sample required for comprehensive analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your <span className="gradient-text">Blood Analysis</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Contact us to learn how AWALIFE blood analyzers can improve diagnostic accuracy and workflow efficiency in your clinic.
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

export default BloodAnalysis;
