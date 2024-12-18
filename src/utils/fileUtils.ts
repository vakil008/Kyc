export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function validateFile(file: File, maxSize: number): string | null {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  
  if (!allowedTypes.includes(file.type)) {
    return 'Invalid file type. Only PDF, JPG, and PNG files are allowed.';
  }

  if (file.size > maxSize) {
    return `File size exceeds ${formatFileSize(maxSize)} limit.`;
  }

  return null;
}