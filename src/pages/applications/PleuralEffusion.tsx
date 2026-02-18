import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ApplicationImageCarousel from '@/components/sections/ApplicationImageCarousel';
import { images } from '@/lib/images';
import { motion } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, viewportOnce } from '@/lib/animations';

const PleuralEffusion = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const bodyTextClass = 'text-lg';

  const fallbackImages = [
    { url: images.speciesCanineFeline, label: 'Canine & Feline' },
    { url: images.speciesSmallMammals, label: 'Small Mammals' },
    { url: images.speciesExoticPets, label: 'Exotic Pets' },
    { url: images.heroDiagnosticLab, label: 'Diagnostic Lab' },
  ];

  return (
    <Layout>
      <PageHero title="Pleural Effusion Analysis" subtitle="Comprehensive body fluid cytology for accurate diagnosis" breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Pleural Effusion', path: '/applications/pleural-effusion' }]} />

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Body Fluid Analysis</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Review-ready Morphology in a <span className="gradient-text">Standardized Workflow</span></h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>Awalife helps standardize pleural and abdominal effusion review by combining high-quality microscopy imaging with AI-assisted morphology recognition. Results are delivered as a review-ready report with images and structured findings, including up to 19 reportable items.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013242151-23x4mi.pdf" target="_blank" rel="noopener noreferrer" download>Download the sample report</a></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight}>
              <div className="rounded-2xl bg-card p-10">
                <img src={images.ai100vet} alt="AI-100Vet Analyzer" data-override-id="pleural-overview" className="w-full h-full object-cover rounded-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-5xl mx-auto">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Cell Counting</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Morphology-based <span className="gradient-text">TNCC Enumeration</span></h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>In many workflows, TNCC is approximated using total WBC counts, which can overlook non-WBC formed elements and introduce variability across operators and methods. Awalife takes a morphology-first approach: it captures true-to-life microscopy images and performs morphology-based TNCC enumeration, counting nucleated cells based on what is actually present in the sample. The result is a review-ready output with image evidence, supporting more consistent TNCC reporting and clearer clinical communication for pleural and abdominal effusions.</p>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-5xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Image Quality</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"><span className="gradient-text">True-to-life Images</span>, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.</p>
          </div>
          <ApplicationImageCarousel pageKey="pleural-effusion" fallbackImages={fallbackImages} />
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                { question: 'Which species are supported for fluid analysis?', answer: 'Validated for dogs and cats.' },
                { question: 'What parameters can fluid analysis detect?', answer: '19 parameters, including:\n\nNucleated cells: Inflammatory cells, granulocytes, lymphocytes, macrophages, neutrophils, degenerative neutrophils, phagocytic cells, mesothelial cells, and unclassified nucleated cells\n\nRBC-related: RBC, PCV\n\nMicroorganisms: Cocci, rods' },
                { question: 'What are the limitations for certain effusion samples?', answer: 'Neoplastic effusions: AI may flag suspicious cells but cannot confirm tumor cells—manual review is required.\n\nSpecial effusions (e.g., biliary ascites or urinary ascites): Interpretation should be combined with biochemical testing.' },
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Interested in <span className="gradient-text">Our Products</span>?</h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-5xl mx-auto mb-10`}>Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default PleuralEffusion;
