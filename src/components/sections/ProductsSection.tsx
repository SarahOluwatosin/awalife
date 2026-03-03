import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { staggerContainer, cardVariants } from '@/lib/animations';
import { usePageContent } from '@/contexts/PageContentContext';

const productImages = [
  { id: 'ai-100vet-elite', image: images.awalifeAnalyzerProducts, objectFit: 'object-cover' as const },
  { id: 'microscope',       image: images.dm03Microscope,          objectFit: 'object-contain' as const },
];

const ProductsSection = () => {
  const { getContent } = usePageContent();
  const c = (key: string, fb: string) => getContent('home', 'products', key, fb);

  const products = [
    {
      id: productImages[0].id,
      image: productImages[0].image,
      objectFit: productImages[0].objectFit,
      name: c('product_1_name', 'Awalife AI Series Morphology Analyzer'),
      description: c('product_1_desc', 'Awalife AI Series Morphology Analyzer is an AI-powered veterinary system that automatically analyzes blood, urine, feces, and body fluids in one workflow. It combines multi-focus imaging, rapid liquid-based staining, AI-assisted morphology recognition, and report generation with true-to-life images and quantitative results—supported by an expandable parameter set for deeper clinical insight.'),
      primaryCta: c('product_1_cta', 'Explore product'),
    },
    {
      id: productImages[1].id,
      image: productImages[1].image,
      objectFit: productImages[1].objectFit,
      name: c('product_2_name', 'DM-03 Microscope Workstation'),
      description: c('product_2_desc', 'An integrated imaging and reporting workflow built for veterinary practice. The Awalife Microscope Workstation brings imaging, measurement, cell counting, and documentation into a streamlined workflow with built-in tools to annotate, add scales, and generate reports in one click.'),
      primaryCta: c('product_2_cta', 'Explore product'),
    },
  ];

  return (
    <section id="products" className="relative pt-0 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">

        {/* Section header — single fade-up */}
        <ScrollReveal className="max-w-5xl mx-auto text-center mb-16 w-full">
          <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
            {c('badge', 'Featured Products')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight lg:whitespace-nowrap">
            {c('title', 'Diagnostics Tools Built for')} <span className="gradient-text font-bold">Real-world Veterinary</span> Workflows
          </h2>
        </ScrollReveal>

        {/* Cards — staggered entrance, individual hover lift */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="flex flex-col group"
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {/* Image container — zooms on card hover via group-hover */}
              <div className="relative rounded-xl overflow-hidden mb-6 bg-secondary/20">
                <img
                  src={product.image}
                  alt={product.name}
                  data-override-id={`home-products-${i}`}
                  className={`w-full h-auto aspect-[4/3] object-center rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform ${product.objectFit}`}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={480}
                />
              </div>

              <div className="flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
                <div>
                  <Button className="btn-gradient group/btn" asChild>
                    <Link to={`/products/${product.id}`}>
                      {product.primaryCta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
