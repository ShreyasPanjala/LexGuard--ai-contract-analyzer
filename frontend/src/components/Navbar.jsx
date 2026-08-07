import { Link, useLocation } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-4 mt-3 rounded-2xl border border-slate-800/70 bg-slate-950/85 backdrop-blur-xl shadow-xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="LexGuard AI home"
            >
              <div className="p-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all duration-200">
                <FiShield size={16} className="text-blue-400" />
              </div>
              <span className="font-black text-sm tracking-tight text-slate-100">
                LexGuard <span className="text-blue-400">AI</span>
              </span>
            </Link>

            {/* ── Nav links ── */}
            <div className="flex items-center gap-1">
              <Link
                to="/"
                className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === '/'
                    ? 'bg-slate-800 text-slate-100'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                Home
              </Link>

              <Link
                to="/analyze"
                className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  pathname === '/analyze'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 hover:border-blue-600'
                }`}
              >
                Analyze Contract
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
