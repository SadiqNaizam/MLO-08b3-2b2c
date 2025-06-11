import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Bitcoin, CircleDollarSign } from 'lucide-react'; // Using CircleDollarSign as a generic crypto icon

interface PortfolioSummaryProps {
  className?: string;
}

const portfolioData = [
  { name: 'Bitcoin', value: 40000, symbol: 'BTC', cryptoValue: '0.00584875', usdValue: '19,405.12', color: 'hsl(var(--primary))' }, // #5F78E9 (PRD accent)
  { name: 'Ethereum', value: 30000, symbol: 'ETH', cryptoValue: '2.25842108', usdValue: '40,552.18', color: 'hsl(var(--secondary))' }, // #57BE89 (PRD success)
  { name: 'Litecoin', value: 20000, symbol: 'LTC', cryptoValue: '10.58963217', usdValue: '15,824.58', color: 'hsl(var(--accent-foreground))' }, // #5F78E9 (PRD accent, lighter if needed, or a new color)
  { name: 'Dash', value: 16416, symbol: 'DASH', cryptoValue: '204.28565885', usdValue: '30,635.84', color: 'hsl(var(--muted-foreground))' }, // #6C757D (PRD secondaryText)
];

const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ className }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string>('btc');

  const renderCustomizedLabel = ({ cx, cy }: { cx: number; cy: number }) => {
    return (
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="hsl(var(--card-foreground))" className="text-center">
        <tspan x={cx} dy="-0.5em" className="text-xs text-muted-foreground">Total value</tspan>
        <tspan x={cx} dy="1.2em" className="text-2xl font-semibold">${totalValue.toLocaleString()}</tspan>
      </text>
    );
  };

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">My Portfolio</CardTitle>
        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-[80px] h-8">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="btc">BTC</SelectItem>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eth">ETH</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col pt-4">
        <div className="w-full h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={70}
                fill="#8884d8"
                dataKey="value"
                stroke="hsl(var(--card))"
                strokeWidth={3}
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* @ts-ignore Recharts custom label type issue */}
              <Pie data={[{value: 1}]} cx="50%" cy="50%" outerRadius={70} innerRadius={70} label={renderCustomizedLabel} isAnimationActive={false} />
              <Tooltip formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3 flex-grow overflow-y-auto">
          {portfolioData.map((asset) => (
            <div key={asset.symbol} className="flex items-center">
              <div className="p-2 rounded-full mr-3" style={{ backgroundColor: asset.color + '20' }}> {/* Icon bg with opacity */}
                {asset.symbol === 'BTC' ? <Bitcoin size={20} style={{ color: asset.color }} /> : <CircleDollarSign size={20} style={{ color: asset.color }} />}
              </div>
              <div className="flex-grow">
                <p className="font-medium text-sm text-foreground">{asset.name}</p>
                <p className="text-xs text-muted-foreground">{asset.symbol}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm text-foreground">{asset.symbol} {asset.cryptoValue}</p>
                <p className="text-xs text-muted-foreground">${asset.usdValue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
