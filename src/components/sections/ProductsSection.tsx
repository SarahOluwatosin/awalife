import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ai100vetEliteImg from '@/assets/ai-100vet-elite.png';
import microscopeImg from '@/assets/microscope-station.png';

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
      image: ai100vetEliteImg, 
      number: '02',
      name: 'Awalife AI Morphological Analyzer', 
      description: 'The Awalife AI Morphological Analyzer empowers clinics with smarter diagnostics and more precise analysis—making testing faster, treatments more accurate, and veterinary services more professional.',
      primaryCta: 'Learn more',
      secondaryCta: 'Contact us',
    },
    { 
      id: 'microscope', 
      image: microscopeImg, 
      number: '03',
      name: 'DM-03 Microscope Workstation', 
      description: 'It combines smarter imaging with effortless operation, designed for veterinary professionals.',
      primaryCta: 'Find out more',
      secondaryCta: 'Speak with an advisor',
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
        {products.map((product, i) => (
          <div 
            key={product.id}
            className={`grid lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${0.1 + i * 0.2}s` }}
          >
            {/* Image */}
            <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div
                className="relative rounded-2xl bg-gradient-to-br from-secondary/50 to-card overflow-hidden p-8 lg:p-12 shadow-lg"
                style={{ perspective: '1200px' }}
              >
                <span className="absolute top-6 left-6 text-6xl font-bold text-primary/10">
                  {product.number}
                </span>
                <motion.div
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ rotateX: 6, rotateY: -8 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 14 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-md mx-auto object-contain relative z-10"
                    style={{ transform: 'translateZ(50px)' }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Content */}
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
                <Button variant="outline" className="border-border/50 hover:bg-card hover:border-primary/30" asChild>
                  <Link to="/contact">
                    <Mail className="mr-2 w-4 h-4" />
                    {product.secondaryCta}
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
