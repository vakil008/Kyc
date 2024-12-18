import React from 'react';
import { File, CheckCircle, Clock } from 'lucide-react';
import { DocumentItem } from './documents/DocumentItem';
import type { Document } from '../../../types';

const documents: Document[] = [
  {
    name: 'Passport.pdf',
    status: 'verified',
    date: '2024-02-20',
    icon: File,
  },
  {
    name: 'DriversLicense.jpg',
    status: 'verified',
    date: '2024-02-19',
    icon: File,
  },
  {
    name: 'ProofOfAddress.pdf',
    status: 'pending',
    date: '2024-02-18',
    icon: File,
  },
];

export function DocumentsList() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Uploaded Documents</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {documents.map((doc) => (
          <DocumentItem key={doc.name} document={doc} />
        ))}
      </div>
    </div>
  );
}