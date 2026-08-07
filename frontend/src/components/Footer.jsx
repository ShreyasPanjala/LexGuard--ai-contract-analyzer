import { Link } from 'react-router-dom';
import { FiShield, FiGithub } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <FiShield size={14} className="text-blue-400" />
            </div>
            <span className="font-black text-sm text-slate-400">
              LexGuard <span className="text-blue-400">AI</span>
            </span>
          </div>

          <p className="text-xs text-slate-700 text-center">
            AI-powered contract clause risk tagger · Built for Hackathon 2026
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <Link to="/" className="hover:text-slate-400 transition-colors">Home</Link>
            <span className="text-slate-800">·</span>
            <Link to="/analyze" className="hover:text-slate-400 transition-colors">Analyze</Link>
            <span className="text-slate-800">·</span>
            <a
              href="https://github.com/ShreyasPanjala/LexGuard--ai-contract-analyzer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors flex items-center gap-1"
            >
              <FiGithub size={12} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
