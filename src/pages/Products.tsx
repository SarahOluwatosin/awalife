import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Cpu, Zap, Shield, Target, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { images } from '@/lib/images';
import { motion } from 'framer-motion';
import { sectionVariants, staggerContainer, cardVariants, fadeInLeft, fadeInRight, viewportOnce, viewportOnceSmall } from '@/lib/animations';

const Products = () => {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const products = [
    { id: 'ai-100vet-elite', image: images.ai100vetElite, name: 'AI-100Vet Elite Morphological Analyzer', tagline: 'Premium AI-Powered Diagnostics', description: 'AI-powered diagnostic device for cats and dogs, capable of automatically analyzing three sample types: blood, feces, and urine. Features microfluidic automated smearing and AI-powered recognition.', features: ['Blood, Feces & Urine', 'Cats & Dogs', '7-Part WBC Differential', 'AI Recognition', 'Auto-Generated Reports', 'Rapid Staining'], featured: true },
    { id: 'ai-100vet', image: images.ai100vet, name: 'AI-100Vet Morphological Analyzer', tagline: 'Multi-Species Intelligent Diagnostics', description: 'Intelligent diagnostic device supporting automatic analysis of four sample types including blood, feces, urine sediment, and pleural fluid, meeting the clinical needs of 10+ species including dogs, cats, rabbits, birds, and reptiles.', features: ['Blood, Feces, Urine, Pleural Fluid', '10+ Species Supported', 'Real-time HD Imaging', 'AI Classification', 'Diagnostic Suggestions', 'Standardized Reports'], featured: false },
    { id: 'ai-80vet', image: images.ai80vet, name: 'AI-80Vet Morphological Analyzer', tagline: 'Configurable Sample Testing', description: 'Intelligent diagnostic device with configurable sample testing functions to meet diverse veterinary needs. Offers comprehensive blood, feces, and urine analysis with advanced AI recognition.', features: ['Configurable Testing', '7-Part WBC Differential', 'Parasite Detection', 'Urine Sediment', 'AI-Powered', 'Flexible Setup'], featured: false },
    { id: 'microscope', image: images.microscopeStation, name: 'Digital Microscope Station', tagline: 'Professional HD Imaging Workstation', description: 'AWALIFE microscope workstation with built-in positive sample library, 4K professional camera with 8 million pixels, 20% larger field of view, and infinite optical system for microscopic examination.', features: ['4K Camera', '8 Million Pixels', '20% Larger FOV', 'Sample Library', 'Computer Connected', '20K Hours LED'], featured: false },
  ];

  return (
    <Layout>
      <PageHero title={t.pageHero.products.title} subtitle={t.pageHero.products.subtitle} breadcrumb={[{ label: t.nav.products, path: '/products' }]} />

      <motion.section className="py-20 lg:py-28" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">{t.products.subtitle}</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">Next-Generation <span className="gradient-text">Veterinary Diagnostics</span></h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">{t.products.description}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Request Demo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
                <Button variant="outline" size="lg" className="border-border/50 hover:bg-secondary hover:border-primary/30"><Download className="mr-2 w-4 h-4" />Download Catalog</Button>
              </div>
            </motion.div>
            <motion.div className="relative grid grid-cols-2 gap-4" variants={fadeInRight}>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl bg-secondary/30"><img src={images.ai100vet} alt="AI-100Vet Analyzer" data-override-id="products-intro-0" className="w-full h-48 object-cover rounded-2xl" /></div>
                <div className="overflow-hidden rounded-2xl bg-secondary/30"><img src={images.reagents} alt="AWALIFE Reagents" data-override-id="products-intro-1" className="w-full h-32 object-cover rounded-2xl" /></div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl bg-secondary/30"><img src={images.microscopeStation} alt="Microscope Station" data-override-id="products-intro-2" className="w-full h-32 object-cover rounded-2xl" /></div>
                <div className="overflow-hidden rounded-2xl bg-secondary/30"><img src={images.ai100vet} alt="Product Showcase" data-override-id="products-intro-3" className="w-full h-48 object-cover rounded-2xl" /></div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-16 lg:py-24 pb-28 lg:pb-36">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="space-y-20 lg:space-y-28">
            {products.map((product, index) => (
              <motion.div key={product.id} className="group" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  <motion.div className={`relative min-h-[350px] lg:min-h-[450px] bg-secondary/30 rounded-2xl flex items-center justify-center p-8 lg:p-12 overflow-hidden ${index % 2 !== 0 ? 'lg:order-2' : ''}`} variants={index % 2 === 0 ? fadeInLeft : fadeInRight}>
                    {product.featured && (
                      <div className="absolute top-6 left-6 z-10">
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                          <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />{t.products.flagship}
                        </div>
                      </div>
                    )}
                    <img src={product.image} alt={product.name} data-override-id={`products-grid-${index}`} className="relative z-10 max-h-80 w-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-xl" />
                  </motion.div>
                  <motion.div className={`${index % 2 !== 0 ? 'lg:order-1' : ''}`} variants={index % 2 === 0 ? fadeInRight : fadeInLeft}>
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/80 mb-4">0{index + 1} / 0{products.length}</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">{product.name}</h2>
                    <p className="text-primary/80 font-medium text-lg mb-6">{product.tagline}</p>
                    <p className="text-muted-foreground mb-8 leading-relaxed text-base lg:text-lg">{product.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5"><Check className="w-3.5 h-3.5 text-primary" /></div>
                          <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button className="btn-gradient group/btn" size="lg" asChild><Link to={`/products/${product.id}`}>{t.products.viewDetails}<ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></Link></Button>
                      <Button variant="outline" size="lg" className="border-border/50 hover:bg-secondary hover:border-primary/30"><Download className="mr-2 w-4 h-4" />{t.products.brochure}</Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="py-20 lg:py-28 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">Gallery</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">See Our <span className="gradient-text">Technology in Action</span></h2>
            <p className="text-lg text-muted-foreground">Explore our state-of-the-art diagnostic equipment and laboratory solutions</p>
          </div>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            <motion.div className="col-span-2 row-span-2 overflow-hidden rounded-2xl" variants={cardVariants}><img src={images.ai100vet} alt="AI-100Vet Main" data-override-id="products-gallery-0" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
            <motion.div className="overflow-hidden rounded-2xl bg-secondary/30" variants={cardVariants}><img src={images.microscopeStation} alt="Microscope" data-override-id="products-gallery-1" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
            <motion.div className="overflow-hidden rounded-2xl bg-secondary/30" variants={cardVariants}><img src={images.reagents} alt="Reagents" data-override-id="products-gallery-2" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
            <motion.div className="overflow-hidden rounded-2xl bg-secondary/30" variants={cardVariants}><img src={images.ai100vet} alt="Product Detail" data-override-id="products-gallery-3" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
            <motion.div className="overflow-hidden rounded-2xl bg-secondary/30" variants={cardVariants}><img src={images.microscopeStation} alt="Lab Equipment" data-override-id="products-gallery-4" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" /></motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-20 lg:py-28" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div className="relative rounded-2xl overflow-hidden bg-secondary/30 p-8 lg:p-12" variants={fadeInLeft}><img src={images.ai100vet} alt="AWALIFE Technology" data-override-id="products-stats" className="w-full h-auto object-contain" /></motion.div>
            <motion.div variants={fadeInRight}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">Our Impact</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">Trusted by <span className="gradient-text">Veterinarians Worldwide</span></h2>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '50+', label: 'Countries Served' },
                  { value: '5000+', label: 'Clinics Using AWALIFE' },
                  { value: '99%', label: 'Accuracy Rate' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-5 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-20 lg:py-28 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">Why AWALIFE</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">Advanced Technology for <span className="gradient-text">Better Diagnostics</span></h2>
          </div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {[
              { icon: Cpu, title: 'AI-Powered', desc: 'Advanced recognition algorithms for accurate cell identification' },
              { icon: Zap, title: 'Fast Results', desc: 'Complete analysis in under 10 minutes per sample' },
              { icon: Target, title: 'High Accuracy', desc: '99%+ accuracy rate across all sample types' },
              { icon: Shield, title: 'Reliable', desc: 'Consistent standardized results every time' },
            ].map((item) => (
              <motion.div key={item.title} className="group text-center" variants={cardVariants}>
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300"><item.icon className="w-7 h-7 text-primary" /></div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Products;
