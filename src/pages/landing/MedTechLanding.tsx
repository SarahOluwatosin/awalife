import { useRef } from 'react';
import { ArrowRight, ChevronDown, Microscope, Cpu, Shield, Zap, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useParallax, useCountUp, useStaggerAnimation } from '@/hooks/use-scroll-animation';
import heroBg from '@/assets/hero-bg.jpg';
import ai100vet from '@/assets/ai-100vet.png';
import microscopeStation from '@/assets/microscope-station.png';
import reagents from '@/assets/reagents.png';
import Layout from '@/components/layout/Layout';

// Animated section wrapper
const AnimatedSection = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const MedTechLanding = () => {
  const [heroRef, heroOffset] = useParallax(0.3);
  const [statsRef, isStatsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  
  const clinicsCount = useCountUp(500, 2500, isStatsVisible);
  const accuracyCount = useCountUp(99, 2000, isStatsVisible);
  const countriesCount = useCountUp(40, 2000, isStatsVisible);
  const samplesCount = useCountUp(1000000, 3000, isStatsVisible);

  const features = [
    {
      icon: Cpu,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms deliver precise diagnostics in seconds.',
      color: 'from-primary to-accent'
    },
    {
      icon: Microscope,
      title: 'Digital Microscopy',
      description: 'High-resolution imaging combined with automated cell classification.',
      color: 'from-accent to-primary'
    },
    {
      icon: Shield,
      title: 'Clinical Grade Accuracy',
      description: '99.2% accuracy validated across multiple veterinary institutions.',
      color: 'from-primary to-accent'
    },
    {
      icon: Zap,
      title: 'Rapid Results',
      description: 'Complete blood analysis in under 60 seconds per sample.',
      color: 'from-accent to-primary'
    }
  ];

  const [featuresRef, featuresVisible] = useStaggerAnimation<HTMLDivElement>(features.length, { threshold: 0.2 });

  return (
    <Layout>
      {/* Hero Section - Full Screen Immersive */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          ref={heroRef}
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${heroOffset}px)` }}
        >
          <img 
            src={heroBg} 
            alt="Medical Technology" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Hero Content - Left aligned bold block */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            {/* Accent Block */}
            <div className="inline-block bg-primary text-primary-foreground px-6 py-4 mb-8 animate-fade-in">
              <span className="text-sm font-semibold tracking-widest uppercase">
                The Future of Veterinary Diagnostics
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.9] mb-8">
              <span className="block opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                The next era
              </span>
              <span className="block opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                of <span className="gradient-text">VetTech</span>
              </span>
              <span className="block opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                is here.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              Fueled by innovation at the intersection of artificial intelligence and veterinary medicine.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
              <Button size="lg" className="btn-gradient group text-lg px-8 py-6">
                Discover Our Solutions
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </section>

      {/* Stats Section - Dark Block */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div 
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {[
              { value: clinicsCount, suffix: '+', label: 'Veterinary Clinics' },
              { value: accuracyCount, suffix: '.2%', label: 'Diagnostic Accuracy' },
              { value: countriesCount, suffix: '+', label: 'Countries Worldwide' },
              { value: samplesCount, suffix: '+', label: 'Samples Analyzed', format: true }
            ].map((stat, i) => (
              <div 
                key={i}
                className="text-center transition-all duration-700"
                style={{
                  opacity: isStatsVisible ? 1 : 0,
                  transform: isStatsVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${i * 150}ms`
                }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2">
                  {stat.format ? (stat.value / 1000000).toFixed(1) + 'M' : stat.value}{stat.suffix}
                </div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Delivering care with{' '}
              <span className="gradient-text">pinpoint precision</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered diagnostics platform combines advanced imaging with machine learning 
              to deliver accurate results faster than ever before.
            </p>
          </AnimatedSection>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-card border border-border/50 transition-all duration-500 hover:border-primary/50"
                style={{
                  opacity: featuresVisible[i] ? 1 : 0,
                  transform: featuresVisible[i] ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${i * 100}ms`
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6`}>
                  <feature.icon className="w-full h-full text-primary-foreground" />
                </div>
                
                <h3 className="relative text-xl font-bold mb-3">{feature.title}</h3>
                <p className="relative text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase - Split Sections */}
      <section className="relative">
        {/* Product 1 */}
        <AnimatedSection className="py-24 bg-secondary/50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="text-primary font-semibold tracking-widest text-sm mb-4">FEATURED PRODUCT</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">AI-100Vet Elite</h3>
                <p className="text-xl text-muted-foreground mb-8">
                  Advanced 5-part differential hematology analyzer with AI-powered cell recognition 
                  technology. Delivering laboratory-grade results in your clinic.
                </p>
                <ul className="space-y-4 mb-8">
                  {['26 parameters with 5-part WBC differential', 'AI-assisted cell morphology analysis', 'Just 20μL sample volume required', 'Results in under 60 seconds'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="btn-gradient group">
                  Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-3xl" />
                <img 
                  src={ai100vet} 
                  alt="AI-100Vet Elite" 
                  className="relative w-full max-w-lg mx-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Product 2 */}
        <AnimatedSection className="py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 to-primary/10 rounded-3xl blur-3xl" />
                <img 
                  src={microscopeStation} 
                  alt="Digital Microscope Station" 
                  className="relative w-full max-w-lg mx-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <div className="text-primary font-semibold tracking-widest text-sm mb-4">IMAGING SOLUTION</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Digital Microscope Station</h3>
                <p className="text-xl text-muted-foreground mb-8">
                  Professional-grade digital microscopy with automated slide scanning and 
                  AI-powered cell classification for comprehensive sample analysis.
                </p>
                <Button className="btn-gradient group">
                  Explore Features <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Certifications Banner */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {[
              { icon: Award, label: 'ISO 13485 Certified' },
              { icon: Shield, label: 'CE Marked' },
              { icon: Globe, label: 'FDA Registered' },
              { icon: Award, label: 'GMP Compliant' }
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <cert.icon className="w-8 h-8" />
                <span className="font-medium">{cert.label}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Ready to transform your{' '}
              <span className="gradient-text">diagnostic capabilities?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join over 500 veterinary clinics worldwide who trust AWALIFE for their 
              diagnostic needs. Contact us today for a personalized demonstration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="btn-gradient text-lg px-10 py-6">
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default MedTechLanding;
