import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Lock } from 'lucide-react';
import { images } from '@/lib/images';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'Company', path: '/company/about' },
      { label: 'Products', path: '/products' },
      { label: 'Applications', path: '/applications' },
      { label: 'Resources', path: '/resources' },
    ],
    products: [
      { label: 'AI Series Morphology Analyzer', path: '/products/ai-100vet-elite' },
      { label: 'DM-03 Microscope Workstation', path: '/products/microscope' },
    ],
  };

  return (
    <footer className="relative bg-card border-t border-border">
      {/* Gradient top border */}

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img src={images.awalifeLogo} alt="Awalife" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Awalife is a dedicated innovator in AI-powered visible morphology, building veterinary diagnostics solutions that turn what clinicians see into review-ready reports with images and counts.
            </p>
            <div className="flex gap-4 mt-8">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/company/awalife' },
                { icon: Instagram, href: 'https://www.instagram.com/awalife' },
                { icon: Facebook, href: 'https://www.facebook.com/awalife' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-secondary/40 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Company</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Products</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-5">Contact</h4>
            <div className="space-y-5 text-sm">
              <a
                href="tel:+8613332902078"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                (86) 13332902078
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
                <span className="text-sm leading-relaxed">
                  Shenzhen, China
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-10 border-t border-border flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            2026 SHENZHEN ANLV MEDICAL TECHNOLOGY CO., LTD. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            <Lock className="w-3 h-3" />
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
