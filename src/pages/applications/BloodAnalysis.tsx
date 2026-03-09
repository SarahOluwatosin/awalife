import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ApplicationImageCarousel from '@/components/sections/ApplicationImageCarousel';
import { images } from '@/lib/images';
import { motion, useScroll, useTransform } from 'framer-motion';
import { sectionVariants, staggerContainer, cardVariants, fadeInLeft, fadeInRight, viewportOnce, viewportOnceSmall } from '@/lib/animations';
import GsapReveal from '@/components/animations/GsapReveal';
import { usePageContent } from '@/contexts/PageContentContext';

const BloodAnalysis = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { getContent } = usePageContent();
  const c = (section: string, key: string, fb: string) => getContent('blood', section, key, fb);

  const bodyTextClass = 'text-lg';
  const cardTextClass = 'text-base';

  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: s1 } = useScroll({ target: section1Ref, offset: ['start end', 'end start'] });
  const { scrollYProgress: s2 } = useScroll({ target: section2Ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(s1, [0, 1], [40, -40]);
  const y2 = useTransform(s2, [0, 1], [40, -40]);

  const BLOOD_CAT_FALLBACKS = [
    {
      title: 'WBC: up to 9-part Differential',
      desc: 'More granular white blood cell differentiation to support deeper review beyond basic differentials.',
      items: 'Band Neutrophils (NST#)\nSegmented Neutrophils (NSG#)\nHypersegmented Neutrophils (NSH#)\nSmall Lymphocytes (SLYM# %)\nLarge Lymphocytes (LLYM# %)\nAtypical WBC (AWBC#)',
    },
    {
      title: 'RBC: up to 7-part Differential',
      desc: 'Richer red blood cell morphology categories for more informative interpretation and documentation.',
      items: 'Reticulocytes (RET# RET%)\nNucleated RBC (NRBC# NRBC/WBC)\nGhost Cells (ETG# ETG%)\nSpherocytes (SPH# SPH%)\nAcanthocytes (AC#)\nRBC Clump (AGG#)\nHeinz Bodies (HEB# HEB%)',
    },
    {
      title: 'Platelet clump recognition',
      desc: 'Recognizes platelet clumps and converts clumped platelets into single-platelet equivalents for platelet enumeration.',
      items: 'Total Platelets Count (PLT)\nPlatelets Count (PLT#)\nPlatelets Clump Count (APLT#)',
    },
  ];

  const bloodCategories = BLOOD_CAT_FALLBACKS.map((fb, i) => ({
    title:       c('categories', `cat_${i + 1}_title`, fb.title),
    description: c('categories', `cat_${i + 1}_desc`,  fb.desc),
    items:       c('categories', `cat_${i + 1}_items`, fb.items).split('\n').filter(Boolean),
  }));

  const fallbackImages = [
    { url: images.speciesCanineFeline, label: 'Canine & Feline' },
    { url: images.speciesSmallMammals, label: 'Small Mammals' },
    { url: images.speciesExoticPets, label: 'Exotic Pets' },
    { url: images.heroDiagnosticLab, label: 'Diagnostic Lab' },
  ];

  return (
    <Layout>
      <PageHero title={c('hero', 'title', 'Blood Analysis')} subtitle={c('hero', 'subtitle', 'The most extensive Complete Blood Count (CBC) in veterinary medicine')} breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Blood Analysis', path: '/applications/blood' }]} />

      <motion.section ref={section1Ref} className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('overview', 'badge', 'Blood Analysis')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c('overview', 'title', 'Standardized Blood Smear Review')} - <span className="gradient-text">{c('overview', 'title_highlight', 'Images and Counts')}</span> in One Workflow</h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>{c('overview', 'body', 'Awalife delivers a clinic-ready blood smear workflow with AI-assisted recognition and counting. Results are reported with review-ready images and quantitative outputs, enabling consistent decisions across teams and sites.')}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">{c('overview', 'cta_primary', 'Contact us')}<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><Link to="/contact">{c('overview', 'cta_secondary', 'See it in action')}<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight} style={{ y: y1 }}>
              <div className="rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-card">
                <img src={images.ai100vet} alt="Blood smear workflow" data-override-id="blood-overview" className="w-full h-full object-cover rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-white" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <GsapReveal direction="up" distance={40} className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('classification', 'badge', 'AI-Powered Classification')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{c('classification', 'title', 'Deeper Blood')} <span className="gradient-text">{c('classification', 'title_highlight', 'Morphology Classification')}</span> - Built for Clinical Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>{c('classification', 'subtitle', 'Powered by our latest AI model, continuously improving with regular updates.')}</p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013016271-paiyw3.pdf" target="_blank" rel="noopener noreferrer" download><Download className="mr-2 w-4 h-4" />Download the sample report</a>
              </Button>
            </div>
          </GsapReveal>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {bloodCategories.map((category) =>
            <motion.div key={category.title} className="group relative" variants={cardVariants}>
                <div className="rounded-2xl border border-border/50 bg-card p-6 text-left h-full shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-400">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{category.title}</h3>
                  <p className={`${cardTextClass} text-muted-foreground mb-4`}>{category.description}</p>
                  <ul className={`space-y-2 ${cardTextClass} text-muted-foreground`}>
                    {category.items.map((item) =>
                  <li key={item} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="h-3 w-3" /></span>
                        <span>{item}</span>
                      </li>)}
                  </ul>
                </div>
              </motion.div>)}
          </motion.div>
        </div>
      </motion.section>

      <motion.section ref={section2Ref} className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="space-y-8">
            <motion.div className="space-y-6 text-center max-w-3xl mx-auto" variants={fadeInLeft}>
              <div>
                <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('how_it_works', 'badge', 'How It Works')}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">{c('how_it_works', 'title', 'More Count')}</h3>
              </div>
              <ul className={`space-y-4 ${bodyTextClass} text-muted-foreground text-left inline-block`}>
                {[
                  c('how_it_works', 'bullet_1', '10μL blood, allows instant capture of 200,000 to 500,000 cells, with full reports.'),
                  c('how_it_works', 'bullet_2', 'Nano-precision optic swiftly captures 1000+ fields within 8 minutes.'),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3"><span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="h-4 w-4" /></span><span>{item}</span></li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="relative w-full" variants={fadeInRight} style={{ y: y2 }}>
              <div className="rounded-2xl overflow-hidden">
                <img src={images.ai100vet} alt="Blood SOP Video" data-override-id="blood-sop" className="w-full h-full object-cover rounded-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-secondary/20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('clinical_images', 'badge', 'Clinical Images')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground"><span className="gradient-text">{c('clinical_images', 'title_highlight', 'True-to-life Images')}</span>, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>{c('clinical_images', 'subtitle', "Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.")}</p>
          </div>
          <ApplicationImageCarousel pageKey="blood" fallbackImages={fallbackImages} />
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('faq', 'badge', 'FAQ')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{c('faq', 'title', 'Frequently Asked')} <span className="gradient-text">{c('faq', 'title_highlight', 'Questions')}</span></h2>
          </div>
          {(() => {
            const bloodFaqs = [
              { question: c('faq', 'q1', 'Which species are supported for blood analysis?'), answer: c('faq', 'a1', 'Companion animals: Dog, Cat. Small mammals: Rabbit, Chinchilla, Hamster, Rat, Mouse, Ferret, Guinea Pig. Large animals: Alpaca, Camel, Horse, Pig, Cattle, Sheep. Avian: Pigeon, Parrot. Reptiles: Turtle, Snake, Lizard.') },
              { question: c('faq', 'q2', 'What advanced parameters are available beyond a traditional 5-part differential?'), answer: c('faq', 'a2', '9-part WBC differential, including band neutrophils, segmented neutrophils, hypersegmented neutrophils, large lymphocytes, and atypical leukocytes. Estimated platelet count and large platelet count (may interfere with CBC analyzers). 7-part RBC differential, including reticulocytes, nucleated RBCs, spherocytes, ghost RBCs, Heinz bodies, acanthocytes, and agglutinated RBCs.') },
              { question: c('faq', 'q3', 'How do I choose the sample volume for anemic animals?'), answer: c('faq', 'a3', 'The default volume is 10 µL. If anemia is obvious (e.g., pale mucous membranes) or the sample looks diluted, select 40 µL.') },
              { question: c('faq', 'q4', 'Can blood parasites be detected?'), answer: c('faq', 'a4', 'Coming soon: Heartworm (Dirofilaria immitis) and Hepatozoon.') },
            ];
            const mid = Math.ceil(bloodFaqs.length / 2);
            return (
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
                <Accordion type="single" collapsible className="w-full">
                  {bloodFaqs.slice(0, mid).map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  {bloodFaqs.slice(mid).map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c('cta', 'title', 'Interested in Our Products?')}</h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-5xl mx-auto mb-10`}>{c('cta', 'body', "Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>);
};

export default BloodAnalysis;
