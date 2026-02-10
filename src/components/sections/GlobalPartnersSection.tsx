import { useEffect, useRef, useState } from 'react';
import heroMedtech from '@/assets/hero-medtech.png';

const GlobalPartnersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
            Global Partners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Scaling Globally through Partners Who Deliver Locally
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From product design to service processes, Awalife is built for international deployment. With standardized workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams deliver consistent clinical value across regions and practice settings.
          </p>
        </div>
        <div className={`mt-12 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="rounded-2xl overflow-hidden border border-border/40 shadow-lg bg-secondary/30">
            <img
              src={heroMedtech}
              alt="Global veterinary partners"
              className="w-full h-full object-cover aspect-[16/7] transition-opacity duration-500"
              loading="lazy"
              decoding="async"
              width={1280}
              height={560}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPartnersSection;
