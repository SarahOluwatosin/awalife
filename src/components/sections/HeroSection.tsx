import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { images } from '@/lib/images';
import { motion, useScroll, useTransform } from 'framer-motion';
import Starfield from '@/components/animations/Starfield';
import AnimatedGradientBg from '@/components/animations/AnimatedGradientBg';

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
});

interface MetricItemProps {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  delay?: number;
}

const MetricItem = ({ value, suffix, label, decimals = 0, delay = 0 }: MetricItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setTimeout(() => {
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
    <div ref={ref}>
      <div className="text-xl md:text-2xl font-semibold text-foreground">
        {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
      </div>
      <p className="text-[11px] md:text-xs text-muted-foreground mt-2">{label}</p>
    </div>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 90]);

  const metrics = [
    { value: 15, suffix: 'M+', label: 'Images Used for AI Model Training' },
    { value: 2.4, suffix: 'M+', label: 'Reports Generated', decimals: 1 },
    { value: 8000, suffix: '+', label: 'Installations Worldwide' },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-28 pb-16">
      <AnimatedGradientBg />
      <Starfield starCount={150} speed={0.5} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="absolute -top-16 right-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl animate-pulse-soft pointer-events-none" />
      <div
        className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse-soft pointer-events-none"
        style={{ animationDelay: '1.3s' }}
      />

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <motion.div
            className="max-w-xl"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp()} className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-[11px] sm:text-sm text-foreground/80 tracking-[0.02em] whitespace-nowrap">
                Pioneering AI-Powered Morpology Diagnostics
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp(0.05)} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Morphology isn't </span>
              <br />
              <span className="text-foreground">a feature for us, </span>
              <span className="gradient-text">it's the foundation</span>
            </motion.h1>

            <motion.p variants={fadeUp(0.1)} className="text-lg md:text-xl text-muted-foreground max-w-prose mb-8 leading-relaxed">
              We turn cellular morphology into visible, quantifiable, and review-ready evidence, helping veterinarians diagnose with greater depth and confidence.
            </motion.p>

            <motion.div variants={fadeUp(0.15)} className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-gradient group px-8" asChild>
                <Link to="/contact">
                  Contact us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border/50 hover:border-primary/40 px-8" asChild>
                <Link to="/products">Explore products</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp(0.2)} className="mt-10 grid gap-8 sm:grid-cols-3">
              {metrics.map((metric, index) => (
                <MetricItem key={metric.label} {...metric} delay={index * 120} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95, rotateY: -4 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <motion.div
              className="rounded-3xl overflow-hidden"
              style={{ y: imageY }}
            >
              <div className="relative">
                <img
                  src={images.heroDiagnosticLab}
                  alt="Veterinary diagnostic workflow"
                  data-override-id="home-hero"
                  className="w-full h-full object-cover aspect-[5/4]"
                  fetchPriority="high"
                  decoding="async"
                  width={800}
                  height={640}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
