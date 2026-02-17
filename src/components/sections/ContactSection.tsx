import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: 'We will get back to you soon.',
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3 ${
              isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
            }`}
          >
            {t.contact.subtitle}
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold text-foreground ${
              isVisible ? 'opacity-100 animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            {t.contact.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div
            className={`space-y-8 ${isVisible ? 'opacity-100 animate-fade-in-left' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {t.contact.address}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{t.contact.address}</p>
                    <p className="text-foreground/70 text-sm">{t.contact.addressText}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{t.contact.phone}</p>
                    <a
                      href="tel:+8675527206973"
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      +86 755 27206973
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{t.contact.email}</p>
                    <a
                      href="mailto:info@awalife.com.cn"
                      className="text-foreground/70 hover:text-primary transition-colors"
                    >
                      info@awalife.com.cn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className={`bg-card rounded-2xl p-8 border border-border ${
              isVisible ? 'opacity-100 animate-fade-in-right' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.name}
                </label>
                <Input placeholder={t.contact.name} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.email}
                </label>
                <Input type="email" placeholder={t.contact.email} required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.phone}
                </label>
                <Input placeholder={t.contact.phone} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.country}
                </label>
                <Input placeholder={t.contact.country} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.contact.type}
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t.contact.type} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinic">{t.contact.types.clinic}</SelectItem>
                  <SelectItem value="distributor">{t.contact.types.distributor}</SelectItem>
                  <SelectItem value="hospital">{t.contact.types.hospital}</SelectItem>
                  <SelectItem value="other">{t.contact.types.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.contact.message}
              </label>
              <Textarea placeholder={t.contact.message} rows={4} required />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <>
                  {t.contact.submit}
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
