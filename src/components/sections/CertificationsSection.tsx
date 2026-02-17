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
    <section ref={sectionRef} className="py-24">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className={`grid gap-12 lg:grid-cols-2 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-lg">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary mb-3 inline-block">
              Regulatory Credibility
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Certified for global veterinary diagnostics.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.label} className="flex items-center gap-3 text-muted-foreground font-medium">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <cert.icon className="h-5 w-5" />
                </span>
                <span className="text-base">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
