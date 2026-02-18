import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  decimals?: number;
}

const StatItem = ({ value, suffix, label, delay, decimals = 0 }: StatItemProps) => {
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

const StatsSection = () => {
  const stats = [
    { value: 15, suffix: 'M+', label: 'Images analyzed for AI training' },
    { value: 2.4, suffix: 'M+', label: 'Diagnostic reports generated', decimals: 1 },
    { value: 8000, suffix: '+', label: 'Veterinary hospitals served' },
  ];

  return (
    <section id="stats" className="relative py-20 border-y border-border/30 overflow-hidden">
      <div className="absolute inset-0 scanlines opacity-15 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 100}
              decimals={stat.decimals}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
