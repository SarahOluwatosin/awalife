import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Star, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ai100vet from '@/assets/ai-100vet.png';

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

  const stat1 = useCounter(99, 2000, statsRef.isInView);
  const stat2 = useCounter(50, 2000, statsRef.isInView);
  const stat3 = useCounter(85, 2000, statsRef.isInView);

  const navItems = ['Home', 'Features', 'About', 'Pricing', 'Blog'];

  const features = [
    {
      title: 'Expense & Income Tracking',
      description: 'Record and categorize expense & income automatically or manually.',
      large: true,
    },
    {
      title: 'Smart Savings Goals',
      description: 'Set specific savings goals and track progress towards them.',
      large: false,
    },
    {
      title: 'Financial Analytics',
      description: 'Generate reports and visualizations to analyze spending habits.',
      large: true,
    },
  ];

  const additionalFeatures = [
    { title: 'Budgeting', description: 'Track budgets for different categories.' },
    { title: 'Debt Management', description: 'Track debt balances, interest rates, and create plans.' },
    { title: 'Investment Tracking', description: 'Track investments, including stocks, bonds, and funds.' },
    { title: 'Bill Payment', description: 'Pay bills directly through the app. One stop for all.' },
    { title: 'Tax Preparation', description: 'Get assistance with tax preparation and filing.' },
  ];

  const benefits = [
    {
      icon: '⏰',
      label: 'Time and Stress Reduction',
      title: 'Save your time and reduce financial anxiety',
      description: 'Automate tasks like budgeting, tracking, and saving, freeing up your time for more important things.',
      bullets: ['Stay on top of your budget.', 'Automate your finances for less stress.'],
    },
    {
      icon: '📈',
      label: 'Financial Growth',
      title: 'Take control of your financial future',
      description: 'Provide valuable insights into your spending habits, helping you identify areas where you can cut back and save more.',
      bullets: ['Reach your financial goals', 'Make informed decisions'],
    },
    {
      icon: '🔒',
      label: 'Security and Privacy',
      title: 'Experience the ultimate in financial security',
      description: 'Protect your information from unauthorized access, focus on managing your money without worry.',
      bullets: ['Protect your data', 'Peace of mind'],
    },
  ];

  const testimonials = [
    {
      name: 'Michael Brown',
      location: 'London, UK',
      rating: 5,
      text: "I was skeptical at first, but then I have completely transformed my relationship with money.",
    },
    {
      name: 'Sarah Jane',
      location: 'Michigan, US',
      rating: 4,
      text: "I've finally taken control of my finances. It's so easy to use and has helped me save more money than ever before.",
    },
    {
      name: 'David Lee',
      location: 'Montreal, Canada',
      rating: 5,
      text: "It has been a game-changer for my financial life. I love how it helps me stay organized my spending.",
    },
    {
      name: 'Emily Smith',
      location: 'Lyon, France',
      rating: 4,
      text: "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I ever thought possible.",
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/Lifetime',
      subtitle: 'Starter Plan',
      description: 'Starter Plan grants you access to exclusive features',
      features: ['Access 14+ Features', 'Support 24/7', 'Get Personalized Insights', '3 Months Data Storage'],
      popular: false,
    },
    {
      name: 'Popular',
      price: billingPeriod === 'monthly' ? '$20' : '$16',
      period: '/Month',
      subtitle: 'Standard Plan',
      description: 'Standard Plan grants you access to exclusive features',
      features: ['Access 23+ Features', 'Priority Support', 'Get Financial Analytics', 'Unlimited Data Storage'],
      popular: true,
    },
    {
      name: 'Best Choice',
      price: billingPeriod === 'monthly' ? '$40' : '$32',
      period: '/Month',
      subtitle: 'Advanced Plan',
      description: 'Advanced Plan grants you access to all exclusive features',
      features: ['Access All Features', 'Priority Support', 'Get Financial Advice', 'Unlimited Data Storage'],
      popular: false,
    },
  ];

  const blogPosts = [
    {
      title: "Navigating the Stock Market: A Beginner's Guide",
      category: 'Advice',
      date: 'Apr 24, 2025',
      excerpt: "It's been an incredible journey over the past year, and what better way to commemorate this milestone than [...]",
    },
    {
      title: 'Why You Should Not Invest Your Emergency Fund',
      category: 'Advice',
      date: 'Apr 23, 2025',
      excerpt: '',
    },
    {
      title: 'Adjusting The Sails Of Your Investment To The Weather',
      category: 'Investing',
      date: 'Apr 22, 2025',
      excerpt: '',
    },
    {
      title: '3 Essential Questions You Need to Ask Your Insurance Advisor',
      category: 'Insurance',
      date: 'Apr 21, 2025',
      excerpt: '',
    },
  ];

  const faqs = [
    {
      question: 'How often should I review my financial data?',
      answer: 'We recommend reviewing your financial data at least once a week. Regular check-ins help you stay on top of your spending, track progress toward your goals, and make informed decisions.',
    },
    {
      question: 'What kind of financial data can I track with this app?',
      answer: 'You can track a wide range of financial data, including income, expenses, budgets, savings, debt, and even investments. The app gives you a full picture of your financial health in one place.',
    },
    {
      question: 'Can I track my spending automatically?',
      answer: 'Yes! You can connect your bank accounts and credit cards to the app to automatically import and categorize your transactions, making spending tracking effortless.',
    },
    {
      question: 'Does the app offer investment tracking?',
      answer: 'Absolutely. You can link your investment accounts to monitor portfolio performance, asset allocation, and more — all in real time.',
    },
    {
      question: 'How do I sign up for the app?',
      answer: 'Signing up is simple. Just download the app from the App Store or Google Play, follow the on-screen setup steps, and you\'ll be up and running in minutes.',
    },
  ];

  const logos = ['Logoipsum', 'logo ipsum', 'Logoipsum', 'Logoipsum', 'IPSUM', 'LIIIII'];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1a1a2e] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/landing/fizens" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <span className="font-semibold text-lg">fizens</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm border border-border/20">
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      index === 0
                        ? 'bg-white text-[#1a1a2e] shadow-sm'
                        : 'text-muted-foreground hover:text-[#1a1a2e]'
                    }`}
                  >
                    {index === 0 && <span className="mr-1">•</span>}
                    {item}
                  </a>
                ))}
                <a href="#pages" className="px-5 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-[#1a1a2e]">
                  All pages
                </a>
              </div>
            </nav>

            {/* CTA Button */}
            <Button className="hidden md:flex bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full px-6">
              Get Template
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
          <div className="md:hidden bg-white border-t border-border/20 py-4">
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
                Get Template
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
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
            {/* Left Content */}
            <div
              className={`transition-all duration-700 ${
                heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Start Managing
                <br />
                <span className="text-[#1a1a2e]">Your Finance</span>
                <br />
                <span className="relative">
                  <span className="text-muted-foreground">With Our Tool</span>
                  <svg className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-[#2563EB]" viewBox="0 0 24 24" fill="none">
                    <line x1="0" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
              </h1>
              <div className="mt-8">
                <Button className="bg-white hover:bg-gray-50 text-[#1a1a2e] rounded-full px-6 py-6 text-base font-medium shadow-lg border border-border/20 group">
                  Get Started Free
                  <div className="ml-2 w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </Button>
              </div>
            </div>

            {/* Center - Phone Mockup */}
            <div
              className={`relative transition-all duration-700 delay-200 ${
                heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-8 w-24 h-24 rounded-full border border-[#2563EB]/20" />
              <div className="absolute -top-8 right-0 w-16 h-16 rounded-full border border-[#2563EB]/20" />
              
              {/* Phone mockup - using a styled div */}
              <div className="relative w-72 h-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-[3rem] border-8 border-[#1a1a2e] shadow-2xl">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#1a1a2e] rounded-full" />
                  <div className="p-6 pt-12">
                    <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Good morning,</span>
                        <div className="flex gap-1">
                          <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full" />
                          <div className="w-6 h-6 bg-[#2563EB]/10 rounded-full" />
                        </div>
                      </div>
                      <p className="font-semibold">James Lee</p>
                    </div>
                    <div className="bg-[#2563EB] rounded-2xl p-4 text-white mb-4">
                      <p className="text-xs opacity-80">Fizen Card</p>
                      <p className="text-2xl font-bold mt-2">$2,736.15</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">USD</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">IDR</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+ Add Currency</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                        <div className="w-8 h-8 bg-[#2563EB]/10 rounded-full mx-auto mb-1" />
                        <span className="text-xs text-muted-foreground">Top-up</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                        <div className="w-8 h-8 bg-[#2563EB]/10 rounded-full mx-auto mb-1" />
                        <span className="text-xs text-muted-foreground">Withdraw</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                        <div className="w-8 h-8 bg-[#2563EB]/10 rounded-full mx-auto mb-1" />
                        <span className="text-xs text-muted-foreground">Transfer</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Transactions</span>
                        <span className="text-xs text-[#2563EB]">See all</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full" />
                            <span className="text-sm">Apple Store</span>
                          </div>
                          <span className="text-sm text-red-500">-$120.90</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full" />
                            <span className="text-sm">Ilya Vasil</span>
                          </div>
                          <span className="text-sm text-green-500">+$50.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -right-12 top-20 w-12 h-12 bg-[#2563EB]/10 rounded-full blur-xl" />
              <div className="absolute -left-12 bottom-20 w-16 h-16 bg-[#2563EB]/10 rounded-full blur-xl" />
            </div>

            {/* Right Content */}
            <div
              className={`transition-all duration-700 delay-300 ${
                heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Decorative cross */}
              <div className="flex justify-end mb-8">
                <div className="relative w-8 h-8">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-[#2563EB]" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-[#2563EB]" />
                </div>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Simplify your financial life. Our intuitive app makes managing your money effortless.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 border-2 border-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.2M+</p>
                  <p className="text-sm text-muted-foreground">Trusted to use by millions users over 140 countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Image */}
      <section className="px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#2563EB] to-[#3b82f6] rounded-3xl overflow-hidden p-8">
            <img 
              src={ai100vet} 
              alt="App Dashboard Preview" 
              className="w-full max-w-4xl mx-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-4 overflow-hidden bg-[#2563EB]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-8 text-3xl font-bold text-white/20">
              FINANCE MANAGEMENT
            </span>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-[#2563EB] py-16 px-6 lg:px-8 rounded-b-[3rem]">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-white text-lg lg:text-xl mb-8">
            Partnering with top tier brands to revolutionize financial services.
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
            {logos.map((logo, index) => (
              <div key={index} className="text-white font-semibold text-lg">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All-in-one Section */}
      <section className="py-24 px-6 lg:px-8" ref={featuresRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div
              className={`transition-all duration-700 ${
                featuresRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <img 
                src={ai100vet} 
                alt="App Features" 
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div
              className={`transition-all duration-700 delay-200 ${
                featuresRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Decorative cross */}
              <div className="relative w-8 h-8 mb-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-[#2563EB]" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-[#2563EB]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Our app is an all-in-one solution for managing your money and financial goals.
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Experience the peace of mind that comes with having your finances under control.
              </p>
              <Button className="bg-white hover:bg-gray-50 text-[#1a1a2e] rounded-full px-6 py-6 text-base font-medium shadow-lg border border-border/20 group">
                Get Started Free
                <div className="ml-2 w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-6 shadow-sm border border-border/10 transition-all duration-700 ${
                  featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-[#2563EB]/5 to-[#2563EB]/10 rounded-2xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2563EB] font-medium mb-4">Key Features</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Explore Our
              <br />
              Standout Features
            </h2>
          </div>

          {/* Features Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 bg-[#FAFAFA] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-[#2563EB]/10 to-transparent rounded-full" />
              <img src={ai100vet} alt="Expense Tracking" className="w-full max-w-md mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expense & Income Tracking</h3>
              <p className="text-muted-foreground">Record and categorize expense & income automatically or manually.</p>
            </div>
            <div className="bg-[#FAFAFA] rounded-3xl p-8">
              <div className="aspect-square bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Savings Goals</h3>
              <p className="text-muted-foreground">Set specific savings goals and track progress towards them.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#FAFAFA] rounded-3xl p-8">
              <div className="aspect-video bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-2xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Financial Analytics</h3>
              <p className="text-muted-foreground">Generate reports and visualizations to analyze spending habits.</p>
            </div>
            <div className="bg-[#2563EB] rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="font-bold">f</span>
                </div>
                <p className="font-semibold">Get the app</p>
              </div>
              <Button className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-full">
                Get the template
              </Button>
            </div>
          </div>

          {/* Additional Features */}
          <div className="bg-[#FAFAFA] rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-8">...and more additional features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
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
            <p className="text-[#2563EB] font-medium mb-4">FEATURES</p>
            <p className="text-muted-foreground mb-2">Benefit</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Experience The
              <br />
              Future of Finance
            </h2>
          </div>

          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-border/10 grid lg:grid-cols-2 gap-8 items-center transition-all duration-700 ${
                  benefitsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="order-2 lg:order-1">
                  <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center text-3xl mb-6">
                    {benefit.icon}
                  </div>
                  <p className="text-[#2563EB] font-medium mb-2">{benefit.label}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-[#2563EB]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="aspect-square bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-3xl" />
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
            <p className="text-[#2563EB] font-medium mb-4">Statistics</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              See Your <span className="text-[#2563EB]">Wealth</span> Grow
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`text-center transition-all duration-700 ${
                statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-5xl lg:text-6xl font-bold text-[#2563EB]">{stat1}%</p>
              <p className="text-muted-foreground mt-2">Transactions are processed successfully</p>
            </div>
            <div
              className={`text-center transition-all duration-700 delay-100 ${
                statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-5xl lg:text-6xl font-bold text-[#2563EB]">${stat2}K+</p>
              <p className="text-muted-foreground mt-2">Our users' average saving amount</p>
            </div>
            <div
              className={`text-center transition-all duration-700 delay-200 ${
                statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-5xl lg:text-6xl font-bold text-[#2563EB]">{stat3}%</p>
              <p className="text-muted-foreground mt-2">Effective in financial growth than before</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 lg:px-8" ref={howItWorksRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2563EB] font-medium mb-4">How It Works</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              How Fizens <span className="text-[#2563EB]">Can Help</span> You
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Phone mockups stack */}
              <div className="flex justify-center gap-4">
                <div className="w-48 h-96 bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-[2rem] border-4 border-[#1a1a2e]" />
                <div className="w-48 h-96 bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/5 rounded-[2rem] border-4 border-[#1a1a2e] mt-8" />
              </div>
            </div>

            <div className="space-y-8">
              {[
                { step: 1, title: 'Connect Your Accounts', description: 'Securely link your bank, credit cards, and investments to get a complete financial overview in one place.' },
                { step: 2, title: 'Track Expenses', description: 'Securely link your bank, credit cards, and investments to get a complete financial overview in one place.' },
                { step: 3, title: 'Set budget', description: 'Securely link your bank, credit cards, and investments to get a complete financial overview in one place.' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-6 transition-all duration-700 ${
                    howItWorksRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
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
              <p className="text-[#2563EB] font-medium mb-4">Testimonials</p>
              <h2 className="text-4xl lg:text-5xl font-bold">
                Our Users <span className="text-[#2563EB]">Talk</span> About Us
              </h2>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-4 border-white" />
                ))}
              </div>
              <div>
                <p className="text-3xl font-bold">4.8/5</p>
                <p className="text-muted-foreground">Based on 14K+ reviews</p>
              </div>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-[#FAFAFA] rounded-3xl p-6 transition-all duration-700 ${
                  testimonialsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 lg:px-8" ref={pricingRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#2563EB] font-medium mb-4">Pricing</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Try For Free And <span className="text-[#2563EB]">Start</span>
              <br />
              Controlling Your Finances
            </h2>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4 bg-white rounded-full p-1 shadow-sm border border-border/20">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === 'monthly' ? 'bg-[#2563EB] text-white' : 'text-muted-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  billingPeriod === 'yearly' ? 'bg-[#2563EB] text-white' : 'text-muted-foreground'
                }`}
              >
                Yearly
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">-20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl p-8 shadow-sm border ${
                  plan.popular ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20' : 'border-border/10'
                } transition-all duration-700 ${
                  pricingRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white text-xs px-4 py-1 rounded-full">
                    {plan.name}
                  </span>
                )}
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <p className="text-muted-foreground">{plan.period}</p>
                </div>
                <div className="mb-6">
                  <p className="font-semibold mb-1">{plan.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-5 h-5 text-[#2563EB]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full ${
                    plan.popular
                      ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white'
                      : 'bg-white hover:bg-gray-50 text-[#1a1a2e] border border-border/20'
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
            <p className="text-[#2563EB] font-medium mb-4">Blog</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Read the Articles
              <br />
              Written By Professionals
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
                <div className="aspect-[4/3] bg-gradient-to-br from-[#2563EB]/10 to-[#2563EB]/20 rounded-2xl mb-4 group-hover:scale-105 transition-transform" />
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#2563EB]">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-semibold text-sm group-hover:text-[#2563EB] transition-colors">
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
            <p className="text-[#2563EB] font-medium mb-4">FAQ</p>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-border/10 overflow-hidden transition-all duration-700 ${
                  faqRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 lg:px-8" ref={ctaRef.ref}>
        <div className="max-w-5xl mx-auto">
          <div
            className={`bg-gradient-to-br from-[#2563EB] to-[#3b82f6] rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden transition-all duration-700 ${
              ctaRef.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Your First Step To Financial Freedom Begins Here
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Watch your money grow. Download the app now and start taking control of your money today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#2563EB] hover:bg-gray-100 rounded-full px-8 py-6 text-base font-medium">
                  Download for iOS
                </Button>
                <Button className="bg-white/20 text-white hover:bg-white/30 rounded-full px-8 py-6 text-base font-medium border border-white/20">
                  Download for Android
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/landing/fizens" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">f</span>
              </div>
              <span className="font-semibold text-lg">fizens</span>
            </Link>
            <nav className="flex flex-wrap justify-center gap-6">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-[#1a1a2e]">
                  {item}
                </a>
              ))}
            </nav>
            <p className="text-sm text-muted-foreground">
              © 2024 Fizens. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FizensLanding;
