import React from 'react';

interface RequirementsListProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  className?: string;
}

export function RequirementsList({
  icon,
  title,
  items,
  className = '',
}: RequirementsListProps) {
  return (
    <div className={`flex items-start space-x-3 p-4 rounded-lg ${className}`}>
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      <div className="space-y-2">
        <p className="text-sm text-blue-200">{title}</p>
        <ul className="text-sm text-blue-200 list-disc list-inside">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}