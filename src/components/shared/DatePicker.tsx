import React from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

export function DatePicker({ value, onChange, min, max }: DatePickerProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      max={max}
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md
        focus:outline-none focus:ring-2 focus:ring-emerald-500
        text-white placeholder-gray-400"
    />
  );
}