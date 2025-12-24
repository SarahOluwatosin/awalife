import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Download, FileText, Play, Cpu, Zap, Target, Shield, Droplets, Bug, TestTubes, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ProductGallery from '@/components/product/ProductGallery';
import ProductComparison from '@/components/product/ProductComparison';
import { useLanguage } from '@/contexts/LanguageContext';
import ai100vetImg from '@/assets/ai-100vet.png';
import microscopeImg from '@/assets/microscope-station.png';

const ProductDetail = () => {
  const { productId } = useParams();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const productData: Record<string, any> = {
    'ai-100vet-elite': {
      images: [ai100vetImg, ai100vetImg, ai100vetImg],
      name: 'AI-100Vet Elite Morphological Analyzer',
      tagline: 'Premium AI-Powered Diagnostics for Cats & Dogs',
      description: 'AI-100Vet Elite Morphological Analyzer is an AI-powered diagnostic device for cats and dogs, capable of automatically analyzing three sample types: blood, feces, and urine. Featuring microfluidic automated smearing, rapid liquid-based staining, and AI-powered recognition with auto-generated diagnostic reports.',
      features: [
        'Blood, Feces & Urine Analysis',
        'AI-Powered Cell Recognition',
        'Microfluidic Automated Smearing',
        'Rapid Liquid-Based Staining',
        'Auto-Generated Reports',
        '7-Part WBC Differential',
      ],
      specs: [
        { label: 'Sample Types', value: 'Blood, Feces, Urine' },
        { label: 'Species Support', value: 'Cats & Dogs' },
        { label: 'WBC Differential', value: '7-Part (NEU, NST, NSG, NSH, LYM, MON, EOS, BAS)' },
        { label: 'Blood Sample', value: '10μL, 200K-500K cells captured' },
        { label: 'Analysis Time', value: '8-9 minutes per sample' },
        { label: 'Technology', value: 'Microfluidic + AI Recognition' },
        { label: 'Reports', value: 'Auto-generated diagnostic reports' },
      ],
      capabilities: [
        { icon: Droplets, title: 'Blood Analysis', desc: '7-Part WBC differential with complete cell morphology' },
        { icon: Bug, title: 'Feces Analysis', desc: 'Parasite eggs, protozoa, microorganisms detection' },
        { icon: TestTubes, title: 'Urine Sediment', desc: 'Complete sediment analysis with cast & crystal detection' },
      ],
      flagship: true,
    },
    'ai-100vet': {
      images: [ai100vetImg, ai100vetImg],
      name: 'AI-100Vet Morphological Analyzer',
      tagline: 'Multi-Species Intelligent Diagnostics',
      description: 'AI-100Vet Morphological Analyzer is an intelligent diagnostic device tailored for veterinary applications. It supports automatic analysis of four sample types—blood, feces, urine sediment, and pleural fluid—meeting the diverse clinical needs of more than 10 species including dogs, cats, rabbits, turtles, birds, parrots, snakes, and lizards.',
      features: [
        'Blood, Feces, Urine & Pleural Fluid',
        '10+ Species Supported',
        'AI-Powered Recognition',
        'Microfluidic Technology',
        'Real-time HD Imaging',
        'Standardized Report Output',
      ],
      specs: [
        { label: 'Sample Types', value: 'Blood, Feces, Urine Sediment, Pleural Fluid' },
        { label: 'Species Support', value: 'Dogs, Cats, Rabbits, Turtles, Birds, Parrots, Snakes, Lizards (10+)' },
        { label: 'Blood Sample', value: '10μL, 200K-500K cells, 8 min analysis' },
        { label: 'Feces Analysis', value: '9 min, parasites & microorganisms' },
        { label: 'Urine Analysis', value: '9 min, no centrifugation needed' },
        { label: 'Technology', value: 'Microfluidic automated smearing + liquid-based staining' },
        { label: 'AI Features', value: 'Rapid classification & diagnostic suggestions' },
      ],
      capabilities: [
        { icon: Droplets, title: 'Blood Analysis', desc: 'Only 10μL needed, 200K-500K cells captured in real-time' },
        { icon: Bug, title: 'Feces Analysis', desc: 'Automated sample prep, parasite eggs & microorganisms in 9 min' },
        { icon: TestTubes, title: 'Urine Sediment', desc: 'No centrifugation, 15 sec start, full report in 9 min' },
        { icon: Beaker, title: 'Pleural Fluid', desc: 'AI-powered cellular morphology analysis' },
      ],
      flagship: false,
    },
    'ai-80vet': {
      images: [ai100vetImg, ai100vetImg],
      name: 'AI-80Vet Morphological Analyzer',
      tagline: 'Configurable Testing for Diverse Needs',
      description: 'AI-80Vet Morphological Analyzer is an intelligent diagnostic device tailored for veterinary applications, which offers configurable sample testing functions to meet diverse veterinary needs. Supports comprehensive blood, feces, and urine analysis with advanced AI recognition.',
      features: [
        'Configurable Sample Testing',
        '7-Part WBC Differential',
        'Complete Parasite Detection',
        'Urine Sediment Analysis',
        'AI-Powered Recognition',
        'Flexible Configuration',
      ],
      specs: [
        { label: 'Blood WBC', value: '7-Part Differential (NEU, NST, NSG, NSH, LYM, MON, EOS, BAS)' },
        { label: 'Feces - Parasites', value: 'Ascaris, Hookworms, Dipylidium, Spirometra, Alaria eggs' },
        { label: 'Feces - Protozoa', value: 'Trichomonas, Giardia, Coccidia' },
        { label: 'Feces - Pathogens', value: 'Campylobacter, Bacillus, Helicobacter, Spirochete, Yeast' },
        { label: 'Urine - Casts', value: 'Hyaline, Cellular, Waxy, Granular casts' },
        { label: 'Urine - Crystals', value: 'Struvite, Uric acid, Cystine, Calcium oxalate, Calcium phosphate' },
        { label: 'Configuration', value: 'Customizable testing functions' },
      ],
      capabilities: [
        { icon: Droplets, title: 'Blood: Gold Standard', desc: '7-Part WBC differential with complete morphology' },
        { icon: Bug, title: 'Feces Analysis', desc: 'Parasite eggs, protozoa, pathogens, digestive function' },
        { icon: TestTubes, title: 'Urine Sediment', desc: 'Casts, crystals, cells, microorganisms' },
      ],
      flagship: false,
    },
    'microscope': {
      images: [microscopeImg, microscopeImg],
      name: 'Digital Microscope Station',
      tagline: 'Professional HD Imaging Workstation',
      description: 'AWALIFE Digital Microscope Workstation features a built-in positive sample library and can be connected to a computer to generate examination reports. With 20% larger field of view, 4K professional camera with 8 million pixels, and infinite optical system, it\'s widely applied in microscopic examination of anemia, inflammation, parasite and pathogen detection.',
      features: [
        '4K Professional Camera',
        '8 Million Pixels',
        '20% Larger Field of View',
        'Infinite Optical System',
        'Built-in Sample Library',
        '20,000 Hours LED Life',
      ],
      specs: [
        { label: 'Camera', value: '4K Professional, 8 Million Pixels' },
        { label: 'Field of View', value: '20% larger than standard' },
        { label: 'Optical System', value: 'Infinite optical system' },
        { label: 'LED Lifespan', value: '20,000 hours' },
        { label: 'Sample Library', value: 'Built-in positive sample library' },
        { label: 'Connectivity', value: 'Computer connection for report generation' },
        { label: 'Applications', value: 'Anemia, inflammation, parasite, pathogen examination' },
      ],
      capabilities: [
        { icon: Target, title: 'Wide Field of View', desc: '20% larger field under 40x objective lens' },
        { icon: Zap, title: 'High Clarity', desc: '4K camera with 8 million pixels for detailed imaging' },
        { icon: Cpu, title: 'Smart Integration', desc: 'Computer-connected report generation system' },
      ],
      flagship: false,
    },
  };

  const product = productData[productId || ''] || productData['ai-100vet-elite'];

  const otherProducts = Object.entries(productData)
    .filter(([key]) => key !== productId)
    .slice(0, 3)
    .map(([key, value]) => ({ id: key, ...value }));

  return (
    <Layout>
      <PageHero
        title={product.name}
        subtitle={product.tagline}
        breadcrumb={[
          { label: t.nav.products, path: '/products' },
          { label: product.name, path: `/products/${productId}` },
        ]}
      />

      {/* Product Hero */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image Gallery */}
            <div className="relative">
              {product.flagship && (
                <div className="absolute -top-3 left-6 z-20">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg shadow-primary/25">
                    <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                    {t.products.flagship}
                  </div>
                </div>
              )}
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Content */}
            <div className="lg:py-6">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                {product.flagship ? 'Flagship Product' : 'AWALIFE Product'}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Features Grid */}
              <div className="mb-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary/80 mb-5">{t.products.keyFeatures}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.features.map((feature: string) => (
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
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/30">
                  <Download className="mr-2 w-4 h-4" />
                  {t.products.brochure}
                </Button>
                <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary">
                  <Play className="mr-2 w-4 h-4" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      {product.capabilities && (
        <section className="py-16 lg:py-20 bg-card/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">What It Can Do</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {product.capabilities.map((cap: any, index: number) => (
                <div key={cap.title} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glow-card p-8 h-full text-center">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                    <div className="icon-glow mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <cap.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tabs Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="w-full max-w-lg mx-auto mb-12 bg-card border border-border/50 p-1.5 rounded-xl">
              <TabsTrigger value="specifications" className="flex-1 rounded-lg py-3">{t.products.specifications}</TabsTrigger>
              <TabsTrigger value="downloads" className="flex-1 rounded-lg py-3">{t.products.downloads}</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications">
              <div className="max-w-4xl mx-auto">
                <div className="glow-card overflow-hidden">
                  <div className="p-6 lg:p-8 border-b border-border/50">
                    <h3 className="text-xl font-semibold text-foreground">Technical Specifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">Detailed specifications for {product.name}</p>
                  </div>
                  <table className="w-full">
                    <tbody>
                      {product.specs.map((spec: { label: string; value: string }, i: number) => (
                        <tr key={spec.label} className={`border-b border-border/30 last:border-0 ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/20'}`}>
                          <td className="px-6 lg:px-8 py-5 font-medium text-foreground w-1/3">{spec.label}</td>
                          <td className="px-6 lg:px-8 py-5 text-muted-foreground">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="downloads">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: 'Product Brochure', type: 'PDF', size: '2.4 MB' },
                    { name: 'Technical Specifications', type: 'PDF', size: '1.2 MB' },
                    { name: 'User Manual', type: 'PDF', size: '5.8 MB' },
                    { name: 'Quick Start Guide', type: 'PDF', size: '0.8 MB' },
                  ].map((doc) => (
                    <div key={doc.name} className="group relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative glow-card p-6 flex items-center gap-5 cursor-pointer">
                        <div className="icon-glow group-hover:scale-110 transition-transform duration-300">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                        </div>
                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Product Comparison */}
      <div className="bg-card/50">
        <ProductComparison />
      </div>

      {/* Other Products */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Explore More
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Other Products</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {otherProducts.map((prod: any) => (
              <Link 
                key={prod.id} 
                to={`/products/${prod.id}`}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card overflow-hidden h-full">
                  <div className="h-48 bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center p-6">
                    <img 
                      src={prod.images[0]} 
                      alt={prod.name}
                      className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{prod.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{prod.tagline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Interested in {product.name}?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-gradient" size="lg" asChild>
                <Link to="/contact">{t.cta.button}</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/30" asChild>
                <Link to="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
