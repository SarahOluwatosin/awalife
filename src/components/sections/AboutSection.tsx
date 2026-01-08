import { useEffect, useRef, useState } from 'react';
import { Cpu, Layers, Zap, Globe } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { 
      icon: Cpu, 
      title: 'AI-Powered Innovation', 
      desc: 'Integrates cell morphology, biochemistry, microfluidics, optics, and AI technologies.' 
    },
    { 
      icon: Layers, 
      title: 'Multi-Sample Testing', 
      desc: 'Analyzes blood, feces, urine, and abdominal fluid samples automatically.' 
    },
    { 
      icon: Zap, 
      title: 'Fully Automated', 
      desc: 'Simple sample preparation delivers "sample in, result out" workflow.' 
    },
    { 
      icon: Globe, 
      title: 'Multi-Species Support', 
      desc: 'Supports companion animals, small mammals, and exotic pets.' 
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              About Awalife
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              World's First AI-Powered{' '}
              <span className="text-primary">Morphological POCT Platform</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Awalife becomes the first to enable intelligent morphological analysis of various pet samples—advancing the application and standardization of AI technology in pet diagnostic scenarios.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The best part of our technology is spending less time with it. Save time and streamline your practice with our in-house analyzers.
            </p>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div 
                key={feature.title} 
                className={`p-6 rounded-2xl bg-secondary/30 border border-border/30 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
