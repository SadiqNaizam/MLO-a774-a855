import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import ChartsSection from '@/components/Dashboard/ChartsSection';
import BalanceOverviewCard from '@/components/Dashboard/BalanceOverviewCard';
import DataTable from '@/components/Dashboard/DataTable';
import TaskList from '@/components/Dashboard/TaskList';
import FloatingSettingsButton from '@/components/Dashboard/FloatingSettingsButton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const DashboardOverviewPage: React.FC = () => {
  const breadcrumbsData: BreadcrumbItem[] = [
    { label: 'Dashboards', href: '/dashboards' }, // Example link, adjust as per routing structure
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

  return (
    <MainAppLayout>
      <div className="space-y-6">
        <PageHeader 
          title="CRM" 
          breadcrumbs={breadcrumbsData} 
          actions={pageActions} 
        />
        
        <StatsCardGrid />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 
            Based on mockup, Sales Forecast and Deal Type are distinct cards. 
            ChartsSection component groups them. Balance Overview is a separate card.
            So, ChartsSection (2 cards) takes lg:col-span-2, BalanceOverviewCard takes lg:col-span-1 
          */}
          <ChartsSection className="lg:col-span-2" />
          <BalanceOverviewCard className="lg:col-span-1" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 
            Deals Status (DataTable) takes more width than My Tasks (TaskList)
            DataTable takes lg:col-span-2, TaskList takes lg:col-span-1
          */}
          <DataTable className="lg:col-span-2" />
          <TaskList className="lg:col-span-1" />
        </div>
      </div>
      <FloatingSettingsButton />
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
