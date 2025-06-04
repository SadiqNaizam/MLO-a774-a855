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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  representative: {
    name: string;
    avatarUrl?: string;
    fallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation' | 'Proposal Sent';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    representative: { name: 'Donald Risher', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg', fallback: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    representative: { name: 'Sofia Cunha', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg', fallback: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    representative: { name: 'Luis Rocha', avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg', fallback: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    representative: { name: 'Vitoria Rodrigues', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg', fallback: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Innovate Solutions',
    lastContacted: 'Oct 02, 2021',
    representative: { name: 'Ken Alvares', avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg', fallback: 'KA' },
    status: 'Negotiation' as const,
    dealValue: '$220.5K',
  },
   {
    id: '6',
    name: 'TechPro Inc.',
    lastContacted: 'Oct 05, 2021',
    representative: { name: 'Jessica Miller', avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg', fallback: 'JM' },
    status: 'Proposal Sent' as const,
    dealValue: '$95K',
  },
];

const getStatusBadgeVariant = (status: Deal['status']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Deal Won':
      return 'default'; // Using default as success, can be styled with className
    case 'Intro Call':
      return 'secondary';
    case 'Stuck':
      return 'destructive';
    case 'Negotiation':
      return 'outline';
    case 'Proposal Sent':
      return 'outline'; // Using outline for proposal, can be styled with className
    default:
      return 'secondary';
  }
};

const getStatusBadgeClassName = (status: Deal['status']): string => {
    switch (status) {
      case 'Deal Won':
        return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
      case 'Intro Call':
        return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200';
      case 'Stuck':
        return 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200';
      case 'Negotiation':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200';
      case 'Proposal Sent':
        return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200';
      default:
        return '';
    }
  };

interface DataTableProps {
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="text-lg font-semibold">Deals Status</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Track your sales pipeline progress.</CardDescription>
        </div>
        <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="02 Nov 2021 to 31 Dec 2021" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Nov 02 - Dec 31, 2021</SelectItem>
              <SelectItem value="quarterly">Last Quarter</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
            </SelectContent>
          </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={deal.representative.avatarUrl} alt={deal.representative.name} />
                      <AvatarFallback>{deal.representative.fallback}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.representative.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(deal.status)} className={cn('capitalize', getStatusBadgeClassName(deal.status))}>
                    {deal.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;
