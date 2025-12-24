import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: t.contact.success,
      description: t.contact.successDesc,
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t.contact.hotline,
      value: '+86 755 27206973',
      link: 'tel:+8675527206973',
    },
    {
      icon: Mail,
      title: t.contact.email,
      value: 'info@awalife.com.cn',
      link: 'mailto:info@awalife.com.cn',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: '+86 173 2789 4016',
      link: 'https://wa.me/8617327894016',
    },
    {
      icon: MapPin,
      title: t.contact.office,
      value: 'Shenzhen, China',
      link: null,
    },
  ];

  return (
    <Layout>
      <PageHero
        title={t.pageHero.contact.title}
        subtitle={t.pageHero.contact.subtitle}
        breadcrumb={[{ label: t.nav.contact, path: '/contact' }]}
      />

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info) => (
              <div key={info.title} className="glow-card p-6 text-center">
                <div className="icon-glow mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Address */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="glow-card p-8 md:p-10">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t.contact.subtitle}</h2>
              <p className="text-muted-foreground mb-8">{t.contact.description}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.name}</label>
                    <Input placeholder={t.contact.name} required className="bg-secondary/30 border-border/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.email}</label>
                    <Input type="email" placeholder={t.contact.email} required className="bg-secondary/30 border-border/50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.phone}</label>
                    <Input placeholder={t.contact.phone} className="bg-secondary/30 border-border/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.company}</label>
                    <Input placeholder={t.contact.company} className="bg-secondary/30 border-border/50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.country}</label>
                    <Input placeholder={t.contact.country} className="bg-secondary/30 border-border/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{t.contact.type}</label>
                    <Select>
                      <SelectTrigger className="bg-secondary/30 border-border/50">
                        <SelectValue placeholder={t.contact.type} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clinic">{t.contact.types.clinic}</SelectItem>
                        <SelectItem value="distributor">{t.contact.types.distributor}</SelectItem>
                        <SelectItem value="hospital">{t.contact.types.hospital}</SelectItem>
                        <SelectItem value="lab">{t.contact.types.lab}</SelectItem>
                        <SelectItem value="other">{t.contact.types.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t.contact.message}</label>
                  <Textarea placeholder={t.contact.message} rows={5} required className="bg-secondary/30 border-border/50" />
                </div>

                <Button type="submit" className="btn-gradient w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="animate-pulse">{t.contact.submitting}</span>
                  ) : (
                    <>
                      {t.contact.submit}
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Address & Map placeholder */}
            <div className="space-y-6">
              <div className="glow-card p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">{t.contact.address}</h3>
                <div className="flex items-start gap-4 mb-6">
                  <div className="icon-glow flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">SHENZHEN ANLV MEDICAL TECHNOLOGY CO., LTD</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t.contact.addressText}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="icon-glow flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Business Hours</p>
                    <p className="text-muted-foreground text-sm">Monday - Friday: 9:00 AM - 6:00 PM (CST)</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glow-card overflow-hidden h-80 bg-secondary/30 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map</p>
                  <p className="text-sm text-muted-foreground/60">Shenzhen, Guangdong, China</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
