import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  return (
    <div className={cn("flex justify-between items-center py-4", className)}>
      <h1 className="text-2xl font-semibold text-foreground">Crypto</h1>
      <div className="flex items-center text-sm text-muted-foreground">
        <span className="hover:text-primary cursor-pointer">Dashboards</span>
        <ChevronRight size={16} className="mx-1" />
        <span className="text-foreground">Crypto</span>
      </div>
    </div>
  );
};

export default PageHeader;
