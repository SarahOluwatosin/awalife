import { useEffect } from 'react';
import { Mail, Linkedin, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactChips = [
    { label: 'Email', icon: Mail, href: 'mailto:info@awalife.com.cn', display: 'info@awalife.com.cn' },
    { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/awalife', display: 'linkedin.com/company/awalife' },
    { label: 'Facebook', icon: Facebook, href: 'https://facebook.com/profile.php?id=615799284554', display: 'facebook.com/awalife' },
    { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/awalife_es', display: 'instagram.com/awalife_es' },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl">
            <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              If you're interested in learning more about Awalife's products or exploring potential business
              opportunities, feel free to reach out and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Channels + Form */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
            {/* Channels */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">Contact Channels</h2>
              <div className="space-y-5">
                {contactChips.map((chip) => (
                  <a
                    key={chip.label}
                    href={chip.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 group p-4 rounded-xl border border-border/30 bg-secondary/10 hover:border-primary/30 hover:bg-secondary/20 transition-all duration-300"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                      <chip.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{chip.label}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {chip.display}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Send us a message</h2>
              <p className="text-muted-foreground mb-8">
                Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.
              </p>
              <div className="rounded-2xl border border-border/30 bg-secondary/10 p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">Full Name *</label>
                      <Input required className="bg-background/50 border-border/40 h-12 focus:border-primary/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">Position *</label>
                      <Input required className="bg-background/50 border-border/40 h-12 focus:border-primary/50 transition-colors" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">Company / Hospital / Clinic *</label>
                      <Input required className="bg-background/50 border-border/40 h-12 focus:border-primary/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">Email Address *</label>
                      <Input type="email" required className="bg-background/50 border-border/40 h-12 focus:border-primary/50 transition-colors" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">WhatsApp Number</label>
                      <Input className="bg-background/50 border-border/40 h-12 focus:border-primary/50 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2.5">Country / Region *</label>
                      <Input required className="bg-background/50 border-border/40 h-12 focus:border-primary/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">Your Message *</label>
                    <Textarea required rows={5} className="bg-background/50 border-border/40 resize-none focus:border-primary/50 transition-colors" />
                  </div>
                  <Button className="btn-gradient group px-10" size="lg">
                    Submit
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
