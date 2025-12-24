import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';
import microscopeImg from '@/assets/microscope-station.png';
import reagentsImg from '@/assets/reagents.png';

const ProductsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      image: ai100vetImg,
      name: t.products.ai100.name,
      description: t.products.ai100.description,
      featured: true,
    },
    {
      image: microscopeImg,
      name: t.products.microscope.name,
      description: t.products.microscope.description,
      featured: false,
    },
    {
      image: reagentsImg,
      name: t.products.reagents.name,
      description: t.products.reagents.description,
      featured: false,
    },
  ];

  return (
    <section id="products" ref={sectionRef} className="py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4 ${
              isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
            }`}
          >
            {t.products.subtitle}
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold text-foreground ${
              isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            {t.products.title}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl ${
                isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
              } ${product.featured ? 'md:row-span-1' : ''}`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-accent to-background overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Flagship
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <Button
                  variant="ghost"
                  className="group/btn text-primary hover:text-primary p-0 h-auto"
                >
                  {t.products.learnMore}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
