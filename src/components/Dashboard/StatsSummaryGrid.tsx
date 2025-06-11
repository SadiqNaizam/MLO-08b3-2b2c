import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, percentage, isPositive, icon: Icon, iconBgColor, iconColor }) => {
  return (
    <Card>
      <CardContent className="p-4 flex items-center space-x-4">
        <div className={cn("p-3 rounded-full", iconBgColor)}>
          <Icon size={24} className={iconColor} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-xl font-semibold text-foreground">{value}</p>
        </div>
        <div className={cn(
          "ml-auto px-2 py-1 text-xs rounded-md flex items-center",
          isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
        )}>
          {isPositive ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
          {percentage}
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsSummaryGridProps {
  className?: string;
}

const statsData: StatsCardProps[] = [
  {
    title: 'Total Invested',
    value: '$2,390.68',
    percentage: '6.24%',
    isPositive: true,
    icon: DollarSign,
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    title: 'Total Change',
    value: '$19,523.25',
    percentage: '3.67%',
    isPositive: true,
    icon: TrendingUp,
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    title: 'Day Change',
    value: '$14,799.44',
    percentage: '4.80%',
    isPositive: false,
    icon: TrendingDown,
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    title: 'Market Cap',
    value: '$1.2T',
    percentage: '1.50%',
    isPositive: true,
    icon: HelpCircle, // Placeholder icon for a 4th card
    iconBgColor: 'bg-secondary/10',
    iconColor: 'text-secondary'
  },
];

const StatsSummaryGrid: React.FC<StatsSummaryGridProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {statsData.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          percentage={stat.percentage}
          isPositive={stat.isPositive}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default StatsSummaryGrid;
