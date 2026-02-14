import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

const ProductsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const products = [
    { 
      id: 'ai-100vet-elite',
      image: images.awalifeAnalyzerProducts, 
      number: '01',
      name: 'Awalife AI Series Morphology Analyzer',
      description: 'Awalife AI Series Morphology Analyzer is an AI-powered veterinary system that automatically analyzes blood, urine, feces, and body fluids in one workflow. It combines multi-focus imaging, rapid liquid-based staining, AI-assisted morphology recognition, and report generation with true-to-life images and quantitative results—supported by an expandable parameter set for deeper clinical insight.',
      primaryCta: 'Explore product',
    },
    { 
      id: 'microscope',
      image: images.dm03Microscope, 
      number: '02',
      name: 'DM-03 Microscope Workstation',
      description: 'An integrated imaging and reporting workflow built for veterinary practice. The Awalife Microscope Workstation brings imaging, measurement, cell counting, and documentation into a streamlined workflow with built-in tools to annotate, add scales, and generate reports in one click.',
      primaryCta: 'Explore product',
    },
  ];

  return (
    <section id="products" ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animated-gradient" />
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-soft pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse-soft pointer-events-none"
        style={{ animationDelay: '1.4s' }}
      />
      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3">
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Diagnostic tools built for real-world veterinary workflows
          </h2>
        </div>
        {products.map((product, i) => (
          <div 
            key={product.id}
            className={`grid lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${0.1 + i * 0.2}s` }}
          >
            <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div
                className="relative rounded-2xl bg-gradient-to-br from-secondary/50 to-card overflow-hidden shadow-lg aspect-[4/3] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_hsl(var(--accent)/0.15)]"
                style={{ perspective: '1200px' }}
              >
                <span className="absolute top-6 left-6 text-6xl font-bold text-primary/10 z-10">
                  {product.number}
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ rotateX: 6, rotateY: -8 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 14 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    data-override-id={`home-products-${i}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                  />
                </motion.div>
              </div>
            </div>
            <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient group" asChild>
                  <Link to={`/products/${product.id}`}>
                    {product.primaryCta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
