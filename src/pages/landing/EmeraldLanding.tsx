import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Microscope,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { motion } from 'framer-motion';
import DottedMap from 'dotted-map';
import ai100vetNew from '@/assets/ai-100vet-new.png';
import emeraldHeroMicroscope from '@/assets/emerald-hero-microscope.gif';
import microscopeStation from '@/assets/microscope-station.png';
import heroBg from '@/assets/hero-diagnostic-lab.jpg';
import speciesCanineFeline from '@/assets/species-canine-feline.jpg';
import speciesExoticPets from '@/assets/species-exotic-pets.jpg';
import speciesSmallMammals from '@/assets/species-small-mammals.jpg';
import aiAnalyzerVideo from '@/assets/ai-analyzer-video.mp4';
import dm03Video from '@/assets/dm03-video.mp4';
import Layout from '@/components/layout/Layout';

const Reveal = ({
  children,
  className = '',
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'all 800ms ease',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const stats = [
  { value: '150+', label: 'Countries and Regions Covered' },
  { value: '5000+', label: 'Installation' },
  { value: '114+', label: 'Patented Inventions' },
  { value: '20,000+', label: 'Animal Hospitals Trusted' }
];

const heroLines = ['Transform Diagnostic Workflows', 'the Awalife Way'];

const heroTransition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
};

const speciesGallery = [
  {
    title: 'Canine + Feline',
    subtitle: 'Companion diagnostics',
    image: speciesCanineFeline
  },
  {
    title: 'Exotic Pets',
    subtitle: 'Avian, reptiles, and more',
    image: speciesExoticPets
  },
  {
    title: 'Small Mammals',
    subtitle: 'Rabbits, rodents, ferrets',
    image: speciesSmallMammals
  }
];

const whyAwalife = [
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
    title: 'Multi-Species and Sample Testing',
    description:
      'It supports companion and small mammals, as well as exotic pets, and automatically analyzes blood, feces, urine, and abdominal fluid samples.'
  },
  {
    icon: Cpu,
    title: 'AI-powered Innovation',
    description:
      "Awalife integrates cell morphology, biochemistry, microfluidics, optics, and AI technologies to create the world's first AI-powered morphological POCT platform."
  }
];

