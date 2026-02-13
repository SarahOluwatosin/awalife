import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { images } from '@/lib/images';

const PleuralEffusion = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-lg';

  const imageGrid = [
    images.speciesCanineFeline,
    images.speciesSmallMammals,
    images.speciesExoticPets,
    images.heroDiagnosticLab,
  ];

  return (
    <Layout>
      <PageHero
        title="Pleural Effusion Analysis"
        subtitle="Comprehensive body fluid cytology for accurate diagnosis"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Pleural Effusion', path: '/applications/pleural-effusion' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Review-ready Morphology in a Standardized Workflow
              </h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>
                Awalife helps standardize pleural and abdominal effusion review by combining high-quality microscopy imaging with AI-assisted morphology recognition. Results are delivered as a review-ready report with images and structured findings, including up to 19 reportable items.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="btn-gradient" size="lg" asChild>
                  <Link to="/contact">
                    Contact us
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://sozcccgyuxirnesfzlfn.supabase.co/storage/v1/object/public/media/resources/1771013242151-23x4mi.pdf" target="_blank" rel="noopener noreferrer" download>Download the sample report</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={images.ai100vet} alt="AI-100Vet Analyzer" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TNCC Enumeration */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Morphology-based TNCC Enumeration</h2>
            <p className={`${bodyTextClass} text-muted-foreground mt-3`}>
              In many workflows, TNCC is approximated using total WBC counts, which can overlook non-WBC formed elements and introduce variability across operators and methods. Awalife takes a morphology-first approach: it captures true-to-life microscopy images and performs morphology-based TNCC enumeration, counting nucleated cells based on what is actually present in the sample. The result is a review-ready output with image evidence, supporting more consistent TNCC reporting and clearer clinical communication for pleural and abdominal effusions.
            </p>
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
                <img src={img} alt={`Pleural sample ${idx + 1}`} className="w-full h-28 object-cover rounded-lg" />
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
                  question: 'Which species are supported for fluid analysis?',
                  answer: 'Validated for dogs and cats.',
                },
                {
                  question: 'What parameters can fluid analysis detect?',
                  answer: '19 parameters, including:\n\nNucleated cells: Inflammatory cells, granulocytes, lymphocytes, macrophages, neutrophils, degenerative neutrophils, phagocytic cells, mesothelial cells, and unclassified nucleated cells\n\nRBC-related: RBC, PCV\n\nMicroorganisms: Cocci, rods',
                },
                {
                  question: 'What are the limitations for certain effusion samples?',
                  answer: 'Neoplastic effusions: AI may flag suspicious cells but cannot confirm tumor cells—manual review is required.\n\nSpecial effusions (e.g., biliary ascites or urinary ascites): Interpretation should be combined with biochemical testing.',
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

export default PleuralEffusion;
