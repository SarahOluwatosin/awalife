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
    <section ref={sectionRef} className="py-24 bg-card/30">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.whyUs.title}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.whyUs.subtitle}
            </h2>
            <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.whyUs.description}
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`glow-card p-6 flex items-start gap-4 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{reason.title}</h4>
                  <p className="text-sm text-muted-foreground">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;