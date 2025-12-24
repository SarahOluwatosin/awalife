import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const products = [
    { id: 'ai-100vet', image: ai100vetImg, name: t.products.ai100.name, description: t.products.ai100.description, featured: true },
    { id: 'microscope', image: microscopeImg, name: t.products.microscope.name, description: t.products.microscope.description },
    { id: 'reagents', image: reagentsImg, name: t.products.reagents.name, description: t.products.reagents.description },
  ];

  return (
    <section id="products" ref={sectionRef} className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 ${isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
              {t.products.subtitle}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground ${isVisible ? 'opacity-100 animate-fade-in delay-100' : 'opacity-0'}`}>
              {t.products.title}
            </h2>
          </div>
          <Button variant="outline" className="border-border/50 hover:bg-card self-start md:self-auto" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`glow-card group overflow-hidden ${isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="relative h-56 bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center p-6 overflow-hidden">
                {product.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full z-10">
                    Flagship
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-40 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                <span className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                  {t.products.learnMore}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
