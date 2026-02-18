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
  return <section ref={sectionRef} className="py-24 bg-primary/5">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
            Platform Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            An <span className="gradient-text">Expandable</span> AI Morphology Platform Grows with New Samples and Applications
          </h2>
        </div>

        <div className="space-y-8 pb-32">
          {features.map((feature, i) => {
            const getTitleWithHighlights = () => {
              switch(i) {
                case 0:
                  return <>One platform that expands from <span className="gradient-text">multi-species analysis</span> to <span className="gradient-text">multi-parameter evidence</span></>;
                case 1:
                  return <><span className="gradient-text">True-to-life morphology</span> you can trust, capturing <span className="gradient-text">diagnostic details</span> with clarity</>;
                case 2:
                  return <><span className="gradient-text">Morphology-first AI</span> validated by <span className="gradient-text">real-world usage</span> and rapid iteration</>;
                case 3:
                  return <><span className="gradient-text">Support that scales</span>: from day-to-day help to <span className="gradient-text">expert clinical guidance</span></>;
                default:
                  return feature.title;
              }
            };

            return (
              <div
                key={feature.title}
                className={`sticky grid lg:grid-cols-2 gap-0 items-stretch bg-card rounded-3xl overflow-hidden border border-border/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  top: `${i * 2}rem`,
                  transitionDelay: `${0.1 + i * 0.1}s`
                }}
              >
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''} bg-secondary/30`}>
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    data-override-id={`home-whyus-${i}`}
                    className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                  />
                </div>
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} flex flex-col justify-center p-8 lg:p-12`}>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                    {getTitleWithHighlights()}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
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