import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required,
  hint,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block">
        <span className="text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
      {children}
      {hint && !error && (
        <p className="text-sm text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}