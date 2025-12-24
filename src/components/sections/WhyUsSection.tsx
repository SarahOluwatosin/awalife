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
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.whyUs.title}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.whyUs.subtitle}
            </h2>
            <p className={`text-muted-foreground mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.whyUs.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((reason, i) => (
                <div
                  key={reason.title}
                  className={`flex items-start gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                    <reason.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{reason.title}</h4>
                    <p className="text-xs text-muted-foreground">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Visual */}
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="glow-card p-8 text-center">
              <div className="text-6xl font-bold gradient-text mb-2">4.8/5</div>
              <p className="text-muted-foreground mb-4">Google Reviews</p>
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-6 h-6 ${i < 4 ? 'text-primary' : 'text-primary/50'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="stat-card">
                  <div className="text-2xl font-bold text-primary">30K+</div>
                  <div className="text-xs text-muted-foreground">Healthcare Institutions</div>
                </div>
                <div className="stat-card">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-xs text-muted-foreground">Countries Served</div>
                </div>
              </div>
            </div>
            {/* Decorative orb */}
            <div className="absolute -top-10 -right-10 w-32 h-32 orb opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
