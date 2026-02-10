import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, BadgeCheck, Award } from 'lucide-react';

const CertificationsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const certifications = [
    { label: 'CE Certification', icon: ShieldCheck },
    { label: 'ISO9001', icon: BadgeCheck },
    { label: 'ISO13485', icon: Award },
  ];

  return (
    <section ref={sectionRef} className="py-12">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className={`rounded-3xl border border-primary/20 bg-primary/5 px-8 py-10 lg:px-12 lg:py-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.35em] uppercase text-primary/70">
                Regulatory Credibility
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mt-4">
                Certified for global veterinary diagnostics.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-center gap-3 text-muted-foreground text-sm font-medium">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <cert.icon className="h-4 w-4" />
                  </span>
                  {cert.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
