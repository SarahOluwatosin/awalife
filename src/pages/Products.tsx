import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Cpu, Zap, Shield, Target, Sparkles, Activity, Microscope, TestTube } from 'lucide-react';
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

      {/* Products Introduction with Images */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                {t.products.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Next-Generation <span className="gradient-text">Veterinary Diagnostics</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {t.products.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild>
                  <Link to="/contact">Request Demo</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-border/50 hover:bg-card hover:border-primary/30">
                  Download Catalog
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="glow-card overflow-hidden rounded-2xl">
                    <img src={ai100vetImg} alt="AI-100Vet Analyzer" className="w-full h-48 object-cover" />
                  </div>
                  <div className="glow-card overflow-hidden rounded-2xl">
                    <img src={reagentsImg} alt="AWALIFE Reagents" className="w-full h-32 object-cover" />
                  </div>
                </div>
                <div className="space-y-6 pt-8">
                  <div className="glow-card overflow-hidden rounded-2xl">
                    <img src={microscopeImg} alt="Microscope Station" className="w-full h-32 object-cover" />
                  </div>
                  <div className="glow-card overflow-hidden rounded-2xl">
                    <img src={ai100vetImg} alt="Product Showcase" className="w-full h-48 object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 pb-28 lg:pb-36">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          <div className="space-y-24 lg:space-y-32">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative"
              >
                {/* Decorative background glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative glow-card overflow-hidden rounded-3xl">
                  <div className={`grid lg:grid-cols-2 gap-0`}>
                    {/* Image */}
                    <div className={`relative min-h-[450px] lg:min-h-[550px] bg-gradient-to-br from-secondary/80 via-card to-secondary/50 flex items-center justify-center p-12 lg:p-20 overflow-hidden ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15)_0%,transparent_50%)]" />
                        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1)_0%,transparent_50%)]" />
                      </div>
                      
                      {/* Floating decorative elements */}
                      <div className="absolute top-12 right-12 w-28 h-28 rounded-full bg-primary/5 animate-float" />
                      <div className="absolute bottom-20 left-16 w-20 h-20 rounded-full bg-accent/5 animate-float" style={{ animationDelay: '2s' }} />
                      <div className="absolute top-1/3 left-10 w-14 h-14 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '4s' }} />
                      
                      {product.featured && (
                        <div className="absolute top-8 left-8 z-10">
                          <div className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg shadow-primary/25">
                            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                            {t.products.flagship}
                          </div>
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 max-h-96 w-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-2xl"
                      />
                    </div>

                    {/* Content */}
                    <div className={`p-12 lg:p-20 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <div className="mb-8">
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/80 mb-4">
                          0{index + 1} / 0{products.length}
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">
                          {product.name}
                        </h2>
                        <p className="text-primary/80 font-medium text-lg">{product.tagline}</p>
                      </div>
                      
                      <p className="text-muted-foreground mb-10 leading-relaxed text-base lg:text-lg">
                        {product.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-5 mb-12">
                        {product.features.map((feature, i) => (
                          <div 
                            key={feature} 
                            className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300"
                          >
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-5">
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

      {/* Image Gallery Section */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              See Our <span className="gradient-text">Technology in Action</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our state-of-the-art diagnostic equipment and laboratory solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="col-span-2 row-span-2">
              <div className="glow-card h-full overflow-hidden rounded-2xl">
                <img src={ai100vetImg} alt="AI-100Vet Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="glow-card overflow-hidden rounded-2xl">
              <img src={microscopeImg} alt="Microscope" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="glow-card overflow-hidden rounded-2xl">
              <img src={reagentsImg} alt="Reagents" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="glow-card overflow-hidden rounded-2xl">
              <img src={ai100vetImg} alt="Product Detail" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="glow-card overflow-hidden rounded-2xl">
              <img src={microscopeImg} alt="Lab Equipment" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Visual */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
              <div className="relative glow-card overflow-hidden rounded-3xl p-8 lg:p-12">
                <img src={ai100vetImg} alt="AWALIFE Technology" className="w-full h-auto object-contain" />
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Our Impact
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
                Trusted by <span className="gradient-text">Veterinarians Worldwide</span>
              </h2>
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '50+', label: 'Countries Served' },
                  { value: '5000+', label: 'Clinics Using AWALIFE' },
                  { value: '99%', label: 'Accuracy Rate' },
                ].map((stat) => (
                  <div key={stat.label} className="stat-card text-center">
                    <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Why AWALIFE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Advanced Technology for <span className="gradient-text">Better Diagnostics</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {[
              { icon: Cpu, title: 'AI-Powered', desc: 'Advanced recognition algorithms for accurate cell identification', image: ai100vetImg },
              { icon: Zap, title: 'Fast Results', desc: 'Complete analysis in under 10 minutes per sample', image: microscopeImg },
              { icon: Target, title: 'High Accuracy', desc: '99%+ accuracy rate across all sample types', image: reagentsImg },
              { icon: Shield, title: 'Reliable', desc: 'Consistent standardized results every time', image: ai100vetImg },
            ].map((item, index) => (
              <div key={item.title} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card overflow-hidden h-full flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 lg:p-10 text-center flex-1 flex flex-col items-center">
                    <div className="icon-glow mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24">
          <div className="relative glow-card overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            <div className="relative grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-20">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {t.cta.title} <span className="gradient-text">{t.cta.titleHighlight}</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-10">
                  {t.cta.description}
                </p>
                <div className="flex flex-wrap gap-5">
                  <Button className="btn-gradient" size="lg" asChild>
                    <Link to="/contact">{t.cta.button}</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-border/50 hover:bg-card hover:border-primary/30">
                    View Brochure
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img src={ai100vetImg} alt="AWALIFE Product" className="w-full max-w-md mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
