import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Check, ArrowRight, Microscope, Target, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { images } from '@/lib/images';
import { motion } from 'framer-motion';
import { sectionVariants, staggerContainer, cardVariants, fadeInLeft, fadeInRight, viewportOnce, viewportOnceSmall } from '@/lib/animations';

const BodyFluids = () => {
  const { t } = useLanguage();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const clinicalScenarios = [
    { title: 'Pleural Effusion Analysis', description: 'Determine fluid characteristics and cellular composition to differentiate between transudate and exudate.', icon: Beaker },
    { title: 'Ascitic Fluid Examination', description: 'Analyze peritoneal fluid for infections, malignancies, and organ dysfunction indicators.', icon: Microscope },
    { title: 'Skin Sample Analysis', description: 'Detect mites, fungi, bacteria, and cellular abnormalities in dermatological samples.', icon: Target },
    { title: 'Complex Case Diagnosis', description: 'Multi-dimensional diagnostic insights for challenging cases requiring fluid cytology.', icon: Shield },
  ];

  const analysisTypes = [
    { title: 'Pleural & Ascitic Fluids', description: 'AI-powered recognition and counting of cellular morphology in pleural and ascitic fluids assists veterinarians in determining fluid characteristics.', features: ['Cell morphology analysis', 'Fluid characterization', 'AI-powered counting', 'Diagnostic insights'], color: 'purple' },
    { title: 'Skin Samples', description: 'Comprehensive skin sample analysis for detecting parasites, fungi, bacteria, and cellular abnormalities in dermatological cases.', features: ['Mite detection', 'Fungal analysis', 'Bacterial identification', 'Cell abnormalities'], color: 'pink' },
  ];

  return (
    <Layout>
      <PageHero title="Body Fluids & Other Samples" subtitle="Multi-dimensional diagnostic insights for complex cases" breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Body Fluids', path: '/applications/body-fluids' }]} />

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div className="lg:order-2" variants={fadeInRight}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">Advanced Analysis</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6"><span className="gradient-text">Beyond Standard</span> Sample Types</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">AWALIFE analyzers support analysis of pleural fluid, ascitic fluid, and skin samples. With AI-powered recognition and counting of cellular morphology, the system assists veterinarians in determining fluid characteristics and provides multi-dimensional diagnostic insights for complex cases.</p>
              <div className="space-y-4 mb-8">
                {['Pleural fluid cytology', 'Ascitic fluid analysis', 'Skin scraping examination', 'AI-powered cell counting'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-primary" /></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/products/ai-100vet">View AI-100Vet<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013242151-23x4mi.pdf" target="_blank" rel="noopener noreferrer" download>Download the sample report</a></Button>
              </div>
            </motion.div>
            <motion.div className="relative lg:order-1" variants={fadeInLeft}>
              <div className="rounded-2xl bg-card p-10">
                <img src={images.ai100vet} alt="AI-100Vet Analyzer" data-override-id="bodyfluids-overview" className="w-full h-full object-cover rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">Sample Types</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"><span className="gradient-text">Specialized</span> Analysis Capabilities</h2>
          </div>
          <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {analysisTypes.map((type) => (
              <motion.div key={type.title} className="group relative" variants={cardVariants}>
                <div className="rounded-2xl border border-border/50 bg-card p-8 lg:p-10 h-full shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-400">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"><Beaker className="w-8 h-8 text-primary" /></div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{type.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{type.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {type.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /><span className="text-sm text-muted-foreground">{feature}</span></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">Clinical Applications</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"><span className="gradient-text">Typical</span> Clinical Scenarios</h2>
          </div>
          <motion.div className="grid md:grid-cols-2 gap-6 lg:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {clinicalScenarios.map((scenario, index) => (
              <motion.div key={scenario.title} className="group relative" variants={cardVariants}>
                <div className="rounded-2xl border border-border/50 bg-card p-8 h-full shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-400">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"><scenario.icon className="w-7 h-7 text-primary" /></div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{scenario.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{scenario.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-20 lg:py-28 bg-card/50" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Handle <span className="gradient-text">Complex Cases</span> with Confidence</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">Get multi-dimensional diagnostic insights for challenging cases requiring fluid cytology.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient" size="lg" asChild><Link to="/contact">Request a Demo</Link></Button>
            <Button variant="outline" size="lg" asChild><Link to="/products">View All Products</Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default BodyFluids;
