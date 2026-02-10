import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ai100vetImg from '@/assets/ai-100vet.png';
import speciesCanineFeline from '@/assets/species-canine-feline.jpg';
import speciesSmallMammals from '@/assets/species-small-mammals.jpg';
import speciesExoticPets from '@/assets/species-exotic-pets.jpg';
import heroDiagnosticLab from '@/assets/hero-diagnostic-lab.jpg';

const FecesAnalysis = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-lg';
  const cardTextClass = 'text-base';

  const imageGrid = [
    speciesCanineFeline,
    speciesSmallMammals,
    speciesExoticPets,
    heroDiagnosticLab,
  ];

  const samplingCategories = [
    {
      title: 'Intestinal Protozoa',
      items: [
        'TRI (Trichomonas)',
        'GIA (Giardia)',
        'GIT (Giardia Trophozoite)',
        'GIC (Giardia Cyst)',
        'COC (Coccidia)',
      ],
    },
    {
      title: 'Pathogen',
      items: [
        'COS (Cocci)',
        'BAC (Bacillus)',
        'SPR (Spirochetes)',
        'HEL (Helicobacter)',
        'YEA (Yeast)',
      ],
    },
    {
      title: 'Parasite',
      items: [
        'ASC (Roundworm)',
        'HOO (Hookworm)',
        'TAP (Tapeworm)',
        'SPI (Spirometra)',
        'WHP (Whipworm)',
      ],
    },
    {
      title: 'Cells',
      items: ['RBC', 'WBC', 'EPC (Epithelial Cell)'],
    },
    {
      title: 'Digestive Function',
      items: ['STA (Starch Granule)', 'FAT (Lipid Droplet)', 'PLN (Plant Fiber)', 'MUS (Muscle Fiber)'],
    },
  ];

  return (
    <Layout>
      <PageHero
        title="Feces Analysis"
        subtitle="From repetitive inefficiency to simple efficiency"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Feces Analysis', path: '/applications/feces' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Slide-free Fecal Analysis - Results within 30 Minutes
              </h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>
                Awalife streamlines fecal screening with a slide-free workflow and two sampling options, delivering review-ready images and actionable findings in under 30 minutes - designed for consistent interpretation and documentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild>
                  <Link to="/contact">
                    Contact us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">See it in action</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Feces Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sampling Options */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">No Slides, Two Sampling Options</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>
              Powered by our latest AI model, continuously improving with regular updates.
            </p>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Download the sample report</Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplingCategories.map((category) => (
              <div key={category.title} className="glow-card p-6 text-left">
                <h3 className="text-lg font-semibold text-foreground mb-4">{category.title}</h3>
                <ul className={`space-y-2 ${cardTextClass} text-muted-foreground`}>
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Direct Sampling */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card text-center">
                <img src={ai100vetImg} alt="Feces SOP Video-02" className="w-full max-h-80 object-contain" />
                <p className="text-xs text-muted-foreground mt-4">Feces SOP Video-02</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h3>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>Direct Sampling</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>Broader coverage with more reportable parameters/findings.</li>
                <li>Best for: Routine screening and fast workflow.</li>
                <li>Recommended when: You want a quick, comprehensive review with minimal preparation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Flotation Sampling */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h3>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>
                Flotation Sampling (Centrifugal Flotation)
              </p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>Uses a horizontal centrifuge to concentrate eggs/cysts.</li>
                <li>Best for: Targeted parasite enrichment and low-burden/intermittent shedding cases.</li>
                <li>
                  Key advantage: Improved recovery of common parasites, especially: Roundworm eggs, Hookworm eggs,
                  Tapeworm eggs, Whipworm eggs, Coccidia oocysts, Giardia cysts.
                </li>
                <li>Recommended when: The sample is low concentration, or parasite enrichment is clinically important.</li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card text-center">
                <img src={ai100vetImg} alt="Feces SOP Video-03" className="w-full max-h-80 object-contain" />
                <p className="text-xs text-muted-foreground mt-4">Feces SOP Video-03</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Review */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">True-to-life Images, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>
              Review your report and verify the images with confidence - and tap into Awalife's clinical specialists whenever needed.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageGrid.map((img, idx) => (
              <div key={idx} className="glow-card p-4">
                <img src={img} alt={`Feces sample ${idx + 1}`} className="w-full h-28 object-cover rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: 'How long does a typical fecal analysis take?',
                  answer: 'Most samples are processed and reported in under 10 minutes depending on sample conditions.',
                },
                {
                  question: 'What elements can be detected?',
                  answer: 'Parasite eggs, protozoa, pathogens, and digestive indicators are identified with images and counts.',
                },
                {
                  question: 'Is sample preparation automated?',
                  answer: 'Yes. The workflow automates preparation, imaging, and AI-assisted recognition.',
                },
                {
                  question: 'Can reports be reviewed and shared easily?',
                  answer: 'Yes. Reports include images, counts, and annotations for review and sharing.',
                },
              ].map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className={`${bodyTextClass} text-muted-foreground`}>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Interested in Our Products?
          </h2>
          <p className={`${bodyTextClass} text-muted-foreground max-w-2xl mx-auto mb-10`}>
            Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-gradient group" size="lg" asChild>
              <Link to="/contact">
                Contact us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FecesAnalysis;
