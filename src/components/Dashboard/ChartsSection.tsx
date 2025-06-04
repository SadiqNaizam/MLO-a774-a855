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
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const salesForecastData = [
  { name: 'Jan', Goal: 4000, Pending: 2400, Revenue: 2400 },
  { name: 'Feb', Goal: 3000, Pending: 1398, Revenue: 2210 },
  { name: 'Mar', Goal: 2000, Pending: 5800, Revenue: 2290 }, // Lower Goal, high pending
  { name: 'Apr', Goal: 2780, Pending: 3908, Revenue: 2000 },
  { name: 'May', Goal: 1890, Pending: 4800, Revenue: 2181 },
  { name: 'Jun', Goal: 2390, Pending: 3800, Revenue: 2500 },
  { name: 'Jul', Goal: 3490, Pending: 1300, Revenue: 2100 }, // Dip in pending
  { name: 'Aug', Goal: 4200, Pending: 6200, Revenue: 2800 }, // Peak pending
  { name: 'Sep', Goal: 3100, Pending: 2800, Revenue: 1900 },
  { name: 'Oct', Goal: 3800, Pending: 4500, Revenue: 3200 },
  { name: 'Nov', Goal: 3700, Pending: 3200, Revenue: 3000 }, // Example value for Nov 2021
  { name: 'Dec', Goal: 4500, Pending: 5000, Revenue: 3800 }, 
];

const dealTypeData = [
  { subject: 'Software', A: 120, B: 110, fullMark: 150 },
  { subject: 'Services', A: 68, B: 130, fullMark: 150 }, // A is lower
  { subject: 'Consulting', A: 86, B: 70, fullMark: 150 }, // B is lower
  { subject: 'Hardware', A: 99, B: 100, fullMark: 150 },
  { subject: 'Training', A: 55, B: 90, fullMark: 150 }, // A is significantly lower
  { subject: 'Support', A: 110, B: 65, fullMark: 150 }, // B is significantly lower
];

interface ChartsSectionProps {
  className?: string;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {/* Sales Forecast Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Sales Forecast</CardTitle>
          <Select defaultValue="nov-2021">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nov-2021">Nov 2021</SelectItem>
              <SelectItem value="oct-2021">Oct 2021</SelectItem>
              <SelectItem value="year-2021">Year 2021</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={salesForecastData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" वर्тикаль={false} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend iconSize={10} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
              <Bar dataKey="Goal" fill="var(--color-primary, #5C84F1)" radius={[4, 4, 0, 0]} barSize={10}/>
              <Bar dataKey="Pending" fill="var(--color-accent-secondary, #48C774)" radius={[4, 4, 0, 0]} barSize={10}/>
              <Bar dataKey="Revenue" fill="var(--color-orange, #F59E0B)" radius={[4, 4, 0, 0]} barSize={10}/>
            </ReBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Deal Type Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Deal Type</CardTitle>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ReRadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" fontSize={12} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend iconSize={10} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
              <Radar name="Won" dataKey="A" stroke="var(--color-accent-secondary, #48C774)" fill="var(--color-accent-secondary, #48C774)" fillOpacity={0.6} />
              <Radar name="Pending" dataKey="B" stroke="var(--color-primary, #5C84F1)" fill="var(--color-primary, #5C84F1)" fillOpacity={0.6} />
              <Radar name="Loss" dataKey={(d) => d.fullMark - d.A - d.B < 0 ? 10 : d.fullMark - d.A - d.B} stroke="var(--color-destructive, #EF4444)" fill="var(--color-destructive, #EF4444)" fillOpacity={0.6} />
            </ReRadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
