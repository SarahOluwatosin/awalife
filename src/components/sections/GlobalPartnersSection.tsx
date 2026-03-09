import { motion } from 'framer-motion';
import { images } from '@/lib/images';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { scaleIn, viewportOnce } from '@/lib/animations';
import { usePageContent } from '@/contexts/PageContentContext';

const GlobalPartnersSection = () => {
  const { getContent } = usePageContent();
  const c = (key: string, fb: string) => getContent('home', 'partners', key, fb);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <ScrollReveal className="max-w-4xl mx-auto text-center" y={24} amount={0.15}>
          <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
            {c('badge', 'GLOBAL COVERAGE')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight whitespace-nowrap">
            {c('title', 'Scaling')} <span className="gradient-text">{c('title_highlight', 'Globally')}</span> {c('title_suffix', 'through Partners Who Deliver')}&nbsp;<span className="gradient-text">{c('title_highlight2', 'Locally')}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
            {c('body', 'From product design to service processes, Awalife is built for international deployment. With standardized workflows, review-ready outputs, and a platform that keeps expanding across sample types, we help teams deliver consistent clinical value across regions and practice settings.')}
          </p>
        </ScrollReveal>

        {/* Main image with scroll-triggered scale-in and hover zoom */}
        <div className="mt-12" />
        <motion.div
          className="relative rounded-xl overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
        >
          <img
            src={images.heroMedtech}
            alt="Global veterinary partners"
            data-override-id="home-partners"
            className="w-full h-full object-cover aspect-[16/6] rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.02] will-change-transform"
            loading="lazy"
            decoding="async"
            width={1280}
            height={560}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalPartnersSection;
