import React from 'react';
import { Input } from '../../shared/Input';
import { FormField } from '../../shared/FormField';
import { DatePicker } from '../../shared/DatePicker';
import type { RegistrationFormData } from '../../../types';

interface PersonalInfoStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField label="First Name" required>
          <Input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            placeholder="Enter your first name"
          />
        </FormField>

        <FormField label="Last Name" required>
          <Input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            placeholder="Enter your last name"
          />
        </FormField>
      </div>

      <FormField label="Date of Birth" required>
        <DatePicker
          value={formData.dateOfBirth}
          onChange={(date) => updateFormData({ dateOfBirth: date })}
          max={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      <FormField label="Address" required>
        <Input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          placeholder="Enter your full address"
        />
      </FormField>
    </div>
  );
}