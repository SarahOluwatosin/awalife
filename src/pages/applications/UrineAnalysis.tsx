import { useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ApplicationImageCarousel from '@/components/sections/ApplicationImageCarousel';
import { images } from '@/lib/images';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, viewportOnce, viewportOnceSmall } from '@/lib/animations';
import GsapReveal from '@/components/animations/GsapReveal';

const UrineAnalysis = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const bodyTextClass = 'text-lg';
  const cardTextClass = 'text-base';

  const imgRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', slidesToScroll: 1 });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

      <motion.section ref={imgRef} className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Urine Analysis</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Standardized Urine Sediment Review - <span className="gradient-text">Images and Counts</span> in One Workflow.</h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>Awalife brings a repeatable, clinic-ready workflow for urine formed elements. From sample processing to imaging and AI-assisted recognition, results are delivered as review-ready reports with images and quantified outputs, helping teams work faster and more consistently.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><Link to="/contact">See it in action<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight} style={{ y: imgY }}>
              <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-card transition-shadow duration-500 hover:shadow-[0_0_50px_hsl(var(--primary)/0.15)]">
                <img src={images.ai100vet} alt="Urine sediment workflow" data-override-id="urine-overview" className="w-full h-full aspect-[3/2] object-cover rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-white" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <GsapReveal direction="up" distance={40} className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">AI-Powered Analysis</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Make Urine Sediment <span className="gradient-text">Consistent</span> - across Users and Sites</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Powered by our latest AI model, continuously improving with regular updates.</p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013094726-jpuaxn.pdf" target="_blank" rel="noopener noreferrer" download><Download className="mr-2 w-4 h-4" />Download the sample report</a>
              </Button>
            </div>
          </GsapReveal>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {sedimentCategories.map((category) => (
                  <div key={category.title} className="flex-[0_0_85%] sm:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.667rem)] min-w-0">
                    <div className="rounded-2xl border border-border/50 bg-card p-6 text-left h-full shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-400">
                      <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                      <ul className={`space-y-2 ${cardTextClass} text-muted-foreground`}>
                        {category.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="h-3 w-3" /></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={scrollPrev} className="w-9 h-9 rounded-full border border-border/50 bg-card flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors" aria-label="Previous slide">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={scrollNext} className="w-9 h-9 rounded-full border border-border/50 bg-card flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors" aria-label="Next slide">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="space-y-8">
            <motion.div className="text-center max-w-4xl mx-auto" variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">How It Works</span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">From Sample to Report - in <span className="gradient-text">Under 10 minutes</span></h3>
              <ul className={`grid md:grid-cols-2 gap-x-8 gap-y-3 ${bodyTextClass} text-muted-foreground text-left`}>
                <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary flex-shrink-0"><Check className="h-3 w-3" /></span><span>Focus particles help the system rapidly lock focus on formed elements, minimizing manual adjustments.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary flex-shrink-0"><Check className="h-3 w-3" /></span><span>Centrifugation is optional for routine samples.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary flex-shrink-0"><Check className="h-3 w-3" /></span><span>For very dilute/clear urine, centrifugation is recommended to concentrate formed elements.</span></li>
                <li className="flex items-start gap-2"><span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary flex-shrink-0"><Check className="h-3 w-3" /></span><span>For very turbid samples or hematuria, dilution is recommended to improve imaging and recognition.</span></li>
              </ul>
              <p className={`${bodyTextClass} italic text-muted-foreground mt-6`}>*Workflow recommendations may vary by sample condition and clinical protocols</p>
            </motion.div>
            <motion.div className="relative w-full" variants={fadeInRight}>
              <div className="rounded-2xl overflow-hidden">
                <img src={images.ai100vet} alt="Urine SOP Video" data-override-id="urine-sop" className="w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-secondary/20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Clinical Images</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"><span className="gradient-text">True-to-life Images</span>, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.</p>
          </div>
          <ApplicationImageCarousel pageKey="urine" fallbackImages={fallbackImages} />
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>
          {(() => {
            const urineFaqs = [
              { question: 'Which species are supported for urine analysis?', answer: 'Validated for dogs and cats.' },
              { question: 'What parameters can urine analysis detect?', answer: '23 parameters, including:\n\nCrystal: Struvite, Calcium oxalate monohydrate, Calcium oxalate dihydrate, Calcium phosphate, Uric acid, Cystine, Bilirubin, Ammonium urate\n\nCast: Hyaline cast, Cellular cast, Granular cast, Waxy cast\n\nCell: RBC, WBC, Sperm, Renal tubular epithelial cell, Transitional epithelial cell, Squamous epithelial cell\n\nMicroorganism: Cocci, Rods, Yeast\n\nOthers: Lipid droplets, Mucus' },
              { question: 'Is the workflow easy to use?', answer: 'Yes. Most samples do not require centrifugation. For very clear samples, centrifugation may be considered using the turbidity reference card as guidance.' },
              { question: 'What are the limitations for certain urine samples?', answer: 'Severe hematuria may obscure other components and reduce AI accuracy. Dilution may help, but accuracy is not guaranteed. Microscopic examination is recommended.' },
            ];
            const mid = Math.ceil(urineFaqs.length / 2);
            return (
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
                <Accordion type="single" collapsible className="w-full">
                  {urineFaqs.slice(0, mid).map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  {urineFaqs.slice(mid).map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })()}
        </div>
      </motion.section>

      <motion.section className="py-20 lg:py-28 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
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

export default UrineAnalysis;
