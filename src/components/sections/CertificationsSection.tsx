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
    {
      icon: Shield,
      title: 'CE Marking',
      description: 'European conformity certification for medical devices',
    },
    {
      icon: Award,
      title: 'ISO 13485:2016',
      description: 'Quality management systems for medical devices',
    },
    {
      icon: FileCheck,
      title: '50+ Patents',
      description: 'Proprietary technology and innovation patents',
    },
    {
      icon: Microscope,
      title: 'FDA Registered',
      description: 'United States Food and Drug Administration',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Quality Assured
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Patents & Regulatory Approvals
          </h2>
          <p className={`text-muted-foreground mt-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            AWALIFE products meet the highest international standards for quality and safety
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.title}
              className={`group glow-card p-6 text-center transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="icon-glow mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                <cert.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
