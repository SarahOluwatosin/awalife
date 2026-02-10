import { useRef } from 'react';
import { ArrowRight, ChevronDown, Microscope, Cpu, Shield, Award, Globe, Layers, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useParallax, useCountUp, useStaggerAnimation } from '@/hooks/use-scroll-animation';
import heroVideo from '@/assets/hero-medtech-video.mp4';
import analyzerProducts from '@/assets/awalife-analyzer-products.png';
import dm03Microscope from '@/assets/dm03-medtech.png';
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
  
  const countriesCount = useCountUp(150, 2000, isStatsVisible);
  const installationsCount = useCountUp(5000, 2000, isStatsVisible);
  const patentsCount = useCountUp(114, 2000, isStatsVisible);
  const hospitalsCount = useCountUp(20000, 2200, isStatsVisible);

  const formatCount = (value: number) => value.toLocaleString('en-US');

  const features = [
    {
      icon: Layers,
      title: 'Multiple Models Available',
      description: 'It supports flexible expansion and upgrades, allowing you to select models and configurations based on your needs.',
      color: 'from-primary to-accent'
    },
    {
      icon: Microscope,
      title: 'Fully Automated Microscopy',
      description: 'With simple sample preparation, it delivers a fully automated \"sample in, result out\" workflow, ensuring accurate and reliable results.',
      color: 'from-accent to-primary'
    },
    {
      icon: Users,
      title: 'Multi-Species & Sample Testing',
      description: 'It supports companion and small mammals, as well as exotic pets, and automatically analyzes blood, feces, urine, and abdominal fluid samples.',
      color: 'from-primary to-accent'
    },
    {
      icon: Cpu,
      title: 'AI-powered Innovation',
      description: 'Awalife integrates cell morphology, biochemistry, microfluidics, optics, and AI technologies to create the world\'s first AI-powered morphological POCT platform.',
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
          <video
            className="w-full h-full object-cover scale-110"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Hero Content - Left aligned bold block */}
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-24 relative z-10">
          <div className="max-w-3xl">
            {/* Accent Block */}
            <div className="inline-block bg-primary text-primary-foreground px-6 py-4 mb-8 animate-fade-in">
              <span className="text-sm font-semibold tracking-widest">
                A PIONEER IN AI-POWERED MORPHOLOGICAL ANALYSIS FOR ANIMALS
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[0.95] mb-8">
              <span className="block opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                Transform Diagnostic Workflows
              </span>
              <span className="block opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                the <span className="gradient-text">Awalife Way</span>
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              Pioneering the "AI Morphological POCT Technology Platform," Awalife become the first to
              enable intelligent morphological analysis of various pet samples, including blood, urine,
              feces, and pleural effusion, advancing the application and standardization of AI technology
              in pet diagnostic
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
              <Button size="lg" className="btn-gradient group text-lg px-8 py-6" asChild>
                <Link to="/contact">
                  Contact us
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
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
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-24">
          <div 
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {[
              { value: countriesCount, label: 'Countries and Regions Covered' },
              { value: installationsCount, label: 'Installation' },
              { value: patentsCount, label: 'Patented Inventions' },
              { value: hospitalsCount, label: 'Animal Hospitals Trusted' }
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
                  {formatCount(stat.value)}+
                </div>
                <div className="text-muted-foreground text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase - Split Sections */}
      <section className="relative">
        {/* Product 1 */}
        <AnimatedSection className="py-24 bg-secondary/50">
          <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="text-primary font-semibold tracking-widest text-sm mb-4">FEATURED PRODUCT</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Awalife AI Morphological Analyzer</h3>
                <p className="text-xl text-muted-foreground mb-8">
                  The Awalife AI Morphological Analyzer empowers clinics with smarter diagnostics and more
                  precise analysis, making testing faster, treatments more accurate, and veterinary services
                  more professional.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="btn-gradient group" asChild>
                    <Link to="/products">
                      Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-2" asChild>
                    <Link to="/contact">Contact us</Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative h-[320px] sm:h-[360px] lg:h-[400px] overflow-hidden rounded-3xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-3xl" />
                <img 
                  src={analyzerProducts} 
                  alt="AI-100Vet Elite" 
                  className="relative h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Product 2 */}
        <AnimatedSection className="py-24">
          <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[320px] sm:h-[360px] lg:h-[400px] overflow-hidden rounded-3xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 to-primary/10 rounded-3xl blur-3xl" />
                <img 
                  src={dm03Microscope} 
                  alt="DM-03 Microscope Workstation" 
                  className="relative h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div>
                <div className="text-primary font-semibold tracking-widest text-sm mb-4">IMAGING SOLUTION</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">DM-03 Microscope Workstation</h3>
                <p className="text-xl text-muted-foreground mb-8">
                  It combines smarter imaging with effortless operation, designed for veterinary
                  professionals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="btn-gradient group" asChild>
                    <Link to="/products">
                      Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-2" asChild>
                    <Link to="/contact">Contact us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Feature Cards Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-24">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              WHY AWALIFE ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Multiple models, automated microscopy, multi-species testing, and AI-powered innovation in one platform.
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

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-24 relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Get Started
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">
              Elevate Your Diagnostics to the <span className="text-primary">Next Level</span> With Awalife
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="btn-gradient text-lg px-10 py-6" asChild>
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default MedTechLanding;
