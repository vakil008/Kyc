import { useState } from 'react';
import type { RegistrationFormData } from '../types';

const initialFormData: RegistrationFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: '',
  email: '',
  phoneNumber: '',
  walletAddress: '',
  documents: [],
};

export function useRegistration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const updateFormData = (data: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.dateOfBirth &&
          formData.address
        );
      case 1: // Contact Info
        return !!(
          formData.email &&
          formData.phoneNumber &&
          formData.email.includes('@') // Basic email validation
        );
      case 2: // Wallet Connection
        return !!formData.walletAddress;
      case 3: // Document Verification
        return formData.documents.length > 0;
      default:
        return false;
    }
  };

  const goToNextStep = () => {
    if (currentStep < 3 && validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      try {
        // Simulate API call to submit registration data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Update registration completion status
        setIsRegistrationComplete(true);
        
        // Store registration data in localStorage for persistence
        localStorage.setItem('kycRegistration', JSON.stringify({
          ...formData,
          completedAt: new Date().toISOString(),
        }));
        
        return true;
      } catch (error) {
        console.error('Error submitting form:', error);
        return false;
      }
    }
    return false;
  };

  return {
    currentStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === 3,
    canProceed: validateCurrentStep(),
    goToNextStep,
    goToPreviousStep,
    formData,
    updateFormData,
    handleSubmit,
    isRegistrationComplete,
  };
}