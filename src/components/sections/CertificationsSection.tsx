import { ShieldCheck, BadgeCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInLeft, popIn, staggerContainerDelayed, viewportOnce } from '@/lib/animations';
import { usePageContent } from '@/contexts/PageContentContext';

const certIcons = [ShieldCheck, BadgeCheck, Award];

const CertificationsSection = () => {
  const { getContent } = usePageContent();
  const c = (key: string, fb: string) => getContent('home', 'certifications', key, fb);

  const certifications = [
    { label: c('cert_1_label', 'CE Certification'), icon: certIcons[0] },
    { label: c('cert_2_label', 'ISO9001'),           icon: certIcons[1] },
    { label: c('cert_3_label', 'ISO13485'),          icon: certIcons[2] },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* Left — slides in from the left */}
          <motion.div
            className="max-w-lg"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInLeft}
          >
            <span className="inline-flex items-center bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase rounded-full px-4 py-2 mb-3">
              {c('badge', 'Regulatory Credibility')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {c('title', 'Certified for')} <span className="gradient-text">{c('title_highlight', 'Global')}</span> {c('title_suffix', 'Veterinary Diagnostics')}
            </h2>
          </motion.div>

          {/* Right — badges pop in with stagger */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainerDelayed}
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.label}
                className="flex items-center gap-3 text-muted-foreground font-medium"
                variants={popIn}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary flex-shrink-0">
                  <cert.icon className="h-5 w-5" />
                </span>
                <span className="text-base">{cert.label}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
