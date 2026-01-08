import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Company from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Applications from "./pages/Applications";
import BloodAnalysis from "./pages/applications/BloodAnalysis";
import UrineAnalysis from "./pages/applications/UrineAnalysis";
import FecesAnalysis from "./pages/applications/FecesAnalysis";
import PleuralEffusion from "./pages/applications/PleuralEffusion";
import ExoticAnimals from "./pages/applications/ExoticAnimals";
import Resources from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// App component with providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/company" element={<Company />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/blood" element={<BloodAnalysis />} />
            <Route path="/applications/urine" element={<UrineAnalysis />} />
            <Route path="/applications/feces" element={<FecesAnalysis />} />
            <Route path="/applications/pleural-effusion" element={<PleuralEffusion />} />
            <Route path="/applications/exotic-animals" element={<ExoticAnimals />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
