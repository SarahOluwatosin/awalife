import { useEffect, useRef, useState } from 'react';
import { Cpu, Puzzle, Rocket, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyUsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reasons = [
    { icon: Cpu, ...t.whyUs.reason1 },
    { icon: Puzzle, ...t.whyUs.reason2 },
    { icon: Rocket, ...t.whyUs.reason3 },
    { icon: Globe, ...t.whyUs.reason4 },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
              {t.whyUs.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.whyUs.subtitle}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.whyUs.description}
            </p>
          </div>

          {/* Horizontal List */}
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{reason.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;