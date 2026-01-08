import { useEffect, useRef, useState } from 'react';
import { Layers, Cog, PawPrint, Cpu } from 'lucide-react';

const WhyUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reasons = [
    { 
      icon: Layers, 
      title: 'Multiple Models Available',
      desc: 'Supports flexible expansion and upgrades, allowing you to select models and configurations based on your needs.'
    },
    { 
      icon: Cog, 
      title: 'Fully Automated Microscopy',
      desc: 'With simple sample preparation, it delivers a fully automated "sample in, result out" workflow, ensuring accurate and reliable results.'
    },
    { 
      icon: PawPrint, 
      title: 'Multi-Species & Sample Testing',
      desc: 'Supports companion and small mammals, as well as exotic pets, and automatically analyzes blood, feces, urine, and abdominal fluid samples.'
    },
    { 
      icon: Cpu, 
      title: 'AI-Powered Innovation',
      desc: 'Integrates cell morphology, biochemistry, microfluidics, optics, and AI technologies to create the world\'s first AI-powered morphological POCT platform.'
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
              Why Awalife?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What Sets Us Apart
            </h2>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 hover:bg-primary/20 hover:scale-110 transition-all duration-300">
                  <reason.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-3">{reason.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
