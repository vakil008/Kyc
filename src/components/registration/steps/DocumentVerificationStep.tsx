import React from 'react';
import { FileCheck } from 'lucide-react';
import { DocumentSection } from '../sections/DocumentSection';
import { SelfieSection } from '../sections/SelfieSection';
import { InfoCard } from '../../shared/InfoCard';
import type { RegistrationFormData } from '../../../types';

interface DocumentVerificationStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export function DocumentVerificationStep({
  formData,
  updateFormData,
}: DocumentVerificationStepProps) {
  return (
    <div className="space-y-6">
      <InfoCard
        icon={<FileCheck className="h-6 w-6 text-emerald-500" />}
        title="Identity Verification"
        description="Please provide a valid government-issued ID document and a selfie for identity verification."
      />

      <DocumentSection
        documents={formData.documents}
        onDocumentsUpdate={(documents) => updateFormData({ documents })}
      />

      <SelfieSection
        selfie={formData.selfie}
        onSelfieUpdate={(selfie) => updateFormData({ selfie })}
      />
    </div>
  );
}