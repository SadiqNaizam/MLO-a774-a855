import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Bitcoin,
  Briefcase,
  Type,
  Newspaper,
  AppWindow,
  Spline,
  ShieldCheck,
  FileText,
  Rocket,
  PercentSquare,
  Layers,
  Gift,
  FileSliders,
  ChevronDown,
  Power,
  X // For mobile close button
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  isSubItem?: boolean;
  exact?: boolean;
  onClick?: () => void; // For closing mobile sidebar on nav
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, badge, badgeVariant, isSubItem = false, exact = false, onClick }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-sidebar-foreground',
        isSubItem && 'pl-9'
      )}
    >
      <Icon className={cn('h-4 w-4', isActive ? 'text-primary-foreground' : 'text-sidebar-primary')} />
      <span>{label}</span>
      {badge && <Badge variant={badgeVariant || 'default'} className={cn('ml-auto', isActive && 'bg-white text-primary')}>{badge}</Badge>}
    </Link>
  );
};

interface NavSectionProps {
  title?: string;
  items: (NavItemProps | { type: 'accordion'; title: string; icon: React.ElementType; items: NavItemProps[]; defaultOpen?: boolean })[];
  onNavItemClick?: () => void; // For closing mobile sidebar on nav
}

const NavSection: React.FC<NavSectionProps> = ({ title, items, onNavItemClick }) => (
  <div className="px-3 py-2">
    {title && <h2 className="mb-2 px-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">{title}</h2>}
    <ul className="space-y-1">
      {items.map((item, index) => {
        if ('type' in item && item.type === 'accordion') {
          const Icon = item.icon;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const location = useLocation();
          const isAccordionActive = item.items.some(subItem => location.pathname.startsWith(subItem.to));
          return (
            <Accordion key={index} type="single" collapsible defaultValue={item.defaultOpen || isAccordionActive ? `item-${index}` : undefined}>
              <AccordionItem value={`item-${index}`} className="border-b-0">
                <AccordionTrigger className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full justify-between',
                  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline',
                  isAccordionActive ? 'text-primary' : 'text-sidebar-foreground',
                  '[&[data-state=open]>svg.lucide-chevron-down]:rotate-180'
                )}>
                  <div className="flex items-center gap-3">
                    <Icon className={cn('h-4 w-4', isAccordionActive ? 'text-primary' : 'text-sidebar-primary')} />
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-0">
                  <ul className="space-y-1">
                    {item.items.map((subItem) => (
                      <li key={subItem.to}>
                        <NavItem {...subItem} isSubItem onClick={onNavItemClick} />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        }
        return (
          <li key={item.to}>
            <NavItem {...item as NavItemProps} onClick={onNavItemClick} />
          </li>
        );
      })}
    </ul>
  </div>
);

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, toggleMobileSidebar }) => {
  const menuItems: NavSectionProps[] = [
    {
      title: 'Menu',
      items: [
        {
          type: 'accordion' as const,
          title: 'Dashboards',
          icon: LayoutDashboard,
          defaultOpen: true,
          items: [
            { to: '/analytics', icon: BarChart3, label: 'Analytics', exact: true },
            { to: '/dashboard', icon: LayoutDashboard, label: 'CRM', exact: true },
            { to: '/ecommerce', icon: ShoppingBag, label: 'Ecommerce' },
          ],
        },
        { to: '/crypto', icon: Bitcoin, label: 'Crypto' },
        { to: '/projects', icon: Briefcase, label: 'Projects' },
        { to: '/nft', icon: Type, label: 'NFT' },
        { to: '/job', icon: Newspaper, label: 'Job', badge: 'New', badgeVariant: 'secondary' as const },
      ],
    },
    {
      title: 'Apps',
      items: [
        { type: 'accordion' as const, title: 'Apps', icon: AppWindow, items: [{ to: '/apps/calendar', icon: AppWindow, label: 'Calendar' }] },
        { type: 'accordion' as const, title: 'Layouts', icon: Spline, items: [{ to: '/layouts/horizontal', icon: Spline, label: 'Horizontal' }], badge: 'Hot', badgeVariant: 'destructive' as const },
      ],
    },
    {
      title: 'Pages',
      items: [
        { type: 'accordion' as const, title: 'Authentication', icon: ShieldCheck, items: [{ to: '/auth/login', icon: ShieldCheck, label: 'Login' }] },
        { type: 'accordion' as const, title: 'Pages', icon: FileText, items: [{ to: '/pages/starter', icon: Rocket, label: 'Starter' }] },
      ],
    },
    {
      title: 'Components',
      items: [
        { type: 'accordion' as const, title: 'Base UI', icon: PercentSquare, items: [{ to: '/ui/alerts', icon: PercentSquare, label: 'Alerts' }] },
        { type: 'accordion' as const, title: 'Advance UI', icon: Layers, items: [{ to: '/advance-ui/modals', icon: Layers, label: 'Modals' }] },
        { to: '/widgets', icon: Gift, label: 'Widgets' },
        { type: 'accordion' as const, title: 'Forms', icon: FileSliders, items: [{ to: '/forms/basic', icon: FileSliders, label: 'Basic Elements' }] },
      ],
    },
  ];

  const handleNavItemClick = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  return (
    <>
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 border-b border-sidebar-border px-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            VELZON
          </Link>
          <button onClick={toggleMobileSidebar} className="lg:hidden text-sidebar-primary hover:text-sidebar-accent-foreground">
            <X className="h-6 w-6" />
          </button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex-1 space-y-2 py-4">
            {menuItems.map((section, index) => (
              <NavSection key={index} title={section.title} items={section.items} onNavItemClick={handleNavItemClick} />
            ))}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="p-3 bg-sidebar-accent rounded-md flex items-center gap-3">
              <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Anna Adame" />
                  <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div>
                  <p className="text-sm font-semibold text-sidebar-accent-foreground">Anna Adame</p>
                  <p className="text-xs text-muted-foreground">anna.adame@example.com</p>
              </div>
          </div>
          <button
            className={cn(
              'mt-3 w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground'
            )}
          >
            <Power className="h-4 w-4 text-sidebar-primary" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {isMobileOpen && (
        <div 
          onClick={toggleMobileSidebar} 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
