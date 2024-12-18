import React from 'react';
import type { Activity } from '../../../../types';

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = activity.icon;
  
  return (
    <div className="p-4">
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${activity.color}`} />
        <div>
          <p className="text-sm font-medium text-white">
            {activity.title}
          </p>
          {activity.description && (
            <p className="text-xs text-gray-400 mt-0.5">
              {activity.description}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
        </div>
      </div>
    </div>
  );
}