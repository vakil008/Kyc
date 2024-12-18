import React, { useCallback, useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { formatFileSize, validateFile } from '../../utils/fileUtils';
import type { FileWithPreview } from '../../types';

interface DocumentUploadProps {
  onFileSelect?: (files: FileWithPreview[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
}

export function DocumentUpload({
  onFileSelect,
  maxFiles = 3,
  maxFileSize = 10 * 1024 * 1024, // 10MB
}: DocumentUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    setError('');
    const newFiles: FileWithPreview[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const validationError = validateFile(file, maxFileSize);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (files.length + newFiles.length >= maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const preview = URL.createObjectURL(file);
      newFiles.push({
        file,
        preview,
        id: `${file.name}-${Date.now()}`,
        status: 'pending',
        progress: 0,
      });
    });

    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFileSelect?.(updatedFiles);
    }
  }, [files, maxFiles, maxFileSize, onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const removeFile = useCallback((fileId: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((f) => f.id !== fileId);
      onFileSelect?.(updatedFiles);
      return updatedFiles;
    });
  }, [onFileSelect]);

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6
          ${isDragging ? 'border-emerald-500 bg-emerald-500/5' : 'border-gray-600'}
          ${error ? 'border-red-500' : ''}
          transition-colors duration-200
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFileSelect(e.target.files)}
          accept=".pdf,.jpg,.jpeg,.png"
          multiple={maxFiles > 1}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-gray-700 rounded-full">
            <Upload className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-white">Upload Documents</h3>
            <p className="text-sm text-gray-400 mt-1">
              Drag and drop your documents or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: PDF, JPG, PNG (max {formatFileSize(maxFileSize)})
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-start space-x-2 text-red-500 text-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700 rounded">
                  <File className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(file.file.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {file.status === 'pending' && (
                  <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
                <Button
                  variant="secondary"
                  className="p-1"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}