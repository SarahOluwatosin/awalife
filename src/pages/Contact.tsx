import { useEffect } from 'react';
import { Mail, Linkedin, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, viewportOnce } from '@/lib/animations';

const Contact = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);

  const contactChips = [
  { label: 'Email', icon: Mail, href: 'mailto:info@awalife.com.cn', display: 'info@awalife.com.cn' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/awalife', display: 'linkedin.com/company/awalife' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com/profile.php?id=615799284554', display: 'facebook.com/awalife' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com/awalife_es', display: 'instagram.com/awalife_es' }];


  return (
    <Layout>
      {/* Hero Section with Contact Info */}
      <motion.section className="pt-32 pb-20 lg:pt-36 lg:pb-24" initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text and Contact Icons */}
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">Get in Touch</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"><span className="gradient-text">Contact</span> Us</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">If you're interested in learning more about Awalife's products or exploring potential business opportunities, feel free to reach out and we'll respond as soon as possible.</p>

              <p className="text-sm text-muted-foreground mb-6">Our dedicated customer support team is always ready to assist you:</p>

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
              <div className="rounded-2xl overflow-hidden bg-card/50 border border-border/30 p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center text-muted-foreground">
                  <Mail className="h-24 w-24 mx-auto mb-4 opacity-20" />
                  <p className="text-sm">Contact illustration</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Form Section */}
      <motion.section className="pb-24 lg:pb-32 bg-secondary/5" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeInLeft} className="text-center mb-12">
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
                Contact Form
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Send Us A <span className="gradient-text">Message</span></h2>
              <p className="text-lg text-muted-foreground">Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.</p>
            </motion.div>

            <motion.div variants={fadeInRight} className="rounded-2xl border border-border/30 bg-background p-8 lg:p-10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">Full Name *</label>
                    <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">Position *</label>
                    <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">Company / Hospital / Clinic *</label>
                    <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">Email Address *</label>
                    <Input type="email" required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">WhatsApp Number</label>
                    <Input className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2.5">Country / Region *</label>
                    <Input required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">Your Message *</label>
                  <Textarea required rows={5} className="bg-background border-border/40 resize-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="flex justify-center pt-2">
                  <Button className="btn-gradient group px-12" size="lg">
                    Submit
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
