import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdminImageOverlay from '@/components/admin/AdminImageOverlay';
import Starfield from '@/components/animations/Starfield';
import { usePageContent } from '@/contexts/PageContentContext';

// Map URL pathnames to page_content page keys
const pathToPageKey = (pathname: string): string | null => {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname.startsWith('/company/about')) return 'about';
  if (pathname.startsWith('/company/news')) return 'news';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/resources')) return 'resources';
  if (pathname.startsWith('/applications/blood')) return 'blood';
  if (pathname.startsWith('/applications/urine')) return 'urine';
  if (pathname.startsWith('/applications/feces')) return 'feces';
  if (pathname.startsWith('/applications/pleural')) return 'pleural';
  if (pathname.startsWith('/applications/exotic')) return 'exotic';
  if (pathname.startsWith('/products/ai-analyzer')) return 'ai-analyzer';
  if (pathname.startsWith('/products/dm-03')) return 'dm-03';
  return null;
};

const setMetaTag = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const { getContent } = usePageContent();
  const pageKey = pathToPageKey(pathname);

  useEffect(() => {
    if (!pageKey) return;
    const title = getContent(pageKey, 'seo', 'title', '');
    const description = getContent(pageKey, 'seo', 'description', '');
    const keywords = getContent(pageKey, 'seo', 'keywords', '');
    if (title) document.title = title;
    if (description) setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
  }, [pageKey, getContent]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global ambient effects */}
      <div className="fixed inset-0 tech-grid opacity-10 pointer-events-none" />
      <div className="fixed inset-0 scanlines opacity-10 pointer-events-none" />
      <Starfield starCount={20} speed={0.1} className="fixed inset-0 opacity-20" />
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
