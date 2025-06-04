import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, Plus } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs,
  actions,
  className
}) => {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center md:justify-between mb-6', className)}>
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1 md:mb-0">{title}</h1>
        <nav aria-label="breadcrumb">
          <ol className="flex items-center space-x-1.5 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-primary transition-colors ml-1.5">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="ml-1.5">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {actions && <div className="mt-4 md:mt-0 flex items-center gap-2">{actions}</div>}
    </div>
  );
};

// Example Usage (can be removed or adapted in the actual page component)
export const ExamplePageHeader: React.FC = () => {
  const breadcrumbsData: BreadcrumbItem[] = [
    { label: 'Dashboards', href: '/dashboards' },
    { label: 'CRM' },
  ];

  const pageActions = (
    <>
      <Button variant="outline">Filters</Button>
      <Button variant="default">
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </>
  );

  return <PageHeader title="CRM" breadcrumbs={breadcrumbsData} actions={pageActions} />;
};

export default PageHeader;
