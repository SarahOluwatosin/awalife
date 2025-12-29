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
        <div className={`text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
            {t.testimonials.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.testimonials.subtitle}{' '}
            <span className="gradient-text">{t.testimonials.subtitleHighlight}</span>{' '}
            {t.testimonials.subtitleEnd}
          </h2>
        </div>

        {/* Timeline Style */}
        <div className="max-w-3xl mx-auto">
          {installations.map((installation, i) => (
            <div
              key={installation.type}
              className={`relative pl-8 pb-10 last:pb-0 border-l-2 border-border/50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              {/* Dot */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
              
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mb-1">
                    <Building2 className="w-4 h-4" />
                    {installation.equipment}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {installation.type}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {installation.context}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs shrink-0">
                  <MapPin className="w-3 h-3" />
                  {installation.region}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;