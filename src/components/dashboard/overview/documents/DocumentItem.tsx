import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import type { Document } from '../../../../types';

interface DocumentItemProps {
  document: Document;
}

export function DocumentItem({ document }: DocumentItemProps) {
  const Icon = document.icon;
  
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-white">{document.name}</p>
          <p className="text-xs text-gray-400">{document.date}</p>
        </div>
      </div>
      {document.status === 'verified' ? (
        <CheckCircle className="h-5 w-5 text-emerald-500" />
      ) : (
        <Clock className="h-5 w-5 text-yellow-500" />
      )}
    </div>
  );
}