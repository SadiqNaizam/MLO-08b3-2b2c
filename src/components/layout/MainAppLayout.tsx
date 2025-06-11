import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  // Example state for managing sidebar visibility on smaller screens, not fully implemented in Sidebar/Header yet
  // const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={cn(
      "grid grid-cols-[theme(spacing.64)_1fr] grid-rows-[theme(spacing.16)_1fr] h-screen bg-background",
      className
      // isSidebarOpen ? "grid-cols-[theme(spacing.64)_1fr]" : "grid-cols-[0_1fr]", // Example responsive change
    )}>
      {/* Sidebar: spans 2 rows in 1st col */}
      {/* Conditionally render or adjust width based on isSidebarOpen for responsiveness */}
      <div className="row-span-2 border-r border-border overflow-y-auto">
        <Sidebar />
      </div>
      
      {/* Header: 2nd col, 1st row */}
      {/* Pass toggleSidebar if implementing responsive sidebar */}
      <div className="col-start-2 row-start-1">
        <Header /> 
      </div>
      
      {/* Main content: 2nd col, 2nd row */}
      <main className="col-start-2 row-start-2 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
