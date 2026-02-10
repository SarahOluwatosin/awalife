import { useEffect } from 'react';
import { Mail, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bodyTextClass = 'text-[18px]';
  const contactChips = [
    { label: 'Email', icon: Mail, href: 'mailto:info@awalife.com.cn' },
    { label: 'Linkedin', icon: Linkedin, href: 'https://linkedin.com/company/awalife' },
    { label: 'Facebook', icon: Facebook, href: 'https://facebook.com/profile.php?id=615799284554' },
    { label: 'INS', icon: Instagram, href: 'https://instagram.com/awalife_es' },
  ];

  return (
    <Layout>
      <PageHero
        title="Contact Us"
        subtitle="Reach out to our team"
        breadcrumb={[{ label: 'Contact Us', path: '/contact' }]}
      />

      {/* Contact Intro */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Contact Us</h2>
              <p className={`${bodyTextClass} text-muted-foreground leading-relaxed mb-8`}>
                If you're interested in learning more about Awalife's products or exploring potential business
                opportunities, feel free to reach out to us using the contact information below, and we'll respond as
                soon as possible.
              </p>
              <div className="flex flex-wrap gap-3">
                {contactChips.map((chip) => (
                  <Button key={chip.label} variant="outline" size="sm" className="rounded-full px-5" asChild>
                    <a href={chip.href} target="_blank" rel="noreferrer">
                      <chip.icon className="mr-2 h-4 w-4 text-primary" />
                      {chip.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/30 bg-secondary/20 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Contact Channels
              </p>
              <div className="space-y-5 text-sm text-foreground">
                {contactChips.map((chip) => (
                  <div key={chip.label} className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <chip.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold">{chip.label}</div>
                      <a href={chip.href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        {chip.href.replace('https://', '').replace('mailto:', '')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Interested in Our Products?</h2>
            <p className={`${bodyTextClass} text-muted-foreground mb-10`}>
              Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's
              needs.
            </p>
          </div>

          <div className="max-w-3xl overflow-hidden rounded-2xl border border-border/30 bg-secondary/20 p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">*Full Name</label>
                  <Input required className="bg-background/50 border-border/50 h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">*Position</label>
                  <Input required className="bg-background/50 border-border/50 h-12" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">*Company/Hospital/Clinics</label>
                  <Input required className="bg-background/50 border-border/50 h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">*Email Address</label>
                  <Input type="email" required className="bg-background/50 border-border/50 h-12" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">WhatsAPP Number</label>
                  <Input className="bg-background/50 border-border/50 h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">*Country / Region</label>
                  <Input required className="bg-background/50 border-border/50 h-12" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2.5">*Your Message</label>
                <Textarea required rows={6} className="bg-background/50 border-border/50 resize-none" />
              </div>
              <Button variant="outline" size="lg" className="px-10">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
