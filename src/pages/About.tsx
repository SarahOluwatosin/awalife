import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe, Microscope, ShieldCheck, Sparkles, Target, TrendingUp, Cpu, Zap, Users, Lightbulb, Heart, BookOpen } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { images } from '@/lib/images';
import { sectionVariants, staggerContainerDelayed, cardVariants, fadeInLeft, fadeInRight, popIn, viewportOnce, viewportOnceSmall } from '@/lib/animations';
import GsapReveal from '@/components/animations/GsapReveal';

const MetricItem = ({ value, suffix, label, delay, decimals = 0 }: {value: number;suffix: string;label: string;delay: number;decimals?: number;}) => {
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
        if (current >= value) { setCount(value); clearInterval(counter); } else { setCount(current); }
      }, duration / steps);
      return () => clearInterval(counter);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <motion.div ref={ref} className="text-center" initial={{ opacity: 0, y: 18 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: 0.6, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}>
      <div className="text-xl md:text-2xl font-semibold text-foreground">
        {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
      </div>
      <p className="text-[11px] md:text-xs text-muted-foreground mt-2">{label}</p>
    </motion.div>
  );
};

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const bodyTextClass = 'text-lg';
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.2'],
  });
  const timelineScale = useTransform(timelineProgress, [0, 1], [0, 1]);
  const timelineGlow = useTransform(timelineProgress, [0, 1], [0.2, 1]);

  const metrics = [
    { rawValue: 15, suffix: 'M+', label: 'Images Used for AI Model Training', decimals: 0 },
    { rawValue: 2.4, suffix: 'M+', label: 'Reports Generated', decimals: 1 },
    { rawValue: 8000, suffix: '+', label: 'Installations Worldwide', decimals: 0 },
  ];

  const timeline = [
    { year: '2020', icon: Sparkles, items: ['Jul 7 — Awalife established.'] },
    { year: '2021', icon: Microscope, items: ['Apr — Successful development of the first Morphology Analyzer.', 'Aug — Microscope Workstation launched in China.'] },
    { year: '2022', icon: Target, items: ['Feb — Secured Angel funding.', 'Aug — First AI-100Vet Morphology Analyzer installed in China.'] },
    { year: '2023', icon: TrendingUp, items: ['Apr — Fecal Morphology Detection launched; monthly sales surpassed RMB 1M.', 'Dec — Secured Series A funding.'] },
    { year: '2024', icon: Globe, items: ['Apr — First international AI-100Vet installed in Malaysia.', 'May — Effusion Analysis launched.', 'Nov — Blood Morphology for exotic animals launched.', 'Dec — Global monthly sales exceeded RMB 10M. Recognized as a Shenzhen Specialized and Sophisticated SME.'] },
    { year: '2025', icon: Award, items: ['Jan — Global installations reached 3,000 units.', 'Apr — New products launched: DM-03 Microscope Workstation, AI-80Vet, AI-100Vet Elite, JH-01 Thermo Mixer.', 'Oct — Global installations reached 7,000 units.', 'Dec — Recognized as a Guangdong Provincial High-Quality & High-Tech Product. The Awalife-led industry standard for Formed Element Analyzers was officially published by the CVMA.'] },
    { year: '2026 and Beyond', icon: ShieldCheck, items: ['Continued global growth with continuous innovation and new applications in development.'] },
  ];


  return (
    <Layout>
      <PageHero title="About Awalife" subtitle="Pioneering AI-powered morphology diagnostics" breadcrumb={[{ label: 'Company', path: '/company/about' }]} />

      <motion.section className="py-20 lg:py-28" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Pioneering <span className="gradient-text">AI-Powered Morphology</span> Diagnostics</h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>Awalife is a dedicated innovator in AI-powered morphology for veterinary diagnostics, with a long-term focus on formed element analysis. By pairing high-quality microscopy imaging with AI-assisted morphology recognition, we help clinics standardize workflows and document findings with clarity—through review-ready reports with images and counts across blood, urine, feces, and body fluids. We continue to expand this platform through ongoing innovation and updates.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mt-10">
                {metrics.map((metric, i) => <MetricItem key={metric.label} value={metric.rawValue} suffix={metric.suffix} label={metric.label} delay={i * 100} decimals={metric.decimals} />)}
              </div>
            </motion.div>
            <motion.div className="rounded-2xl overflow-hidden" variants={fadeInRight}>
              <img src={images.heroDiagnosticLab} alt="Awalife overview" data-override-id="about-overview" className="w-full h-full object-cover rounded-xl" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <GsapReveal direction="up" distance={40} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Key Moments That <span className="gradient-text">Shaped Awalife</span></h2>
          </GsapReveal>

          <div ref={timelineRef} className="relative max-w-5xl mx-auto">
            {/* Scroll-fill vertical line */}
            <div className="pointer-events-none absolute inset-y-0 left-4 md:left-1/2 -translate-x-px">
              <div className="absolute left-0 top-0 h-full w-px bg-border/40" />
              <motion.div
                className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-transparent"
                style={{ scaleY: timelineScale }}
              />
              <motion.div
                className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                style={{ opacity: timelineGlow }}
              />
            </div>

            <div className="space-y-10 md:space-y-8">
              {timeline.map((entry, i) => {
                const isLeft = i % 2 === 0;
                const Icon = entry.icon;
                return (
                  <motion.div
                    key={entry.year}
                    className={`relative flex flex-col md:flex-row ${!isLeft ? 'md:flex-row-reverse' : ''} pl-10 md:pl-0`}
                    initial={{ opacity: 0, x: isLeft ? -48 : 48, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={viewportOnceSmall}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.04 * i }}
                  >
                    {/* Mobile dot */}
                    <div className="absolute left-[5px] top-5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20 md:hidden" />

                    {/* Card */}
                    <div className={`md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                      <motion.div
                        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/95 p-6 shadow-sm cursor-default"
                        whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.12)', borderColor: 'rgba(var(--primary) / 0.35)' }}
                        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      >
                        {/* Large faded year watermark */}
                        <span className="pointer-events-none absolute right-3 bottom-1 text-[80px] font-black text-primary/[0.05] select-none leading-none tabular-nums">
                          {entry.year.length > 4 ? entry.year.slice(0, 4) : entry.year}
                        </span>
                        {/* Hover gradient overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/6 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                        {/* Top accent line on hover */}
                        <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Header */}
                        <div className="relative flex items-center gap-3 mb-4">
                          <motion.div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30"
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </motion.div>
                          <span className="text-sm font-bold tracking-widest uppercase text-primary">{entry.year}</span>
                        </div>

                        {/* Divider */}
                        <div className={`relative mb-4 h-px bg-gradient-to-r ${isLeft ? 'from-primary/30 to-transparent' : 'from-transparent to-primary/30'}`} />

                        {/* Items */}
                        <ul className="relative space-y-2.5">
                          {entry.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Center icon node */}
                    <div className="hidden md:flex w-24 shrink-0 flex-col items-center pt-[18px]">
                      <motion.div
                        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/40 bg-background shadow-lg shadow-primary/10"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={viewportOnceSmall}
                        transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.15 }}
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <motion.span
                          className="absolute inset-0 rounded-full bg-primary/20"
                          animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                        />
                        <motion.span
                          className="absolute inset-0 rounded-full bg-primary/10"
                          animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 + 0.6 }}
                        />
                      </motion.div>
                    </div>

                    {/* Empty spacer */}
                    <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-primary/[0.03]">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <GsapReveal direction="up" distance={40} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Vision and <span className="gradient-text">Core Values</span></h2>
          </GsapReveal>

          {/* ── Vision ── */}
          <div className="mb-14">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnceSmall}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
                <Target className="h-3.5 w-3.5" />
                Vision
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-3 gap-5"
              variants={staggerContainerDelayed}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceSmall}
            >
              {[
                { text: 'Future-proof Veterinary Diagnostic Tools', icon: Cpu },
                { text: 'Delivering Innovation to Empower Our Customers', icon: Zap },
                { text: 'Creating Shared Value with Our Customers', icon: Users },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-primary/[0.04] p-7 cursor-default"
                  variants={cardVariants}
                  whileHover={{ y: -7, boxShadow: '0 24px 48px -12px rgba(0,0,0,0.12)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  {/* Number watermark */}
                  <span className="pointer-events-none absolute right-2 top-0 text-[88px] font-black text-primary/[0.04] select-none leading-none tabular-nums">
                    0{i + 1}
                  </span>
                  {/* Top glow line on hover */}
                  <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon */}
                  <motion.div
                    className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25"
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.45 } }}
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>

                  {/* Accent bar */}
                  <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-primary/20 transition-all duration-300 group-hover:w-16" />

                  <p className="relative text-sm font-medium text-foreground/75 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Core Values ── */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnceSmall}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Core Values
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
              variants={staggerContainerDelayed}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceSmall}
            >
              {[
                { text: 'Integrity with Humility', icon: ShieldCheck },
                { text: 'Practical Innovation', icon: Lightbulb },
                { text: 'Serving Clients, Growing Together', icon: Heart },
                { text: 'Lifelong Learning and Ethical Excellence', icon: BookOpen },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 cursor-default"
                  variants={cardVariants}
                  whileHover={{ y: -7, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.10)' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                >
                  {/* Bottom glow line on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Number badge */}
                  <span className="mb-4 block text-[10px] font-black tracking-widest text-primary/30 uppercase">
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <motion.div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/30"
                    whileHover={{ scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-sm font-semibold text-foreground leading-snug">{item.text}</h4>

                  {/* Subtle right-arrow hint on hover */}
                  <div className="mt-3 flex items-center gap-1 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="h-px flex-1 bg-primary/30" />
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section className="py-20 lg:py-28 bg-secondary/20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              Global Reach
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Scaling <span className="gradient-text">globally</span> through partners who deliver locally</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-4`}>From product design to service processes, Awalife is built for international deployment. With standardized workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams deliver consistent clinical value across regions and practice settings.</p>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img src={images.heroMedtech} alt="Global partners" data-override-id="about-partners" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-20 lg:py-28 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Interested in <span className="gradient-text">Our Products</span>?</h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-5xl mx-auto mb-10`}>Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default About;
