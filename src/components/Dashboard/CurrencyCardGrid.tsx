import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, CircleDollarSign, MoreHorizontal } from 'lucide-react'; // Bitcoin, generic, more options
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CurrencyData {
  id: string;
  name: string;
  symbol: string;
  icon: React.ElementType;
  iconColor: string;
  value: string;
  change: string;
  isPositive: boolean;
  chartData: { value: number }[];
}

const generateMiniChartData = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, () => ({ value: Math.random() * (max - min) + min }));
};

const currenciesData: CurrencyData[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: Bitcoin,
    iconColor: 'text-yellow-500',
    value: '$1,523,647',
    change: '+13.11%',
    isPositive: true,
    chartData: generateMiniChartData(15, 100, 200),
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    icon: CircleDollarSign, // Generic icon
    iconColor: 'text-gray-400',
    value: '$2,145,687',
    change: '+15.08%',
    isPositive: true,
    chartData: generateMiniChartData(15, 120, 180),
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: CircleDollarSign, // Generic icon
    iconColor: 'text-indigo-500',
    value: '$3,312,870',
    change: '+08.57%',
    isPositive: true,
    chartData: generateMiniChartData(15, 150, 250),
  },
  {
    id: 'binance',
    name: 'Binance Coin',
    symbol: 'BNB',
    icon: CircleDollarSign, // Generic icon
    iconColor: 'text-yellow-400',
    value: '$1,820,045',
    change: '-09.21%',
    isPositive: false,
    chartData: generateMiniChartData(15, 90, 160),
  },
];

interface CurrencyCardProps extends CurrencyData {}

const CurrencyCard: React.FC<CurrencyCardProps> = (props) => {
  const { name, symbol, icon: Icon, iconColor, value, change, isPositive, chartData } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Icon size={24} className={iconColor} />
          <CardTitle className="text-md font-medium">{name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Trade</DropdownMenuItem>
            <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs mt-1">
          <span className={cn(isPositive ? 'text-success' : 'text-destructive', 'mr-1')}>{change}</span>
          <span className="text-muted-foreground">({symbol})</span>
        </div>
        <div className="h-16 mt-4 -mx-2"> {/* Negative margin to make chart touch card edges */} 
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Tooltip
                contentStyle={{ display: 'none' }} // Hide default tooltip, not needed for mini chart
                wrapperStyle={{ display: 'none' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

interface CurrencyCardGridProps {
  className?: string;
}

const CurrencyCardGrid: React.FC<CurrencyCardGridProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6", className)}>
      {currenciesData.map((currency) => (
        <CurrencyCard key={currency.id} {...currency} />
      ))}
    </div>
  );
};

export default CurrencyCardGrid;
