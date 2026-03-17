import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Download, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { images } from '@/lib/images';
import { motion } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, scaleIn, viewportOnce } from '@/lib/animations';
import { usePageContent } from '@/contexts/PageContentContext';

const ExoticAnimals = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const { getContent } = usePageContent();
  const c = (section: string, key: string, fb: string) => getContent('exotic', section, key, fb);
  const bodyTextClass = 'text-lg';

  const renderSupportValue = (value: string) => {
    if (value === '+') return <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 mx-auto"><Check className="w-4 h-4 text-primary" /></div>;
    if (value === '/') return <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/50 mx-auto"><Minus className="w-4 h-4 text-muted-foreground/50" /></div>;
    return value;
  };

  return (
    <Layout>
      <PageHero title={c('hero', 'title', 'Exotics, Small Mammals & Large Animals')} subtitle={c('hero', 'subtitle', 'Supporting more species with review-ready morphology')} breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Exotic Animals', path: '/applications/exotic-animals' }]} />

      <motion.section className="py-16 lg:py-20 bg-white" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('overview', 'badge', 'Multi-Species Support')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c('overview', 'title', 'Exotics, Small Mammals &')} <span className="gradient-text">{c('overview', 'title_highlight', 'Large Animals')}</span></h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>{c('overview', 'body', 'Awalife extends morphology-first, AI-assisted analysis beyond dogs and cats—supporting a wider range of species with review-ready reports that combine images and quantitative results. Capabilities may vary by species and sample type.')}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">{c('overview', 'cta_primary', 'Contact us')}<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><a href={c('overview', 'sample_report_url', 'https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013290352-bha0kp.pdf')} target="_blank" rel="noopener noreferrer" download><Download className="mr-2 w-4 h-4" />{c('overview', 'download_report_label', 'Download the sample report')}</a></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight}>
              <img src={images.ai100vet} alt="Exotic species analyzer" data-override-id="exotic-overview" className="w-full h-full object-cover rounded-xl" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('species', 'badge', 'Species Coverage')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{c('species', 'title', 'Supporting Species from Small Mammals to')} <span className="gradient-text">{c('species', 'title_highlight', 'Large Animals')}</span></h2>
          </div>
          <motion.div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden" variants={scaleIn}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-secondary/20 border-b border-border/40">
                  <tr>
                    <th className="p-5 lg:p-6 text-left"><span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Features</span></th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">{c('species_table', 'col_1', 'Companion & Small Mammals')}</th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">{c('species_table', 'col_2', 'Avian')}</th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">{c('species_table', 'col_3', 'Reptile')}</th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">{c('species_table', 'col_4', 'Livestock & Large Animals')}</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="bg-secondary/30"><td colSpan={5} className="px-5 lg:px-6 py-3 text-sm font-semibold text-foreground uppercase tracking-wider">{c('species_table', 'group_species', 'Species Support')}</td></tr>
                  <tr className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                    <td className="p-5 lg:p-6 text-sm text-muted-foreground sticky left-0 bg-card z-10">{c('species_table', 'row_supported_label', 'Supported species')}</td>
                    <td className="p-5 lg:p-6 text-center">{c('species_table', 'companion_species', 'Dogs, Cats, Rabbits, Guinea Pigs, Ferrets, Chinchillas, Rats, Mice, Hamsters')}</td>
                    <td className="p-5 lg:p-6 text-center">{c('species_table', 'avian_species', 'Parrots, Pigeons')}</td>
                    <td className="p-5 lg:p-6 text-center">{c('species_table', 'reptile_species', 'Turtles, Snakes, Lizards')}</td>
                    <td className="p-5 lg:p-6 text-center">{c('species_table', 'livestock_species', 'Horses, Alpacas, Camels, Pigs, Cattle, Sheep')}</td>
                  </tr>
                  <tr className="bg-secondary/30"><td colSpan={5} className="px-5 lg:px-6 py-3 text-sm font-semibold text-foreground uppercase tracking-wider">{c('species_table', 'group_samples', 'Sample Types')}</td></tr>
                  {[
                  { label: c('species_table', 'row_1_label', 'Blood'), values: [c('species_table', 'row_1_col1', '+'), c('species_table', 'row_1_col2', '+'), c('species_table', 'row_1_col3', '+'), c('species_table', 'row_1_col4', '+')] },
                  { label: c('species_table', 'row_2_label', 'Feces'), values: [c('species_table', 'row_2_col1', 'Dog, Cat'), c('species_table', 'row_2_col2', '/'), c('species_table', 'row_2_col3', '/'), c('species_table', 'row_2_col4', '/')] },
                  { label: c('species_table', 'row_3_label', 'Urine'), values: [c('species_table', 'row_3_col1', 'Dog, Cat'), c('species_table', 'row_3_col2', '/'), c('species_table', 'row_3_col3', '/'), c('species_table', 'row_3_col4', '/')] },
                  { label: c('species_table', 'row_4_label', 'Fluid'), values: [c('species_table', 'row_4_col1', 'Dog, Cat'), c('species_table', 'row_4_col2', '/'), c('species_table', 'row_4_col3', '/'), c('species_table', 'row_4_col4', '/')] }].
                  map((row) =>
                  <tr key={row.label} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                      <td className="p-5 lg:p-6 text-sm text-muted-foreground sticky left-0 bg-card z-10">{row.label}</td>
                      {row.values.map((value, valueIndex) => <td key={`${row.label}-${valueIndex}`} className="p-5 lg:p-6 text-center">{renderSupportValue(value)}</td>)}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-white" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('low_volume', 'badge', 'Low Volume Sampling')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c('low_volume', 'title', 'Only 10 μL Blood samples Required for')} <span className="gradient-text">{c('low_volume', 'title_highlight', 'CBC Testing')}</span></h2>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>{c('low_volume', 'body', 'Especially for exotic pets, critically ill, anemic, and recovering cats and dogs.')}</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground`}>
                {[
                  c('low_volume', 'bullet_1', 'A safer diagnostic experience for animals.'),
                  c('low_volume', 'bullet_2', 'A more efficient diagnostic workflow.'),
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
            <motion.div className="relative flex items-center justify-center" variants={fadeInRight}>
              <img src={images.heroDiagnosticLab} alt="Low volume sample" data-override-id="exotic-lowvolume" className="w-full max-h-[320px] object-cover rounded-xl" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('faq', 'badge', 'FAQ')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{c('faq', 'title', 'Frequently Asked')} <span className="gradient-text">{c('faq', 'title_highlight', 'Questions')}</span></h2>
          </div>
          {(() => {
            const exoticFaqs = [
              { question: c('faq', 'q1', 'Which species are supported for blood analysis?'), answer: c('faq', 'a1', 'Companion animals: Dog, Cat\nSmall mammals: Rabbit, Chinchilla, Hamster, Rat, Mouse, Ferret, Guinea Pig\nLarge animals: Alpaca, Camel, Horse, Pig, Cattle, Sheep\nAvian: Pigeon, Parrot\nReptiles: Turtle, Snake, Lizard') },
              { question: c('faq', 'q2', 'Which species are supported for feces analysis?'), answer: c('faq', 'a2', 'Companion animals: Dog, Cat') },
              { question: c('faq', 'q3', 'Which species are supported for urine analysis?'), answer: c('faq', 'a3', 'Companion animals: Dog, Cat') },
              { question: c('faq', 'q4', 'Which species are supported for fluid analysis?'), answer: c('faq', 'a4', 'Companion animals: Dog, Cat') },
            ];
            const mid = Math.ceil(exoticFaqs.length / 2);
            return (
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-10">
                <Accordion type="single" collapsible className="w-full">
                  {exoticFaqs.slice(0, mid).map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  {exoticFaqs.slice(mid).map((faq) => (
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

      <motion.section className="py-20 lg:py-28 bg-card/50" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{c('cta', 'title', 'Interested in')} <span className="gradient-text">{c('cta', 'title_highlight', 'Our Products')}</span>?</h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-5xl mx-auto mb-10`}>{c('cta', 'body', "Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link></Button>
          </div>
        </div>
      </motion.section>
    </Layout>);

};

export default ExoticAnimals;
