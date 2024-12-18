import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {index > 0 && (
            <div
              className={`h-0.5 w-12 mx-2 ${
                index <= currentStep ? 'bg-emerald-500' : 'bg-gray-600'
              }`}
            />
          )}
          <div className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${
                  index < currentStep
                    ? 'bg-emerald-500'
                    : index === currentStep
                    ? 'bg-emerald-500/20 border-2 border-emerald-500'
                    : 'bg-gray-600'
                }
              `}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className="text-sm text-white">{index + 1}</span>
              )}
            </div>
            <span className="mt-2 text-xs text-gray-400">{step}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}