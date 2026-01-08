import { Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-foreground mb-2">安侣医学</h3>
            <p className="text-sm text-card/60 mb-4">{t.footer.company}</p>
            <p className="text-card/80 mb-6">{t.footer.purpose}</p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card/10 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card/10 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-card/80">
              <a
                href="tel:+8675527206973"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +86 755 27206973
              </a>
              <a
                href="mailto:info@awalife.com.cn"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                info@awalife.com.cn
              </a>
              <a
                href="https://wa.me/8617327894016"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                WhatsApp: +86 173 2789 4016
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">{t.contact.address}</h4>
            <div className="flex items-start gap-2 text-sm text-card/80">
              <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <p>{t.contact.addressText}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-card/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-card/60">
            © {new Date().getFullYear()} {t.footer.company}. {t.footer.rights}
          </p>
          <p className="text-sm text-card/60">
            粤ICP备2024306803号-1
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
