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

const UrineAnalysis = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-lg';
  const cardTextClass = 'text-base';

  const sedimentCategories = [
    {
      title: 'Crystal',
      items: [
        'MAP (Struvite Crystal)',
        'COM (Calcium Oxalate Monohydrate Crystal)',
        'COD (Calcium Oxalate Dihydrate Crystal)',
        'CAP (Calcium Phosphate Crystal)',
        'UAC (Uric Acid Crystal)',
        'CYS (Cystine Crystal)',
        'BIL (Bilirubin Crystal)',
        'AMU (Ammonium Urate Crystal)',
      ],
    },
    {
      title: 'Cells',
      items: [
        'RBC',
        'WBC',
        'RTE (Renal Tubular Epithelial Cell)',
        'SEC (Squamous Epithelial Cell)',
        'TEC (Transitional Epithelial Cell)',
        'SPE (Sperm)',
      ],
    },
    {
      title: 'Casts',
      items: [
        'HYA (Hyaline Cast)',
        'CEC (Cellular Cast)',
        'GRA (Granular Cast)',
        'WAX (Waxy Cast)',
      ],
    },
    {
      title: 'Pathogen',
      items: ['COC (Cocci)', 'BAC (Rods)', 'YEA (Yeast)'],
    },
    {
      title: 'Others',
      items: ['FAT (Lipid Droplet)', 'MUH (Mucus Filament)'],
    },
  ];

  const imageGrid = [
    speciesCanineFeline,
    speciesSmallMammals,
    speciesExoticPets,
    heroDiagnosticLab,
  ];

  return (
    <Layout>
      <PageHero
        title="Urine Sediment Analysis"
        subtitle="Comprehensive results. Expedited clinical decisions."
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Urine Analysis', path: '/applications/urine' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Standardized Urine Sediment Review - Images and Counts in One Workflow.
              </h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>
                Awalife brings a repeatable, clinic-ready workflow for urine formed elements. From sample processing to imaging and AI-assisted recognition, results are delivered as review-ready reports with images and quantified outputs, helping teams work faster and more consistently.
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
                <img src={ai100vetImg} alt="Urine sediment workflow" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Capabilities */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Make Urine Sediment Consistent - across Users and Sites
            </h2>
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
            {sedimentCategories.map((category) => (
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

      {/* How It Works */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card text-center">
                <img src={ai100vetImg} alt="Urine SOP Video" className="w-full max-h-80 object-contain" />
                <p className="text-xs text-muted-foreground mt-4">Urine SOP Video-02</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How It Works</h3>
              <p className={`${bodyTextClass} text-muted-foreground mb-6`}>From sample to report - in under 10 minutes</p>
              <ul className={`space-y-3 ${bodyTextClass} text-muted-foreground list-disc list-inside`}>
                <li>Focus particles help the system rapidly lock focus on formed elements, minimizing manual adjustments.</li>
                <li>Centrifugation is optional for routine samples.</li>
                <li>For very dilute/clear urine, centrifugation is recommended to concentrate formed elements.</li>
                <li>For very turbid samples or hematuria, dilution is recommended to improve imaging and recognition.</li>
              </ul>
              <p className={`${bodyTextClass} italic text-muted-foreground mt-6`}>
                *Workflow recommendations may vary by sample condition and clinical protocols
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Review */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">True-to-life Images, Ready for Review</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>
              Review your report and verify the images with confidence - and tap into Awalife’s clinical specialists whenever needed.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageGrid.map((img, idx) => (
              <div key={idx} className="glow-card p-4">
                <img src={img} alt={`Urine sample ${idx + 1}`} className="w-full h-28 object-cover rounded-lg" />
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
                  question: 'How long does a typical urine sediment analysis take?',
                  answer: 'Most samples are processed and reported in under 10 minutes depending on sample conditions.',
                },
                {
                  question: 'Is centrifugation always required?',
                  answer: 'No. Centrifugation is optional for routine samples and recommended for very dilute specimens.',
                },
                {
                  question: 'Can reports be reviewed and shared easily?',
                  answer: 'Yes. Reports include images, counts, and annotations for review and sharing.',
                },
                {
                  question: 'What sample types are supported?',
                  answer: 'Urine formed elements including crystals, casts, cells, pathogens, and other structures.',
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

export default UrineAnalysis;
