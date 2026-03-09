import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { staggerContainerDelayed, fadeInUp, viewportOnce } from '@/lib/animations';
import { usePageContent } from '@/contexts/PageContentContext';

const CTASection = () => {
  const { getContent } = usePageContent();
  const c = (key: string, fb: string) => getContent('home', 'cta', key, fb);

  return (
    <section className="relative py-20 lg:py-28 bg-card/50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        {/* Stagger: heading → body → button, each fades up individually */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerDelayed}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
            variants={fadeInUp}
          >
            {c('title', 'Ready to standardize your')} <span className="gradient-text">{c('title_highlight', 'diagnostic workflow')}</span>{c('title_suffix', '')}
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-5xl mx-auto"
            variants={fadeInUp}
          >
            {c('body', "Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.")}
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-4" variants={fadeInUp}>
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                {c('cta_text', 'Get in Touch')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
