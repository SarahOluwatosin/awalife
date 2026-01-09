import type { ReactNode } from 'react';
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
import ai100vetNew from '@/assets/ai-100vet-new.png';
import microscopeStation from '@/assets/microscope-station.png';
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
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061a14] text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 80% 20%, rgba(24, 201, 143, 0.35), transparent 60%), radial-gradient(50% 60% at 10% 70%, rgba(86, 235, 174, 0.25), transparent 65%)'
          }}
        />
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
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] shadow-[0_0_30px_rgba(134,239,172,0.18)]">
                <Sparkles className="h-4 w-4 text-emerald-200" />
                AI Morphological POCT Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Precision morphology for every pet sample.
              </h1>
              <p className="text-base md:text-lg text-white/70 max-w-xl">
                Awalife brings AI-powered morphological analysis to blood, urine, feces, and pleural effusion,
                standardizing diagnostics with speed, accuracy, and confidence for modern veterinary teams.
              </p>
              <div className="flex flex-wrap gap-4">
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
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 text-white px-8 py-6 text-base"
                  asChild
                >
                  <Link to="/products">Explore platform</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l border-white/15 pl-4 transition-all duration-500 hover:-translate-y-1">
                    <div className="text-xl md:text-2xl font-semibold text-emerald-200">{stat.value}</div>
                    <div className="text-xs text-white/60 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl" />
              <div className="absolute -bottom-12 left-0 h-40 w-40 rounded-full bg-emerald-200/20 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-white/15 bg-white/5 p-6 backdrop-blur transition-transform duration-700 hover:-translate-y-2">
                <img src={ai100vetNew} alt="Awalife AI Morphological Analyzer" className="w-full object-contain" />
              </div>
              <div className="absolute -bottom-10 right-6 rounded-2xl bg-white/10 px-4 py-3 text-xs text-white/80 shadow-lg backdrop-blur animate-float">
                99%+ AI recognition accuracy
              </div>
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
              <img src={ai100vetNew} alt="AI Morphological Analyzer" className="mt-8 w-full object-contain" />
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
              <img src={microscopeStation} alt="DM-03 Microscope Workstaion" className="mt-8 w-full object-contain" />
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
