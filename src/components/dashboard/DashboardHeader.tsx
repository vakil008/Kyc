import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '../shared/Button';

export function DashboardHeader() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}