import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Twitter, Youtube, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { label: t.nav.about, path: '/about' },
      { label: t.nav.products, path: '/products' },
      { label: t.nav.applications, path: '/applications' },
      { label: t.nav.news, path: '/news' },
    ],
    products: [
      { label: 'AI-100Vet', path: '/products/ai-100vet' },
      { label: t.products.microscope.name, path: '/products/microscope' },
      { label: t.products.reagents.name, path: '/products/reagents' },
    ],
    support: [
      { label: t.nav.contact, path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: t.footer.distributors, path: '/distributors' },
    ],
  };

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">安侣医学</span>
                <span className="block text-xs text-muted-foreground">AWALIFE</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Youtube, href: 'https://youtube.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.nav.products}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.nav.contact}</h4>
            <div className="space-y-4 text-sm">
              <a
                href="tel:+8675527206973"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +86 755 27206973
              </a>
              <a
                href="mailto:info@awalife.com.cn"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                info@awalife.com.cn
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-xs leading-relaxed">
                  Shenzhen, China
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t.footer.companyName}. {t.footer.rights}
          </p>
          <p className="text-sm text-muted-foreground">
            粤ICP备2024306803号-1
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
