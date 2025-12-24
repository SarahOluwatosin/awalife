import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Cpu, Zap, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';
import microscopeImg from '@/assets/microscope-station.png';

const Products = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: 'ai-100vet-elite',
      image: ai100vetImg,
      name: 'AI-100Vet Elite Morphological Analyzer',
      tagline: 'Premium AI-Powered Diagnostics',
      description: 'AI-powered diagnostic device for cats and dogs, capable of automatically analyzing three sample types: blood, feces, and urine. Features microfluidic automated smearing and AI-powered recognition.',
      features: ['Blood, Feces & Urine', 'Cats & Dogs', '7-Part WBC Differential', 'AI Recognition', 'Auto-Generated Reports', 'Rapid Staining'],
      featured: true,
    },
    {
      id: 'ai-100vet',
      image: ai100vetImg,
      name: 'AI-100Vet Morphological Analyzer',
      tagline: 'Multi-Species Intelligent Diagnostics',
      description: 'Intelligent diagnostic device supporting automatic analysis of four sample types—blood, feces, urine sediment, and pleural fluid—meeting the clinical needs of 10+ species including dogs, cats, rabbits, birds, and reptiles.',
      features: ['Blood, Feces, Urine, Pleural Fluid', '10+ Species Supported', 'Real-time HD Imaging', 'AI Classification', 'Diagnostic Suggestions', 'Standardized Reports'],
      featured: false,
    },
    {
      id: 'ai-80vet',
      image: ai100vetImg,
      name: 'AI-80Vet Morphological Analyzer',
      tagline: 'Configurable Sample Testing',
      description: 'Intelligent diagnostic device with configurable sample testing functions to meet diverse veterinary needs. Offers comprehensive blood, feces, and urine analysis with advanced AI recognition.',
      features: ['Configurable Testing', '7-Part WBC Differential', 'Parasite Detection', 'Urine Sediment', 'AI-Powered', 'Flexible Setup'],
      featured: false,
    },
    {
      id: 'microscope',
      image: microscopeImg,
      name: 'Digital Microscope Station',
      tagline: 'Professional HD Imaging Workstation',
      description: 'AWALIFE microscope workstation with built-in positive sample library, 4K professional camera with 8 million pixels, 20% larger field of view, and infinite optical system for microscopic examination.',
      features: ['4K Camera', '8 Million Pixels', '20% Larger FOV', 'Sample Library', 'Computer Connected', '20K Hours LED'],
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
                  <div className={`grid lg:grid-cols-2 gap-0`}>
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
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-2">
                          {product.name}
                        </h2>
                        <p className="text-primary/80 font-medium">{product.tagline}</p>
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

      {/* Why Choose Section */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Why AWALIFE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Advanced Technology for <span className="gradient-text">Better Diagnostics</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Cpu, title: 'AI-Powered', desc: 'Advanced recognition algorithms for accurate cell identification' },
              { icon: Zap, title: 'Fast Results', desc: 'Complete analysis in under 10 minutes per sample' },
              { icon: Target, title: 'High Accuracy', desc: '99%+ accuracy rate across all sample types' },
              { icon: Shield, title: 'Reliable', desc: 'Consistent standardized results every time' },
            ].map((item, index) => (
              <div key={item.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 lg:p-10 text-center h-full flex flex-col items-center">
                  <div className="icon-glow mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t.cta.title} <span className="gradient-text">{t.cta.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              {t.cta.description}
            </p>
            <Button className="btn-gradient" size="lg" asChild>
              <Link to="/contact">{t.cta.button}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
