import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Applications from "./pages/Applications";
import BloodAnalysis from "./pages/applications/BloodAnalysis";
import FecesAnalysis from "./pages/applications/FecesAnalysis";
import UrineAnalysis from "./pages/applications/UrineAnalysis";
import BodyFluids from "./pages/applications/BodyFluids";
import PetClinics from "./pages/solutions/PetClinics";
import Distributors from "./pages/solutions/Distributors";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MedTechLanding from "./pages/landing/MedTechLanding";
import ModernLanding from "./pages/landing/ModernLanding";
import FizensLanding from "./pages/landing/FizensLanding";
import HealthSyncLanding from "./pages/landing/HealthSyncLanding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing/healthsync" element={<HealthSyncLanding />} />
            <Route path="/landing/medtech" element={<MedTechLanding />} />
            <Route path="/landing/modern" element={<ModernLanding />} />
            <Route path="/landing/fizens" element={<FizensLanding />} />
            <Route path="/landing/healthsync" element={<HealthSyncLanding />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/blood" element={<BloodAnalysis />} />
            <Route path="/applications/feces" element={<FecesAnalysis />} />
            <Route path="/applications/urine" element={<UrineAnalysis />} />
            <Route path="/applications/body-fluids" element={<BodyFluids />} />
            <Route path="/solutions/pet-clinics" element={<PetClinics />} />
            <Route path="/solutions/distributors" element={<Distributors />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
