import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ai100vetImg from '@/assets/ai-100vet.png';
import speciesCanineFeline from '@/assets/species-canine-feline.jpg';
import speciesSmallMammals from '@/assets/species-small-mammals.jpg';
import speciesExoticPets from '@/assets/species-exotic-pets.jpg';
import heroDiagnosticLab from '@/assets/hero-diagnostic-lab.jpg';

const PleuralEffusion = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-lg';

  const imageGrid = [
    speciesCanineFeline,
    speciesSmallMammals,
    speciesExoticPets,
    heroDiagnosticLab,
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
                  <Link to="/contact">Download the sample report</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="AI-100Vet Analyzer" className="w-full max-h-80 object-contain" />
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
                  question: 'What sample types are supported?',
                  answer: 'Pleural and abdominal effusions with morphology-based TNCC enumeration.',
                },
                {
                  question: 'How is TNCC calculated?',
                  answer: 'The system counts nucleated cells based on true-to-life microscopy images rather than approximations.',
                },
                {
                  question: 'Can reports be reviewed and shared?',
                  answer: 'Yes. Reports include images, structured findings, and annotations for review and sharing.',
                },
                {
                  question: 'How long does analysis take?',
                  answer: 'Most samples are processed and reported in under 10 minutes depending on sample conditions.',
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
