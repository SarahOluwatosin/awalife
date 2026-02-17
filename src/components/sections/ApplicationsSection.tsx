import { useEffect, useRef, useState } from 'react';
import { Droplets, Bug, TestTubes } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ApplicationsSection = () => {
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

  const applications = [
    {
      icon: Droplets,
      name: t.applications.blood.name,
      description: t.applications.blood.description,
      color: 'bg-destructive/10 text-destructive',
    },
    {
      icon: Bug,
      name: t.applications.feces.name,
      description: t.applications.feces.description,
      color: 'bg-accent text-accent-foreground',
    },
    {
      icon: TestTubes,
      name: t.applications.urine.name,
      description: t.applications.urine.description,
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <section id="applications" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3 ${
              isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
            }`}
          >
            {t.applications.subtitle}
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold text-foreground ${
              isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            {t.applications.title}
          </h2>
        </div>

        {/* Applications Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <div
              key={app.name}
              className={`group relative p-8 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl ${
                isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${app.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <app.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {app.name}
              </h3>
              <p className="text-foreground/70 leading-relaxed">{app.description}</p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
