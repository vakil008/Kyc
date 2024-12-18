export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  email: string;
  phoneNumber: string;
  walletAddress: string;
  documents: Document[];
  selfie?: Selfie;
}

export interface Document {
  id: string;
  type: 'passport' | 'driverLicense' | 'nationalId';
  status: 'pending' | 'verified' | 'rejected';
  hash: string;
  uploadedAt: string;
  name?: string;
  date?: string;
  icon?: any; // For dashboard display purposes
}

export interface Selfie {
  id: string;
  imageUrl: string;
  hash: string;
  status: 'pending' | 'verified' | 'rejected';
  capturedAt: string;
}

export interface FileWithPreview {
  file: File;
  preview: string;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export interface KYCRequest {
  id: string;
  userId: string;
  organizationId: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedData: string[];
  createdAt: string;
  expiresAt: string;
}

export interface Activity {
  type: 'verification' | 'organization' | 'document';
  title: string;
  description?: string;
  time: string;
  icon: any; // Lucide icon component type
  color: string;
}