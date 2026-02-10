import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ProductsSection from '@/components/sections/ProductsSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import GlobalPartnersSection from '@/components/sections/GlobalPartnersSection';
import CTASection from '@/components/sections/CTASection';
import { motion, MotionConfig } from 'framer-motion';

const Index = () => {
  const ease = [0.22, 1, 0.36, 1] as const;

  const pageVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } }
  };

  return (
    <Layout>
      <MotionConfig reducedMotion="user">
        <motion.div initial="hidden" animate="visible" variants={pageVariants}>
          <motion.div variants={heroVariants}>
            <HeroSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <WhyUsSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <ProductsSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <CertificationsSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <GlobalPartnersSection />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <CTASection />
          </motion.div>
        </motion.div>
      </MotionConfig>
    </Layout>
  );
};

export default Index;
