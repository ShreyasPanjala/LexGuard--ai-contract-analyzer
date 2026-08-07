import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield } from 'react-icons/fi';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-up">
        <div className="text-[120px] font-black leading-none text-slate-800/60 mb-4 select-none">
          404
        </div>
        <h1 className="text-2xl font-black text-slate-300 mb-3">Page Not Found</h1>
        <p className="text-slate-600 mb-8 text-sm max-w-xs mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.03]"
          style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
        >
          <FiArrowLeft size={15} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
