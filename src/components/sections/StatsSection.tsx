import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem = ({ value, suffix, label, delay }: StatItemProps) => {
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
          setCount(Math.floor(current));
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
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 150, suffix: '+', label: 'Countries and Regions Covered' },
    { value: 5000, suffix: '+', label: 'Installations' },
    { value: 114, suffix: '+', label: 'Patented Inventions' },
    { value: 20000, suffix: '+', label: 'Animal Hospitals Trusted' },
  ];

  return (
    <section id="stats" className="relative py-20 border-y border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animated-gradient" />
      <div className="absolute inset-0 scanlines opacity-15 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
