import { useEffect, useRef, useState } from 'react';
import { Shield, Award, FileCheck, Microscope } from 'lucide-react';

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
    { icon: Shield, title: 'CE Marking', stat: 'EU' },
    { icon: Award, title: 'ISO 13485', stat: '2016' },
    { icon: FileCheck, title: 'Patents', stat: '50+' },
    { icon: Microscope, title: 'FDA Registered', stat: 'USA' },
  ];

  return (
    <section ref={sectionRef} className="py-20 border-y border-border/30">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Left Text */}
          <div className={`lg:max-w-md transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-2">
              Quality & Compliance
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Certifications & Regulatory Status
            </h2>
          </div>

          {/* Right Certifications */}
          <div className="flex flex-wrap items-center gap-8 lg:gap-12">
            {certifications.map((cert, i) => (
              <div
                key={cert.title}
                className={`flex items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <cert.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{cert.stat}</div>
                  <div className="text-xs text-muted-foreground">{cert.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;