import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Check, ArrowRight, Globe, TrendingUp, Users, Shield, Lightbulb, Award, Phone, Send, FileText, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { images } from '@/lib/images';
import { motion } from 'framer-motion';
import { sectionVariants, staggerContainer, cardSlideUp, fadeInLeft, fadeInRight, blurIn, popIn, viewportOnce, viewportOnceSmall } from '@/lib/animations';

const Distributors = () => {
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
      title: 'Partnership Inquiry Submitted!',
      description: 'Our partnership team will contact you within 48 hours.',
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const partnerBenefits = [
    { icon: TrendingUp, title: 'Growing Market', description: 'Veterinary diagnostics is a rapidly expanding market with increasing demand for in-clinic solutions.' },
    { icon: Award, title: 'Premium Products', description: 'Represent cutting-edge AI-powered diagnostic technology with proven clinical performance.' },
    { icon: Shield, title: 'Exclusive Territories', description: 'Protected territory agreements ensure you can build your market without competition.' },
    { icon: Headphones, title: 'Comprehensive Support', description: '24/7 technical support, training programs, and dedicated partner success managers.' },
  ];

  const supportOfferings = [
    { icon: FileText, title: 'Marketing Materials', description: 'Professional brochures, videos, and digital assets for effective promotion.' },
    { icon: Users, title: 'Sales Training', description: 'Comprehensive product training and sales methodology workshops.' },
    { icon: Lightbulb, title: 'Technical Training', description: 'In-depth technical certification for installation and support.' },
    { icon: Globe, title: 'Demo Equipment', description: 'Demo units and sample kits for customer presentations.' },
  ];

  const requirements = [
    'Established presence in veterinary market',
    'Technical support capabilities',
    'Dedicated sales team',
    'Commitment to customer service',
    'Financial stability',
    'Market development plan',
  ];

  return (
    <Layout>
      <PageHero
        title="For Distributors & Partners"
        subtitle="Join our global network of veterinary diagnostics partners"
        breadcrumb={[
          { label: 'Solutions', path: '/solutions' },
          { label: 'Distributors', path: '/solutions/distributors' },
        ]}
      />

      {/* Hero Section */}
      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div className="lg:order-2" variants={fadeInRight}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Partnership Opportunity
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Grow Your Business with <span className="gradient-text">AWALIFE</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Partner with AWALIFE to bring revolutionary AI-powered veterinary diagnostics to your market. We provide comprehensive support, competitive margins, and a product portfolio that sets you apart from the competition.
              </p>
              
              <motion.div className="grid grid-cols-2 gap-4 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
                {[
                  { value: '15+', label: 'Countries' },
                  { value: '500+', label: 'Partners' },
                  { value: '1M+', label: 'Pets Helped' },
                  { value: '24/7', label: 'Support' },
                ].map((stat) => (
                  <motion.div key={stat.label} className="p-4 rounded-xl bg-secondary/30 border border-border/30 text-center" variants={cardSlideUp}>
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <Button className="btn-gradient" size="lg" asChild>
                <a href="#partner-form">
                  Become a Partner
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div className="relative lg:order-1" variants={fadeInLeft}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-50" />
              <div className="relative glow-card p-10 bg-gradient-to-br from-secondary/50 to-card">
                <img src={images.ai100vet} alt="AWALIFE Products" data-override-id="distributors-hero" className="w-full max-h-80 object-contain" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Partner Benefits */}
      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <motion.div className="text-center max-w-3xl mx-auto mb-14" variants={blurIn}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Partner Value Proposition
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Partner with AWALIFE</h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {partnerBenefits.map((benefit, index) => (
              <motion.div key={benefit.title} className="group relative" variants={cardSlideUp}>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative glow-card p-8 h-full text-center">
                  <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary/60 mb-4">0{index + 1}</span>
                  <motion.div className="icon-glow mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" variants={popIn}>
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Support Offerings */}
      <motion.section className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <motion.div className="text-center max-w-3xl mx-auto mb-14" variants={blurIn}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Product Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What We Provide</h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnceSmall}>
            {supportOfferings.map((item) => (
              <motion.div key={item.title} className="glow-card p-6 text-center" variants={cardSlideUp}>
                <motion.div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4" variants={popIn}>
                  <item.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Requirements */}
      <motion.section className="py-16 lg:py-20 bg-card/50" initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInLeft}>
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                  Partner Requirements
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ideal Partner Profile</h2>
                <p className="text-muted-foreground mb-8">
                  We're looking for partners who share our commitment to quality and customer success. Here's what we look for:
                </p>
                <div className="space-y-3">
                  {requirements.map((req) => (
                    <div key={req} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/30">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="glow-card p-8 text-center" variants={fadeInRight}>
                <Handshake className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Partner?</h3>
                <p className="text-muted-foreground mb-6">
                  Join 500+ partners worldwide who trust AWALIFE for veterinary diagnostics solutions.
                </p>
                <Button className="btn-gradient" size="lg" asChild>
                  <a href="#partner-form">Apply Now</a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Partner Inquiry Form */}
      <motion.section id="partner-form" className="py-16 lg:py-20" initial="hidden" whileInView="visible" viewport={viewportOnceSmall} variants={sectionVariants}>
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto">
            <motion.div className="text-center mb-10" variants={blurIn}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
                Partner Inquiry
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Apply for Partnership</h2>
              <p className="text-muted-foreground">Tell us about your company and we'll be in touch.</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="glow-card p-8 lg:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                  <Input placeholder="Your company" required className="bg-secondary/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Contact Name *</label>
                  <Input placeholder="Your name" required className="bg-secondary/30 border-border/50" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <Input type="email" placeholder="email@company.com" required className="bg-secondary/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input placeholder="+1 234 567 8900" className="bg-secondary/30 border-border/50" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Country/Region *</label>
                  <Input placeholder="Your country" required className="bg-secondary/30 border-border/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Type</label>
                  <Select>
                    <SelectTrigger className="bg-secondary/30 border-border/50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="dealer">Dealer</SelectItem>
                      <SelectItem value="agent">Sales Agent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tell us about your company</label>
                <Textarea 
                  placeholder="Describe your company, current product lines, target market, and why you're interested in AWALIFE..." 
                  rows={5} 
                  className="bg-secondary/30 border-border/50" 
                />
              </div>
              <Button type="submit" className="btn-gradient w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Distributors;
