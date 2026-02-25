import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ProductsSection from '@/components/sections/ProductsSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import GlobalPartnersSection from '@/components/sections/GlobalPartnersSection';
import CTASection from '@/components/sections/CTASection';
import { motion, MotionConfig } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const Index = () => (
  <Layout>
    <MotionConfig reducedMotion="user">
      {/* Page entrance — smooth blur-fade in */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease }}
      >
        <HeroSection />
        <WhyUsSection />
        <ProductsSection />
        <CertificationsSection />
        <GlobalPartnersSection />
        <CTASection />
      </motion.div>
    </MotionConfig>
  </Layout>
);

export default Index;
