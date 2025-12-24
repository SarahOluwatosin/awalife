import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

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
    <div
      ref={ref}
      className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-foreground/70 text-sm">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 1065092, suffix: '+', label: t.stats.pets },
    { value: 50, suffix: '+', label: t.stats.patents },
    { value: 3000, suffix: '', label: t.stats.factory },
    { value: 500, suffix: '+', label: t.stats.installations },
    { value: 99, suffix: '%+', label: t.stats.accuracy },
  ];

  return (
    <section id="stats" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
