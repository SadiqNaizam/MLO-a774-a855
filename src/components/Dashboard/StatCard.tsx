import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'; // AlertCircle as a fallback

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconColor?: string;
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  trendDescription?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  trendValue,
  trendDirection,
  trendDescription,
  className
}) => {
  const TrendIcon = trendDirection === 'up' ? TrendingUp : trendDirection === 'down' ? TrendingDown : null;

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('p-2 rounded-full', iconBgColor)}>
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trendValue && (
          <div className="text-xs text-muted-foreground mt-1 flex items-center">
            {TrendIcon && (
              <TrendIcon 
                className={cn(
                  'h-3.5 w-3.5 mr-1',
                  trendDirection === 'up' ? 'text-green-500' : 'text-red-500'
                )} 
              />
            )}
            <span 
              className={cn(
                trendDirection === 'up' ? 'text-green-600' : trendDirection === 'down' ? 'text-red-600' : 'text-muted-foreground',
                'font-medium'
              )}
            >
              {trendValue}
            </span>
            {trendDescription && <span className="ml-1 hidden sm:inline">{trendDescription}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
