import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronDown, Check, ArrowRight, Microscope, Activity, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import ai100vet from '@/assets/ai-100vet.png';
import microscopeStation from '@/assets/microscope-station.png';
import reagents from '@/assets/reagents.png';
import heroBg from '@/assets/hero-bg.jpg';

// Custom hook for counting animation
const useCounter = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, ref };
};

// Custom hook for fade-in animation on scroll
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const HealthSyncLanding = () => {
  const [workflowType, setWorkflowType] = useState<'manual' | 'partial' | 'digital'>('manual');
  const [clinicSize, setClinicSize] = useState([10]);
  const [patientsPerDay, setPatientsPerDay] = useState([35]);
  const [diagnosisTime, setDiagnosisTime] = useState([35]);
  const [adminTime, setAdminTime] = useState([15]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Reduce diagnostic time', 'Automate routine tasks']);

  const heroAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const calcAnim = useScrollAnimation();
  const productsAnim = useScrollAnimation();

  // Calculate savings based on inputs
  const calculateSavings = () => {
    const baseMultiplier = workflowType === 'manual' ? 1.5 : workflowType === 'partial' ? 1.2 : 1;
    const timeSaved = Math.round((diagnosisTime[0] * 0.4 + adminTime[0] * 0.6) * patientsPerDay[0] * 260 * baseMultiplier / 60);
    const costSavings = Math.round(timeSaved * 33);
    return { timeSaved, costSavings };
  };

  const { timeSaved, costSavings } = calculateSavings();

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const stat1 = useCounter(95, 2000);
  const stat2 = useCounter(60, 2000);
  const stat3 = useCounter(68, 2000);

  return (
    <div className="min-h-screen bg-secondary/50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-shadow">
                <span className="text-primary-foreground text-lg font-bold">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">AWALIFE</span>
            </Link>

            <nav className="hidden md:flex items-center bg-card rounded-full px-2 py-1.5 shadow-sm border border-border/50">
              <Link to="/" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full">
                <span className="text-xs">⌘</span> Home
              </Link>
              <Link to="/about" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Solutions <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <Link to="/products" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Platform
              </Link>
              <Link to="/contact" className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact us
              </Link>
            </nav>

            <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-lg hover:shadow-primary/25 transition-all">
              Book a meeting
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={heroAnim.ref}
        className="pt-28 pb-16 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`grid lg:grid-cols-3 gap-6 transition-all duration-1000 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Main Hero Card */}
            <div className="lg:col-span-2 bg-card rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[520px] shadow-lg border border-border/50 group hover:shadow-xl transition-shadow">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img src={heroBg} alt="" className="w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/80" />
              </div>

              {/* Decorative gradient orb */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="relative z-10 max-w-lg">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
                  <Zap className="w-4 h-4" />
                  AI-Powered Veterinary Diagnostics
                </div>

                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
                  Advanced AI for
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Veterinary Care
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Technology alone isn't enough. Intelligent care starts with the right AI assistant — built to support veterinarians, not replace them.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base shadow-lg hover:shadow-primary/25 transition-all group">
                    Book a meeting
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="rounded-full px-8 py-6 text-base border-border hover:bg-secondary">
                    <Play className="mr-2 w-4 h-4" />
                    Watch Demo
                  </Button>
                </div>
              </div>

              {/* Floating product image */}
              <div className="absolute bottom-8 right-8 w-48 h-48 lg:w-64 lg:h-64 animate-float hidden lg:block">
                <img 
                  src={ai100vet} 
                  alt="AI-100Vet" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right side cards */}
            <div className="flex flex-col gap-6">
              {/* Device Image Card */}
              <div className="bg-card rounded-3xl p-6 flex-1 flex items-center justify-center shadow-lg border border-border/50 hover:shadow-xl transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={microscopeStation} 
                  alt="Digital Microscope Station" 
                  className="w-full h-auto max-h-[180px] object-contain relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* AI Diagnostics Card */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 flex-1 text-primary-foreground shadow-lg hover:shadow-xl transition-all relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <Activity className="w-8 h-8 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold mb-2">
                    AI-Powered Diagnostics
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    Get fast, accurate results with AI-powered blood, urine, and fecal analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature badges row */}
          <div className={`mt-8 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-300 ${heroAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { icon: Shield, text: 'FDA Compliant' },
              { icon: Microscope, text: '5-Part Differential' },
              { icon: Zap, text: '60-Second Results' },
              { icon: Activity, text: '99.5% Accuracy' },
            ].map((badge, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50 text-sm text-muted-foreground shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsAnim.ref}
        className="py-20 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${statsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground mb-6 border border-border/50 shadow-sm">
              <Activity className="w-4 h-4 text-primary" />
              AWALIFE AI Platform
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Streamlining <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Clinical Workflows</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              AWALIFE AI optimizes veterinary diagnostics with precise algorithms, validated across hundreds of clinics globally.
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${statsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Equipment Reliability */}
            <div ref={stat1.ref} className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all group">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Equipment Reliability
              </span>
              <div className="text-5xl lg:text-6xl font-bold text-foreground my-4">
                +<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat1.count}</span>%
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                Near-perfect uptime ensures your clinic never misses a diagnosis.
              </p>
              
              {/* Bar Chart */}
              <div className="flex items-end gap-3 h-32">
                <div className="flex-1 bg-secondary rounded-t-lg h-1/3 relative" />
                <div className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-lg h-full relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium">
                    +95%
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Progress */}
            <div ref={stat2.ref} className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all group">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Clinic Efficiency
              </span>
              <div className="text-5xl lg:text-6xl font-bold text-foreground my-4">
                +<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat2.count}</span>%
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                AI-driven workflows boost productivity across partnered clinics.
              </p>
              
              {/* Line Chart */}
              <div className="h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 0 80 Q 50 75 80 60 T 140 40 T 200 20" 
                    fill="none" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth="2"
                  />
                  <path 
                    d="M 0 80 Q 50 75 80 60 T 140 40 T 200 20" 
                    fill="none" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="3"
                  />
                  <circle cx="200" cy="20" r="6" fill="hsl(var(--primary))" />
                </svg>
                <div className="absolute top-2 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium">
                  +60%
                </div>
              </div>
            </div>

            {/* False Positive Reduction */}
            <div ref={stat3.ref} className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all group">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                False Positive Reduction
              </span>
              <div className="text-5xl lg:text-6xl font-bold text-foreground my-4">
                -<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat3.count}</span>%
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                Fewer false alerts mean clinicians focus on real cases.
              </p>
              
              {/* Horizontal Bar Chart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-16">Without AI</span>
                  <div className="flex-1 bg-secondary h-8 rounded relative" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-16">With AI</span>
                  <div className="w-1/3 bg-gradient-to-r from-primary to-accent h-8 rounded relative">
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary-foreground font-medium">
                      -68%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section 
        ref={calcAnim.ref}
        className="py-20 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${calcAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground mb-6 border border-border/50 shadow-sm">
              <Zap className="w-4 h-4 text-primary" />
              AWALIFE Calculator
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Calculate Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Savings</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Estimate time and cost savings with AI-powered workflows tailored to your clinic.
            </p>
          </div>

          <div className={`grid lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${calcAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Calculator Form */}
            <div className="lg:col-span-2 bg-card rounded-3xl p-8 shadow-lg border border-border/50">
              {/* Workflow Type Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { key: 'manual', label: 'Manual / paper-based' },
                  { key: 'partial', label: 'Partially digital' },
                  { key: 'digital', label: 'Fully digital (without AI)' }
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setWorkflowType(type.key as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      workflowType === type.key
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Sliders Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Clinic Size */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">Clinic Size</label>
                  <div className="bg-secondary rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-foreground">{clinicSize[0]}</span>
                      <span className="text-sm text-muted-foreground">Veterinarians</span>
                    </div>
                    <Slider
                      value={clinicSize}
                      onValueChange={setClinicSize}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0</span>
                      <span>{clinicSize[0]}</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>

                {/* Avg Patients/Day */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">Avg. Patients / Day</label>
                  <div className="bg-secondary rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-foreground">{patientsPerDay[0]}</span>
                      <span className="text-sm text-muted-foreground">Patients / Day</span>
                    </div>
                    <Slider
                      value={patientsPerDay}
                      onValueChange={setPatientsPerDay}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0</span>
                      <span>{patientsPerDay[0]}</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>

                {/* Avg Diagnosis Time */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">Avg. Diagnosis Time (Min)</label>
                  <div className="bg-secondary rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-foreground">{diagnosisTime[0]}</span>
                      <span className="text-sm text-muted-foreground">min</span>
                    </div>
                    <Slider
                      value={diagnosisTime}
                      onValueChange={setDiagnosisTime}
                      max={60}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0</span>
                      <span>{diagnosisTime[0]}</span>
                      <span>60</span>
                    </div>
                  </div>
                </div>

                {/* Avg Administrative Time */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">Avg. Administrative Time (Min)</label>
                  <div className="bg-secondary rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-foreground">{adminTime[0]}</span>
                      <span className="text-sm text-muted-foreground">min</span>
                    </div>
                    <Slider
                      value={adminTime}
                      onValueChange={setAdminTime}
                      max={60}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0</span>
                      <span>{adminTime[0]}</span>
                      <span>60</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Goals */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">Main Goals</label>
                <div className="flex flex-wrap gap-3">
                  {['Reduce diagnostic time', 'Automate routine tasks', 'Enhance patient outcomes'].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedGoals.includes(goal)
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {selectedGoals.includes(goal) && <Check className="w-4 h-4" />}
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Cards */}
            <div className="flex flex-col gap-6">
              {/* Time Saved Card */}
              <div className="bg-card rounded-3xl p-6 flex-1 shadow-lg border border-border/50">
                <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{timeSaved}+</span> Hrs
                </div>
                <p className="text-muted-foreground">Annual time saved</p>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mt-6 mb-2">
                  $<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{costSavings.toLocaleString()}</span>
                </div>
                <p className="text-muted-foreground">Potential cost savings</p>
              </div>

              {/* Speed Card */}
              <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-primary-foreground shadow-lg relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="text-4xl lg:text-5xl font-bold mb-2">
                    3x Faster
                  </div>
                  <p className="text-primary-foreground/80">
                    Diagnostics compared to standard protocols
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section 
        ref={productsAnim.ref}
        className="py-20 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${productsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground mb-6 border border-border/50 shadow-sm">
              <Microscope className="w-4 h-4 text-primary" />
              Our Products
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Professional <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Veterinary Equipment</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${productsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all group">
              <div className="aspect-square bg-secondary rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={ai100vet} 
                  alt="AI-100Vet Elite" 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">AI-100Vet Elite</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Advanced hematology analyzer with 5-part differential and AI diagnostics.
              </p>
              <Link to="/products/ai-100vet">
                <Button variant="outline" className="rounded-full w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all group">
              <div className="aspect-square bg-secondary rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={microscopeStation} 
                  alt="Digital Microscope Station" 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Digital Microscope</h3>
              <p className="text-muted-foreground text-sm mb-4">
                High-resolution microscopy with automated cell counting and analysis.
              </p>
              <Link to="/products/microscope-station">
                <Button variant="outline" className="rounded-full w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all group">
              <div className="aspect-square bg-secondary rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={reagents} 
                  alt="Reagents & Consumables" 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Reagents & Consumables</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Premium quality reagents for consistent and accurate test results.
              </p>
              <Link to="/products">
                <Button variant="outline" className="rounded-full w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary via-primary to-accent rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Clinic?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
                Join hundreds of veterinary clinics already using AWALIFE to improve diagnostics and patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-card text-foreground hover:bg-card/90 rounded-full px-8 py-6 text-base shadow-lg">
                  Book a Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 py-6 text-base">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground text-lg font-bold">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">AWALIFE</span>
            </div>
            <nav className="flex flex-wrap gap-6">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link to="/applications" className="text-muted-foreground hover:text-primary transition-colors">Applications</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
            <p className="text-sm text-muted-foreground">
              © 2024 AWALIFE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthSyncLanding;
