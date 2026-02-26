import { motion } from 'framer-motion';
import { images } from '@/lib/images';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ease = [0.16, 1, 0.3, 1] as const;

const cardVariant = {
  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease } },
};

const features = [
  {
    title: 'One platform that expands from multi-species analysis to multi-parameter evidence',
    desc: 'It supports companion animals and small mammals, as well as large animals and a broad variety of exotic pets, making it suitable for a wide range of veterinary scenarios. In addition, it is capable of automatically analyzing blood, feces, urine, and pleural effusion samples, helping deliver efficient, accurate, and reliable results for daily clinical use.',
    image: images.speciesCanineFeline,
    alt: 'Veterinary species coverage',
    highlight: (
      <>One platform that expands from <span className="gradient-text">multi-species analysis</span> to <span className="gradient-text">multi-parameter evidence</span></>
    ),
  },
  {
    title: 'True-to-life morphology you can trust, capturing diagnostic details with clarity',
    desc: 'With 40x optics, a 6.5 MP imaging system, and a wide field of view, Awalife preserves fine cellular detail while 1,000+ fields of view help ensure representative coverage. Liquid-based staining supports cell integrity for confident review and reporting.',
    image: images.digitalMicroscope,
    alt: 'Microscopy imaging for morphology',
    highlight: (
      <><span className="gradient-text">True-to-life morphology</span> you can trust, capturing <span className="gradient-text">diagnostic details</span> with clarity</>
    ),
  },
  {
    title: 'Morphology-first AI validated by real-world usage and rapid iteration',
    desc: 'It is validated through real-world usage and rapid iteration, with over 15 million images used for AI training and more than 2.4 million diagnostic reports generated. Backed by 100+ innovations and patent updates, it continues to improve in performance and reliability with global field feedback.',
    image: images.awalifeAnalyzerHero,
    alt: 'Awalife analyzer in clinical workflow',
    highlight: (
      <><span className="gradient-text">Morphology-first AI</span> validated by <span className="gradient-text">real-world usage</span> and rapid iteration</>
    ),
  },
  {
    title: 'Support that scales: from day-to-day help to expert clinical guidance',
    desc: 'Awalife offers responsive online support to keep workflows running smoothly, plus access to a clinical expert network for interpretive assistance. For distributors and partners, we provide a dedicated 1-on-1 support channel to streamline onboarding, technical escalation, and ongoing enablement.',
    image: images.dm03Medtech,
    alt: 'Support and training for clinics',
    highlight: (
      <><span className="gradient-text">Support that scales</span>: from day-to-day help to <span className="gradient-text">expert clinical guidance</span></>
    ),
  },
];

const WhyUsSection = () => (
<section className="py-24 relative">
    <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">

      {/* Section header */}
      <ScrollReveal className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
          WHY AWALIFE
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          An <span className="gradient-text font-bold">Expandable</span> AI Morphology <span className="gradient-text font-bold">Platform</span> Grows with New Samples and Applications
        </h2>
      </ScrollReveal>

      {/* Sticky stacking cards — each animates individually as it enters the viewport */}
      <div className="space-y-8 pb-16">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="sticky grid lg:grid-cols-2 gap-0 items-stretch bg-card rounded-3xl overflow-hidden border border-border/20 group"
            style={{ top: `${i * 2}rem` }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariant}
          >
            {/* Image — zooms on hover via group-hover */}
            <div className={`${i % 2 === 1 ? 'lg:order-2' : ''} bg-secondary/30 overflow-hidden`}>
              <img
                src={feature.image}
                alt={feature.alt}
                data-override-id={`home-whyus-${i}`}
                className="w-full h-full object-cover min-h-[260px] lg:min-h-[320px] transition-transform duration-700 ease-out group-hover:scale-[1.03] will-change-transform"
                loading="lazy"
                decoding="async"
                width={640}
                height={480}
              />
            </div>

            {/* Text */}
            <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} flex flex-col justify-center p-8 lg:p-12`}>
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
