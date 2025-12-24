import { LanguageProvider } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductsSection from '@/components/sections/ProductsSection';
import ApplicationsSection from '@/components/sections/ApplicationsSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <LanguageProvider>
      <Layout>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProductsSection />
        <ApplicationsSection />
        <ContactSection />
      </Layout>
    </LanguageProvider>
  );
};

export default Index;
