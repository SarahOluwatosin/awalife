import { motion } from 'framer-motion';
import { images } from '@/lib/images';
import ProgressiveImage from '@/components/ui/progressive-image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Marquee from '@/components/animations/Marquee';
import { scaleIn, viewportOnce } from '@/lib/animations';

const marqueeItems = [
  '15M+ AI Training Images',
  'CE Certified',
  'ISO 9001',
  'ISO 13485',
  '2.4M+ Reports Generated',
  '100+ Innovations & Patents',
  'Multi-Species Coverage',
  'Global Distribution Network',
  'Rapid Liquid-Based Staining',
  '6.5 MP Imaging System',
];

const GlobalPartnersSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6 lg:px-16 xl:px-24">
      <ScrollReveal className="max-w-4xl mx-auto text-center" y={24} amount={0.15}>
        <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
          Global Partners
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
          Scaling <span className="gradient-text">Globally</span> through Partners Who Deliver&nbsp;<span className="gradient-text">Locally</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
          From product design to service processes, Awalife is built for international deployment. With standardized workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams deliver consistent clinical value across regions and practice settings.
        </p>
      </ScrollReveal>

      {/* Animated ticker */}
      <div className="mt-10 mb-10">
        <Marquee duration="28s">
          {marqueeItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/8 border border-primary/15 text-sm font-medium text-foreground whitespace-nowrap select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </div>
          ))}
        </Marquee>
      </div>

      {/* Main image with scroll-triggered scale-in and hover zoom */}
      <motion.div
        className="relative rounded-xl overflow-hidden group"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={scaleIn}
      >
        <ProgressiveImage
          src={images.heroMedtech}
          alt="Global veterinary partners"
          data-override-id="home-partners"
          aspectClassName="aspect-[16/6]"
          className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.02] will-change-transform"
          loading="lazy"
          decoding="async"
          width={1280}
          height={560}
        />
      </motion.div>
    </div>
  </section>
);

export default GlobalPartnersSection;
