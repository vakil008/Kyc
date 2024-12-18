import React from 'react';
import { CheckCircle2, Circle, Building } from 'lucide-react';
import { ActivityItem } from './activity/ActivityItem';
import type { Activity } from '../../../types';

const activities: Activity[] = [
  {
    type: 'verification',
    title: 'Passport verification completed',
    time: '2 hours ago',
    icon: CheckCircle2,
    color: 'text-emerald-500',
  },
  {
    type: 'organization',
    title: 'New organization request',
    description: 'FinTech Corp. requested access',
    time: '5 hours ago',
    icon: Building,
    color: 'text-blue-500',
  },
  {
    type: 'document',
    title: 'Document upload pending',
    description: 'Proof of address verification',
    time: '1 day ago',
    icon: Circle,
    color: 'text-yellow-500',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}