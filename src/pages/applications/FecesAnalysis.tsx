import { useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ApplicationImageCarousel from '@/components/sections/ApplicationImageCarousel';
import { images } from '@/lib/images';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, viewportOnce, viewportOnceSmall } from '@/lib/animations';
import GsapReveal from '@/components/animations/GsapReveal';

const FecesAnalysis = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const bodyTextClass = 'text-lg';
  const cardTextClass = 'text-base';

  const imgRef1 = useRef<HTMLElement>(null);
  const imgRef2 = useRef<HTMLElement>(null);
  const { scrollYProgress: sp1 } = useScroll({ target: imgRef1, offset: ['start end', 'end start'] });
  const { scrollYProgress: sp2 } = useScroll({ target: imgRef2, offset: ['start end', 'end start'] });
  const py1 = useTransform(sp1, [0, 1], [40, -40]);
  const py2 = useTransform(sp2, [0, 1], [40, -40]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', slidesToScroll: 1 });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const fallbackImages = [
  { url: images.speciesCanineFeline, label: 'Canine & Feline' },
  { url: images.speciesSmallMammals, label: 'Small Mammals' },
  { url: images.speciesExoticPets, label: 'Exotic Pets' },
  { url: images.heroDiagnosticLab, label: 'Diagnostic Lab' }];


  const samplingCategories = [
  { title: 'Intestinal Protozoa', items: ['TRI (Trichomonas)', 'GIA (Giardia)', 'GIT (Giardia Trophozoite)', 'GIC (Giardia Cyst)', 'COC (Coccidia)'] },
  { title: 'Pathogen', items: ['COS (Cocci)', 'BAC (Bacillus)', 'SPR (Spirochetes)', 'HEL (Helicobacter)', 'YEA (Yeast)'] },
  { title: 'Parasite', items: ['ASC (Roundworm)', 'HOO (Hookworm)', 'TAP (Tapeworm)', 'SPI (Spirometra)', 'WHP (Whipworm)'] },
  { title: 'Cells', items: ['RBC', 'WBC', 'EPC (Epithelial Cell)'] },
  { title: 'Digestive Function', items: ['STA (Starch Granule)', 'FAT (Lipid Droplet)', 'PLN (Plant Fiber)', 'MUS (Muscle Fiber)'] }];


  return (
    <Layout>
      <PageHero title="Feces Analysis" subtitle="From repetitive inefficiency to simple efficiency" breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Feces Analysis', path: '/applications/feces' }]} />

      <motion.section ref={imgRef1} className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Fecal Analysis</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Slide-free Fecal Analysis - <span className="gradient-text">Results within 30 Minutes</span></h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>Awalife streamlines fecal screening with a slide-free workflow and two sampling options, delivering review-ready images and actionable findings in under 30 minutes - designed for consistent interpretation and documentation.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><Link to="/contact">See it in action<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight} style={{ y: py1 }}>
              <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-card transition-shadow duration-500 hover:shadow-[0_0_50px_hsl(var(--primary)/0.15)]">
                <img src={images.ai100vet} alt="AI-100Vet Feces Analyzer" data-override-id="feces-overview" className="w-full h-full aspect-[3/2] object-cover rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-white" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <GsapReveal direction="up" distance={40} className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">AI-Powered Analysis</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">No Slides, <span className="gradient-text">Two Sampling Options</span></h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Powered by our latest AI model, continuously improving with regular updates.</p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013179540-cxqmcu.pdf" target="_blank" rel="noopener noreferrer" download><ArrowRight className="mr-2 w-4 h-4" />Download the sample report</a>
              </Button>
            </div>
          </GsapReveal>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {samplingCategories.map((category) => (
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div className="relative" variants={fadeInLeft}>
              <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-card transition-shadow duration-500 hover:shadow-[0_0_50px_hsl(var(--primary)/0.15)]">
                <img src={images.ai100vet} alt="Feces SOP Video-02" data-override-id="feces-sop-02" className="w-full aspect-[3/2] object-cover" />
              </div>
            </motion.div>
            <motion.div variants={fadeInRight}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It <span className="gradient-text">Works</span></h3>
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

      <motion.section ref={imgRef2} className="py-16 lg:py-20 bg-secondary/20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div variants={fadeInLeft}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It <span className="gradient-text">Works</span></h3>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>Flotation Sampling (Centrifugal Flotation)</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>Uses a horizontal centrifuge to concentrate eggs/cysts.</li>
                <li>Best for: Targeted parasite enrichment and low-burden/intermittent shedding cases.</li>
                <li>Key advantage: Improved recovery of common parasites, especially: Roundworm eggs, Hookworm eggs, Tapeworm eggs, Whipworm eggs, Coccidia oocysts, Giardia cysts.</li>
                <li>Recommended when: The sample is low concentration, or parasite enrichment is clinically important.</li>
              </ul>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight} style={{ y: py2 }}>
              <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-card transition-shadow duration-500 hover:shadow-[0_0_50px_hsl(var(--primary)/0.15)]">
                <img src={images.ai100vet} alt="Feces SOP Video-03" data-override-id="feces-sop-03" className="w-full aspect-[3/2] object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-white" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Clinical Images</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"><span className="gradient-text">True-to-life Images</span>, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.</p>
          </div>
          <ApplicationImageCarousel pageKey="feces" fallbackImages={fallbackImages} />
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>
          {(() => {
            const fecesFaqs = [
              { question: 'How long does a typical fecal analysis take?', answer: 'Most samples are processed and reported in under 10 minutes depending on sample conditions.' },
              { question: 'What elements can be detected?', answer: 'Parasite eggs, protozoa, pathogens, and digestive indicators are identified with images and counts.' },
              { question: 'Is sample preparation automated?', answer: 'Yes. The workflow automates preparation, imaging, and AI-assisted recognition.' },
              { question: 'Can reports be reviewed and shared easily?', answer: 'Yes. Reports include images, counts, and annotations for review and sharing.' },
            ];
            const mid = Math.ceil(fecesFaqs.length / 2);
            return (
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
                <Accordion type="single" collapsible className="w-full">
                  {fecesFaqs.slice(0, mid).map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  {fecesFaqs.slice(mid).map((faq) => (
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

      <motion.section className="py-20 lg:py-28 bg-secondary/20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Interested in <span className="gradient-text">Our Products</span>?</h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-5xl mx-auto mb-10`}>Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>);

};

export default FecesAnalysis;