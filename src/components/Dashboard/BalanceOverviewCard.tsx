import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const balanceData = [
  { name: 'Jan', Revenue: 12000, Expenses: 8000 },
  { name: 'Feb', Revenue: 18000, Expenses: 10000 },
  { name: 'Mar', Revenue: 15000, Expenses: 16000 }, // Expenses higher
  { name: 'Apr', Revenue: 25000, Expenses: 12000 },
  { name: 'May', Revenue: 22000, Expenses: 18000 },
  { name: 'Jun', Revenue: 30000, Expenses: 20000 },
  { name: 'Jul', Revenue: 28000, Expenses: 25000 },
  { name: 'Aug', Revenue: 35000, Expenses: 22000 }, // Revenue peak
  { name: 'Sep', Revenue: 32000, Expenses: 28000 },
  { name: 'Oct', Revenue: 40000, Expenses: 30000 },
  { name: 'Nov', Revenue: 38000, Expenses: 35000 },
  { name: 'Dec', Revenue: 45000, Expenses: 32000 }, 
];

interface BalanceOverviewCardProps {
  className?: string;
}

const BalanceOverviewCard: React.FC<BalanceOverviewCardProps> = ({ className }) => {
  const totalRevenue = balanceData.reduce((acc, item) => acc + item.Revenue, 0);
  const totalExpenses = balanceData.reduce((acc, item) => acc + item.Expenses, 0);
  const profitRatio = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : (totalRevenue > 0 ? 100 : 0);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Balance Overview</CardTitle>
          <Select defaultValue="current-year">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-year">Current Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4 text-sm pt-2">
            <div>
                <span className="text-xl font-bold text-primary">${(totalRevenue/1000).toFixed(0)}k</span>
                <span className="text-xs text-muted-foreground ml-1">Revenue</span>
            </div>
            <div>
                <span className="text-xl font-bold text-destructive">${(totalExpenses/1000).toFixed(0)}k</span>
                <span className="text-xs text-muted-foreground ml-1">Expenses</span>
            </div>
            <div>
                <span className="text-xl font-bold text-green-500">{profitRatio.toFixed(1)}%</span>
                <span className="text-xs text-muted-foreground ml-1">Profit Ratio</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] pt-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={{stroke: 'hsl(var(--border))'}} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                formatter={(value: number, name: string) => [`$${(value/1000).toFixed(1)}k`, name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent-secondary, #48C774)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-accent-secondary, #48C774)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-destructive, #EF4444)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-destructive, #EF4444)" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey="Revenue" stroke="var(--color-accent-secondary, #48C774)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} dot={{r:3}} activeDot={{r:5}} />
            <Area type="monotone" dataKey="Expenses" stroke="var(--color-destructive, #EF4444)" fillOpacity={1} fill="url(#colorExpenses)" strokeWidth={2} dot={{r:3}} activeDot={{r:5}}/>
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BalanceOverviewCard;
