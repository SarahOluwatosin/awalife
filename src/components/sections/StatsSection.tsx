import { useEffect, useState, useRef } from 'react';

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
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
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
    <section id="stats" className="py-20 border-y border-border/30">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
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
