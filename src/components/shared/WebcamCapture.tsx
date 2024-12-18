import React, { useRef, useCallback, useState } from 'react';
import { Camera, X, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface WebcamCaptureProps {
  onCapture: (imageBlobUrl: string) => void;
  onCancel: () => void;
}

export function WebcamCapture({ onCapture, onCancel }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
      console.error('Error accessing camera:', err);
    }
  }, []);

  React.useEffect(() => {
    startCamera();
    return () => {
      // Cleanup: stop all tracks when component unmounts
      if (videoRef.current?.srcObject instanceof MediaStream) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const capture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Convert to blob URL
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            onCapture(url);
          }
        }, 'image/jpeg', 0.8);
      }
    }
  }, [onCapture]);

  const handleCancel = useCallback(() => {
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    onCancel();
  }, [onCancel]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      {error ? (
        <div className="p-4 bg-red-500/10 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-500">{error}</p>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="mt-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
            <Button
              variant="secondary"
              onClick={handleCancel}
              icon={<X className="w-4 h-4" />}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={capture}
              icon={<Camera className="w-4 h-4" />}
            >
              Capture
            </Button>
          </div>
        </>
      )}
    </div>
  );
}