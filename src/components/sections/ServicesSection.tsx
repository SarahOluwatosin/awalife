import { useEffect, useRef, useState } from 'react';
import { Stethoscope, Cog, Activity, Phone, GraduationCap, Network } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const services = [
    { icon: Stethoscope, ...t.services.installation },
    { icon: GraduationCap, ...t.services.training },
    { icon: Phone, ...t.services.support },
    { icon: Cog, ...t.services.maintenance },
    { icon: Activity, ...t.services.documentation },
    { icon: Network, ...t.services.workflow },
  ];

  return (
    <section ref={sectionRef} className="py-24">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Header */}
          <div className="lg:col-span-4">
            <span className={`inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.services.title}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.services.subtitle}
            </h2>
          </div>

          {/* Right Services List */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {services.map((service, i) => (
                <div
                  key={service.title}
                  className={`group flex items-start gap-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${0.15 + i * 0.05}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;