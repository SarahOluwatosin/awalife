import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, Download, FileText, Play, Cpu, Zap, Target, Shield, Droplets, Bug, TestTubes, Beaker, PawPrint, Microscope, RefreshCw, FlaskConical, Layers, Link2, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import ProductGallery from '@/components/product/ProductGallery';
import ProductComparison from '@/components/product/ProductComparison';
import { useLanguage } from '@/contexts/LanguageContext';
import { images } from '@/lib/images';

const ProductDetail = () => {
  const { productId } = useParams();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const productData: Record<string, any> = {
    'ai-analyzer': {
      images: [images.ai100vetElite, images.ai100vet, images.ai80vet],
      name: 'AI Series Morphology Analyzer',
      tagline: 'AI-powered morphology analyzer for veterinary diagnostics',
      description: 'Awalife AI Series Morphology Analyzer is an AI-powered veterinary platform for four sample types: blood, urine, feces, and body fluids. It combines multi-focus imaging, rapid liquid-based staining, AI-assisted morphology recognition and counting, and report generation with review-ready images and quantitative results. The system also supports an expandable parameter set for deeper clinical insight.',
      features: [],
      specs: [],
      capabilities: [
        { icon: Droplets, title: 'Multi-Sample Analysis', desc: 'Blood, urine, feces, and body fluid samples in one workflow.' },
        { icon: PawPrint, title: 'Multi-Species Support', desc: 'Companion animals, small mammals, avian species, reptiles, and more.' },
        { icon: Microscope, title: 'True-to-Life Microscopy Imaging', desc: 'High-resolution imaging for diagnostic-level clarity.' },
        { icon: Cpu, title: 'AI-Assisted Recognition & Counting', desc: 'Rapid classification with automated quantification.' },
        { icon: RefreshCw, title: 'Continuous AI Improvement', desc: 'Models improve with real-world data and iteration.' },
        { icon: FlaskConical, title: 'Three-Step Sample Preparation', desc: 'Streamlined prep from sample to result.' },
        { icon: Layers, title: 'Microfluidic Cell Layering', desc: 'Consistent smearing and staining quality.' },
        { icon: FileText, title: 'Comprehensive Reporting', desc: 'Images, annotations, and quantitative results included.' },
        { icon: Link2, title: 'LIS Integration', desc: 'Connects to lab systems for seamless data exchange.' },
      ],
      flagship: true,
    },
    'ai-100vet-elite': {
      images: [images.ai100vet, images.ai100vet, images.ai100vet],
      name: 'AI-100Vet Elite Morphological Analyzer',
      tagline: 'Premium AI-Powered Diagnostics for Cats & Dogs',
      description: 'AI-100Vet Elite Morphological Analyzer is an AI-powered diagnostic device for cats and dogs, capable of automatically analyzing three sample types: blood, feces, and urine. Featuring microfluidic automated smearing, rapid liquid-based staining, and AI-powered recognition with auto-generated diagnostic reports.',
      features: [
        'Blood, Feces & Urine Analysis',
        'AI-Powered Cell Recognition',
        'Microfluidic Automated Smearing',
        'Rapid Liquid-Based Staining',
        'Auto-Generated Reports',
        '7-Part WBC Differential',
      ],
      specs: [
        { label: 'Sample Types', value: 'Blood, Feces, Urine' },
        { label: 'Species Support', value: 'Cats & Dogs' },
        { label: 'WBC Differential', value: '7-Part (NEU, NST, NSG, NSH, LYM, MON, EOS, BAS)' },
        { label: 'Blood Sample', value: '10μL, 200K-500K cells captured' },
        { label: 'Analysis Time', value: '8-9 minutes per sample' },
        { label: 'Technology', value: 'Microfluidic + AI Recognition' },
        { label: 'Reports', value: 'Auto-generated diagnostic reports' },
      ],
      capabilities: [
        { icon: Droplets, title: 'Blood Analysis', desc: '7-Part WBC differential with complete cell morphology' },
        { icon: Bug, title: 'Feces Analysis', desc: 'Parasite eggs, protozoa, microorganisms detection' },
        { icon: TestTubes, title: 'Urine Sediment', desc: 'Complete sediment analysis with cast & crystal detection' },
      ],
      flagship: true,
    },
    'ai-100vet': {
      images: [images.ai100vet, images.ai100vet],
      name: 'AI-100Vet Morphological Analyzer',
      tagline: 'Multi-Species Intelligent Diagnostics',
      description: 'AI-100Vet Morphological Analyzer is an intelligent diagnostic device tailored for veterinary applications. It supports automatic analysis of four sample types including blood, feces, urine sediment, and pleural fluid, meeting the diverse clinical needs of more than 10 species including dogs, cats, rabbits, turtles, birds, parrots, snakes, and lizards.',
      features: [
        'Blood, Feces, Urine & Pleural Fluid',
        '10+ Species Supported',
        'AI-Powered Recognition',
        'Microfluidic Technology',
        'Real-time HD Imaging',
        'Standardized Report Output',
      ],
      specs: [
        { label: 'Sample Types', value: 'Blood, Feces, Urine Sediment, Pleural Fluid' },
        { label: 'Species Support', value: 'Dogs, Cats, Rabbits, Turtles, Birds, Parrots, Snakes, Lizards (10+)' },
        { label: 'Blood Sample', value: '10μL, 200K-500K cells, 8 min analysis' },
        { label: 'Feces Analysis', value: '9 min, parasites & microorganisms' },
        { label: 'Urine Analysis', value: '9 min, no centrifugation needed' },
        { label: 'Technology', value: 'Microfluidic automated smearing + liquid-based staining' },
        { label: 'AI Features', value: 'Rapid classification & diagnostic suggestions' },
      ],
      capabilities: [
        { icon: Droplets, title: 'Blood Analysis', desc: 'Only 10μL needed, 200K-500K cells captured in real-time' },
        { icon: Bug, title: 'Feces Analysis', desc: 'Automated sample prep, parasite eggs & microorganisms in 9 min' },
        { icon: TestTubes, title: 'Urine Sediment', desc: 'No centrifugation, 15 sec start, full report in 9 min' },
        { icon: Beaker, title: 'Pleural Fluid', desc: 'AI-powered cellular morphology analysis' },
      ],
      flagship: false,
    },
    'ai-80vet': {
      images: [images.ai100vet, images.ai100vet],
      name: 'AI-80Vet Morphological Analyzer',
      tagline: 'Configurable Testing for Diverse Needs',
      description: 'AI-80Vet Morphological Analyzer is an intelligent diagnostic device tailored for veterinary applications, which offers configurable sample testing functions to meet diverse veterinary needs. Supports comprehensive blood, feces, and urine analysis with advanced AI recognition.',
      features: [
        'Configurable Sample Testing',
        '7-Part WBC Differential',
        'Complete Parasite Detection',
        'Urine Sediment Analysis',
        'AI-Powered Recognition',
        'Flexible Configuration',
      ],
      specs: [
        { label: 'Blood WBC', value: '7-Part Differential (NEU, NST, NSG, NSH, LYM, MON, EOS, BAS)' },
        { label: 'Feces - Parasites', value: 'Ascaris, Hookworms, Dipylidium, Spirometra, Alaria eggs' },
        { label: 'Feces - Protozoa', value: 'Trichomonas, Giardia, Coccidia' },
        { label: 'Feces - Pathogens', value: 'Campylobacter, Bacillus, Helicobacter, Spirochete, Yeast' },
        { label: 'Urine - Casts', value: 'Hyaline, Cellular, Waxy, Granular casts' },
        { label: 'Urine - Crystals', value: 'Struvite, Uric acid, Cystine, Calcium oxalate, Calcium phosphate' },
        { label: 'Configuration', value: 'Customizable testing functions' },
      ],
      capabilities: [
        { icon: Droplets, title: 'Blood: Gold Standard', desc: '7-Part WBC differential with complete morphology' },
        { icon: Bug, title: 'Feces Analysis', desc: 'Parasite eggs, protozoa, pathogens, digestive function' },
        { icon: TestTubes, title: 'Urine Sediment', desc: 'Casts, crystals, cells, microorganisms' },
      ],
      flagship: false,
    },
    'microscope': {
      images: [images.dm03Microscope, images.digitalMicroscope, images.microscopeStation],
      name: 'DM-03 Microscope Workstation',
      tagline: 'Smarter imaging and effortless operation',
      description: 'Awalife Microscope Workstation is more than a standard veterinary microscope—it brings imaging, measurement, cell counting, and documentation into one streamlined workflow. With built-in software to add scale bars, annotate findings, and generate a report in one click, it helps clinics capture consistent results with less manual effort. An embedded teaching image library also makes onboarding faster and day-to-day training easier.',
      features: [
        '4K Professional Camera',
        '8 Million Pixels',
        '20% Larger Field of View',
        'Infinite Optical System',
        'Built-in Sample Library',
        '20,000 Hours LED Life',
      ],
      specs: [
        { label: 'Camera', value: '4K Professional, 8 Million Pixels' },
        { label: 'Field of View', value: '20% larger than standard' },
        { label: 'Optical System', value: 'Infinite optical system' },
        { label: 'LED Lifespan', value: '20,000 hours' },
        { label: 'Sample Library', value: 'Built-in positive sample library' },
        { label: 'Connectivity', value: 'Computer connection for report generation' },
        { label: 'Applications', value: 'Anemia, inflammation, parasite, pathogen examination' },
      ],
      capabilities: [
        { icon: Target, title: 'Wide Field of View', desc: '20% larger field under 40x objective lens' },
        { icon: Zap, title: 'High Clarity', desc: '4K camera with 8 million pixels for detailed imaging' },
        { icon: Cpu, title: 'Smart Integration', desc: 'Computer-connected report generation system' },
      ],
      flagship: false,
    },
    'dm-03': {
      images: [images.dm03Microscope, images.digitalMicroscope, images.microscopeStation],
      name: 'DM-03 Microscope Workstation',
      tagline: 'Smarter imaging and effortless operation',
      description: 'Awalife Microscope Workstation is more than a standard veterinary microscope—it brings imaging, measurement, cell counting, and documentation into one streamlined workflow. With built-in software to add scale bars, annotate findings, and generate a report in one click, it helps clinics capture consistent results with less manual effort. An embedded teaching image library also makes onboarding faster and day-to-day training easier.',
      features: [],
      specs: [],
      capabilities: [
        { icon: Microscope, title: 'High-Performance Hardware', desc: 'Infinity optics, 4K imaging, and stable illumination for clarity.' },
        { icon: Cpu, title: 'Workflow Software', desc: 'Capture, measure, annotate, count, and report in one streamlined flow.' },
        { icon: FileText, title: 'One-Click Reporting', desc: 'Generate standardized reports with images and measurements.' },
        { icon: Layers, title: 'Teaching Image Library', desc: 'Built-in library supports faster onboarding and training.' },
      ],
      flagship: false,
    },
  };

  const product = productData[productId || ''] || productData['ai-100vet-elite'];
  const isAIAnalyzer = productId === 'ai-analyzer';
  const isMicroscope = productId === 'dm-03' || productId === 'microscope';
  const longParagraphClass = 'text-lg';
  const detailParagraphClass = 'text-base';

  const otherProducts = Object.entries(productData)
    .filter(([key]) => key !== productId)
    .slice(0, 3)
    .map(([key, value]) => ({ id: key, ...value }));

  const containerClass = 'container mx-auto px-6 lg:px-16 xl:px-24';

  const heroGridClass = isMicroscope
    ? 'grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start'
    : 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-start';
  const heroImageClass = isMicroscope
    ? 'lg:order-2 lg:justify-self-end lg:max-w-[520px] w-full'
    : isAIAnalyzer
      ? 'lg:order-2 lg:justify-self-end lg:max-w-[560px] w-full'
      : '';

  return (
    <Layout>
      <PageHero title={product.name} subtitle={product.tagline || ''} />

      {/* Product Hero */}
      <section className="py-16 lg:py-20">
        <div className={containerClass}>
          <div className={heroGridClass}>
            {/* Image Gallery */}
            <div className={`relative ${heroImageClass}`}>
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Content */}
            <div className={`lg:py-6 ${(isAIAnalyzer || isMicroscope) ? 'lg:order-1' : ''} ${isMicroscope ? 'max-w-lg' : ''}`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {isMicroscope ? 'Smarter Imaging, Effortless Operation' : product.name}
              </h1>
              
              <p className={`${longParagraphClass} text-muted-foreground leading-relaxed mb-10`}>
                {product.description}
              </p>

              {/* Features Grid */}
              {product.features.length > 0 && !isAIAnalyzer && !isMicroscope && (
                <div className="mb-10">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary/80 mb-5">{t.products.keyFeatures}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feature: string) => (
                      <div 
                        key={feature} 
                        className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                {(isAIAnalyzer || isMicroscope) ? (
                  <>
                    <Button className="btn-gradient group" size="lg" asChild>
                      <Link to="/contact">
                        Contact us
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/30" asChild>
                      <Link to="/contact">Download brochure</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn-gradient" size="lg" asChild>
                      <Link to="/contact">Request Quote</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/30">
                      <Download className="mr-2 w-4 h-4" />
                      {t.products.brochure}
                    </Button>
                    <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-primary">
                      <Play className="mr-2 w-4 h-4" />
                      Watch Demo
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      {product.capabilities && !isMicroscope && (
        <section className="py-16 lg:py-20 bg-card/50">
          <div className={containerClass}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                {isAIAnalyzer ? 'Key Features' : 'Capabilities'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {isAIAnalyzer ? 'AI Series Morphology Analyzer from sample to diagnosis.' : 'What It Can Do'}
              </h2>
            </div>
            
            <div
              className={`grid gap-6 lg:gap-8 ${
                isAIAnalyzer ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {product.capabilities.map((cap: any, index: number) => (
                <div key={cap.title} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glow-card p-8 h-full text-center">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                    <div className="icon-glow mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <cap.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{cap.title}</h3>
                    <p className={`${detailParagraphClass} text-muted-foreground leading-relaxed`}>{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Workflow Section */}
      {isAIAnalyzer && (
        <section className="py-16 lg:py-20">
          <div className={containerClass}>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                From Sample to Insight, One Workflow for Multiple Sample Types
              </h2>
              <p className={`${longParagraphClass} text-muted-foreground`}>
                Awalife's workflow supports consistent results across blood, urine, feces, and pleural fluid analysis.
              </p>
            </div>
            <div className="relative mt-10">
              <div className="hidden md:block absolute left-0 right-0 top-6 h-px bg-border/60" />
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Step 1', label: 'Load and prepare', desc: 'Simple sample prep with guided steps for blood, urine, feces, and effusion samples.' },
                  { title: 'Step 2', label: 'AI morphological scan', desc: 'High-resolution imaging and AI recognition identify cells and elements in minutes.' },
                  { title: 'Step 3', label: 'Standardized report', desc: 'Multi-parameter results with references, annotations, and share-ready outputs.' },
                ].map((step) => (
                  <div key={step.title} className="relative">
                    <div className="flex md:flex-col items-start md:items-center gap-4">
                      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30 text-primary font-semibold">
                        {step.title.split(' ')[1]}
                      </div>
                      <div className="glow-card p-6 text-left md:text-center">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{step.title}</span>
                        <h3 className="font-semibold text-foreground mt-2">{step.label}</h3>
                        <p className={`${longParagraphClass} text-muted-foreground leading-relaxed mt-3`}>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Microscope Sample Types */}
      {isMicroscope && (
        <section className="py-10 lg:py-12">
          <div className={containerClass}>
            <div className="glow-card bg-secondary/20 border border-border/40 px-6 py-6">
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Samples supported on the microscope</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Common veterinary sample types that can be captured and documented with the workstation.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground">
                  {[
                    { label: 'Urine', icon: FlaskConical },
                    { label: 'Fecal', icon: Bug },
                    { label: 'Ear Canal', icon: Stethoscope },
                    { label: 'Blood', icon: Droplets },
                    { label: 'Skin', icon: Layers },
                    { label: 'Tissue', icon: Microscope },
                    { label: 'Serous Cavity', icon: Beaker },
                    { label: 'Effusion', icon: TestTubes },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full bg-card/70 border border-border/40 px-3 py-1.5"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Microscope Hardware Section */}
      {isMicroscope && (
        <section className="py-16 lg:py-20">
          <div className={containerClass}>
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
              <div className="rounded-2xl overflow-hidden border border-border/40 shadow-lg bg-card p-6 flex items-center justify-center">
                <img
                  src={images.dm03Microscope}
                  alt="DM-03 Microscope hardware"
                  className="w-full max-w-[420px] object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">High-performance Hardware</h2>
                <div className="space-y-5">
                  {[
                    {
                      title: 'Infinity Optical System',
                      desc: 'It delivers clear, high-quality imaging with minimal chromatic aberration, ensuring accurate and detailed observation.',
                    },
                    {
                      title: 'High-Brightness LED Light Source',
                      desc: 'It provides a uniform cold light illumination, ensuring clear visibility while offering an extended lifespan.',
                    },
                    {
                      title: '4K HD Camera',
                      desc: 'It delivers ultra-high-definition imaging and supports efficient digital management for precise observation and record-keeping.',
                    },
                    {
                      title: 'Swivel Eyepiece Tube',
                      desc: 'It provides comfortable viewing, helping to reduce eye strain during extended use.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className={`${detailParagraphClass} text-muted-foreground leading-relaxed`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Microscope Software Section */}
      {isMicroscope && (
        <section className="py-16 lg:py-20">
          <div className={containerClass}>
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  User-friendly Software Built for Veterinary Workflows
                </h2>
                <p className={`${longParagraphClass} text-muted-foreground leading-relaxed`}>
                  It integrates tools for cell counting, scale bars, annotations, and one-click report generation, with an embedded teaching image library for faster training.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-border/40 shadow-lg bg-card p-6 flex items-center justify-center">
                <img
                  src={images.digitalMicroscope}
                  alt="Microscope workstation software"
                  className="w-full max-w-[420px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Microscope Upgrade Section */}
      {isMicroscope && (
        <section className="py-16 lg:py-20">
          <div className={containerClass}>
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
              <div className="rounded-2xl overflow-hidden border border-border/40 shadow-lg bg-card p-6 flex items-center justify-center">
                <img
                  src={images.dm03Medtech}
                  alt="Microscope image hub module"
                  className="w-full max-w-[420px] object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Already Have a Microscope?
                </h2>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Upgrade it with Awalife Microscope Image Hub.
                </h3>
                <p className={`${longParagraphClass} text-muted-foreground leading-relaxed mb-6`}>
                  Keep your Leica or Olympus microscope and unlock the same Awalife software workflow—capture, measure, annotate, count, and report on a PC.
                </p>
                <ul className={`${longParagraphClass} text-muted-foreground space-y-3 list-disc list-inside`}>
                  <li>Compatible with Leica and Olympus microscopes (models as applicable)</li>
                  <li>Plug-and-play connection to PC</li>
                  <li>Unlock user friendly software: capture, measure, annotate, count, report</li>
                  <li>Standardize documentation across users and sites</li>
                  <li>Built-in teaching image library for onboarding</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tabs Section */}
      {!isAIAnalyzer && !isMicroscope && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-16 xl:px-24">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="w-full max-w-2xl mx-auto mb-12 bg-secondary/50 border border-border/50 p-2 rounded-2xl grid grid-cols-3 gap-2">
                <TabsTrigger 
                  value="specifications" 
                  className="rounded-xl py-4 px-6 text-sm font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
                >
                  {t.products.specifications}
                </TabsTrigger>
                <TabsTrigger 
                  value="downloads" 
                  className="rounded-xl py-4 px-6 text-sm font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
                >
                  {t.products.downloads}
                </TabsTrigger>
                <TabsTrigger 
                  value="certifications" 
                  className="rounded-xl py-4 px-6 text-sm font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25"
                >
                  Certifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="animate-fade-in">
                <div className="max-w-4xl mx-auto">
                  <div className="glow-card overflow-hidden">
                    <div className="p-6 lg:p-8 border-b border-border/50 bg-secondary/20">
                      <h3 className="text-xl font-semibold text-foreground">Technical Specifications</h3>
                    <p className={`${detailParagraphClass} text-muted-foreground mt-1`}>Detailed specifications for {product.name}</p>
                    </div>
                    <table className="w-full">
                      <tbody>
                        {product.specs.map((spec: { label: string; value: string }, i: number) => (
                          <tr key={spec.label} className={`border-b border-border/30 last:border-0 transition-colors duration-200 hover:bg-primary/5 ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/10'}`}>
                            <td className="px-6 lg:px-8 py-5 font-medium text-foreground w-1/3">{spec.label}</td>
                            <td className="px-6 lg:px-8 py-5 text-muted-foreground">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="downloads" className="animate-fade-in">
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { name: 'Product Brochure', type: 'PDF', size: '2.4 MB' },
                      { name: 'Technical Specifications', type: 'PDF', size: '1.2 MB' },
                      { name: 'User Manual', type: 'PDF', size: '5.8 MB' },
                      { name: 'Quick Start Guide', type: 'PDF', size: '0.8 MB' },
                    ].map((doc) => (
                      <div key={doc.name} className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative glow-card p-6 flex items-center gap-5 cursor-pointer transition-all duration-300 hover:-translate-y-1">
                          <div className="icon-glow group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">{doc.name}</h4>
                          <p className={`${detailParagraphClass} text-muted-foreground`}>{doc.type} • {doc.size}</p>
                          </div>
                          <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="certifications" className="animate-fade-in">
                <div className="max-w-4xl mx-auto">
                  <div className="glow-card overflow-hidden">
                    <div className="p-6 lg:p-8 border-b border-border/50 bg-secondary/20">
                      <h3 className="text-xl font-semibold text-foreground">Patents & Regulatory Approvals</h3>
                      <p className={`${detailParagraphClass} text-muted-foreground mt-1`}>Quality certifications and intellectual property</p>
                    </div>
                    <div className="p-6 lg:p-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Regulatory Approvals
                          </h4>
                          <ul className="space-y-3">
                            {['CE Marking (EU)', 'ISO 13485:2016', 'ISO 9001:2015', 'FDA Registration (USA)'].map((cert) => (
                              <li key={cert} className="flex items-center gap-3 text-muted-foreground">
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                {cert}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            Patents & IP
                          </h4>
                          <ul className="space-y-3">
                            {['50+ Proprietary Patents', 'AI Algorithm Patents', 'Microfluidic Technology Patents', 'Optical System Patents'].map((patent) => (
                              <li key={patent} className="flex items-center gap-3 text-muted-foreground">
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                {patent}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Product Comparison */}
      {!isMicroscope && (
        <div className="bg-card/50">
          <ProductComparison variant={isAIAnalyzer ? 'ai-analyzer' : 'full'} />
        </div>
      )}

      {/* Other Products */}
      {!isAIAnalyzer && !isMicroscope && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-16 xl:px-24">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Explore More
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Other Products</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {otherProducts.map((prod: any) => (
                <Link 
                  key={prod.id} 
                  to={`/products/${prod.id}`}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glow-card overflow-hidden h-full">
                    <div className="h-48 bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center p-6">
                      <img 
                        src={prod.images[0]} 
                        alt={prod.name}
                        className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{prod.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{prod.tagline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {isAIAnalyzer && (
        <section className="py-16 lg:py-20">
          <div className={containerClass}>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: 'What sample types can the AI Series Morphology Analyzer process?',
                    answer: 'It supports blood, urine, feces, and body fluid samples with standardized preparation and analysis steps.',
                  },
                  {
                    question: 'How long does a typical analysis take?',
                    answer: 'Most workflows complete within minutes, depending on sample type and required parameters.',
                  },
                  {
                    question: 'Does the system support multi-species diagnostics?',
                    answer: 'Yes. It is designed for companion animals and supports a broad range of exotic species and livestock.',
                  },
                  {
                    question: 'Can reports be integrated with LIS systems?',
                    answer: 'Yes. The platform supports LIS integration for efficient data exchange and reporting.',
                  },
                ].map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {isMicroscope && (
        <section className="py-16 lg:py-20">
          <div className={containerClass}>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: 'What is the DM-03 Microscope Workstation?',
                    answer: 'DM-03 Microscope Workstation is a microscope workstation equipped with a 4K camera and an intelligent system for one-click capture, reporting, annotation, counting, and measurement.',
                  },
                  {
                    question: 'What are the key benefits of the DM-03 Microscope Workstation?',
                    answer: 'Faster documentation, automated reports, a built-in reference library (542+ canine/feline images), SOP support, and improved communication, training, and collaboration.',
                  },
                  {
                    question: 'Can I buy only the camera module?',
                    answer: 'Yes. If you have an infinity optical microscope, the camera module can be customized and supplied separately.',
                  },
                  {
                    question: 'What tools are included?',
                    answer: 'Cell counting, multi-shape annotation, real-time measurement with a digital scale, customizable templates, and multi-account management.',
                  },
                  {
                    question: 'Can I upload my own SOPs or reference images?',
                    answer: 'Yes. DM-03 Microscope Workstation supports personalized uploads of reference images, videos, and SOPs.',
                  },
                ].map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-card/50">
        <div className={`${containerClass} text-center`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Interested in Our Products?
            </h2>
            <p className={`${longParagraphClass} text-muted-foreground mb-10`}>
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
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
