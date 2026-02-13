import type { ReactNode } from 'react';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  Cpu,
  Globe2,
  Layers,
  Microscope,
  Package,
  ShieldCheck,
  Shield,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useCountUp } from '@/hooks/use-scroll-animation';
import { images } from '@/lib/images';
import Layout from '@/components/layout/Layout';

// Marquee component for continuous scrolling
const Marquee = ({ children, reverse = false }: { children: ReactNode; reverse?: boolean }) => (
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
  children: ReactNode;
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

  const countriesCount = useCountUp(150, 2000, isStatsVisible);
  const installationsCount = useCountUp(5000, 2000, isStatsVisible);
  const patentsCount = useCountUp(114, 2000, isStatsVisible);
  const hospitalsCount = useCountUp(20000, 2000, isStatsVisible);

  const formatCount = (value: number) => value.toLocaleString('en-US');

  const partners = ['VetCare Plus', 'Animal Health Co', 'PetMed Labs', 'Global Vet', 'Companion Care', 'Elite Animal'];

  return (
    <Layout>
      {/* Hero Section - Modern Playful Style */}
      <section className="relative pt-24 pb-8 lg:pt-32 lg:pb-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div ref={heroRef} className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6">
                <span
                  className="block transition-all duration-700"
                  style={{
                    opacity: isHeroVisible ? 1 : 0,
                    transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)'
                  }}
                >
                  Transform Diagnostic Workflows
                </span>
                <span
                  className="block transition-all duration-700"
                  style={{
                    opacity: isHeroVisible ? 1 : 0,
                    transform: isHeroVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: '150ms'
                  }}
                >
                  the <span className="gradient-text">Awalife Way</span>
                </span>
              </h1>

              <p
                className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg transition-all duration-700"
                style={{
                  opacity: isHeroVisible ? 1 : 0,
                  transform: isHeroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '400ms'
                }}
              >
                Pioneering the "AI Morphological POCT Technology Platform," Awalife become the first to
                enable intelligent morphological analysis of various pet samples, including blood, urine,
                feces, and pleural effusion, advancing the application and standardization of AI technology
                in pet diagnostic
              </p>

              <div
                className="flex flex-wrap gap-4 transition-all duration-700"
                style={{
                  opacity: isHeroVisible ? 1 : 0,
                  transform: isHeroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '500ms'
                }}
              >
                <Button
                  size="lg"
                  className="group bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/contact">
                    Contact us
                    <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </div>

              <div
                ref={statsRef}
                className="mt-5 flex flex-nowrap items-start gap-4 text-xs text-muted-foreground max-w-2xl overflow-x-auto"
              >
                {[
                  { icon: Globe2, value: countriesCount, label: 'Countries and Regions Covered' },
                  { icon: Package, value: installationsCount, label: 'Installation' },
                  { icon: BadgeCheck, value: patentsCount, label: 'Patented Inventions' },
                  { icon: Building2, value: hospitalsCount, label: 'Animal Hospitals Trusted' }
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex items-start gap-2 transition-all duration-700"
                    style={{
                      opacity: isStatsVisible ? 1 : 0,
                      transform: isStatsVisible ? 'translateY(0)' : 'translateY(12px)',
                      transitionDelay: `${index * 120}ms`
                    }}
                  >
                    <stat.icon className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <div className="text-sm font-semibold text-foreground">{formatCount(stat.value)}+</div>
                      <div className="leading-snug">{stat.label}</div>
                    </div>
                  </div>
                ))}
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
                  src={images.awalHero}
                  alt="AWALIFE AI-100Vet Analyzer"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
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
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-secondary border-2 border-card" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">500+ Clinics</span>
                </div>
              </FloatingBadge>
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

      {/* Awalife AI Morphological Analyzer */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Awalife AI Morphological Analyzer
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                The Awalife AI Morphological Analyzer empowers clinics with smarter diagnostics and more
                precise analysis, making testing faster, treatments more accurate, and veterinary services
                more professional.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-gradient rounded-full px-8 py-6" asChild>
                  <Link to="/products">Learn more</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 border-2" asChild>
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/10 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-border/60 bg-card/80 p-8 shadow-lg">
                <img src={images.ai100vetNew} alt="Awalife AI Morphological Analyzer" className="w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DM-03 Microscope Workstaion */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-border/60 bg-card/80 p-8 shadow-lg">
                <img src={images.microscopeStation} alt="DM-03 Microscope Workstaion" className="w-full object-contain" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                DM-03 Microscope Workstaion
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                It combines smarter imaging with effortless operation, designed for veterinary
                professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-gradient rounded-full px-8 py-6" asChild>
                  <Link to="/products">Learn more</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 border-2" asChild>
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY AWALIFE */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-4">WHY AWALIFE ?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Built for modern veterinary diagnostics</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Layers,
                title: 'Multiple Models Available',
                description:
                  'It supports flexible expansion and upgrades, allowing you to select models and configurations based on your needs.'
              },
              {
                icon: Microscope,
                title: 'Fully Automated Microscopy',
                description:
                  'With simple sample preparation, it delivers a fully automated "sample in, result out" workflow, ensuring accurate and reliable results.'
              },
              {
                icon: Users,
                title: 'Multi-Species & Sample Testing',
                description:
                  'It supports companion and small mammals, as well as exotic pets, and automatically analyzes blood, feces, urine, and abdominal fluid samples.'
              },
              {
                icon: Cpu,
                title: 'AI-powered Innovation',
                description:
                  "Awalife integrates cell morphology, biochemistry, microfluidics, optics, and AI technologies to create the world's first AI-powered morphological POCT platform."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Credibility */}
      <section className="py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-4">Regulatory Credibility</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Certified and trusted globally</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {[
              { icon: Award, title: 'ISO 13485 Certified', desc: 'Quality management for medical devices.' },
              { icon: ShieldCheck, title: 'CE Marked', desc: 'Complies with EU safety and performance standards.' },
              { icon: Globe2, title: 'FDA Registered', desc: 'Registered for international market readiness.' },
              { icon: BadgeCheck, title: 'GMP Compliant', desc: 'Manufactured under good practices.' }
            ].map((item, index) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full border border-primary/30 bg-background/80 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="max-w-[220px]">
                  <div className="text-base font-semibold">{item.title}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{item.desc}</div>
                </div>
                {index < 3 && <div className="hidden lg:block h-10 w-px bg-border/60" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA - Rounded Box */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
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
                {['Free consultation', 'No commitment', '24/7 Support'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
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
