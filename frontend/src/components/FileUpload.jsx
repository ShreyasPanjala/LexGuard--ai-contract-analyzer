import { useRef } from 'react';
import { FiUploadCloud, FiX, FiFileText } from 'react-icons/fi';
import { formatFileSize, truncateFilename } from '../utils';

const FILE_EMOJI = {
  'application/pdf': '📄',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
  'text/plain': '📃',
};

/**
 * FileUpload — fully controlled, presentational upload UI.
 *
 * All state is managed externally via the useFileUpload hook.
 * This component only renders and emits events.
 */
function FileUpload({
  file,
  isDragging,
  isUploading,
  uploadProgress,
  onSelectFile,
  onClearFile,
  onUpload,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}) {
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) onSelectFile(selected);
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  return (
    <div className="space-y-3">
      {/* ── Drop Zone ── */}
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => !file && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && !file && inputRef.current?.click()}
        aria-label="Upload contract file"
        className={`
          relative rounded-2xl border-2 border-dashed
          flex flex-col items-center justify-center
          min-h-44 p-8 select-none
          transition-all duration-300 ease-out
          ${isDragging
            ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
            : file
            ? 'border-slate-600/80 bg-slate-800/50 cursor-default'
            : 'border-slate-700 bg-slate-800/30 hover:border-blue-500/60 hover:bg-slate-800/50 cursor-pointer'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
        />

        {file ? (
          /* ── File selected state ── */
          <div className="flex flex-col items-center gap-3 text-center animate-scale-in">
            <div className="text-5xl">{FILE_EMOJI[file.type] || '📎'}</div>
            <div>
              <p className="text-sm font-semibold text-slate-100 max-w-[200px] break-all leading-snug">
                {truncateFilename(file.name)}
              </p>
              <p className="text-xs text-slate-500 mt-1">{formatFileSize(file.size)}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClearFile();
              }}
              className="flex items-center gap-1.5 text-xs text-red-400/80 hover:text-red-400 transition-colors mt-1 group"
            >
              <FiX size={13} className="group-hover:rotate-90 transition-transform duration-200" />
              Remove file
            </button>
          </div>
        ) : (
          /* ── Empty / drag state ── */
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className={`p-4 rounded-2xl transition-all duration-300 ${
                isDragging ? 'bg-blue-500/15 scale-110' : 'bg-slate-700/50'
              }`}
            >
              <FiUploadCloud
                size={32}
                className={`transition-colors duration-300 ${
                  isDragging ? 'text-blue-400' : 'text-slate-500'
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">
                {isDragging ? 'Drop your contract here' : 'Drag & drop your contract'}
              </p>
              <p className="text-xs text-slate-600 mt-1">or click to browse files</p>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              {['PDF', 'DOCX', 'TXT'].map((fmt) => (
                <span
                  key={fmt}
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-700/80 text-slate-500 border border-slate-600/50"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Active drag highlight ring */}
        {isDragging && (
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 pointer-events-none animate-pulse" />
        )}
      </div>

      {/* ── Upload progress bar ── */}
      {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-1 animate-fade-in">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Uploading…</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="h-1 bg-slate-700/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Browse file button ── */}
      {!file && (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full py-2.5 rounded-xl text-sm text-slate-400 border border-slate-700/60 hover:border-slate-600 hover:text-slate-300 hover:bg-slate-700/30 transition-all duration-200"
        >
          <FiFileText size={14} className="inline mr-1.5 -mt-0.5" />
          Browse File
        </button>
      )}

      {/* ── Analyze button ── */}
      <button
        id="analyze-btn"
        onClick={onUpload}
        disabled={!file || isUploading}
        className={`
          w-full py-3.5 rounded-xl font-bold text-sm
          flex items-center justify-center gap-2.5
          transition-all duration-200 ease-out
          ${file && !isUploading
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:from-blue-500 hover:to-blue-400 hover:scale-[1.02] active:scale-[0.99]'
            : 'bg-slate-700/40 text-slate-600 cursor-not-allowed border border-slate-700/50'
          }
        `}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing Contract…
          </>
        ) : (
          '⚡ Analyze Contract'
        )}
      </button>

      <p className="text-center text-[10px] text-slate-700">
        Max 10 MB · PDF, DOCX, TXT · Files are not stored
      </p>
    </div>
  );
}

export default FileUpload;
