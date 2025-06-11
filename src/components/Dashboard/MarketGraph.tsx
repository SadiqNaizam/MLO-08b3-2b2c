import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';

interface MarketGraphProps {
  className?: string;
}

const generateRandomData = (numPoints: number, min: number, max: number) => {
  return Array.from({ length: numPoints }, (_, i) => ({
    time: i.toString(), // Simplified time axis
    price: Math.floor(Math.random() * (max - min + 1) + min),
  }));
};

const marketChartData: { [key: string]: { time: string; price: number }[] } = {
  '1H': generateRandomData(12, 6580, 6680), // 12 points for 1 hour (e.g. 5 min intervals)
  '7D': generateRandomData(28, 6400, 6800), // 28 points for 7 days (e.g. 4 points per day)
  '1M': generateRandomData(30, 6200, 7000), // 30 points for 1 month
  '1Y': generateRandomData(24, 5000, 8000), // 24 points for 1 year (e.g. 2 points per month)
  'ALL': generateRandomData(50, 4000, 9000), // 50 points for all time
};

const MarketGraph: React.FC<MarketGraphProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('1M');
  const currentData = marketChartData[activeTab];

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">Market Graph</CardTitle>
            <div className="mt-1 text-xs text-muted-foreground">
              <span className="text-2xl font-bold text-foreground mr-2">0.014756</span>
              <span className="mr-2">$75.69</span>
              <span className="text-success mr-2">+1.99%</span>
              <span className="mr-1">High <span className="text-foreground">0.014578</span></span>
              <span>Low <span className="text-foreground">0.0175489</span></span>
            </div>
          </div>
          <Tabs defaultValue="1M" className="w-auto" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 h-8 text-xs">
              {['1H', '7D', '1M', '1Y', 'ALL'].map(tab => (
                <TabsTrigger key={tab} value={tab} className="h-6 px-2 text-xs">{tab}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col pt-2">
        <div className="w-full flex-grow min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="time" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value, index) => {
                  // Example formatter: show fewer ticks based on data length
                  if (currentData.length > 20 && index % Math.floor(currentData.length / 10) !== 0) return '';
                  return value;
                }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
                domain={['dataMin - 50', 'dataMax + 50']}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-md)'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--primary))' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
              />
              <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 2, fill: 'hsl(var(--primary))' }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around items-center pt-4 mt-auto border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Total Balance</p>
            <p className="text-lg font-semibold text-foreground">$72.8k</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Profit</p>
            <p className="text-lg font-semibold text-success">+$49.7k</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Loss</p>
            <p className="text-lg font-semibold text-destructive">-$23.1k</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketGraph;
