import React, { useState, useCallback } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { Button } from '../../shared/Button';
import { RequirementsList } from '../../shared/RequirementsList';
import { WebcamCapture } from '../../shared/WebcamCapture';
import type { Selfie } from '../../../types';
import { generateDocumentHash } from '../../../utils/cryptoUtils';

interface SelfieSectionProps {
  selfie?: Selfie;
  onSelfieUpdate: (selfie: Selfie) => void;
}

export function SelfieSection({ selfie, onSelfieUpdate }: SelfieSectionProps) {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = useCallback(async (imageBlobUrl: string) => {
    try {
      const response = await fetch(imageBlobUrl);
      const blob = await response.blob();
      const hash = await generateDocumentHash(blob);

      const newSelfie: Selfie = {
        id: `selfie-${Date.now()}`,
        imageUrl: imageBlobUrl,
        hash,
        status: 'pending',
        capturedAt: new Date().toISOString(),
      };

      onSelfieUpdate(newSelfie);
      setIsCapturing(false);
    } catch (error) {
      console.error('Error processing selfie:', error);
    }
  }, [onSelfieUpdate]);

  const requirements = [
    'Ensure good lighting',
    'Look directly at the camera',
    'Remove glasses and face coverings',
    'Use a neutral expression',
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Selfie Verification</h3>

      {!isCapturing && !selfie && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-gray-700 rounded-full">
              <Camera className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-lg font-medium text-white">Take a Selfie</h4>
              <p className="text-sm text-gray-400">
                We'll use this to verify your identity
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsCapturing(true)}
              icon={<Camera className="w-4 h-4" />}
              className="w-full"
            >
              Start Camera
            </Button>
          </div>
        </div>
      )}

      {isCapturing && (
        <WebcamCapture
          onCapture={handleCapture}
          onCancel={() => setIsCapturing(false)}
        />
      )}

      {selfie && (
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
          <img
            src={selfie.imageUrl}
            alt="Captured selfie"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => setIsCapturing(true)}
            >
              Retake
            </Button>
          </div>
        </div>
      )}

      <RequirementsList
        icon={<AlertCircle className="h-5 w-5 text-blue-500" />}
        title="Selfie requirements:"
        items={requirements}
        className="bg-blue-500/10"
      />
    </div>
  );
}