import React from 'react';
import { Layout } from '../Layout';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <DashboardHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </Layout>
  );
}