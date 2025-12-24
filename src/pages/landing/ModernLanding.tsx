import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Check, Star, Zap, Shield, Clock, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggerAnimation, useCountUp } from '@/hooks/use-scroll-animation';
import ai100vet from '@/assets/ai-100vet.png';
import reagents from '@/assets/reagents.png';
import microscopeStation from '@/assets/microscope-station.png';
import Layout from '@/components/layout/Layout';

// Marquee component for continuous scrolling
const Marquee = ({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) => (
  <div className="flex overflow-hidden select-none">
    <div className={`flex gap-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
      {children}
      {children}
    </div>
  </div>
);

// Floating badge component
const FloatingBadge = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <div 
    className={`absolute px-4 py-2 rounded-full bg-card border border-border/50 shadow-lg backdrop-blur-sm animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);

const ModernLanding = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const [statsRef, isStatsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  
  const usersCount = useCountUp(2300000, 2500, isStatsVisible);
  const clinicsCount = useCountUp(500, 2000, isStatsVisible);
  const countriesCount = useCountUp(40, 2000, isStatsVisible);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Results',
      description: 'Get comprehensive blood analysis in under 60 seconds. No more waiting.',
      image: ai100vet
    },
    {
      icon: Shield,
      title: 'Clinical Grade Accuracy',
      description: '99.2% accuracy validated by leading veterinary institutions worldwide.',
      image: reagents
    },
    {
      icon: Clock,
      title: 'Save Precious Time',
      description: 'Streamline your workflow and see more patients with automated diagnostics.',
      image: microscopeStation
    }
  ];

  const [featuresRef, featuresVisible] = useStaggerAnimation<HTMLDivElement>(features.length, { threshold: 0.2 });

  const testimonials = [
    { name: 'Dr. Sarah Chen', role: 'Veterinary Director', text: 'Transformed our clinic\'s diagnostic capabilities completely.' },
    { name: 'Dr. Michael Torres', role: 'Emergency Vet', text: 'The speed and accuracy have been game-changing for critical cases.' },
    { name: 'Dr. Emily Watson', role: 'Practice Owner', text: 'Best investment we\'ve made. ROI was immediate.' },
    { name: 'Dr. James Park', role: 'Internal Medicine', text: 'The AI analysis catches things we might have missed.' },
  ];

  const partners = ['VetCare Plus', 'Animal Health Co', 'PetMed Labs', 'Global Vet', 'Companion Care', 'Elite Animal'];

  return (
    <Layout>
      {/* Hero Section - Modern Playful Style */}
      <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div ref={heroRef} className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
                <span 
                  className="block transition-all duration-700"
                  style={{
                    opacity: isHeroVisible ? 1 : 0,
                    transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)'
                  }}
                >
                  Start Diagnosing
                </span>
                <span 
                  className="block transition-all duration-700"
                  style={{
                    opacity: isHeroVisible ? 1 : 0,
                    transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: '150ms'
                  }}
                >
                  With <span className="gradient-text">AI Precision</span>
                </span>
                <span 
                  className="block text-muted-foreground transition-all duration-700"
                  style={{
                    opacity: isHeroVisible ? 1 : 0,
                    transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: '300ms'
                  }}
                >
                  Today
                </span>
              </h1>

              <p 
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md transition-all duration-700"
                style={{
                  opacity: isHeroVisible ? 1 : 0,
                  transform: isHeroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '400ms'
                }}
              >
                Simplify your diagnostic workflow. Our AI-powered analyzers deliver accurate results effortlessly.
              </p>

              <div 
                className="flex flex-wrap gap-4 transition-all duration-700"
                style={{
                  opacity: isHeroVisible ? 1 : 0,
                  transform: isHeroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '500ms'
                }}
              >
                <Button size="lg" className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-lg">
                  Get Started Free
                  <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </div>
            </div>

            {/* Right - Product Image with floating elements */}
            <div className="relative lg:h-[600px]">
              {/* Main product image */}
              <div 
                className="relative z-10 transition-all duration-1000"
                style={{
                  opacity: isHeroVisible ? 1 : 0,
                  transform: isHeroVisible ? 'translateY(0) rotate(0)' : 'translateY(40px) rotate(3deg)'
                }}
              >
                <img 
                  src={ai100vet} 
                  alt="AI-100Vet Analyzer" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>

              {/* Floating badges */}
              <FloatingBadge className="top-10 left-0 lg:-left-8" delay={0}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">60s Results</span>
                </div>
              </FloatingBadge>

              <FloatingBadge className="top-1/3 right-0 lg:-right-4" delay={1}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium">99.2% Accuracy</span>
                </div>
              </FloatingBadge>

              <FloatingBadge className="bottom-20 left-4 lg:left-0" delay={2}>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-secondary border-2 border-card" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">500+ Clinics</span>
                </div>
              </FloatingBadge>
            </div>
          </div>

          {/* Stats row */}
          <div 
            ref={statsRef}
            className="mt-16 lg:mt-24 flex flex-wrap justify-center gap-8 lg:gap-16"
          >
            <div 
              className="text-center transition-all duration-700"
              style={{
                opacity: isStatsVisible ? 1 : 0,
                transform: isStatsVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className="flex items-center gap-2 justify-center mb-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-card" />
                  ))}
                </div>
                <span className="text-3xl md:text-4xl font-bold">{(usersCount / 1000000).toFixed(1)}M+</span>
              </div>
              <p className="text-muted-foreground">Samples analyzed worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Marquee */}
      <section className="py-12 border-y border-border/50 bg-secondary/30 overflow-hidden">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <Marquee>
            {partners.map((partner, i) => (
              <span key={i} className="text-2xl font-bold text-muted-foreground/50 whitespace-nowrap">
                {partner}
              </span>
            ))}
          </Marquee>
        </div>
        <p className="text-center text-muted-foreground mt-6">
          Partnering with leading veterinary institutions worldwide
        </p>
      </section>

      {/* Features Section - Bento Grid Style */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Everything you need in{' '}
              <span className="gradient-text">one solution</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the peace of mind that comes with having your diagnostics under control.
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative rounded-3xl bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-xl ${
                  i === 0 ? 'lg:row-span-2' : ''
                }`}
                style={{
                  opacity: featuresVisible[i] ? 1 : 0,
                  transform: featuresVisible[i] ? 'translateY(0)' : 'translateY(40px)'
                }}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${i === 0 ? 'h-64' : 'h-48'}`}>
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  
                  <Button variant="ghost" className="mt-4 p-0 h-auto text-primary hover:text-primary/80 group/btn">
                    Learn more 
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Card Style */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Loved by veterinarians worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i}
                className="p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
              >
                <p className="text-foreground mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-muted-foreground text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA - Rounded Box */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-primary/20 via-card to-accent/10 border border-border/50 p-12 lg:p-20 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to revolutionize your{' '}
                <span className="gradient-text">diagnostics?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Join 500+ veterinary clinics already using AWALIFE to deliver faster, 
                more accurate diagnostics.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="btn-gradient rounded-full px-10 py-6 text-lg">
                  Schedule Demo
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 py-6 text-lg border-2" asChild>
                  <Link to="/products">View Products</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
                {['Free consultation', 'No commitment', '24/7 Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ModernLanding;
