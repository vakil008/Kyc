import React from 'react';
import { Input } from '../../shared/Input';
import { FormField } from '../../shared/FormField';
import type { RegistrationFormData } from '../../../types';

interface ContactInfoStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export function ContactInfoStep({ formData, updateFormData }: ContactInfoStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        label="Email Address"
        required
        hint="We'll send a verification code to this email"
      >
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Enter your email address"
        />
      </FormField>

      <FormField
        label="Phone Number"
        required
        hint="Used for two-factor authentication"
      >
        <Input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
          placeholder="Enter your phone number"
        />
      </FormField>
    </div>
  );
}