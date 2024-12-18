import React from 'react';
import { DashboardLayout } from '../DashboardLayout';
import { VerificationStatus } from '../../VerificationStatus';
import { StatsGrid } from './StatsGrid';
import { RecentActivity } from './RecentActivity';
import { DocumentsList } from './DocumentsList';

export function OverviewDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, John!</h1>
            <p className="text-gray-400">Here's what's happening with your KYC status</p>
          </div>
          <VerificationStatus status="pending" />
        </div>

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentsList />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}