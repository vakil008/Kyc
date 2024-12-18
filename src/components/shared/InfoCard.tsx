import React from 'react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-emerald-500/10 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <p className="mt-2 text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}