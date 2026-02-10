import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ResourcesCMSProvider } from "@/contexts/ResourcesCMSContext";
import Index from "./pages/Index";
import Company from "./pages/About";
import CompanyNews from "./pages/CompanyNews";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Applications from "./pages/Applications";
import BloodAnalysis from "./pages/applications/BloodAnalysis";
import FecesAnalysis from "./pages/applications/FecesAnalysis";
import UrineAnalysis from "./pages/applications/UrineAnalysis";
import PleuralEffusion from "./pages/applications/PleuralEffusion";
import ExoticAnimals from "./pages/applications/ExoticAnimals";
import Resources from "./pages/News";
import ResourcesAdmin from "./pages/ResourcesAdmin";

import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MedTechLanding from "./pages/landing/MedTechLanding";
import ModernLanding from "./pages/landing/ModernLanding";
import FizensLanding from "./pages/landing/FizensLanding";
import HealthSyncLanding from "./pages/landing/HealthSyncLanding";
import EmeraldLanding from "./pages/landing/EmeraldLanding";
import PageTransition from "@/components/animations/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/landing/healthsync" element={<PageTransition><HealthSyncLanding /></PageTransition>} />
          <Route path="/landing/medtech" element={<PageTransition><MedTechLanding /></PageTransition>} />
          <Route path="/landing/modern" element={<PageTransition><ModernLanding /></PageTransition>} />
          <Route path="/landing/fizens" element={<PageTransition><FizensLanding /></PageTransition>} />
          <Route path="/landing/healthsync" element={<PageTransition><HealthSyncLanding /></PageTransition>} />
          <Route path="/landing/emerald" element={<PageTransition><EmeraldLanding /></PageTransition>} />
          <Route path="/company" element={<Navigate to="/company/about" replace />} />
          <Route path="/company/about" element={<PageTransition><Company /></PageTransition>} />
          <Route path="/company/news" element={<PageTransition><CompanyNews /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/products/:productId" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/applications" element={<PageTransition><Applications /></PageTransition>} />
          <Route path="/applications/blood" element={<PageTransition><BloodAnalysis /></PageTransition>} />
          <Route path="/applications/feces" element={<PageTransition><FecesAnalysis /></PageTransition>} />
          <Route path="/applications/urine" element={<PageTransition><UrineAnalysis /></PageTransition>} />
          <Route path="/applications/pleural-effusion" element={<PageTransition><PleuralEffusion /></PageTransition>} />
          <Route path="/applications/exotic-animals" element={<PageTransition><ExoticAnimals /></PageTransition>} />
          <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
          <Route path="/admin/resources" element={<PageTransition><ResourcesAdmin /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  );
};

// App component with providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ResourcesCMSProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ResourcesCMSProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
