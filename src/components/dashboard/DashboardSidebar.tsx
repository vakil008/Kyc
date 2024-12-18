import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings, 
  Shield,
  Users
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: FileText, label: 'Documents', count: 3 },
  { icon: Users, label: 'Organizations' },
  { icon: History, label: 'History' },
  { icon: Shield, label: 'Security' },
  { icon: Settings, label: 'Settings' },
];

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700">
      <nav className="p-4 space-y-2">
        {menuItems.map(({ icon: Icon, label, active, count }) => (
          <button
            key={label}
            className={`
              w-full flex items-center space-x-3 px-3 py-2 rounded-lg
              ${active 
                ? 'bg-emerald-500 text-white' 
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }
              transition-colors duration-200
            `}
          >
            <Icon className="h-5 w-5" />
            <span className="flex-1 text-sm font-medium">{label}</span>
            {count && (
              <span className="bg-gray-700 text-white px-2 py-0.5 rounded-full text-xs">
                {count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}