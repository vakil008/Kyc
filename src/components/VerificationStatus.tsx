import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface VerificationStatusProps {
  status: 'pending' | 'verified' | 'rejected';
}

export function VerificationStatus({ status }: VerificationStatusProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      text: 'Pending Verification',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    verified: {
      icon: CheckCircle,
      text: 'Verified',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    rejected: {
      icon: XCircle,
      text: 'Rejected',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center px-3 py-1 rounded-full ${config.bgColor}`}>
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className={`ml-2 text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
}