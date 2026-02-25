import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ResourcesCMSProvider } from "@/contexts/ResourcesCMSContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { MediaOverrideProvider } from "@/contexts/MediaOverrideContext";
import Index from "./pages/Index";
import Company from "./pages/About";
import CompanyNews from "./pages/CompanyNews";
import NewsDetail from "./pages/NewsDetail";
import ProductDetail from "./pages/ProductDetail";
import Resources from "./pages/News";
import ResourcesAdmin from "./pages/ResourcesAdmin";
import AdminLogin from "./pages/AdminLogin";

import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PageTransition from "@/components/animations/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/company" element={<Navigate to="/company/about" replace />} />
          <Route path="/company/about" element={<PageTransition><Company /></PageTransition>} />
          <Route path="/company/news" element={<PageTransition><CompanyNews /></PageTransition>} />
          <Route path="/company/news/:newsId" element={<PageTransition><NewsDetail /></PageTransition>} />
          <Route path="/products/:productId" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/admin/resources" element={<PageTransition><ResourcesAdmin /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <MediaOverrideProvider>
          <ResourcesCMSProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnimatedRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </ResourcesCMSProvider>
        </MediaOverrideProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
