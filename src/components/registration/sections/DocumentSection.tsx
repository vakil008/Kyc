import React from 'react';
import { AlertCircle } from 'lucide-react';
import { DocumentUpload } from '../../shared/DocumentUpload';
import { RequirementsList } from '../../shared/RequirementsList';
import type { Document, FileWithPreview } from '../../../types';
import { generateDocumentHash } from '../../../utils/cryptoUtils';

interface DocumentSectionProps {
  documents: Document[];
  onDocumentsUpdate: (documents: Document[]) => void;
}

export function DocumentSection({ documents, onDocumentsUpdate }: DocumentSectionProps) {
  const handleFileSelect = async (files: FileWithPreview[]) => {
    const newDocuments = await Promise.all(
      files.map(async (file) => ({
        id: file.id,
        type: 'passport' as const,
        status: 'pending' as const,
        hash: await generateDocumentHash(file.file),
        uploadedAt: new Date().toISOString(),
      }))
    );

    onDocumentsUpdate(newDocuments);
  };

  const requirements = [
    'Passport',
    'Driver\'s License',
    'National ID Card',
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Identity Documents</h3>
      
      <DocumentUpload onFileSelect={handleFileSelect} />

      <RequirementsList
        icon={<AlertCircle className="h-5 w-5 text-blue-500" />}
        title="Accepted documents:"
        items={requirements}
        className="bg-blue-500/10"
      />
    </div>
  );
}