import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AdminImageOverlay from '@/components/admin/AdminImageOverlay';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global ambient gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animated-gradient opacity-70 pointer-events-none" />
      <div className="fixed inset-0 tech-grid opacity-10 pointer-events-none" />
      <div className="fixed inset-0 scanlines opacity-10 pointer-events-none" />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Decorative orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 orb opacity-30 pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 orb opacity-20 pointer-events-none" style={{ animationDelay: '2s' }} />
      <AdminImageOverlay />
    </div>
  );
};

export default Layout;
