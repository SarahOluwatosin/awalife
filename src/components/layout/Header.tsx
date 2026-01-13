import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Droplets, Bug, Microscope, MonitorSmartphone, FlaskConical, Stethoscope, Building2, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import awalifeLogo from '@/assets/awalife-logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isEmerald = location.pathname === '/landing/emerald';
  const isDarkHero = isEmerald && !isScrolled;

  const navTextClass = (active: boolean) =>
    `px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
      active
        ? 'text-primary'
        : isDarkHero
          ? 'text-white/80 hover:text-white'
          : 'text-foreground/70 hover:text-foreground'
    }`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productItems = [
    { label: 'AI Morphological Analyzer', path: '/products/ai-analyzer', icon: Microscope },
    { label: 'DM-03 Microscope Workstation', path: '/products/dm-03', icon: MonitorSmartphone },
  ];

  const applicationItems = [
    { label: 'Blood', path: '/applications/blood', icon: Droplets },
    { label: 'Urine', path: '/applications/urine', icon: FlaskConical },
    { label: 'Feces', path: '/applications/feces', icon: Bug },
    { label: 'Pleural Effusion', path: '/applications/pleural-effusion', icon: Stethoscope },
    { label: 'Exotic Animals', path: '/applications/exotic-animals', icon: Stethoscope },
  ];

  const companyItems = [
    { label: 'About Awalife', path: '/company', icon: Building2 },
    { label: 'News Center', path: '/resources', icon: Newspaper },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 glass' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={awalifeLogo}
              alt="Awalife"
              className={`h-10 w-auto transition-all ${isDarkHero ? 'brightness-200 drop-shadow' : ''}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Product Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`${navTextClass(location.pathname.startsWith('/products'))} flex items-center gap-1`}>
                  {t.nav.products}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 glass">
                {productItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center gap-3 cursor-pointer">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Application Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`${navTextClass(location.pathname.startsWith('/applications'))} flex items-center gap-1`}>
                  {t.nav.applications}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 glass">
                {applicationItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center gap-3 cursor-pointer">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/resources" className={navTextClass(location.pathname === '/resources')}>
              {t.nav.resources}
            </Link>

            {/* Company Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`${navTextClass(location.pathname === '/company')} flex items-center gap-1`}>
                  {t.nav.company}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 glass">
                {companyItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="flex items-center gap-3 cursor-pointer">
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/contact" className={navTextClass(location.pathname === '/contact')}>
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact">
              <Button className="btn-gradient group">
                {t.nav.getStarted}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              isDarkHero ? 'text-white hover:text-white' : 'text-foreground hover:text-primary'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-6 rounded-2xl glass animate-slide-up">
            <nav className="flex flex-col">
              <div className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Products</div>
              {productItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium flex items-center gap-3 ${location.pathname === item.path ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
              <div className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Applications</div>
              {applicationItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium flex items-center gap-3 ${location.pathname === item.path ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
              <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium mt-2 ${location.pathname === '/resources' ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>{t.nav.resources}</Link>
              <div className="px-6 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Company</div>
              {companyItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-sm font-medium flex items-center gap-3 ${location.pathname === item.path ? 'text-primary bg-primary/5' : 'text-foreground/70'}`}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              ))}
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
