import { useState } from 'react';
import { FiShield, FiInfo, FiAlertTriangle } from 'react-icons/fi';
import FileUpload from '../components/FileUpload';
import AnalysisDashboard from '../components/AnalysisDashboard';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import { ToastContainer } from '../components/Toast';
import { useFileUpload } from '../hooks/useFileUpload';
import { useToast } from '../hooks/useToast';

// ── Sub-components ────────────────────────────────────────────────────────────

function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-5 px-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-slate-700/20 blur-xl scale-150" />
        <div className="relative p-6 rounded-3xl bg-slate-800/60 border border-slate-700/50">
          <FiShield size={36} className="text-slate-700" />
        </div>
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-500 mb-2">No Analysis Yet</h3>
        <p className="text-sm text-slate-700 max-w-xs leading-relaxed">
          Upload a contract file on the left and click{' '}
          <span className="text-slate-500 font-semibold">Analyze Contract</span> to see
          your risk dashboard here.
        </p>
      </div>
      <div className="flex gap-2 text-[10px] text-slate-700">
        {['PDF', 'DOCX', 'TXT'].map((f) => (
          <span key={f} className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50 font-mono">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, onDismiss }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-4 px-8 animate-fade-in">
      <div className="p-5 rounded-3xl bg-red-500/8 border border-red-500/20">
        <FiAlertTriangle size={32} className="text-red-400" />
      </div>
      <div>
        <h3 className="text-base font-bold text-red-400 mb-2">Analysis Failed</h3>
        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="px-5 py-2 rounded-xl text-sm text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-slate-300 transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// ── Main page component ────────────────────────────────────────────────────────

/**
 * AnalyzePage — two-column contract upload + analysis dashboard.
 *
 * Left (2/5):  FileUpload card (sticky on desktop)
 * Right (3/5): Analysis dashboard or skeleton or empty state
 */
function AnalyzePage() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const handleSuccess = (data) => {
    setAnalysisData(data);
    setAnalysisError(null);
    setIsAnalyzing(false);
    addToast('Contract analyzed successfully!', 'success');
  };

  const handleError = (message) => {
    setIsAnalyzing(false);
    setAnalysisError(message);
    addToast(message, 'error', 6000);
  };

  const {
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
  } = useFileUpload({ onSuccess: handleSuccess, onError: handleError });

  const handleUpload = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    addToast('Uploading and analyzing your contract…', 'info', 3000);
    await upload();
  };

  const handleClearAll = () => {
    clearFile();
    setAnalysisData(null);
    setAnalysisError(null);
  };

  const showSkeleton = isAnalyzing || isUploading;

  return (
    <div className="min-h-screen bg-[#070b14]">

      {/* ── Page header ── */}
      <div className="border-b border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <FiShield size={18} className="text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-100">Contract Analyzer</h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Upload your contract to receive an AI-powered risk analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* ── LEFT: Upload panel (2 cols) ── */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Upload card */}
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 backdrop-blur-sm p-5">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Upload Contract
                  </h2>
                </div>
                <FileUpload
                  file={file}
                  isDragging={isDragging}
                  isUploading={showSkeleton}
                  uploadProgress={uploadProgress}
                  onSelectFile={selectFile}
                  onClearFile={handleClearAll}
                  onUpload={handleUpload}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              </div>

              {/* Privacy notice */}
              <div className="p-3.5 rounded-xl border border-slate-800/50 bg-slate-900/30 flex items-start gap-2.5">
                <FiInfo size={13} className="text-slate-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Files are processed in memory and never stored permanently.
                  The analysis engine is designed for future AI integration — swap
                  the service with an LLM call in{' '}
                  <code className="text-slate-600 font-mono">analysis.service.js</code>.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Dashboard panel (3 cols) ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 backdrop-blur-sm p-5 min-h-[600px] flex flex-col">

              {/* Panel header */}
              <div className="flex items-center justify-between mb-5 shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${analysisData ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Analysis Dashboard
                  </h2>
                </div>
                {analysisData && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                    ✓ Complete
                  </span>
                )}
              </div>

              {/* Panel content */}
              <div className="flex-1">
                {showSkeleton ? (
                  <DashboardSkeleton />
                ) : analysisError ? (
                  <ErrorState
                    message={analysisError}
                    onDismiss={() => setAnalysisError(null)}
                  />
                ) : analysisData ? (
                  <AnalysisDashboard data={analysisData} />
                ) : (
                  <EmptyDashboard />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toast notifications ── */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default AnalyzePage;
