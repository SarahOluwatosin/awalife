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
import { usePageContent } from '@/contexts/PageContentContext';

const FecesAnalysis = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const { getContent } = usePageContent();
  const c = (section: string, key: string, fb: string) => getContent('feces', section, key, fb);
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


  const FECES_CAT_FALLBACKS = [
    { title: 'Intestinal Protozoa', items: 'TRI (Trichomonas)\nGIA (Giardia)\nGIT (Giardia Trophozoite)\nGIC (Giardia Cyst)\nCOC (Coccidia)' },
    { title: 'Pathogen',            items: 'COS (Cocci)\nBAC (Bacillus)\nSPR (Spirochetes)\nHEL (Helicobacter)\nYEA (Yeast)' },
    { title: 'Parasite',            items: 'ASC (Roundworm)\nHOO (Hookworm)\nTAP (Tapeworm)\nSPI (Spirometra)\nWHP (Whipworm)' },
    { title: 'Cells',               items: 'RBC\nWBC\nEPC (Epithelial Cell)' },
    { title: 'Digestive Function',  items: 'STA (Starch Granule)\nFAT (Lipid Droplet)\nPLN (Plant Fiber)\nMUS (Muscle Fiber)' },
  ];

  const samplingCategories = FECES_CAT_FALLBACKS.map((fb, i) => ({
    title: c('categories', `cat_${i + 1}_title`, fb.title),
    items: c('categories', `cat_${i + 1}_items`, fb.items).split('\n').filter(Boolean),
  }));


  return (
    <Layout>
      <PageHero title={c('hero', 'title', 'Feces Analysis')} subtitle={c('hero', 'subtitle', 'From repetitive inefficiency to simple efficiency')} breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Feces Analysis', path: '/applications/feces' }]} />

      <motion.section ref={imgRef1} className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('overview', 'badge', 'Fecal Analysis')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c('overview', 'title', 'Slide-free Fecal Analysis')} - <span className="gradient-text">{c('overview', 'title_highlight', 'Results within 30 Minutes')}</span></h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>{c('overview', 'body', 'Awalife streamlines fecal screening with a slide-free workflow and two sampling options, delivering review-ready images and actionable findings in under 30 minutes - designed for consistent interpretation and documentation.')}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">{c('overview', 'cta_primary', 'Contact us')}<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><Link to="/contact">{c('overview', 'cta_secondary', 'See it in action')}<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
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
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('classification', 'badge', 'AI-Powered Analysis')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{c('classification', 'title', 'No Slides,')} <span className="gradient-text">{c('classification', 'title_highlight', 'Two Sampling Options')}</span></h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>{c('classification', 'subtitle', 'Powered by our latest AI model, continuously improving with regular updates.')}</p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013179540-cxqmcu.pdf" target="_blank" rel="noopener noreferrer" download><Download className="mr-2 w-4 h-4" />Download the sample report</a>
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
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('direct_sampling', 'badge', 'How It Works')}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{c('direct_sampling', 'title', 'Direct Sampling')}</h3>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground`}>
                {[
                  c('direct_sampling', 'bullet_1', 'Broader coverage with more reportable parameters/findings.'),
                  c('direct_sampling', 'bullet_2', 'Best for: Routine screening and fast workflow.'),
                  c('direct_sampling', 'bullet_3', 'Recommended when: You want a quick, comprehensive review with minimal preparation.'),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section ref={imgRef2} className="py-16 lg:py-20 bg-secondary/20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('flotation', 'badge', 'How It Works')}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{c('flotation', 'title', 'Flotation Sampling (Centrifugal Flotation)')}</h3>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground`}>
                {[
                  c('flotation', 'bullet_1', 'Uses a horizontal centrifuge to concentrate eggs/cysts.'),
                  c('flotation', 'bullet_2', 'Best for: Targeted parasite enrichment and low-burden/intermittent shedding cases.'),
                  c('flotation', 'bullet_3', 'Key advantage: Improved recovery of common parasites, especially: Roundworm eggs, Hookworm eggs, Tapeworm eggs, Whipworm eggs, Coccidia oocysts, Giardia cysts.'),
                  c('flotation', 'bullet_4', 'Recommended when: The sample is low concentration, or parasite enrichment is clinically important.'),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
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
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('clinical_images', 'badge', 'Clinical Images')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"><span className="gradient-text">{c('clinical_images', 'title_highlight', 'True-to-life Images')}</span>, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>{c('clinical_images', 'subtitle', "Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.")}</p>
          </div>
          <ApplicationImageCarousel pageKey="feces" fallbackImages={fallbackImages} />
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('faq', 'badge', 'FAQ')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{c('faq', 'title', 'Frequently Asked')} <span className="gradient-text">{c('faq', 'title_highlight', 'Questions')}</span></h2>
          </div>
          {(() => {
            const fecesFaqs = [
              { question: c('faq', 'q1', 'Which species are supported for fecal analysis?'), answer: c('faq', 'a1', 'Validated for dogs and cats.') },
              { question: c('faq', 'q2', 'What sample types are supported?'), answer: c('faq', 'a2', 'Fresh stool, lavage fluid, or anal swab (not recommended).') },
              { question: c('faq', 'q3', 'What can the flotation method detect?'), answer: c('faq', 'a3', '7 parasite parameters, including:\n\nEggs: Roundworm, Hookworm, Whipworm, Spirometra, Dipylidium caninum\n\nProtozoa: Giardia cyst, Isospora (coccidia)') },
              { question: c('faq', 'q4', 'What can the direct method detect?'), answer: c('faq', 'a4', '33 parameters, including:\n\nParasites: Roundworm, Hookworm, Whipworm, Spirometra, Dipylidium caninum, Alaria alata\n\nProtozoa: Trichomonas, Giardia trophozoite, Giardia cyst, Isospora (coccidia)\n\nMicroorganisms: Cocci, rods, cocci/rods ratio, curved rods, spore-forming rods, spirochetes, spiral-shaped rods, yeast\n\nCells: RBC, WBC, epithelial cells\n\nDigestive contents: Starch granules, muscle fibers, plant fibers, lipid droplets') },
              { question: c('faq', 'q5', 'What is the difference between flotation and direct methods?'), answer: c('faq', 'a5', 'Flotation: Higher sensitivity for parasite eggs/cysts, especially at low egg counts\n\nDirect: Faster and simpler; also evaluates flora, digestion, and cells for quick screening') },
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c('cta', 'title', 'Interested in Our Products?')}</h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-5xl mx-auto mb-10`}>{c('cta', 'body', "Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>);

};

export default FecesAnalysis;
