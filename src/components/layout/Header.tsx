import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, ArrowRight, Droplets, Bug, TestTubes, Beaker, Building2, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, Language } from '@/lib/i18n';
import ThemeToggle from '@/components/ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sampleAnalysisItems = [
    { label: 'Blood Analysis', path: '/applications/blood', icon: Droplets },
    { label: 'Feces Analysis', path: '/applications/feces', icon: Bug },
    { label: 'Urine Sediment', path: '/applications/urine', icon: TestTubes },
    { label: 'Body Fluids', path: '/applications/body-fluids', icon: Beaker },
  ];

  const solutionsItems = [
    { label: 'For Pet Clinics & Hospitals', path: '/solutions/pet-clinics', icon: Building2 },
    { label: 'For Distributors & Partners', path: '/solutions/distributors', icon: Handshake },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 glass' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">安侣医学</span>
              <span className="hidden sm:block text-xs text-muted-foreground">AWALIFE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${location.pathname === '/' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              {t.nav.home}
            </Link>
            <Link to="/about" className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${location.pathname === '/about' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              {t.nav.about}
            </Link>
            <Link to="/products" className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${location.pathname.startsWith('/products') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              {t.nav.products}
            </Link>
            
            {/* Applications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${location.pathname.startsWith('/applications') ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
                  {t.nav.applications}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 glass">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Sample Analysis</DropdownMenuLabel>
                {sampleAnalysisItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center gap-3 cursor-pointer">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">Solutions</DropdownMenuLabel>
                {solutionsItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center gap-3 cursor-pointer">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/news" className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${location.pathname === '/news' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              {t.nav.news}
            </Link>
            <Link to="/contact" className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${location.pathname === '/contact' ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}>
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-foreground/70 hover:text-foreground">
                  <Globe className="w-4 h-4" />
                  {languages.find((l) => l.code === language)?.nativeName}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code as Language)} className={language === lang.code ? 'bg-primary/10 text-primary' : ''}>
                    {lang.nativeName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/contact">
              <Button className="btn-gradient group">
                {t.nav.getStarted}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-foreground hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-6 rounded-2xl glass animate-slide-up">
            <nav className="flex flex-col">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium ${location.pathname === '/' ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>{t.nav.home}</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium ${location.pathname === '/about' ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>{t.nav.about}</Link>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium ${location.pathname.startsWith('/products') ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>{t.nav.products}</Link>
              <div className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sample Analysis</div>
              {sampleAnalysisItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium flex items-center gap-3 ${location.pathname === item.path ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
              <div className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solutions</div>
              {solutionsItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium flex items-center gap-3 ${location.pathname === item.path ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
              <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium ${location.pathname === '/news' ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>{t.nav.news}</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium ${location.pathname === '/contact' ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>{t.nav.contact}</Link>
              <div className="px-6 pt-4 mt-4 border-t border-border">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="btn-gradient w-full">{t.nav.getStarted}</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
