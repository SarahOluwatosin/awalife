import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';
import microscopeImg from '@/assets/microscope-station.png';
import reagentsImg from '@/assets/reagents.png';

const Products = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: 'ai-100vet',
      image: ai100vetImg,
      name: t.products.ai100.name,
      shortName: t.products.ai100.shortName,
      description: t.products.ai100.description,
      features: t.products.ai100.features,
      featured: true,
    },
    {
      id: 'microscope',
      image: microscopeImg,
      name: t.products.microscope.name,
      shortName: t.products.microscope.shortName,
      description: t.products.microscope.description,
      features: t.products.microscope.features,
      featured: false,
    },
    {
      id: 'reagents',
      image: reagentsImg,
      name: t.products.reagents.name,
      shortName: t.products.reagents.shortName,
      description: t.products.reagents.description,
      features: t.products.reagents.features,
      featured: false,
    },
  ];

  return (
    <Layout>
      <PageHero
        title={t.pageHero.products.title}
        subtitle={t.pageHero.products.subtitle}
        breadcrumb={[{ label: t.nav.products, path: '/products' }]}
      />

      {/* Products Introduction */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              {t.products.subtitle}
            </span>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.products.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-16 pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="space-y-20 lg:space-y-28">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative"
              >
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative glow-card overflow-hidden">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 !== 0 ? '' : ''}`}>
                    {/* Image */}
                    <div className={`relative min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-secondary/80 via-card to-secondary/50 flex items-center justify-center p-10 lg:p-16 overflow-hidden ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15)_0%,transparent_50%)]" />
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1)_0%,transparent_50%)]" />
                      </div>
                      
                      {/* Floating decorative elements */}
                      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-primary/5 animate-float" />
                      <div className="absolute bottom-16 left-12 w-16 h-16 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '2s' }} />
                      <div className="absolute top-1/3 left-8 w-12 h-12 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '4s' }} />
                      
                      {product.featured && (
                        <div className="absolute top-6 left-6 z-10">
                          <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg shadow-primary/25">
                            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                            {t.products.flagship}
                          </div>
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 max-h-80 w-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                      />
                    </div>

                    {/* Content */}
                    <div className={`p-10 lg:p-16 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <div className="mb-6">
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/80 mb-3">
                          0{index + 1} / 0{products.length}
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                          {product.name}
                        </h2>
                      </div>
                      
                      <p className="text-muted-foreground mb-8 leading-relaxed text-base lg:text-lg">
                        {product.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {product.features.map((feature, i) => (
                          <div 
                            key={feature} 
                            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                              <Check className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Button className="btn-gradient group/btn" size="lg" asChild>
                          <Link to={`/products/${product.id}`}>
                            {t.products.viewDetails}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="border-border/50 hover:bg-card hover:border-primary/30">
                          {t.products.brochure}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.cta.title} <span className="gradient-text">{t.cta.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.cta.description}
          </p>
          <Button className="btn-gradient" size="lg" asChild>
            <Link to="/contact">{t.cta.button}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
