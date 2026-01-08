import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetEliteImg from '@/assets/ai-100vet-elite.png';
import ai100vetImg from '@/assets/ai-100vet-hero.webp';
import ai80vetImg from '@/assets/ai-80vet.png';
import microscopeImg from '@/assets/digital-microscope.png';

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
    { 
      id: 'ai-100vet-elite', 
      image: ai100vetEliteImg, 
      name: 'AI-100Vet Elite', 
      positioning: 'For Reference Labs',
      description: 'High-throughput morphology analyzer for veterinary reference laboratories and large hospitals.',
      featured: true 
    },
    { 
      id: 'ai-100vet', 
      image: ai100vetImg, 
      name: 'AI-100Vet', 
      positioning: 'For Hospitals',
      description: 'Mid-range AI-assisted analyzer for routine veterinary diagnostic workflows.',
      featured: false 
    },
    { 
      id: 'ai-80vet', 
      image: ai80vetImg, 
      name: 'AI-80Vet', 
      positioning: 'For Clinics',
      description: 'Compact morphology analyzer designed for smaller clinics and entry-level laboratories.',
      featured: false 
    },
    { 
      id: 'microscope', 
      image: microscopeImg, 
      name: 'Digital Microscope Station', 
      positioning: 'For All Settings',
      description: 'Microscopy workstation supporting image capture, review, and assisted analysis.',
      featured: false 
    },
  ];

  return (
    <section id="products" ref={sectionRef} className="py-24 bg-card/30">
      <div className="container mx-auto px-8 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.products.subtitle}
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.products.title}
            </h2>
          </div>
          <Button variant="outline" className="border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300 self-start md:self-auto" asChild>
            <Link to="/products">
              {t.products.viewDetails}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`glow-card group overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="relative h-48 bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center p-6 overflow-hidden">
                {product.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full z-10">
                    {t.products.flagship}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-32 w-auto object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-5">
                <div className="text-xs text-primary font-medium mb-1">{product.positioning}</div>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                <span className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all duration-300">
                  {t.products.learnMore}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
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
