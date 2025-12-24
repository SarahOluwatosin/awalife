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
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <div key={info.title} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 text-center h-full flex flex-col items-center">
                  <div className="icon-glow mb-6 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Address */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-accent/5 rounded-3xl blur-2xl opacity-50" />
              <div className="relative glow-card p-10 lg:p-12">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                  Send a Message
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{t.contact.subtitle}</h2>
                <p className="text-muted-foreground mb-10 text-lg">{t.contact.description}</p>

                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.name}</label>
                      <Input placeholder={t.contact.name} required className="bg-secondary/30 border-border/50 h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.email}</label>
                      <Input type="email" placeholder={t.contact.email} required className="bg-secondary/30 border-border/50 h-12" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.phone}</label>
                      <Input placeholder={t.contact.phone} className="bg-secondary/30 border-border/50 h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.company}</label>
                      <Input placeholder={t.contact.company} className="bg-secondary/30 border-border/50 h-12" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.country}</label>
                      <Input placeholder={t.contact.country} className="bg-secondary/30 border-border/50 h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.type}</label>
                      <Select>
                        <SelectTrigger className="bg-secondary/30 border-border/50 h-12">
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
                    <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.message}</label>
                    <Textarea placeholder={t.contact.message} rows={6} required className="bg-secondary/30 border-border/50 resize-none" />
                  </div>

                  <Button type="submit" className="btn-gradient w-full h-14 text-base" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="animate-pulse">{t.contact.submitting}</span>
                    ) : (
                      <>
                        {t.contact.submit}
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Address & Map placeholder */}
            <div className="space-y-8">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-10 lg:p-12">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                    Our Location
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-8">{t.contact.address}</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="icon-glow flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium mb-2 text-lg">SHENZHEN ANLV MEDICAL TECHNOLOGY CO., LTD</p>
                        <p className="text-muted-foreground leading-relaxed">{t.contact.addressText}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-5">
                      <div className="icon-glow flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium mb-2 text-lg">Business Hours</p>
                        <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM (CST)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glow-card overflow-hidden h-80 lg:h-96 bg-gradient-to-br from-secondary/50 via-card to-secondary/30 flex items-center justify-center relative">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15)_0%,transparent_50%)]" />
                </div>
                
                <div className="text-center relative z-10">
                  <div className="icon-glow mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-foreground font-medium text-lg mb-2">Interactive Map</p>
                  <p className="text-muted-foreground">Shenzhen, Guangdong, China</p>
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
