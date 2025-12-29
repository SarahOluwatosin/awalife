import { useEffect, useRef, useState } from 'react';
import { Building2, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection = () => {
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

  const installations = [
    {
      type: "Veterinary Reference Laboratory",
      region: "East Asia",
      equipment: "AI-100Vet Elite",
      context: "High-volume diagnostic laboratory supporting regional veterinary clinics",
    },
    {
      type: "Private Veterinary Hospital",
      region: "Europe",
      equipment: "AI-100Vet + Microscope Station",
      context: "Multi-specialty animal hospital with integrated diagnostic department",
    },
    {
      type: "University Veterinary School",
      region: "North America",
      equipment: "Digital Microscope Station",
      context: "Teaching and research facility for veterinary medicine students",
    },
  ];

  return (
    <section ref={sectionRef} className="py-24">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.testimonials.title}
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.testimonials.subtitle}{' '}
            <span className="gradient-text">{t.testimonials.subtitleHighlight}</span>{' '}
            {t.testimonials.subtitleEnd}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {installations.map((installation, i) => (
            <div
              key={installation.type}
              className={`glow-card p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              <div className="flex items-center gap-2 text-primary mb-4">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium">{installation.equipment}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {installation.type}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {installation.context}
              </p>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <MapPin className="w-4 h-4" />
                <span>{installation.region}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
