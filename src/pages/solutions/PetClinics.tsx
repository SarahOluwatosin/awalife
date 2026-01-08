import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Check, ArrowRight, Clock, Target, Zap, Users, Shield, Lightbulb, TrendingUp, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import ai100vetImg from '@/assets/ai-100vet.png';

const PetClinics = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: 'Request Submitted!',
      description: 'Our team will contact you within 24 hours.',
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const benefits = [
    {
      icon: Clock,
      title: 'Faster Diagnosis',
      description: 'Complete sample analysis in under 10 minutes, enabling same-visit diagnosis and treatment decisions.',
    },
    {
      icon: Target,
      title: 'Improved Accuracy',
      description: '99%+ AI-powered cell recognition accuracy reduces human error and ensures consistent results.',
    },
    {
      icon: Users,
      title: 'Easier Staff Training',
      description: 'Intuitive interface requires minimal training. New staff can operate the system within hours.',
    },
    {
      icon: TrendingUp,
      title: 'Increased Revenue',
      description: 'Offer in-house diagnostics instead of outsourcing, keeping revenue and improving client satisfaction.',
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Sample Collection', desc: 'Collect blood, feces, or urine with minimal volume requirements' },
    { step: '02', title: 'Load & Start', desc: 'Place sample in analyzer and press start - fully automated from here' },
    { step: '03', title: 'AI Analysis', desc: 'AI-powered recognition identifies and classifies cells and elements' },
    { step: '04', title: 'Report Generation', desc: 'Comprehensive diagnostic report generated in minutes' },
  ];

  const features = [
    'Multi-sample analysis (Blood, Feces, Urine, Fluids)',
    'Support for 10+ animal species',
    'Automated sample preparation',
    '7-Part WBC differential',
    'Complete parasite detection',
    'Crystal and cast identification',
    'Auto-generated diagnostic reports',
    'Integration with clinic software',
  ];

  return (
    <Layout>
      <PageHero
        title="For Pet Clinics & Hospitals"
        subtitle="Transform your diagnostic workflow with AWALIFE technology"
        breadcrumb={[
          { label: 'Solutions', path: '/solutions' },
          { label: 'Pet Clinics', path: '/solutions/pet-clinics' },
        ]}
      />

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                For Veterinary Professionals
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                In-House Diagnostics <span className="gradient-text">Made Simple</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                AWALIFE diagnostic solutions integrate seamlessly into your clinical workflow, providing rapid, accurate results that improve patient outcomes and clinic efficiency. Stop outsourcing and start diagnosing in minutes.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild>
                  <Link to="/contact">
                    Request a Demo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/products">View Products</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AWALIFE Diagnostic Solution" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Clinics Choose AWALIFE</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 h-full text-center">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="icon-glow mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Workflow Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Fits Into Your Clinic</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((item, index) => (
              <div key={item.step} className="relative">
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="glow-card p-6 h-full">
                  <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Request a Demo</h2>
              <p className="text-muted-foreground">See how AWALIFE can transform your clinic's diagnostic capabilities.</p>
            </div>

            <form onSubmit={handleSubmit} className="glow-card p-8 lg:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Clinic Name</label>
                  <Input placeholder="Your clinic name" required className="bg-secondary/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Contact Name</label>
                  <Input placeholder="Your name" required className="bg-secondary/30 border-border/50" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input type="email" placeholder="email@clinic.com" required className="bg-secondary/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input placeholder="+1 234 567 8900" className="bg-secondary/30 border-border/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea placeholder="Tell us about your clinic and diagnostic needs..." rows={4} className="bg-secondary/30 border-border/50" />
              </div>
              <Button type="submit" className="btn-gradient w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Request Demo'}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PetClinics;
