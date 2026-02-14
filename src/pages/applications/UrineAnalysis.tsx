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

const UrineAnalysis = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const bodyTextClass = 'text-lg';
  const cardTextClass = 'text-base';

  const sedimentCategories = [
    { title: 'Crystal', items: ['MAP (Struvite Crystal)', 'COM (Calcium Oxalate Monohydrate Crystal)', 'COD (Calcium Oxalate Dihydrate Crystal)', 'CAP (Calcium Phosphate Crystal)', 'UAC (Uric Acid Crystal)', 'CYS (Cystine Crystal)', 'BIL (Bilirubin Crystal)', 'AMU (Ammonium Urate Crystal)'] },
    { title: 'Cells', items: ['RBC', 'WBC', 'RTE (Renal Tubular Epithelial Cell)', 'SEC (Squamous Epithelial Cell)', 'TEC (Transitional Epithelial Cell)', 'SPE (Sperm)'] },
    { title: 'Casts', items: ['HYA (Hyaline Cast)', 'CEC (Cellular Cast)', 'GRA (Granular Cast)', 'WAX (Waxy Cast)'] },
    { title: 'Pathogen', items: ['COC (Cocci)', 'BAC (Rods)', 'YEA (Yeast)'] },
    { title: 'Others', items: ['FAT (Lipid Droplet)', 'MUH (Mucus Filament)'] },
  ];

  const fallbackImages = [
    { url: images.speciesCanineFeline, label: 'Canine & Feline' },
    { url: images.speciesSmallMammals, label: 'Small Mammals' },
    { url: images.speciesExoticPets, label: 'Exotic Pets' },
    { url: images.heroDiagnosticLab, label: 'Diagnostic Lab' },
  ];

  return (
    <Layout>
      <PageHero title="Urine Sediment Analysis" subtitle="Comprehensive results. Expedited clinical decisions." breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Urine Analysis', path: '/applications/urine' }]} />

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Standardized Urine Sediment Review - Images and Counts in One Workflow.</h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>Awalife brings a repeatable, clinic-ready workflow for urine formed elements. From sample processing to imaging and AI-assisted recognition, results are delivered as review-ready reports with images and quantified outputs, helping teams work faster and more consistently.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><Link to="/contact">See it in action</Link></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={images.ai100vet} alt="Urine sediment workflow" data-override-id="urine-overview" className="w-full max-h-80 object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Make Urine Sediment Consistent - across Users and Sites</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Powered by our latest AI model, continuously improving with regular updates.</p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013094726-jpuaxn.pdf" target="_blank" rel="noopener noreferrer" download>Download the sample report</a>
              </Button>
            </div>
          </div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {sedimentCategories.map((category) => (
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
                <img src={images.ai100vet} alt="Urine SOP Video" data-override-id="urine-sop" className="w-full max-h-80 object-contain" />
                <p className="text-xs text-muted-foreground mt-4">Urine SOP Video-02</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInRight}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h3>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>From sample to report - in under 10 minutes</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>Focus particles help the system rapidly lock focus on formed elements, minimizing manual adjustments.</li>
                <li>Centrifugation is optional for routine samples.</li>
                <li>For very dilute/clear urine, centrifugation is recommended to concentrate formed elements.</li>
                <li>For very turbid samples or hematuria, dilution is recommended to improve imaging and recognition.</li>
              </ul>
              <p className={`${bodyTextClass} italic text-muted-foreground mt-6`}>*Workflow recommendations may vary by sample condition and clinical protocols</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">True-to-life Images, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.</p>
          </div>
          <ApplicationImageCarousel pageKey="urine" fallbackImages={fallbackImages} />
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
                { question: 'Which species are supported for urine analysis?', answer: 'Validated for dogs and cats.' },
                { question: 'What parameters can urine analysis detect?', answer: '23 parameters, including:\n\nCrystal: Struvite, Calcium oxalate monohydrate, Calcium oxalate dihydrate, Calcium phosphate, Uric acid, Cystine, Bilirubin, Ammonium urate\n\nCast: Hyaline cast, Cellular cast, Granular cast, Waxy cast\n\nCell: RBC, WBC, Sperm, Renal tubular epithelial cell, Transitional epithelial cell, Squamous epithelial cell\n\nMicroorganism: Cocci, Rods, Yeast\n\nOthers: Lipid droplets, Mucus' },
                { question: 'Is the workflow easy to use?', answer: 'Yes. Most samples do not require centrifugation. For very clear samples, centrifugation may be considered using the turbidity reference card as guidance.' },
                { question: 'What are the limitations for certain urine samples?', answer: 'Severe hematuria may obscure other components and reduce AI accuracy. Dilution may help, but accuracy is not guaranteed. Microscopic examination is recommended.' },
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

export default UrineAnalysis;
