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
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4 ${isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
            {t.about.title}
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 ${isVisible ? 'opacity-100 animate-fade-in delay-100' : 'opacity-0'}`}>
            {t.about.subtitle}
          </h2>
          <p className={`text-muted-foreground ${isVisible ? 'opacity-100 animate-fade-in delay-200' : 'opacity-0'}`}>
            {t.about.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <div key={value.title} className={`glow-card p-6 ${isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <div className="icon-glow mb-4">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
