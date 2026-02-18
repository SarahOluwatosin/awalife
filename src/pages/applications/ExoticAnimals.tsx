import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { images } from '@/lib/images';
import { motion } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, scaleIn, viewportOnce } from '@/lib/animations';

const ExoticAnimals = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const bodyTextClass = 'text-lg';

  const renderSupportValue = (value: string) => {
    if (value === '+') return <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 mx-auto"><Check className="w-4 h-4 text-primary" /></div>;
    if (value === '/') return <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/50 mx-auto"><Minus className="w-4 h-4 text-muted-foreground/50" /></div>;
    return value;
  };

  return (
    <Layout>
      <PageHero title="Exotics, Small Mammals & Large Animals" subtitle="Supporting more species with review-ready morphology" breadcrumb={[{ label: 'Applications', path: '/applications' }, { label: 'Exotic Animals', path: '/applications/exotic-animals' }]} />

      <motion.section className="py-16 lg:py-20 bg-white" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Multi-Species Support</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Exotics, Small Mammals & <span className="gradient-text">Large Animals</span></h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>Awalife extends morphology-first, AI-assisted analysis beyond dogs and cats—supporting a wider range of species with review-ready reports that combine images and quantitative results. Capabilities may vary by species and sample type.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild><Link to="/contact">Contact us<ArrowRight className="ml-2 w-4 h-4" /></Link></Button>
                <Button variant="outline" size="lg" asChild><a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013290352-bha0kp.pdf" target="_blank" rel="noopener noreferrer" download>Download the sample report</a></Button>
              </div>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight}>
              <img src={images.ai100vet} alt="Exotic species analyzer" data-override-id="exotic-overview" className="w-full h-full object-cover rounded-3xl" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Species Coverage</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Supporting Species from Small Mammals to <span className="gradient-text">Large Animals</span></h2>
          </div>
          <motion.div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden" variants={scaleIn}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-secondary/20 border-b border-border/40">
                  <tr>
                    <th className="p-5 lg:p-6 text-left"><span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Features</span></th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">Companion &amp; Small Mammals</th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">Avian</th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">Reptile</th>
                    <th className="p-5 lg:p-6 text-center font-semibold text-foreground">Livestock &amp; Large Animals</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="bg-secondary/30"><td colSpan={5} className="px-5 lg:px-6 py-3 text-sm font-semibold text-foreground uppercase tracking-wider">Species Support</td></tr>
                  <tr className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                    <td className="p-5 lg:p-6 text-sm text-muted-foreground sticky left-0 bg-card z-10">Supported species</td>
                    <td className="p-5 lg:p-6 text-center">Dogs, Cats, Rabbits, Guinea Pigs, Ferrets, Chinchillas, Rats, Mice, Hamsters</td>
                    <td className="p-5 lg:p-6 text-center">Parrots, Pigeons</td>
                    <td className="p-5 lg:p-6 text-center">Turtles, Snakes, Lizards</td>
                    <td className="p-5 lg:p-6 text-center">Horses, Alpacas, Camels, Pigs, Cattle, Sheep</td>
                  </tr>
                  <tr className="bg-secondary/30"><td colSpan={5} className="px-5 lg:px-6 py-3 text-sm font-semibold text-foreground uppercase tracking-wider">Sample Types</td></tr>
                  {[
                  { label: 'Blood', values: ['+', '+', '+', '+'] },
                  { label: 'Feces', values: ['Dog, Cat', '/', '/', '/'] },
                  { label: 'Urine', values: ['Dog, Cat', '/', '/', '/'] },
                  { label: 'Fluid', values: ['Dog, Cat', '/', '/', '/'] }].
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
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Low Volume Sampling</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Only 10 μL Blood samples Required for <span className="gradient-text">CBC Testing</span></h2>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>Especially for exotic pets, critically ill, anemic, and recovering cats and dogs.</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>A safer diagnostic experience for animals.</li>
                <li>A more efficient diagnostic workflow.</li>
              </ul>
            </motion.div>
            <motion.div className="relative" variants={fadeInRight}>
              <img src={images.heroDiagnosticLab} alt="Low volume sample" data-override-id="exotic-lowvolume" className="w-full h-full object-cover rounded-3xl" />
            </motion.div>
          </div>
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
              { question: 'Which species are supported for blood analysis?', answer: 'Companion animals: Dog, Cat\nSmall mammals: Rabbit, Chinchilla, Hamster, Rat, Mouse, Ferret, Guinea Pig\nLarge animals: Alpaca, Camel, Horse, Pig, Cattle, Sheep\nAvian: Pigeon, Parrot\nReptiles: Turtle, Snake, Lizard' },
              { question: 'Which species are supported for feces analysis?', answer: 'Companion animals: Dog, Cat' },
              { question: 'Which species are supported for urine analysis?', answer: 'Companion animals: Dog, Cat' },
              { question: 'Which species are supported for fluid analysis?', answer: 'Companion animals: Dog, Cat' }].
              map((faq) =>
              <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                </AccordionItem>
              )}
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
    </Layout>);

};

export default ExoticAnimals;