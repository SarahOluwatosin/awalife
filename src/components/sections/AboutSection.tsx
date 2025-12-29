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
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.about.title}
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.about.subtitle}
          </h2>
          <p className={`text-muted-foreground text-lg leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.about.description}
          </p>
        </div>

        {/* Value Cards - 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((value, i) => (
            <div 
              key={value.title} 
              className={`glow-card p-8 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
              style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="flex items-start gap-5">
                <div className="icon-glow shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;