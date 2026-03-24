import { useEffect, useState } from 'react';
import { usePageContent } from '@/contexts/PageContentContext';
import { Mail, Linkedin, Facebook, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { sectionVariants, fadeInLeft, fadeInRight, viewportOnce } from '@/lib/animations';
import contactIllustration from '@/assets/contact-illustration.png';
import { dbInsertPublic } from '@/lib/db';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  useEffect(() => {window.scrollTo(0, 0);}, []);
  const { getContent } = usePageContent();
  const c = (section: string, key: string, fb: string) => getContent('contact', section, key, fb);

  const [form, setForm] = useState({ fullName: '', position: '', company: '', email: '', whatsapp: '', country: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dbInsertPublic('contact_submissions', {
        full_name: form.fullName,
        position: form.position,
        company: form.company,
        email: form.email,
        whatsapp: form.whatsapp,
        country: form.country,
        message: form.message,
      });
      setSubmitted(true);
      setForm({ fullName: '', position: '', company: '', email: '', whatsapp: '', country: '', message: '' });
      toast({ title: 'Message sent!', description: "We'll get back to you at " + form.email + ' as soon as possible.' });
    } catch {
      toast({ title: 'Failed to send message', description: 'Please try emailing us directly at info@awalife.com.cn', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const contactChips = [
  { label: 'Email', icon: Mail, href: 'mailto:info@awalife.com.cn', display: 'info@awalife.com.cn' },
  { label: 'LinkedIn', icon: Linkedin, href: getContent('footer', 'social', 'linkedin_url', 'https://www.linkedin.com/company/awalife'), display: 'linkedin.com/company/awalife' },
  { label: 'Facebook', icon: Facebook, href: getContent('footer', 'social', 'facebook_url', 'https://www.facebook.com/profile.php?id=61575919264554'), display: 'facebook.com/awalife' },
  { label: 'Instagram', icon: Instagram, href: getContent('footer', 'social', 'instagram_url', 'https://www.instagram.com/awalife_es'), display: 'instagram.com/awalife_es' }];


  return (
    <Layout>
      {/* Hero Section with Contact Info */}
      <motion.section className="pt-32 pb-20 lg:pt-36 lg:pb-24" initial="hidden" animate="visible" variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text and Contact Icons */}
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">{c('hero', 'badge', 'Get in Touch')}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"><span className="gradient-text">{c('hero', 'title_highlight', 'Contact')}</span> {c('hero', 'title_suffix', 'Us')}</h1>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4"><span className="gradient-text">{c('form', 'title_highlight', 'Interested in')}</span> {c('form', 'title_suffix', 'Our Products?')}</h2>
              <p className="text-lg text-muted-foreground">{c('form', 'subtitle', "Contact our team for pricing, demonstrations, and technical specifications tailored to your clinic's needs.")}</p>
            </motion.div>

            <motion.div variants={fadeInRight} className="rounded-2xl border border-border/30 bg-background p-8 lg:p-10 w-full">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{c('form', 'success_title', 'Message Sent!')}</h3>
                  <p className="text-muted-foreground mb-6">{c('form', 'success_body', "Thank you for reaching out. We'll respond to your inquiry as soon as possible.")}</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>{c('form', 'success_cta', 'Send another message')}</Button>
                </div>
              ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">{c('form', 'label_name', 'Full Name *')}</label>
                  <Input name="fullName" value={form.fullName} onChange={handleChange} required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">{c('form', 'label_position', 'Position *')}</label>
                  <Input name="position" value={form.position} onChange={handleChange} required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">{c('form', 'label_company', 'Company / Hospital / Clinic *')}</label>
                  <Input name="company" value={form.company} onChange={handleChange} required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">{c('form', 'label_email', 'Email Address *')}</label>
                  <Input name="email" type="email" value={form.email} onChange={handleChange} required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">{c('form', 'label_whatsapp', 'WhatsApp Number')}</label>
                  <Input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">{c('form', 'label_country', 'Country / Region *')}</label>
                  <Input name="country" value={form.country} onChange={handleChange} required className="bg-background border-border/40 h-12 focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2.5">{c('form', 'label_message', 'Your Message *')}</label>
                  <Textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="bg-background border-border/40 resize-none focus:border-primary/50 transition-colors" />
                </div>
                <div className="flex justify-start pt-2">
                  <Button className="btn-gradient group px-12" size="lg" disabled={submitting}>
                    <Send className="mr-2 w-4 h-4" />
                    {submitting ? c('form', 'btn_sending', 'Sending...') : c('form', 'btn_submit', 'Submit')}
                  </Button>
                </div>
              </form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Layout>);

};

export default Contact;
