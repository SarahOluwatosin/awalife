import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import AnimatedGradientBg from '@/components/animations/AnimatedGradientBg';
import { sectionVariants, viewportOnce } from '@/lib/animations';

const CTASection = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-primary/[0.04] to-transparent overflow-hidden">
      <AnimatedGradientBg />
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Interested in <span className="gradient-text">Our Products</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-prose mx-auto">
            Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                Contact us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
