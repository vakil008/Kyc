import React from 'react';
import { 
  FileCheck, 
  Clock, 
  Building, 
  ShieldCheck 
} from 'lucide-react';
import { StatCard } from './stats/StatCard';

const stats = [
  {
    icon: FileCheck,
    label: 'Verified Documents',
    value: '2/3',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Clock,
    label: 'Pending Requests',
    value: '1',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Building,
    label: 'Connected Organizations',
    value: '3',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: ShieldCheck,
    label: 'Security Score',
    value: '85%',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}