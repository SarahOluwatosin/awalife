import { useState } from 'react';
import { NavLink, Navigate, Link } from 'react-router-dom';
import { LayoutDashboard, Newspaper, FolderOpen, Images, FileText, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview',  href: '/admin/dashboard' },
  { icon: Newspaper,       label: 'News',       href: '/admin/news' },
  { icon: FolderOpen,      label: 'Resources',  href: '/admin/resources' },
  { icon: Images,          label: 'Media',      href: '/admin/media' },
  { icon: FileText,        label: 'Page Text',  href: '/admin/content' },
];

type Props = {
  children: ReactNode;
  noPadding?: boolean;
};

const AdminLayout = ({ children, noPadding }: Props) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const Sidebar = () => (
    <aside className="flex flex-col w-56 h-full bg-sidebar border-r border-sidebar-border shrink-0">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-sidebar-foreground tracking-tight">AWALIFE</span>
          <span className="text-[10px] font-semibold bg-sidebar-primary/15 text-sidebar-primary px-1.5 py-0.5 rounded-full uppercase tracking-wider">Admin</span>
        </div>
        <p className="text-xs text-sidebar-foreground/50 mt-0.5 truncate">{user.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
          <NavLink
            key={href}
            to={href}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          View Site
        </Link>
        <button
          onClick={() => void signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — fixed height, never scrolls */}
      <div className="hidden md:flex h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 flex h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content — this column scrolls */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-background shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-foreground">AWALIFE Admin</span>
        </div>

        {/* Page content */}
        <main className={`flex-1 overflow-hidden ${noPadding ? '' : 'p-6 lg:p-8 overflow-y-auto'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
