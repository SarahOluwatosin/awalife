import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-diagnostic-lab.jpg';

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
  const metrics = [
    { value: 15, suffix: 'M+', label: 'Images Used for AI Model Training' },
    { value: 2.4, suffix: 'M+', label: 'Reports Generated', decimals: 1 },
    { value: 8000, suffix: '+', label: 'Installations Worldwide' },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="absolute -top-16 right-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl animate-pulse-soft pointer-events-none" />
      <div
        className="absolute bottom-10 left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-pulse-soft pointer-events-none"
        style={{ animationDelay: '1.3s' }}
      />

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="max-w-xl">
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 opacity-0 animate-fade-in">
              <span className="text-[11px] sm:text-sm text-foreground/80 tracking-[0.02em] whitespace-nowrap">
                Pioneering AI-Powered Morpology Diagnostics
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in delay-100 leading-tight">
              <span className="text-foreground">Morphology isn't </span>
              <br />
              <span className="text-foreground">a feature for us, </span>
              <span className="gradient-text">it's the foundation</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 opacity-0 animate-fade-in delay-200 leading-relaxed">
              We turn cellular morphology into visible, quantifiable, and review-ready evidence, helping veterinarians diagnose with greater depth and confidence.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in delay-300">
              <Button size="lg" className="btn-gradient group px-8" asChild>
                <Link to="/contact">
                  Contact us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border/50 hover:border-primary/40 px-8" asChild>
                <Link to="/products">Explore products</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {metrics.map((metric, index) => (
                <MetricItem key={metric.label} {...metric} delay={index * 120} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-border/40 shadow-xl bg-card">
              <img
                src={heroBg}
                alt="Veterinary diagnostic workflow"
                className="w-full h-full object-cover aspect-[5/4]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-2xl bg-primary/10 border border-primary/20 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
