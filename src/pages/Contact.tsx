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
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {contactInfo.map((info) => (
              <div key={info.title} className="group text-center p-6 rounded-2xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Address */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div className="p-8 lg:p-10 rounded-2xl bg-secondary/30 border border-border/30">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Send a Message
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">{t.contact.subtitle}</h2>
              <p className="text-muted-foreground mb-10 text-lg">{t.contact.description}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.name}</label>
                    <Input placeholder={t.contact.name} required className="bg-background/50 border-border/50 h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.email}</label>
                    <Input type="email" placeholder={t.contact.email} required className="bg-background/50 border-border/50 h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.phone}</label>
                    <Input placeholder={t.contact.phone} className="bg-background/50 border-border/50 h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.company}</label>
                    <Input placeholder={t.contact.company} className="bg-background/50 border-border/50 h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.country}</label>
                    <Input placeholder={t.contact.country} className="bg-background/50 border-border/50 h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">{t.contact.type}</label>
                    <Select>
                      <SelectTrigger className="bg-background/50 border-border/50 h-12">
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
                  <Textarea placeholder={t.contact.message} rows={6} required className="bg-background/50 border-border/50 resize-none" />
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

            {/* Address & Map placeholder */}
            <div className="space-y-8">
              <div className="p-8 lg:p-10 rounded-2xl bg-secondary/30 border border-border/30">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                  Our Location
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-8">{t.contact.address}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-2 text-lg">SHENZHEN ANLV MEDICAL TECHNOLOGY CO., LTD</p>
                      <p className="text-muted-foreground leading-relaxed">{t.contact.addressText}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium mb-2 text-lg">Business Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM (CST)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="overflow-hidden h-80 lg:h-96 rounded-2xl bg-gradient-to-br from-secondary/50 via-secondary/30 to-secondary/50 border border-border/30 flex items-center justify-center relative">
                <div className="text-center relative z-10">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
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
