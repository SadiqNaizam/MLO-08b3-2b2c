import React from 'react';
import Link from 'next/link'; // Assuming Next.js for Link, adjust if using react-router-dom
import { usePathname } from 'next/navigation'; // Assuming Next.js for active state, adjust if needed
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  LayoutGrid, // For Dashboard / Analytics (using LayoutGrid as a generic 'overview')
  Users, // For CRM
  ShoppingCart, // For Ecommerce
  Bitcoin, // For Crypto
  Briefcase, // For Projects
  Image as ImageIcon, // For NFT (lucide-react Image)
  ClipboardList, // For Job
  Newspaper, // For Blog
  Settings, // For general settings icon
  ShieldCheck, // For Authentication
  FileText, // For Pages
  Rocket, // For Landing
  Puzzle, // For UI Components
  Box, // For Widgets (using Box for a generic widget icon)
  Smile, // For Icons
  Map, // For Maps
  Network // For Multi Level
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean; // For matching exact path
  isNew?: boolean;
  badgeContent?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const mainNavigationItems: NavItem[] = [
  { href: '/analytics', label: 'Analytics', icon: LayoutGrid },
  { href: '/crm', label: 'CRM', icon: Users },
  { href: '/ecommerce', label: 'Ecommerce', icon: ShoppingCart },
  { href: '/crypto', label: 'Crypto', icon: Bitcoin, exact: true }, // 'Crypto' is active in image
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/nft', label: 'NFT', icon: ImageIcon },
  { href: '/job', label: 'Job', icon: ClipboardList },
  { href: '/blog', label: 'Blog', icon: Newspaper, isNew: true },
];

const secondaryNavigationItems: NavItem[] = [
  { href: '/auth', label: 'Authentication', icon: ShieldCheck },
  { href: '/pages', label: 'Pages', icon: FileText },
  { href: '/landing', label: 'Landing', icon: Rocket },
];

const tertiaryNavigationItems: NavItem[] = [
  { href: '/ui/components', label: 'UI Components', icon: Puzzle },
  { href: '/widgets', label: 'Widgets', icon: Box },
  { href: '/icons', label: 'Icons', icon: Smile },
  { href: '/maps', label: 'Maps', icon: Map },
  { href: '/multi-level', label: 'Multi Level', icon: Network },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname(); // Get current path for active state

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
      return (
        <Link href={item.href} key={item.label}>
          <div
            className={cn(
              'flex items-center justify-between px-4 py-2.5 text-sm rounded-md',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-150',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
            )}
          >
            <div className="flex items-center">
              <item.icon className={cn('h-4 w-4 mr-3', isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/80 group-hover:text-sidebar-foreground')} />
              <span>{item.label}</span>
            </div>
            {item.isNew && (
              <Badge variant="secondary" className="bg-green-500 text-white h-5 px-1.5 text-xs">New</Badge>
            )}
            {item.badgeContent && (
              <Badge variant={item.badgeVariant || 'default'} className="h-5 px-1.5 text-xs">{item.badgeContent}</Badge>
            )}
          </div>
        </Link>
      );
    });
  };

  return (
    <aside className={cn('w-64 bg-sidebar text-sidebar-foreground flex flex-col h-full', className)}>
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center space-x-2">
          {/* Placeholder for Logo, using text for now based on "VELZON" */}
          <span className="font-semibold text-xl text-white">VELZON</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-1">
          {renderNavItems(mainNavigationItems)}
          
          <div className="px-4 pt-4 pb-2">
            <span className="text-xs font-semibold uppercase text-sidebar-foreground/50">Apps & Pages</span>
          </div>
          {renderNavItems(secondaryNavigationItems)}

          <div className="px-4 pt-4 pb-2">
            <span className="text-xs font-semibold uppercase text-sidebar-foreground/50">Components</span>
          </div>
          {renderNavItems(tertiaryNavigationItems)}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <Link href="/settings" >
          <div className={cn(
            'flex items-center px-4 py-2.5 text-sm rounded-md text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-150',
            pathname === '/settings' && 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
          )}>
            <Settings className="h-4 w-4 mr-3" />
            <span>Settings</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
