import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages, Language } from '@/lib/i18n';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.products, id: 'products' },
    { label: t.nav.applications, id: 'applications' },
    { label: t.nav.contact, id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">安侣医学</span>
            <span className="hidden sm:inline text-foreground/80 font-normal text-sm">AWALIFE</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-accent"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  {languages.find((l) => l.code === language)?.nativeName}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as Language)}
                    className={language === lang.code ? 'bg-accent' : ''}
                  >
                    {lang.nativeName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => scrollToSection('contact')}
              size="sm"
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card rounded-lg shadow-lg mb-4 animate-slide-up overflow-hidden">
            <nav className="py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-6 py-3 text-foreground/80 hover:text-primary hover:bg-accent transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-6 pt-4 border-t border-border mt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full gap-2 justify-center">
                      <Globe className="w-4 h-4" />
                      {languages.find((l) => l.code === language)?.nativeName}
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as Language);
                          setIsMobileMenuOpen(false);
                        }}
                        className={language === lang.code ? 'bg-accent' : ''}
                      >
                        {lang.nativeName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
