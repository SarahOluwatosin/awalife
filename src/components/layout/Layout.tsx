import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Decorative orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 orb opacity-30 pointer-events-none" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 orb opacity-20 pointer-events-none" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default Layout;
