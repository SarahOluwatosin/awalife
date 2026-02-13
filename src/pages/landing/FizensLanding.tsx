import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Star, ChevronDown, Menu, X, Apple, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images } from '@/lib/images';

// Custom hook for scroll animations
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
};

// Counter animation hook
const useCounter = (end: number, duration: number = 2000, isInView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
};

const FizensLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useInView();
  const statsRef = useInView();
  const featuresRef = useInView();
  const benefitsRef = useInView();
  const howItWorksRef = useInView();
  const testimonialsRef = useInView();
  const pricingRef = useInView();
  const blogRef = useInView();
  const faqRef = useInView();
  const ctaRef = useInView();
  const allInOneRef = useInView();

  const stat1 = useCounter(99, 2000, statsRef.isInView);
  const stat2 = useCounter(140, 2000, statsRef.isInView);
  const stat3 = useCounter(2, 2000, statsRef.isInView);

  const navItems = ['Home', 'Features', 'About', 'Pricing', 'Blog'];

  const additionalFeatures = [
    { title: 'CBC Analysis', description: 'Complete blood count with 26 parameters.' },
    { title: 'Coagulation Tests', description: 'PT, APTT, and fibrinogen testing.' },
    { title: 'Fecal Analysis', description: 'Comprehensive fecal examination capabilities.' },
    { title: 'Body Fluid Analysis', description: 'CSF and effusion fluid analysis.' },
    { title: 'Quality Control', description: 'Built-in QC and calibration systems.' },
  ];

  const benefits = [
    {
      icon: '⏰',
      label: 'Time and Efficiency',
      title: 'Save your time and reduce diagnostic delays',
      description: 'Automate analysis tasks with AI-powered recognition, freeing up your time for patient care.',
      bullets: ['Results in under 3 minutes', 'Automated cell counting and classification'],
      image: images.ai100vet,
    },
    {
      icon: '📈',
      label: 'Diagnostic Accuracy',
      title: 'Take control of your diagnostic quality',
      description: 'AI provides valuable insights into cell morphology, helping identify abnormalities with precision.',
      bullets: ['99.5% accuracy rate', 'AI-assisted diagnosis'],
      image: images.reagents,
    },
    {
      icon: '🔒',
      label: 'Data Security',
      title: 'Experience the ultimate in data protection',
      description: 'Protect patient information with enterprise-grade security and HIPAA compliance.',
      bullets: ['Encrypted data storage', 'Secure cloud backup'],
      image: images.microscopeStation,
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      location: 'Los Angeles, CA',
      rating: 5,
      text: "AWALIFE has completely transformed our veterinary practice. The AI-powered analysis saves us hours every day.",
    },
    {
      name: 'Dr. Michael Park',
      location: 'Toronto, Canada',
      rating: 5,
      text: "The accuracy of the blood analysis is remarkable. Our diagnostic confidence has never been higher.",
    },
    {
      name: 'Dr. Emma Wilson',
      location: 'London, UK',
      rating: 5,
      text: "Easy to use, reliable results. AWALIFE has become an essential part of our clinic workflow.",
    },
    {
      name: 'Dr. James Lee',
      location: 'Sydney, Australia',
      rating: 4,
      text: "The customer support is excellent, and the system integrates seamlessly with our existing setup.",
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/Lifetime',
      subtitle: 'Basic Plan',
      description: 'Perfect for small clinics getting started',
      features: ['Basic CBC Analysis', 'Email Support', 'Cloud Storage (1GB)', '3 Months Data Retention'],
      popular: false,
    },
    {
      name: 'Popular',
      price: billingPeriod === 'monthly' ? '$299' : '$239',
      period: '/Month',
      subtitle: 'Professional Plan',
      description: 'Ideal for growing veterinary practices',
      features: ['Full CBC + Coagulation', 'Priority Support', 'Unlimited Cloud Storage', 'AI Insights'],
      popular: true,
    },
    {
      name: 'Best Choice',
      price: billingPeriod === 'monthly' ? '$499' : '$399',
      period: '/Month',
      subtitle: 'Enterprise Plan',
      description: 'For multi-location veterinary groups',
      features: ['All Analysis Types', '24/7 Dedicated Support', 'Advanced Analytics', 'Custom Integration'],
      popular: false,
    },
  ];

  const blogPosts = [
    {
      title: "Understanding CBC Parameters in Veterinary Medicine",
      category: 'Education',
      date: 'Dec 20, 2024',
    },
    {
      title: 'How AI is Revolutionizing Pet Diagnostics',
      category: 'Technology',
      date: 'Dec 18, 2024',
    },
    {
      title: 'Best Practices for Blood Sample Collection',
      category: 'Guide',
      date: 'Dec 15, 2024',
    },
    {
      title: 'AWALIFE Achieves ISO 13485 Certification',
      category: 'News',
      date: 'Dec 10, 2024',
    },
  ];

  const faqs = [
    {
      question: 'How accurate is the AI-powered analysis?',
      answer: 'Our AI achieves 99.5% accuracy in cell identification and counting, validated against reference laboratories and peer-reviewed studies.',
    },
    {
      question: 'What types of samples can be analyzed?',
      answer: 'AWALIFE analyzers can process whole blood, plasma, serum, urine, fecal samples, and various body fluids including CSF and effusions.',
    },
    {
      question: 'How long does a typical analysis take?',
      answer: 'A complete blood count with differential takes approximately 2-3 minutes. More complex panels may take up to 5 minutes.',
    },
    {
      question: 'Is training provided with the system?',
      answer: 'Yes! We provide comprehensive onsite training, online tutorials, and ongoing support to ensure your team is confident using the system.',
    },
    {
      question: 'What support options are available?',
      answer: 'We offer email, phone, and live chat support. Enterprise customers receive 24/7 dedicated support with guaranteed response times.',
    },
  ];

  const partnerLogos = ['VetMed Plus', 'PetCare Labs', 'Animal Health Co', 'DiagnoVet', 'BioAnalytics', 'VetTech'];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1a1a2e] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/landing/fizens" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl">AWALIFE</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center bg-white rounded-full px-2 py-1.5 shadow-sm border border-gray-100">
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      index === 0
                        ? 'bg-white text-[#1a1a2e] shadow-sm'
                        : 'text-gray-500 hover:text-[#1a1a2e]'
                    }`}
                  >
                    {index === 0 && <span className="mr-1 text-[#2563EB]">•</span>}
                    {item}
                  </a>
                ))}
                <a href="#pages" className="px-5 py-2 rounded-full text-sm font-medium text-gray-500 hover:text-[#1a1a2e]">
                  All pages
                </a>
              </div>
            </nav>

            {/* CTA Button */}
            <Button className="hidden md:flex bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full px-6 h-11">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-2 px-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button className="mt-4 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef.ref}
        className="pt-32 pb-8 px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr_1fr] gap-8 items-start">
            {/* Left Content */}
            <div
              className={`transition-all duration-700 ${
                heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Start Managing
                <br />
                <span className="text-[#1a1a2e]">Your Diagnostics</span>
                <br />
                <span className="relative inline-block">
                  <svg className="absolute -left-8 top-1/2 -translate-y-1/2 w-6" viewBox="0 0 24 4" fill="none">
                    <line x1="0" y1="2" x2="24" y2="2" stroke="#2563EB" strokeWidth="2" />
                  </svg>
                  <span className="text-gray-400">With Our Tool</span>
                </span>
              </h1>
              <div className="mt-8">
                <Button className="bg-white hover:bg-gray-50 text-[#1a1a2e] rounded-full pl-6 pr-2 py-6 text-base font-medium shadow-lg border border-gray-100 group h-auto">
                  <span>Get Started Free</span>
                  <div className="ml-3 w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </Button>
              </div>
            </div>

            {/* Center - Product Image with decorative elements */}
            <div
              className={`relative transition-all duration-700 delay-200 ${
                heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Decorative circles */}
              <div className="absolute -top-8 left-8 w-20 h-20 rounded-full border-2 border-gray-200 opacity-50" />
              <div className="absolute -top-4 right-12 w-12 h-12 rounded-full border-2 border-gray-200 opacity-50" />
              
              {/* Main product image */}
              <div className="relative">
                <img 
                  src={images.ai100vet}
                  alt="AWALIFE AI-100Vet Analyzer" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl relative z-10"
                />
                
                {/* Floating UI cards */}
                <div className="absolute top-4 right-0 bg-white rounded-xl p-3 shadow-lg border border-gray-100 z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Analysis Complete</span>
                  </div>
                </div>
                
                <div className="absolute bottom-20 -left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100 z-20">
                  <div className="text-xs text-gray-500 mb-1">Accuracy Rate</div>
                  <div className="text-xl font-bold text-[#2563EB]">99.5%</div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-700 delay-300 ${
                heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Decorative cross */}
              <div className="flex justify-end mb-8">
                <div className="relative w-6 h-6">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-[#2563EB]" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-[#2563EB]" />
                </div>
              </div>
              
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Simplify your veterinary diagnostics. Our AI-powered analyzers make blood analysis effortless.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.3M+</p>
                  <p className="text-sm text-gray-500">Trusted by veterinarians in over 140 countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#2563EB] to-[#3b82f6] rounded-[2rem] overflow-hidden">
            <img 
              src={images.ai100vet}
              alt="AWALIFE Dashboard" 
              className="w-full max-w-4xl mx-auto p-8"
            />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-4 overflow-hidden bg-[#2563EB]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-12 text-4xl font-bold text-white/20 uppercase tracking-wider">
              VETERINARY DIAGNOSTICS
            </span>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-[#2563EB] py-16 px-6 lg:px-8" style={{ borderRadius: '0 0 2rem 2rem' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-white text-lg lg:text-xl font-medium mb-10">
            Partnering with top tier brands to revolutionize veterinary diagnostics.
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="text-white/50 font-semibold text-base lg:text-lg">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All-in-one Solution Section */}
      <section className="py-24 px-6 lg:px-8" ref={allInOneRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-700 ${
                allInOneRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="relative">
                <img 
                  src={images.ai100vet}
                  alt="AWALIFE Analyzer" 
                  className="w-full max-w-sm mx-auto"
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#2563EB]/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-xl" />
              </div>
            </div>
            <div
              className={`transition-all duration-700 delay-200 ${
                allInOneRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Decorative cross */}
              <div className="relative w-6 h-6 mb-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-[#2563EB]" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-[#2563EB]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Our analyzer is an all-in-one solution for managing your diagnostics and patient care.
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                Experience the peace of mind that comes with having accurate diagnostics at your fingertips.
              </p>
              <Button className="bg-white hover:bg-gray-50 text-[#1a1a2e] rounded-full pl-6 pr-2 py-6 text-base font-medium shadow-lg border border-gray-100 group h-auto">
                <span>Get Started Free</span>
                <div className="ml-3 w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-white" ref={featuresRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2563EB] font-medium mb-4 text-sm uppercase tracking-wider">Key Features</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Explore Our
              <br />
              <span className="text-[#2563EB]">Standout</span> Features
            </h2>
          </div>

          {/* Features Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Large feature card */}
            <div 
              className={`lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 relative overflow-hidden transition-all duration-700 ${
                featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <img src={images.ai100vet} alt="Blood Analysis" className="w-full max-w-xs mx-auto" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Complete Blood Count</h3>
                  <p className="text-gray-500">26-parameter CBC with automated 5-part differential and AI-powered cell classification.</p>
                </div>
              </div>
            </div>
            
            {/* Small feature card */}
            <div 
              className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 transition-all duration-700 delay-100 ${
                featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="aspect-square bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-2xl mb-4 flex items-center justify-center">
                <img src={images.reagents} alt="Reagents" className="w-24 h-24 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Reagent System</h3>
              <p className="text-gray-500 text-sm">Closed reagent system with automatic lot tracking.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Analytics card */}
            <div 
              className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 transition-all duration-700 delay-200 ${
                featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                <img src={images.microscopeStation} alt="Analytics" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Diagnostic Analytics</h3>
              <p className="text-gray-500 text-sm">Generate comprehensive reports and visualizations for accurate diagnosis.</p>
            </div>
            
            {/* Get the app card */}
            <div 
              className={`bg-[#2563EB] rounded-3xl p-8 text-white flex flex-col justify-between transition-all duration-700 delay-300 ${
                featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-xl">A</span>
                  </div>
                  <p className="font-semibold text-lg">Get the system</p>
                </div>
                <p className="text-white/80 mb-6">Request a demo or quote for your clinic today.</p>
              </div>
              <Button className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-full w-fit">
                Request Demo
              </Button>
            </div>
          </div>

          {/* Additional Features */}
          <div 
            className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 transition-all duration-700 delay-400 ${
              featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-xl font-bold mb-8">...and more additional features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div key={index}>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-8" ref={benefitsRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gray-400 font-medium mb-2 text-sm uppercase tracking-wider">Features</p>
            <p className="text-[#2563EB] font-medium mb-4 text-sm">Benefit</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Experience The
              <br />
              <span className="text-[#2563EB]">Future</span> of Diagnostics
            </h2>
          </div>

          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-gray-100 transition-all duration-700 ${
                  benefitsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="w-14 h-14 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center text-2xl mb-6">
                      {benefit.icon}
                    </div>
                    <p className="text-[#2563EB] font-medium mb-2 text-sm">{benefit.label}</p>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{benefit.title}</h3>
                    <p className="text-gray-500 mb-6">{benefit.description}</p>
                    <ul className="space-y-3">
                      {benefit.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#2563EB]/10 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#2563EB]" />
                          </div>
                          <span className="text-gray-600">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <img src={benefit.image} alt={benefit.title} className="w-full max-w-xs mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-6 lg:px-8 bg-white" ref={statsRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2563EB] font-medium mb-4 text-sm uppercase tracking-wider">Statistics</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              See Your <span className="text-[#2563EB]">Practice</span> Grow
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
            <div
              className={`text-center transition-all duration-700 ${
                statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-5xl lg:text-6xl font-bold text-[#2563EB]">{stat1}%</p>
              <p className="text-gray-500 mt-3">Accuracy in cell identification</p>
            </div>
            <div
              className={`text-center transition-all duration-700 delay-100 ${
                statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-5xl lg:text-6xl font-bold text-[#2563EB]">{stat2}+</p>
              <p className="text-gray-500 mt-3">Countries using AWALIFE</p>
            </div>
            <div
              className={`text-center transition-all duration-700 delay-200 ${
                statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-5xl lg:text-6xl font-bold text-[#2563EB]">&lt;{stat3 + 1}min</p>
              <p className="text-gray-500 mt-3">Average analysis time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 lg:px-8" ref={howItWorksRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2563EB] font-medium mb-4 text-sm uppercase tracking-wider">How It Works</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              How AWALIFE <span className="text-[#2563EB]">Can Help</span> You
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              {/* Product images stack */}
              <div className="flex justify-center items-end gap-4">
                <img src={images.ai100vet} alt="AWALIFE Analyzer" className="w-40 lg:w-48 drop-shadow-xl" />
                <img src={images.reagents} alt="Reagents" className="w-32 lg:w-40 drop-shadow-xl -mb-4" />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              {[
                { step: 1, title: 'Prepare Your Sample', description: 'Collect the blood sample using standard protocols. Our system works with minimal sample volumes.' },
                { step: 2, title: 'Load & Analyze', description: 'Simply load the sample into the analyzer. AI-powered recognition handles the rest automatically.' },
                { step: 3, title: 'Review Results', description: 'Get comprehensive results with AI insights in under 3 minutes. Export or share instantly.' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-6 transition-all duration-700 ${
                    howItWorksRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-[#2563EB]/30">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 lg:px-8 bg-white" ref={testimonialsRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-[#2563EB] font-medium mb-4 text-sm uppercase tracking-wider">Testimonials</p>
              <h2 className="text-4xl lg:text-5xl font-bold">
                Our Users <span className="text-[#2563EB]">Talk</span> About Us
              </h2>
            </div>
            <div className="flex items-center gap-6 lg:justify-end">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-3 border-white shadow-sm" />
                ))}
              </div>
              <div>
                <p className="text-3xl font-bold">4.8/5</p>
                <p className="text-gray-500 text-sm">Based on 14K+ reviews</p>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-3xl p-6 transition-all duration-700 hover:shadow-lg ${
                  testimonialsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#3b82f6]" />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-400 text-xs">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 lg:px-8" ref={pricingRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#2563EB] font-medium mb-4 text-sm uppercase tracking-wider">Pricing</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Try For Free And <span className="text-[#2563EB]">Start</span>
              <br />
              Transforming Your Diagnostics
            </h2>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === 'monthly' ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30' : 'text-gray-500'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  billingPeriod === 'yearly' ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30' : 'text-gray-500'
                }`}
              >
                Yearly
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">-20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-sm border-2 transition-all duration-700 hover:shadow-xl ${
                  plan.popular ? 'border-[#2563EB]' : 'border-gray-100'
                } ${
                  pricingRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg shadow-[#2563EB]/30">
                    {plan.name}
                  </span>
                )}
                <div className="text-center mb-6 pt-2">
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <p className="text-gray-400">{plan.period}</p>
                </div>
                <div className="mb-6">
                  <p className="font-semibold mb-1">{plan.subtitle}</p>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 bg-[#2563EB]/10 rounded-full flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#2563EB]" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full h-12 ${
                    plan.popular
                      ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-lg shadow-[#2563EB]/30'
                      : 'bg-white hover:bg-gray-50 text-[#1a1a2e] border-2 border-gray-100'
                  }`}
                >
                  Get Started Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 px-6 lg:px-8 bg-white" ref={blogRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#2563EB] font-medium mb-4 text-sm uppercase tracking-wider">Blog</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Read the Articles
              <br />
              Written By <span className="text-[#2563EB]">Professionals</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-700 ${
                  blogRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/20 rounded-2xl mb-4 group-hover:scale-105 transition-transform overflow-hidden">
                  <img src={images.ai100vet} alt={post.title} className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-[#2563EB] font-medium">{post.category}</span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="font-semibold text-sm group-hover:text-[#2563EB] transition-colors leading-snug">
                  {post.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 lg:px-8" ref={faqRef.ref}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#2563EB] font-medium mb-4 text-sm uppercase tracking-wider">FAQ</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Frequently Asked <span className="text-[#2563EB]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-700 ${
                  faqRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 text-gray-500">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 lg:px-8" ref={ctaRef.ref}>
        <div className="max-w-5xl mx-auto">
          <div
            className={`bg-gradient-to-br from-[#2563EB] to-[#3b82f6] rounded-[2rem] p-12 lg:p-16 text-center text-white relative overflow-hidden transition-all duration-700 ${
              ctaRef.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                Your First Step To
                <br />
                Better Diagnostics Begins Here
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Transform your veterinary practice. Request a demo now and see the difference AWALIFE can make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-full px-8 py-6 text-base font-medium h-auto">
                  <Apple className="w-5 h-5 mr-2" />
                  Request Demo
                </Button>
                <Button className="bg-white/20 text-white hover:bg-white/30 rounded-full px-8 py-6 text-base font-medium border border-white/30 h-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/landing/fizens" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl">AWALIFE</span>
            </Link>
            <nav className="flex flex-wrap justify-center gap-8">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-gray-500 hover:text-[#1a1a2e] transition-colors">
                  {item}
                </a>
              ))}
            </nav>
            <p className="text-sm text-gray-400">
              © 2024 AWALIFE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FizensLanding;
