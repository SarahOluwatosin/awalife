import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { images } from '@/lib/images';

const MetricItem = ({ value, suffix, label, delay, decimals = 0 }: { value: number; suffix: string; label: string; delay: number; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(current);
        }
      }, duration / steps);
      return () => clearInterval(counter);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 18 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  );
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-lg';

  const metrics = [
    { rawValue: 15, suffix: 'M+', label: 'Images Used for AI Model Training', decimals: 0 },
    { rawValue: 2.4, suffix: 'M+', label: 'Reports Generated', decimals: 1 },
    { rawValue: 8000, suffix: '+', label: 'Installations Worldwide', decimals: 0 },
  ];


  const timeline = [
  {
    year: '2020',
    items: ['Jul 7 — Awalife established.']
  },
  {
    year: '2021',
    items: ['Apr — Successful development of the first Morphology Analyzer.', 'Aug — Microscope Workstation launched in China.']
  },
  {
    year: '2022',
    items: ['Feb — Secured Angel funding.', 'Aug — First AI-100Vet Morphology Analyzer installed in China.']
  },
  {
    year: '2023',
    items: ['Apr — Fecal Morphology Detection launched; monthly sales surpassed RMB 1M.', 'Dec — Secured Series A funding.']
  },
  {
    year: '2024',
    items: [
    'Apr — First international AI-100Vet installed in Malaysia.',
    'May — Effusion Analysis launched.',
    'Nov — Blood Morphology for exotic animals launched.',
    'Dec — Global monthly sales exceeded RMB 10M. Recognized as a Shenzhen Specialized and Sophisticated SME.']

  },
  {
    year: '2025',
    items: [
    'Jan — Global installations reached 3,000 units.',
    'Apr — New products launched: DM-03 Microscope Workstation, AI-80Vet, AI-100Vet Elite, JH-01 Thermo Mixer.',
    'Oct — Global installations reached 7,000 units.',
    'Dec — Recognized as a Guangdong Provincial High-Quality & High-Tech Product. The Awalife-led industry standard for Formed Element Analyzers was officially published by the CVMA.']

  },
  {
    year: '2026 and Beyond',
    items: ['Continued global growth with continuous innovation and new applications in development.']
  }];


  const mission = [
  'Future-proof Veterinary Diagnostic Tools',
  'Delivering Innovation to Empower Our Customers',
  'Creating Shared Value with Our Customers'];


  const coreValues = [
  'Integrity with Humility',
  'Practical Innovation',
  'Serving Clients, Growing Together',
  'Lifelong Learning and Ethical Excellence'];


  return (
    <Layout>
      <PageHero
        title="About Awalife"
        subtitle="Pioneering AI-powered morphology diagnostics"
        breadcrumb={[{ label: 'Company', path: '/company/about' }]} />


      {/* Overview */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pioneering AI-Powered Morphology Diagnostics
              </h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>
                Awalife is a dedicated innovator in AI-powered morphology for veterinary diagnostics, with a long-term
                focus on formed element analysis. By pairing high-quality microscopy imaging with AI-assisted morphology
                recognition, we help clinics standardize workflows and document findings with clarity—through
                review-ready reports with images and counts across blood, urine, feces, and body fluids. We continue to
                expand this platform through ongoing innovation and updates.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mt-10">
                {metrics.map((metric, i) => (
                  <MetricItem key={metric.label} value={metric.rawValue} suffix={metric.suffix} label={metric.label} delay={i * 100} decimals={metric.decimals} />
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-lg bg-card">
              <img src={images.heroDiagnosticLab} alt="Awalife overview" data-override-id="about-overview" className="w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Key Moments That Shaped Awalife</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-3 top-0 h-full w-px bg-border/60" />
              <div className="space-y-10 pl-12">
                {timeline.map((entry) =>
                <div key={entry.year} className="relative">
                    <span className="absolute -left-12 top-2 h-6 w-6 rounded-full bg-primary/20 border border-primary/40" />
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/40 text-xs font-semibold tracking-wider text-foreground">
                      {entry.year}
                    </div>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-border/30 bg-secondary/20 p-6">
                      <ul className={`space-y-2 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                        {entry.items.map((item) =>
                      <li key={item}>{item}</li>
                      )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Mission and Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glow-card p-8 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Mission</h3>
                <ul className={`space-y-2 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                  {mission.map((item) =>
                  <li key={item}>{item}</li>
                  )}
                </ul>
              </div>
              <div className="w-16 h-16 rounded-full bg-secondary/30 flex-shrink-0" />
            </div>
            <div className="glow-card p-8 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Core Values</h3>
                <ul className={`space-y-2 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                  {coreValues.map((item) =>
                  <li key={item}>{item}</li>
                  )}
                </ul>
              </div>
              <div className="w-16 h-16 rounded-full bg-secondary/30 flex-shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Global Partners */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Scaling globally through partners who deliver locally
            </h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-4`}>
              From product design to service processes, Awalife is built for international deployment. With standardized
              workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams
              deliver consistent clinical value across regions and practice settings.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
            <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
              <img src={images.heroMedtech} alt="Global partners" data-override-id="about-partners" className="w-full max-h-96 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Interested in Our Products?
          </h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-2xl mx-auto mb-10`}>
            Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                Contact us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>);

};

export default About;