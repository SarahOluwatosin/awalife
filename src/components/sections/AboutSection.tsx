import { useEffect, useRef, useState } from 'react';
import { Zap, Target, Lightbulb, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
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

  const values = [
    { icon: Zap, title: t.about.value1.title, desc: t.about.value1.desc },
    { icon: Target, title: t.about.value2.title, desc: t.about.value2.desc },
    { icon: Lightbulb, title: t.about.value3.title, desc: t.about.value3.desc },
    { icon: Shield, title: t.about.value4.title, desc: t.about.value4.desc },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              {t.about.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.about.subtitle}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.about.description}
            </p>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {values.map((value, i) => (
              <div 
                key={value.title} 
                className={`group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;