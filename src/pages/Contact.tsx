import { useEffect } from 'react';
import { usePageContent } from '@/contexts/PageContentContext';
import { Mail, Linkedin, Facebook, Instagram, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, viewportOnce } from '@/lib/animations';
import contactIllustration from '@/assets/contact-illustration.png';

const Contact = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const { getContent } = usePageContent();
  const c = (section: string, key: string, fb: string) => getContent('contact', section, key, fb);

  const contactChips = [
  { label: 'Email', icon: Mail, href: 'mailto:info@awalife.com.cn', display: 'info@awalife.com.cn' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/awalife', display: 'linkedin.com/company/awalife' },
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61575919264554', display: 'facebook.com/awalife' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/awalife_es', display: 'instagram.com/awalife_es' }];


  return (
    <Layout>
      {/* Hero Section with Contact Info */}
      <motion.section className="pt-32 pb-20 lg:pt-36 lg:pb-24" initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text and Contact Icons */}
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('hero', 'badge', 'Get in Touch')}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"><span className="gradient-text">Contact</span> Us</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{c('hero', 'description', "If you're interested in learning more about Awalife's products or exploring potential business opportunities, feel free to reach out and we'll respond as soon as possible.")}</p>

              <p className="text-sm text-muted-foreground mb-6">{c('hero', 'support_text', 'Our dedicated customer support team is always ready to assist you:')}</p>

              {/* Contact Icons Row */}
              <div className="flex flex-wrap gap-4">
                {contactChips.map((chip) =>
                <a
                  key={chip.label}
                  href={chip.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                  title={chip.display}>

                    <chip.icon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div variants={fadeInRight} className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={contactIllustration}
                  alt="Awalife customer support"
                  className="w-full h-auto rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Form Section */}
      <motion.section className="pb-24 lg:pb-32 bg-secondary/5" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="w-full">
            <motion.div variants={fadeInLeft} className="text-left mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4"><span className="gradient-text">Interested in</span> Our Products?</h2>
              <p className="text-lg text-muted-foreground">{c('form', 'subtitle', "Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.")}</p>
            </motion.div>

            <motion.div variants={fadeInRight} className="rounded-2xl border border-border/30 bg-background p-8 lg:p-10 w-full">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">Full Name *</label>
                  <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">Position *</label>
                  <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">Company / Hospital / Clinic *</label>
                  <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">Email Address *</label>
                  <Input type="email" required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">WhatsApp Number</label>
                  <Input className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">Country / Region *</label>
                  <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">Your Message *</label>
                  <Textarea required rows={5} className="bg-background border-border/40 resize-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="flex justify-start pt-2">
                  <Button className="btn-gradient group px-12" size="lg">
                    <Send className="mr-2 w-4 h-4" />
                    Submit
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Layout>);

};

export default Contact;
