import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard'; // Ensure StatCard is in the same directory or update path
import {
  BellRing,
  Banknote,
  TrendingUp,
  TrendingDown,
  Heart,
  BadgeDollarSign
} from 'lucide-react';

interface StatsCardGridProps {
  className?: string;
}

const statsData: StatCardProps[] = [
  {
    title: 'Campaign Sent',
    value: '197',
    icon: BellRing,
    iconBgColor: 'bg-sky-100',
    iconColor: 'text-sky-500',
    trendValue: '+5.2%',
    trendDirection: 'up' as const,
    trendDescription: 'vs. previous month'
  },
  {
    title: 'Annual Profit',
    value: '$489.4k',
    icon: Banknote,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-500',
    trendValue: '+12.5%',
    trendDirection: 'up' as const,
    trendDescription: 'year over year'
  },
  {
    title: 'Lead Conversation',
    value: '32.89%',
    icon: TrendingUp,
    iconBgColor: 'bg-amber-100',
    iconColor: 'text-amber-500',
    trendValue: '-2.8%',
    trendDirection: 'down' as const,
    trendDescription: 'this week'
  },
  {
    title: 'Daily Average Income',
    value: '$1,596.5',
    icon: BadgeDollarSign, 
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-500',
    trendValue: '+8.0%',
    trendDirection: 'up'as const,
    trendDescription: 'compared to yesterday'
  },
  {
    title: 'Annual Deals',
    value: '2,659',
    icon: Heart,
    iconBgColor: 'bg-red-100',
    iconColor: 'text-red-500',
    trendValue: 'Target: 3000',
    trendDescription: 'for this year'
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6', className)}>
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
          trendValue={stat.trendValue}
          trendDirection={stat.trendDirection}
          trendDescription={stat.trendDescription}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
