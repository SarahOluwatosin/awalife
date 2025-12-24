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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
            {t.products.description}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`glow-card overflow-hidden ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className={`relative h-72 lg:h-auto bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center p-8 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    {product.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        Flagship Product
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-64 w-auto object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {product.name}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button className="btn-gradient group" asChild>
                        <Link to={`/products/${product.id}`}>
                          {t.products.viewDetails}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="border-border/50 hover:bg-card">
                        {t.products.brochure}
                      </Button>
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
