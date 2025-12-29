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
      description: 'European conformity for medical devices',
      stat: 'EU',
    },
    {
      icon: Award,
      title: 'ISO 13485',
      description: 'Quality management systems',
      stat: '2016',
    },
    {
      icon: FileCheck,
      title: 'Patents',
      description: 'Granted & filed innovations',
      stat: '50+',
    },
    {
      icon: Microscope,
      title: 'FDA Registered',
      description: 'US establishment listing',
      stat: 'USA',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container mx-auto px-8 lg:px-24 xl:px-32 relative z-10">
        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large Feature Card */}
          <div className={`lg:col-span-2 lg:row-span-2 glow-card p-10 flex flex-col justify-between transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                Quality & Compliance
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built on a Foundation of{' '}
                <span className="gradient-text">Trust & Innovation</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Awalife products are developed and manufactured under established quality management systems, 
                meeting international regulatory standards for veterinary diagnostic equipment.
              </p>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border/50">
              <div>
                <div className="text-4xl font-bold text-primary mb-1">20+</div>
                <div className="text-sm text-muted-foreground">Global Markets</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Installations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Certification Cards */}
          {certifications.map((cert, i) => (
            <div
              key={cert.title}
              className={`group glow-card p-6 transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="icon-glow group-hover:scale-110 transition-transform duration-500">
                  <cert.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-2xl font-bold text-primary/80">{cert.stat}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
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