import React, { useState } from 'react';
import { useRegistration } from '../../hooks/useRegistration';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { ContactInfoStep } from './steps/ContactInfoStep';
import { WalletConnectionStep } from './steps/WalletConnectionStep';
import { DocumentVerificationStep } from './steps/DocumentVerificationStep';
import { ProgressIndicator } from '../shared/ProgressIndicator';
import { Button } from '../shared/Button';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';

export function RegistrationForm() {
  const {
    currentStep,
    isFirstStep,
    isLastStep,
    canProceed,
    goToNextStep,
    goToPreviousStep,
    formData,
    updateFormData,
    handleSubmit,
  } = useRegistration();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      title: 'Personal Information',
      component: PersonalInfoStep,
    },
    {
      title: 'Contact Details',
      component: ContactInfoStep,
    },
    {
      title: 'Wallet Connection',
      component: WalletConnectionStep,
    },
    {
      title: 'Document Verification',
      component: DocumentVerificationStep,
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleFormSubmit = async () => {
    if (isLastStep && canProceed) {
      setIsSubmitting(true);
      try {
        const success = await handleSubmit();
        if (!success) {
          throw new Error('Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        // Handle error (show error message to user)
      } finally {
        setIsSubmitting(false);
      }
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg border border-gray-700 p-8">
      <ProgressIndicator
        steps={steps.map(step => step.title)}
        currentStep={currentStep}
      />
      
      <div className="mt-8">
        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>

      <div className="mt-8 flex justify-between">
        {!isFirstStep && (
          <Button
            variant="secondary"
            onClick={goToPreviousStep}
            disabled={isSubmitting}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>
        )}
        
        <div className="ml-auto">
          <Button
            variant="primary"
            onClick={handleFormSubmit}
            disabled={!canProceed || isSubmitting}
            icon={isSubmitting ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : isLastStep ? undefined : (
              <ChevronRight className="w-4 h-4" />
            )}
          >
            {isSubmitting
              ? 'Processing...'
              : isLastStep
              ? 'Complete Registration'
              : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}