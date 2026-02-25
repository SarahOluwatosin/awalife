import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe, Microscope, ShieldCheck, Sparkles, Target, TrendingUp, Cpu, Zap, Users, Lightbulb, Heart, BookOpen, Eye, Rocket, HandHeart, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
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

/* ── Timeline Node ── */
const TimelineNode = ({ entry, index, total }: { entry: { year: string; icon: any; items: string[]; highlight?: string }; index: number; total: number }) => {
  const isLeft = index % 2 === 0;
  const Icon = entry.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row ${!isLeft ? 'md:flex-row-reverse' : ''} pl-14 md:pl-0`}
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.06 * index }}
    >
      {/* Mobile node */}
      <div className="absolute left-0 top-0 md:hidden flex flex-col items-center">
        <motion.div
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        >
          <Icon className="h-4 w-4 text-primary" />
        </motion.div>
      </div>

      {/* Card */}
      <div className={`md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:pr-6' : 'md:pl-6'}`}>
        <motion.div
          className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-6 md:p-7 cursor-default backdrop-blur-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          style={{ boxShadow: isHovered ? '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 30px -5px hsl(var(--primary) / 0.15)' : '0 4px 20px -4px rgba(0,0,0,0.06)' }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 via-primary/3 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Top accent bar - always visible, grows on hover */}
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/40"
              initial={{ scaleX: 0.3, originX: isLeft ? 0 : 1 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
            />
          </div>

          {/* Large faded year watermark */}
          <span className="pointer-events-none absolute right-3 bottom-0 text-[90px] font-black text-primary/[0.04] select-none leading-none tabular-nums">
            {entry.year.length > 4 ? entry.year.slice(0, 4) : entry.year}
          </span>

          {/* Header */}
          <div className="relative flex items-center gap-3 mb-5">
            <div>
              <span className="text-lg font-bold tracking-wide text-primary">{entry.year}</span>
              {entry.highlight && (
                <p className="text-[11px] text-muted-foreground font-medium">{entry.highlight}</p>
              )}
            </div>
          </div>

          {/* Items with stagger */}
          <ul className="relative space-y-3">
            {entry.items.map((item, j) => (
              <motion.li
                key={j}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + j * 0.08 }}
              >
                <motion.span
                  className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-primary/60"
                  animate={isHovered ? { scale: [1, 1.4, 1] } : {}}
                  transition={{ duration: 0.4, delay: j * 0.05 }}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Connector line from card to center (desktop) */}
        <div className={`hidden md:block absolute top-7 ${isLeft ? 'right-[calc(50%-2.5rem)]' : 'left-[calc(50%-2.5rem)]'} w-[2.5rem] h-px`}>
          <motion.div
            className="h-full bg-gradient-to-r from-primary/50 to-primary/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ originX: isLeft ? 1 : 0 }}
          />
        </div>
      </div>

      {/* Center icon node (desktop) */}
      <div className="hidden md:flex w-20 shrink-0 flex-col items-center pt-1">
        <motion.div
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/50 bg-background shadow-xl"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.2 }}
          whileHover={{ scale: 1.15, borderColor: 'hsl(var(--primary))' }}
        >
          <Icon className="h-5 w-5 text-primary" />
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-md" />
        </motion.div>

        {/* Year label under node */}
        <motion.span
          className="mt-2 text-[10px] font-bold text-primary/60 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {entry.year.length > 4 ? entry.year.slice(0, 4) : entry.year}
        </motion.span>
      </div>

      {/* Empty spacer */}
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
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
    { year: '2020', icon: Sparkles, highlight: 'Founded', items: ['Jul 7 — Awalife established.'] },
    { year: '2021', icon: Microscope, highlight: 'First Product', items: ['Apr — Successful development of the first Morphology Analyzer.', 'Aug — Microscope Workstation launched in China.'] },
    { year: '2022', icon: Target, highlight: 'Funded', items: ['Feb — Secured Angel funding.', 'Aug — First AI-100Vet Morphology Analyzer installed in China.'] },
    { year: '2023', icon: TrendingUp, highlight: 'Rapid Growth', items: ['Apr — Fecal Morphology Detection launched; monthly sales surpassed RMB 1M.', 'Dec — Secured Series A funding.'] },
    { year: '2024', icon: Globe, highlight: 'Global Expansion', items: ['Apr — First international AI-100Vet installed in Malaysia.', 'May — Effusion Analysis launched.', 'Nov — Blood Morphology for exotic animals launched.', 'Dec — Global monthly sales exceeded RMB 10M. Recognized as a Shenzhen Specialized and Sophisticated SME.'] },
    { year: '2025', icon: Award, highlight: 'Industry Leader', items: ['Jan — Global installations reached 3,000 units.', 'Apr — New products launched: DM-03 Microscope Workstation, AI-80Vet, AI-100Vet Elite, JH-01 Thermo Mixer.', 'Oct — Global installations reached 7,000 units.', 'Dec — Recognized as a Guangdong Provincial High-Quality & High-Tech Product. The Awalife-led industry standard for Formed Element Analyzers was officially published by the CVMA.'] },
    { year: '2026 and Beyond', icon: Rocket, highlight: 'Future', items: ['Continued global growth with continuous innovation and new applications in development.'] },
  ];

  const visionItems = [
    { text: 'Future-proof Veterinary Diagnostic Tools', icon: Eye, desc: 'Shaping the next generation of veterinary diagnostics through forward-thinking technology.' },
    { text: 'Delivering Innovation to Empower Our Customers', icon: Zap, desc: 'Continuous R&D to provide cutting-edge solutions that drive clinical excellence.' },
    { text: 'Creating Shared Value with Our Customers', icon: HandHeart, desc: 'Building partnerships where mutual growth leads to better outcomes for all.' },
  ];

  const coreValues = [
    { text: 'Integrity with Humility', icon: ShieldCheck, desc: 'Honest and grounded in everything we do.' },
    { text: 'Practical Innovation', icon: Lightbulb, desc: 'Real-world solutions, not just ideas.' },
    { text: 'Serving Clients, Growing Together', icon: Heart, desc: 'Success shared across our community.' },
    { text: 'Lifelong Learning and Ethical Excellence', icon: GraduationCap, desc: 'Always evolving with integrity.' },
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

      {/* ── Timeline ── */}
      <section className="py-20 lg:py-28 bg-secondary/20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">
          <GsapReveal direction="up" distance={40} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Key Moments That <span className="gradient-text">Shaped Awalife</span></h2>
            <p className="text-muted-foreground">From a bold idea in 2020 to a global presence — every milestone reflects our commitment to innovation.</p>
          </GsapReveal>

          <div ref={timelineRef} className="relative max-w-5xl mx-auto">
            {/* Scroll-fill vertical line */}
            <div className="pointer-events-none absolute inset-y-0 left-[18px] md:left-1/2 md:-translate-x-px">
              <div className="absolute left-0 top-0 h-full w-px bg-border/30" />
              <motion.div
                className="absolute left-0 top-0 h-full w-[2px] -translate-x-[0.5px] origin-top bg-gradient-to-b from-primary via-primary/70 to-primary/20"
                style={{ scaleY: timelineScale }}
              />
              {/* Traveling glow dot */}
              <motion.div
                className="absolute left-[-4px] w-[10px] h-[10px] rounded-full bg-primary shadow-lg shadow-primary/50"
                style={{ top: useTransform(timelineProgress, [0, 1], ['0%', '100%']) }}
              />
            </div>

            <div className="space-y-8 md:space-y-6">
              {timeline.map((entry, i) => (
                <TimelineNode key={entry.year} entry={entry} index={i} total={timeline.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Core Values ── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-primary/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">
          <GsapReveal direction="up" distance={40} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Vision and <span className="gradient-text">Core Values</span></h2>
            <p className="text-muted-foreground">The guiding principles that drive every decision, product, and partnership at Awalife.</p>
          </GsapReveal>

          {/* ── Vision ── */}
          <div className="mb-20">
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnceSmall}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                Vision
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-3 gap-6"
              variants={staggerContainerDelayed}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceSmall}
            >
              {visionItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card to-primary/[0.04] p-8 cursor-default"
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)' }}
                >
                  {/* Number watermark */}
                  <span className="pointer-events-none absolute right-3 top-0 text-[100px] font-black text-primary/[0.04] select-none leading-none tabular-nums">
                    0{i + 1}
                  </span>
                  {/* Top glow line */}
                  <motion.div
                    className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  />
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                  {/* Icon */}
                  <motion.div
                    className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-400 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-xl group-hover:shadow-primary/25"
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    <item.icon className="h-7 w-7" />
                    {/* Icon pulse on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-primary/20 opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Accent bar */}
                  <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-primary/20 transition-all duration-400 group-hover:w-20" />

                  <h3 className="relative text-base font-bold text-foreground mb-2 leading-snug">{item.text}</h3>
                  <p className="relative text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Core Values ── */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnceSmall}
              transition={{ duration: 0.5 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                Core Values
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainerDelayed}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnceSmall}
            >
              {coreValues.map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-7 cursor-default text-center"
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{ boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)' }}
                >
                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-primary/30 group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.2)]" />
                  {/* Bottom accent */}
                  <motion.div
                    className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-400 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-foreground leading-snug mb-2">{item.text}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>

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
