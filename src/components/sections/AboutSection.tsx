import { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, Heart, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const values = [
    { icon: Target, label: t.about.value1 },
    { icon: Lightbulb, label: t.about.value2 },
    { icon: Heart, label: t.about.value3 },
    { icon: GraduationCap, label: t.about.value4 },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span
              className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4 ${
                isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              {t.about.subtitle}
            </span>
            <h2
              className={`text-3xl md:text-4xl font-bold text-foreground mb-6 ${
                isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              {t.about.title}
            </h2>
            <p
              className={`text-lg text-foreground/70 mb-8 leading-relaxed ${
                isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              {t.about.description}
            </p>

            {/* Mission */}
            <div
              className={`bg-accent rounded-xl p-6 mb-8 ${
                isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t.about.mission}
              </h3>
              <p className="text-foreground/70">{t.about.missionText}</p>
            </div>
          </div>

          {/* Values Grid */}
          <div
            className={`${isVisible ? 'opacity-100 animate-fade-in-right' : 'opacity-0'}`}
            style={{ animationDelay: '0.5s' }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              {t.about.values}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.label}
                  className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <value.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-foreground">{value.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
