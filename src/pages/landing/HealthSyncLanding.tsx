import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import ai100vet from '@/assets/ai-100vet.png';
import microscopeStation from '@/assets/microscope-station.png';

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

const HealthSyncLanding = () => {
  const [workflowType, setWorkflowType] = useState<'manual' | 'partial' | 'digital'>('manual');
  const [clinicSize, setClinicSize] = useState([10]);
  const [patientsPerDay, setPatientsPerDay] = useState([35]);
  const [diagnosisTime, setDiagnosisTime] = useState([35]);
  const [adminTime, setAdminTime] = useState([15]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Reduce diagnostic time', 'Automate routine tasks']);

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
    <div className="min-h-screen bg-[hsl(var(--muted))]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--muted))]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background text-sm font-bold">A</span>
              </div>
              <span className="text-xl font-semibold text-foreground">AWALIFE</span>
            </Link>

            <nav className="hidden md:flex items-center bg-background rounded-full px-2 py-1.5 shadow-sm">
              <Link to="/" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground bg-muted rounded-full">
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

            <Button className="hidden md:flex bg-foreground text-background hover:bg-foreground/90 rounded-full px-6">
              Book a meeting
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Main Hero Card */}
            <div className="lg:col-span-2 bg-background rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[500px]">
              <div className="relative z-10 max-w-lg">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
                  Software & AI For Medical All-In-One Platform
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Technology alone isn't enough. Intelligent care starts with the right AI assistant — built to support clinicians, not replace them.
                </p>
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-6 text-base">
                  Book a meeting
                </Button>
              </div>

              {/* Play button */}
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-background rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-5 h-5 text-foreground ml-0.5" />
              </div>

              {/* Background image placeholder - clinicians */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/4 w-[600px] h-[400px] opacity-90">
                <div className="w-full h-full bg-gradient-to-t from-background via-transparent to-transparent absolute z-10" />
              </div>
            </div>

            {/* Right side cards */}
            <div className="flex flex-col gap-4">
              {/* Device Image Card */}
              <div className="bg-background rounded-3xl p-6 flex-1 flex items-center justify-center">
                <img 
                  src={ai100vet} 
                  alt="AI-100Vet Device" 
                  className="w-full h-auto max-h-[200px] object-contain"
                />
              </div>

              {/* AI Diagnostics Card */}
              <div className="bg-background rounded-3xl p-6 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      AI-Powered Diagnostics
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Get fast, accurate answers with the help of AI-powered diagnostics.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 ml-4">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-4 h-4 rounded-full bg-muted"
                        style={{ opacity: 0.3 + (i * 0.1) }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground mb-6">
              AWALIFE AI
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Streamlining Clinical Process Automation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AWALIFE AI optimizes clinical workflows by leveraging precise, efficient algorithms, validated through data from hundreds of veterinary clinics globally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Equipment Reliability */}
            <div ref={stat1.ref} className="bg-background rounded-3xl p-8">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Equipment Reliability
              </span>
              <div className="text-5xl lg:text-6xl font-bold text-foreground my-4">
                +{stat1.count}%
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                Ensuring uninterrupted functionality of clinical devices with near-perfect reliability rates.
              </p>
              
              {/* Bar Chart */}
              <div className="flex items-end gap-3 h-32">
                <div className="flex-1 bg-muted rounded-t-lg h-1/3 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  </div>
                </div>
                <div className="flex-1 bg-foreground rounded-t-lg h-full relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded">
                    +95%
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Progress */}
            <div ref={stat2.ref} className="bg-background rounded-3xl p-8">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Clinic Progress
              </span>
              <div className="text-5xl lg:text-6xl font-bold text-foreground my-4">
                +{stat2.count}%
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                AI-driven workflows increased clinical efficiency by 60% across partnered institutions.
              </p>
              
              {/* Line Chart */}
              <div className="h-32 relative">
                <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path 
                    d="M 0 80 Q 50 75 80 60 T 140 40 T 200 20" 
                    fill="none" 
                    stroke="hsl(var(--muted))" 
                    strokeWidth="2"
                  />
                  <path 
                    d="M 0 80 Q 50 75 80 60 T 140 40 T 200 20" 
                    fill="none" 
                    stroke="hsl(var(--foreground))" 
                    strokeWidth="3"
                    strokeDasharray="4 2"
                  />
                  <circle cx="200" cy="20" r="4" fill="hsl(var(--foreground))" />
                </svg>
                <div className="absolute top-2 right-0 bg-foreground text-background text-xs px-2 py-1 rounded">
                  +60%
                </div>
              </div>
            </div>

            {/* False Positive Reduction */}
            <div ref={stat3.ref} className="bg-background rounded-3xl p-8">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                False Positive Reduction
              </span>
              <div className="text-5xl lg:text-6xl font-bold text-foreground my-4">
                -{stat3.count}%
              </div>
              <p className="text-muted-foreground text-sm mb-8">
                AWALIFE AI reduces false positives by 68%, eliminating unnecessary alerts and freeing clinicians to focus on real cases.
              </p>
              
              {/* Horizontal Bar Chart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-16">Without AI</span>
                  <div className="flex-1 bg-muted h-8 rounded relative">
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      +150%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-16">With AI</span>
                  <div className="w-1/3 bg-foreground h-8 rounded relative">
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-background">
                      +48%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground mb-6">
              AWALIFE Calculator
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Try The AWALIFE Calculator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estimate how much time and resources your clinic could save with AI-powered workflows — and see how it transforms diagnostics, staffing, and cost management.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calculator Form */}
            <div className="lg:col-span-2 bg-background rounded-3xl p-8">
              {/* Workflow Type Tabs */}
              <div className="flex gap-2 mb-8">
                {[
                  { key: 'manual', label: 'Manual / paper-based' },
                  { key: 'partial', label: 'Partially digital' },
                  { key: 'digital', label: 'Fully digital (without AI)' }
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setWorkflowType(type.key as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      workflowType === type.key
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
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
                  <div className="bg-muted rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-foreground">{clinicSize[0]}</span>
                      <span className="text-sm text-muted-foreground">MDs</span>
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
                  <div className="bg-muted rounded-xl p-4">
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
                  <div className="bg-muted rounded-xl p-4">
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
                  <div className="bg-muted rounded-xl p-4">
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
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedGoals.includes(goal)
                          ? 'bg-foreground text-background'
                          : 'bg-muted text-foreground hover:bg-muted/80'
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
            <div className="flex flex-col gap-4">
              {/* Time Saved Card */}
              <div className="bg-background rounded-3xl p-6 flex-1">
                <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {timeSaved}+ Hrs
                </div>
                <p className="text-muted-foreground">Annual time saved</p>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mt-6 mb-2">
                  ${costSavings.toLocaleString()}
                </div>
                <p className="text-muted-foreground">Potential cost savings</p>
              </div>

              {/* Speed Card */}
              <div className="bg-foreground rounded-3xl p-6 text-background">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  3x Faster
                </div>
                <p className="text-background/70">
                  Diagnostics compared to standard protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground mb-6">
              Our Products
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Professional Veterinary Equipment
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={ai100vet} 
                  alt="AI-100Vet Elite" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">AI-100Vet Elite</h3>
              <p className="text-muted-foreground mb-4">
                Advanced hematology analyzer with AI-powered diagnostics for precise blood analysis.
              </p>
              <Link to="/products/ai-100vet">
                <Button variant="outline" className="rounded-full">Learn more</Button>
              </Link>
            </div>

            <div className="bg-background rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src={microscopeStation} 
                  alt="Digital Microscope Station" 
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Digital Microscope Station</h3>
              <p className="text-muted-foreground mb-4">
                High-resolution digital microscopy with automated cell counting and analysis.
              </p>
              <Link to="/products/microscope-station">
                <Button variant="outline" className="rounded-full">Learn more</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-foreground rounded-3xl p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-background mb-4">
              Ready to Transform Your Clinic?
            </h2>
            <p className="text-background/70 max-w-xl mx-auto mb-8">
              Join hundreds of veterinary clinics already using AWALIFE to improve diagnostics and patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6">
                Book a Demo
              </Button>
              <Button variant="outline" className="border-background text-background hover:bg-background/10 rounded-full px-8 py-6">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background text-sm font-bold">A</span>
              </div>
              <span className="text-xl font-semibold text-foreground">AWALIFE</span>
            </div>
            <nav className="flex flex-wrap gap-6">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
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
