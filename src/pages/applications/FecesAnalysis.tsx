import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ApplicationImageCarousel from '@/components/sections/ApplicationImageCarousel';
import { images } from '@/lib/images';
import { motion } from 'framer-motion';
import { sectionVariants, staggerContainer, cardVariants, fadeInLeft, fadeInRight, viewportOnce, viewportOnceSmall } from '@/lib/animations';

const FecesAnalysis = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const bodyTextClass = 'text-lg';
  const cardTextClass = 'text-base';

  const fallbackImages = [
    { url: images.speciesCanineFeline, label: 'Canine & Feline' },
    { url: images.speciesSmallMammals, label: 'Small Mammals' },
    { url: images.speciesExoticPets, label: 'Exotic Pets' },
    { url: images.heroDiagnosticLab, label: 'Diagnostic Lab' },
  ];

  const samplingCategories = [
    { title: 'Intestinal Protozoa', items: ['TRI (Trichomonas)', 'GIA (Giardia)', 'GIT (Giardia Trophozoite)', 'GIC (Giardia Cyst)', 'COC (Coccidia)'] },
    { title: 'Pathogen', items: ['COS (Cocci)', 'BAC (Bacillus)', 'SPR (Spirochetes)', 'HEL (Helicobacter)', 'YEA (Yeast)'] },
    { title: 'Parasite', items: ['ASC (Roundworm)', 'HOO (Hookworm)', 'TAP (Tapeworm)', 'SPI (Spirometra)', 'WHP (Whipworm)'] },
    { title: 'Cells', items: ['RBC', 'WBC', 'EPC (Epithelial Cell)'] },
    { title: 'Digestive Function', items: ['STA (Starch Granule)', 'FAT (Lipid Droplet)', 'PLN (Plant Fiber)', 'MUS (Muscle Fiber)'] },
  ];

  return (
    <Layout>
      <PageHero title="Feces Analysis" subtitle="From repetitive inefficiency to simple efficiency" breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Feces Analysis', path: '/applications/feces' }]} />

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Slide-free Fecal Analysis - Results within 30 Minutes</h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>Awalife streamlines fecal screening with a slide-free workflow and two sampling options, delivering review-ready images and actionable findings in under 30 minutes - designed for consistent interpretation and documentation.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><Link to="/contact">See it in action</Link></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={images.ai100vet} alt="AI-100Vet Feces Analyzer" data-override-id="feces-overview" className="w-full max-h-80 object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">No Slides, Two Sampling Options</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Powered by our latest AI model, continuously improving with regular updates.</p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013179540-cxqmcu.pdf" target="_blank" rel="noopener noreferrer" download>Download the sample report</a>
              </Button>
            </div>
          </div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {samplingCategories.map((category) => (
              <motion.div key={category.title} className="glow-card p-6 text-left" variants={cardVariants}>
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <ul className={`space-y-2 ${cardTextClass} text-muted-foreground`}>
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary"><Check className="h-3 w-3" /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div className="relative" variants={fadeInLeft}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card text-center">
                <img src={images.ai100vet} alt="Feces SOP Video-02" data-override-id="feces-sop-02" className="w-full max-h-80 object-contain" />
                <p className="text-xs text-muted-foreground mt-4">Feces SOP Video-02</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInRight}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h3>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>Direct Sampling</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>Broader coverage with more reportable parameters/findings.</li>
                <li>Best for: Routine screening and fast workflow.</li>
                <li>Recommended when: You want a quick, comprehensive review with minimal preparation.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div variants={fadeInLeft}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h3>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>Flotation Sampling (Centrifugal Flotation)</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>Uses a horizontal centrifuge to concentrate eggs/cysts.</li>
                <li>Best for: Targeted parasite enrichment and low-burden/intermittent shedding cases.</li>
                <li>Key advantage: Improved recovery of common parasites, especially: Roundworm eggs, Hookworm eggs, Tapeworm eggs, Whipworm eggs, Coccidia oocysts, Giardia cysts.</li>
                <li>Recommended when: The sample is low concentration, or parasite enrichment is clinically important.</li>
              </ul>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card text-center">
                <img src={images.ai100vet} alt="Feces SOP Video-03" data-override-id="feces-sop-03" className="w-full max-h-80 object-contain" />
                <p className="text-xs text-muted-foreground mt-4">Feces SOP Video-03</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">True-to-life Images, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.</p>
          </div>
          <ApplicationImageCarousel pageKey="feces" fallbackImages={fallbackImages} />
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                { question: 'How long does a typical fecal analysis take?', answer: 'Most samples are processed and reported in under 10 minutes depending on sample conditions.' },
                { question: 'What elements can be detected?', answer: 'Parasite eggs, protozoa, pathogens, and digestive indicators are identified with images and counts.' },
                { question: 'Is sample preparation automated?', answer: 'Yes. The workflow automates preparation, imaging, and AI-assisted recognition.' },
                { question: 'Can reports be reviewed and shared easily?', answer: 'Yes. Reports include images, counts, and annotations for review and sharing.' },
              ].map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-20 lg:py-28 bg-card/50" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Interested in Our Products?</h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-2xl mx-auto mb-10`}>Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default FecesAnalysis;
