import { useEffect, useRef, useState } from 'react';
import { images } from '@/lib/images';
const WhyUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, {
      threshold: 0.05
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const features = [{
    title: 'One platform that expands from multi-species analysis to multi-parameter evidence',
    desc: 'It supports companion animals and small mammals, as well as large animals and a broad variety of exotic pets, making it suitable for a wide range of veterinary scenarios. In addition, it is capable of automatically analyzing blood, feces, urine, and pleural effusion samples, helping deliver efficient, accurate, and reliable results for daily clinical use.',
    image: images.speciesCanineFeline,
    alt: 'Veterinary species coverage'
  }, {
    title: 'True-to-life morphology you can trust, capturing diagnostic details with clarity',
    desc: 'With 40x optics, a 6.5 MP imaging system, and a wide field of view, Awalife preserves fine cellular detail while 1,000+ fields of view help ensure representative coverage. Liquid-based staining supports cell integrity for confident review and reporting.',
    image: images.digitalMicroscope,
    alt: 'Microscopy imaging for morphology'
  }, {
    title: 'Morphology-first AI validated by real-world usage and rapid iteration',
    desc: 'It is validated through real-world usage and rapid iteration, with over 15 million images used for AI training and more than 2.4 million diagnostic reports generated. Backed by 100+ innovations and patent updates, it continues to improve in performance and reliability with global field feedback.',
    image: images.awalifeAnalyzerHero,
    alt: 'Awalife analyzer in clinical workflow'
  }, {
    title: 'Support that scales: from day-to-day help to expert clinical guidance',
    desc: 'Awalife offers responsive online support to keep workflows running smoothly, plus access to a clinical expert network for interpretive assistance. For distributors and partners, we provide a dedicated 1-on-1 support channel to streamline onboarding, technical escalation, and ongoing enablement.',
    image: images.dm03Medtech,
    alt: 'Support and training for clinics'
  }];
  return <section ref={sectionRef} className="py-24 bg-primary-foreground">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
            Platform Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            An Expandable AI Morphology Platform Grows with New Samples and Applications
          </h2>
        </div>

        <div className="space-y-16">
          {features.map((feature, i) => {
            // Items 1 and 2 render side-by-side (paired cards)
            if (i === 1) {
              const next = features[2];
              return (
                <div
                  key="paired-cards"
                  className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: '0.2s' }}
                >
                  {[feature, next].map((f, fi) => (
                    <div key={f.title} className="flex flex-col">
                      <div className="rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01] mb-6">
                        <div className="relative">
                          <img src={f.image} alt={f.alt} data-override-id={`home-whyus-${fi + 1}`} className="w-full h-full object-cover aspect-[4/3] transition-opacity duration-500" loading="lazy" decoding="async" width={640} height={480} />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 leading-tight">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              );
            }
            if (i === 2) return null; // already rendered with i===1

            return (
              <div key={feature.title} className={`grid lg:grid-cols-2 gap-10 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
                transitionDelay: `${0.1 + i * 0.1}s`
              }}>
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01]">
                    <div className="relative">
                      <img src={feature.image} alt={feature.alt} data-override-id={`home-whyus-${i}`} className="w-full h-full object-cover aspect-[4/3] transition-opacity duration-500" loading="lazy" decoding="async" width={640} height={480} />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} max-w-xl`}>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg max-w-prose">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>;
};
export default WhyUsSection;
