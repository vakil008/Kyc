import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <div>
      <input
        className={`
          w-full px-4 py-2 bg-gray-700 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-emerald-500
          text-white placeholder-gray-400
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}