import { useState, useCallback } from 'react';
import { analyzeContract } from '../services/api';

const ALLOWED_TYPES = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'text/plain': 'TXT',
};

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * useFileUpload — manages file selection, drag-and-drop, and the upload lifecycle.
 *
 * @param {{ onSuccess: Function, onError: Function }} callbacks
 */
export function useFileUpload({ onSuccess, onError } = {}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ── File validation ──────────────────────────────────────────────────────
  const validateFile = useCallback((f) => {
    if (!f) return 'No file selected.';
    if (!ALLOWED_TYPES[f.type]) {
      return `Unsupported file type (.${f.name.split('.').pop()}). Please upload a PDF, DOCX, or TXT file.`;
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File is too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 10 MB.`;
    }
    return null;
  }, []);

  const selectFile = useCallback(
    (f) => {
      const validationError = validateFile(f);
      if (validationError) {
        onError?.(validationError);
        return false;
      }
      setFile(f);
      setUploadProgress(0);
      return true;
    },
    [validateFile, onError]
  );

  const clearFile = useCallback(() => {
    setFile(null);
    setUploadProgress(0);
  }, []);

  // ── Drag & Drop handlers ─────────────────────────────────────────────────
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging false if leaving the drop zone itself (not a child)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) selectFile(dropped);
    },
    [selectFile]
  );

  // ── Upload ───────────────────────────────────────────────────────────────
  const upload = useCallback(async () => {
    if (!file) {
      onError?.('Please select a contract file first.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await analyzeContract(file, (progress) => {
        setUploadProgress(progress);
      });
      onSuccess?.(result);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Analysis failed. Please check your connection and try again.';
      onError?.(message);
    } finally {
      setIsUploading(false);
    }
  }, [file, onSuccess, onError]);

  return {
    file,
    isDragging,
    isUploading,
    uploadProgress,
    selectFile,
    clearFile,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    upload,
    allowedTypes: ALLOWED_TYPES,
  };
}
