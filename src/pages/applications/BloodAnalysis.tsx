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

const BloodAnalysis = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-[18px]';
  const cardTextClass = 'text-[16px]';

  const bloodCategories = [
    {
      title: 'WBC: up to 9-part Differential',
      description: 'More granular white blood cell differentiation to support deeper review beyond basic differentials.',
      items: [
        'Band Neutrophils (NST#)',
        'Segmented Neutrophils (NSG#)',
        'Hypersegmented Neutrophils (NSH#)',
        'Small Lymphocytes (SLYM# %)',
        'Large Lymphocytes (LLYM# %)',
        'Atypical WBC (AWBC#)',
      ],
    },
    {
      title: 'RBC: up to 7-part Differential',
      description: 'Richer red blood cell morphology categories for more informative interpretation and documentation.',
      items: [
        'Reticulocytes (RET# RET%)',
        'Nucleated RBC (NRBC# NRBC/WBC)',
        'Ghost Cells (ETG# ETG%)',
        'Spherocytes (SPH# SPH%)',
        'Acanthocytes (AC#)',
        'RBC Clump (AGG#)',
        'Heinz Bodies (HEB# HEB%)',
      ],
    },
    {
      title: 'Platelet clump recognition & enumeration',
      description: 'Recognizes platelet clumps and converts clumped platelets into single-platelet equivalents for platelet enumeration.',
      items: [
        'Total Platelets Count (PLT)',
        'Platelets Count (PLT#)',
        'Platelets Clump Count (APLT#)',
      ],
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
        title="Blood Analysis"
        subtitle="The most extensive Complete Blood Count (CBC) in veterinary medicine"
        breadcrumb={[
          { label: 'Applications', path: '/applications' },
          { label: 'Blood Analysis', path: '/applications/blood' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Standardized Blood Smear Review - Images and Counts in One Workflow.
              </h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>
                Awalife delivers a clinic-ready blood smear workflow with AI-assisted recognition and counting. Results are reported with review-ready images and quantitative outputs, enabling consistent decisions across teams and sites.
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
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={ai100vetImg} alt="Blood smear workflow" className="w-full max-h-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Categories */}
      <section className="py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Deeper Blood Morphology Classification - Built for Clinical Review
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bloodCategories.map((category) => (
              <div key={category.title} className="glow-card p-6 text-left h-full">
                <h3 className="text-lg font-semibold text-foreground mb-3">{category.title}</h3>
                <p className={`${cardTextClass} text-muted-foreground mb-4`}>{category.description}</p>
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
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-primary/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card text-center">
                <img src={ai100vetImg} alt="Blood SOP Video" className="w-full max-h-80 object-contain" />
                <p className="text-xs text-muted-foreground mt-4">Blood SOP Video-02</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">How It Works</h3>
                <p className={`${bodyTextClass} text-muted-foreground mt-2`}>More Count</p>
              </div>
              <ul className={`space-y-4 ${bodyTextClass} text-muted-foreground`}>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>10μL blood, allows instant capture of 200,000 to 500,000 cells, with full reports.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span>Nano-precision optic swiftly captures 1000+ fields within 8 minutes.</span>
                </li>
              </ul>
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
                <img src={img} alt={`Blood sample ${idx + 1}`} className="w-full h-28 object-cover rounded-lg" />
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
                  question: 'What sample volume is required?',
                  answer: 'Only 10μL of blood is required for a full morphology analysis.',
                },
                {
                  question: 'How long does a typical analysis take?',
                  answer: 'Most samples are completed in under 8 minutes from loading to report.',
                },
                {
                  question: 'What kinds of cells are identified?',
                  answer: 'RBC morphology, 7-part WBC differential, platelets, and other formed elements.',
                },
                {
                  question: 'Can results be reviewed and shared?',
                  answer: 'Yes. Reports include images, counts, and references for review and sharing.',
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

export default BloodAnalysis;
