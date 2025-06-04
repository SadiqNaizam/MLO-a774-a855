import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={cn("flex h-screen bg-background text-foreground overflow-hidden")}>
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        toggleMobileSidebar={toggleMobileSidebar} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={toggleMobileSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
          <div className={cn(
            "pt-16 transition-all duration-300 ease-in-out",
            "lg:ml-64"
            )}>
            <div className="p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