const EmeraldLanding = () => {
  const mapData = useMemo(() => {
    const map = new DottedMap({ height: 180, grid: 'vertical' });
    const locations = [
      { label: 'Global HQ', lat: 31.2304, lng: 121.4737 },
      { label: 'LATAM', lat: -23.5505, lng: -46.6333 },
      { label: 'EU', lat: 48.8566, lng: 2.3522 },
      { label: 'UK', lat: 51.5074, lng: -0.1278 },
      { label: 'Africa', lat: -1.2921, lng: 36.8219 },
      { label: 'India', lat: 28.6139, lng: 77.209 },
      { label: 'APAC', lat: 1.3521, lng: 103.8198 }
    ];

    const points = locations.map((location, index) =>
      map.addPin({
        lat: location.lat,
        lng: location.lng,
        data: { label: location.label },
        svgOptions: {
          radius: index === 0 ? 1.3 : 1.05,
          color: index === 0 ? 'rgba(134, 239, 172, 0.8)' : 'rgba(134, 239, 172, 0.55)'
        }
      })
    );

    const hqPoint = points.find((point) => point.data?.label === 'Global HQ') ?? points[0];
    const svgMap = map
      .getSVG({
        shape: 'circle',
        radius: 0.45,
        color: 'rgba(255, 255, 255, 0.25)',
        backgroundColor: 'transparent'
      })
      .replace(
        '<svg ',
        '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" shape-rendering="crispEdges" '
      );

    const lines = points
      .filter((point) => point !== hqPoint)
      .map((point) => {
        const midpointX = (hqPoint.x + point.x) / 2;
        const midpointY = (hqPoint.y + point.y) / 2;
        const arcOffset = Math.min(16, Math.max(6, Math.abs(point.x - hqPoint.x) * 0.12));
        return `M ${hqPoint.x} ${hqPoint.y} Q ${midpointX} ${midpointY - arcOffset} ${point.x} ${point.y}`;
      });

    return {
      svgMap,
      width: map.image.width,
      height: map.image.height,
      lines,
      points: points.map((point) => ({
        x: point.x,
        y: point.y,
        label: point.data?.label ?? ''
      }))
    };
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061a14] text-white">
        <div
          className="absolute inset-0 animated-gradient"
          style={{
            backgroundImage:
              'radial-gradient(70% 60% at 80% 20%, rgba(24, 201, 143, 0.35), transparent 60%), radial-gradient(50% 60% at 10% 70%, rgba(86, 235, 174, 0.25), transparent 65%)'
          }}
        />
        <div className="absolute inset-0 hero-sheen opacity-60" />
        <div className="absolute inset-0 gradient-shimmer opacity-70" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '68px 68px'
          }}
        />
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 relative z-10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center py-24 lg:py-32">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...heroTransition, delay: 0.05 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(134,239,172,0.18)] sm:px-4 sm:py-2 sm:text-xs"
              >
                <Sparkles className="h-4 w-4 text-emerald-200" />
                AI Morphological POCT Platform
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-semibold leading-[1.05] tracking-tight text-balance max-w-[720px]">
                {heroLines.map((line, lineIndex) => (
                  <span key={line} className="block overflow-hidden">
                    <span className="inline-flex flex-wrap gap-x-3">
                      {line.split(' ').map((word, wordIndex) => (
                        <motion.span
                          key={`${line}-${word}`}
                          className="inline-block"
                          initial={{ y: -28, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            ...heroTransition,
                            delay: 0.18 + lineIndex * 0.12 + wordIndex * 0.06
                          }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </span>
                  </span>
                ))}
              </h1>
              <motion.p
                className="text-base md:text-lg text-white/70 max-w-2xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...heroTransition, delay: 0.38 }}
              >
                Pioneering the &ldquo;AI Morphological POCT Technology Platform,&rdquo; Awalife become the first to
                enable intelligent morphological analysis of various pet samples including blood, urine, feces,
                and pleural effusion, advancing the application and standardization of AI technology in pet
                diagnostic scenarios.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...heroTransition, delay: 0.5 }}
              >
                <Button
                  size="lg"
                  className="bg-emerald-300 text-[#06251c] hover:bg-emerald-200 rounded-full px-8 py-6 text-base"
                  asChild
                >
                  <Link to="/contact">
                    Contact us
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="border-l border-white/15 pl-4 transition-all duration-500 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...heroTransition, delay: 0.6 + index * 0.08 }}
                  >
                    <div className="text-xl md:text-2xl font-semibold text-emerald-200">{stat.value}</div>
                    <div className="text-xs text-white/60 leading-snug">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative" style={{ perspective: '1200px' }}>
              <div className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl" />
              <div className="absolute -bottom-12 left-0 h-40 w-40 rounded-full bg-emerald-200/20 blur-3xl" />
              <motion.div
                className="relative rounded-[2.5rem] border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-[0_35px_120px_rgba(6,38,26,0.5)]"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ opacity: 0, y: 24, rotateX: -6 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ ...heroTransition, delay: 0.35 }}
                whileHover={{ rotateY: -8, rotateX: 4, scale: 1.01 }}
              >
                <div className="relative rounded-[2rem] bg-[#071d15]/80 p-4" style={{ transform: 'translateZ(16px)' }}>
                  <img
                    src={emeraldHeroMicroscope}
                    alt="DM-03 microscope in digital diagnostics"
                    className="w-full object-contain drop-shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-10 right-6 rounded-2xl bg-white/10 px-4 py-3 text-xs text-white/80 shadow-lg backdrop-blur animate-float"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...heroTransition, delay: 0.7 }}
              >
                99%+ AI recognition accuracy
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="relative bg-[#f4fbf8]">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 py-20 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-4">Workflow Intelligence</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0d2b21]">
              From sample to insight in minutes.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mt-4">
              Built for clinics that need consistent, repeatable results without sacrificing speed.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Load and prepare',
                desc: 'Simple sample prep with guided steps for blood, urine, feces, and effusion samples.'
              },
              {
                title: 'AI morphological scan',
                desc: 'High-resolution imaging and AI recognition identify cells and elements in seconds.'
              },
              {
                title: 'Standardized report',
                desc: 'Auto-generated results with references, annotations, and share-ready exports.'
              }
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                  <div className="flex items-center gap-3 text-emerald-600 text-sm font-semibold">
                    <Workflow className="h-4 w-4" />
                    Step {index + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[#0d2b21]">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Duo */}
      <section className="bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10">
            <Reveal className="relative rounded-[2.5rem] border border-emerald-100 bg-[#f7fffb] p-8 transition-transform duration-500 hover:-translate-y-2">
              <div className="text-xs uppercase tracking-[0.35em] text-emerald-500">Primary Analyzer</div>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-[#0d2b21]">
                Awalife AI Morphological Analyzer
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Empower clinics with smarter diagnostics and more precise analysis, making testing faster,
                treatments more accurate, and veterinary services more professional.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full bg-[#0d2b21] text-white" asChild>
                  <Link to="/products">Learn more</Link>
                </Button>
                <Button variant="outline" className="rounded-full border-emerald-200" asChild>
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
              <video
                src={aiAnalyzerVideo}
                autoPlay
                loop
                muted
                playsInline
                className="mt-8 w-full rounded-2xl object-cover"
              />
            </Reveal>

            <Reveal className="relative rounded-[2.5rem] border border-emerald-100 bg-[#0d2b21] p-8 text-white transition-transform duration-500 hover:-translate-y-2">
              <div className="text-xs uppercase tracking-[0.35em] text-emerald-200">Imaging Workstation</div>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold">DM-03 Microscope Workstaion</h3>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                It combines smarter imaging with effortless operation, designed for veterinary professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full bg-emerald-300 text-[#06251c]" asChild>
                  <Link to="/products">Learn more</Link>
                </Button>
                <Button variant="outline" className="rounded-full border-white/40 text-white" asChild>
                  <Link to="/contact">Contact us</Link>
                </Button>
              </div>
              <video
                src={dm03Video}
                autoPlay
                loop
                muted
                playsInline
                className="mt-8 w-full rounded-2xl object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Awalife */}
      <section className="bg-[#f4fbf8]">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 py-20 lg:py-28">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-4">WHY AWALIFE ?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0d2b21]">
              The complete AI morphology platform.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Purpose-built to scale with your clinic, expand to new species, and deliver repeatable results.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {whyAwalife.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <div className="flex gap-4 rounded-3xl border border-emerald-100 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0d2b21]">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Species Gallery */}
      <section className="bg-[#06130f] text-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 py-16 lg:py-20">
          <Reveal className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50 mb-4">Species Coverage</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Built for every species, organized by category.
            </h2>
            <p className="mt-4 text-base text-white/60">
              Expand diagnostics beyond traditional companions with AI-powered morphology across diverse pet types.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {speciesGallery.map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                  <img
                    src={item.image}
                    alt={`${item.title} diagnostics`}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                    <div className="text-lg font-semibold">{item.title}</div>
                    <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
                  </div>
                  <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 py-16">
          <div className="rounded-[2.5rem] border border-emerald-100 bg-[#f7fffb] px-8 py-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 mb-3">Regulatory Credibility</p>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#0d2b21]">
                  Certified for global veterinary diagnostics.
                </h3>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {['ISO 13485 Certified', 'CE Marked', 'FDA Registered', 'GMP Compliant'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 py-10 lg:py-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#071511] text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#0a231a] to-[#16382c]" />
            <div className="absolute inset-0 hero-sheen opacity-50" />
            <div className="absolute inset-0 gradient-shimmer opacity-40" />
            <div className="relative grid lg:grid-cols-[1.05fr_1.15fr] gap-10 items-center px-8 py-10 lg:px-16 lg:py-12">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                  <span className="block text-white">Grow</span>
                  <span className="block text-emerald-200">Globally</span>
                </h2>
                <p className="mt-6 text-lg text-white/85 max-w-md">
                  Trusted in 150+ countries and regions, Awalife helps veterinary clinics standardize
                  diagnostics across LATAM, APAC, Europe, and beyond.
                </p>
                <p className="mt-6 text-sm text-white/60 max-w-md">
                  Enterprise-grade AI morphology insights keep results consistent across species, samples,
                  and clinic workflows.
                </p>
              </div>

              <div className="relative h-[320px] sm:h-[380px] lg:h-[420px]">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent" />
                <div
                  className="absolute inset-0"
                  style={{ imageRendering: 'crisp-edges' }}
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: mapData.svgMap }}
                />

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox={`0 0 ${mapData.width} ${mapData.height}`}
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  {mapData.lines.map((line, index) => (
                    <path
                      key={`${line}-${index}`}
                      d={line}
                      className="path-dash"
                      stroke="#b6ff6a"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>

                {mapData.points.map((point) => {
                  const left = `${(point.x / mapData.width) * 100}%`;
                  const top = `${(point.y / mapData.height) * 100}%`;
                  const isHq = point.label === 'Global HQ';
                  return (
                    <div
                      key={point.label}
                      className="absolute flex items-center gap-2"
                      style={{ left, top, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className={`relative ${isHq ? 'h-6 w-6' : 'h-3.5 w-3.5'}`}>
                        <span
                          className={`absolute inset-0 rounded-full ${
                            isHq ? 'bg-[#b6ff6a]/40 blur-[10px]' : 'bg-[#b6ff6a]/40 blur-[6px]'
                          }`}
                        />
                        <span className="absolute inset-0 rounded-full border border-[#b6ff6a]/70" />
                        <span
                          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                            isHq ? 'h-3 w-3 bg-[#b6ff6a]' : 'h-1.5 w-1.5 bg-[#b6ff6a]'
                          }`}
                        />
                      </div>
                      <span
                        className={`uppercase tracking-[0.25em] ${
                          isHq ? 'text-xs text-white/80' : 'text-[11px] text-white/70'
                        }`}
                      >
                        {point.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="bg-[#061a14] text-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-32 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                Elevate your diagnostics to the next level with Awalife.
              </h2>
              <p className="mt-4 text-base text-white/70 max-w-2xl">
                Bring standardized AI morphological analysis to every sample, in every clinic, every day.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-emerald-300 text-[#06251c] hover:bg-emerald-200 rounded-full px-10 py-6 text-base"
              asChild
            >
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EmeraldLanding;
