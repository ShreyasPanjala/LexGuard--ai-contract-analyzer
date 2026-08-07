import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiUploadCloud,
  FiShield,
  FiFileText,
  FiZap,
  FiCheckCircle,
} from 'react-icons/fi';

// ── Feature cards data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: FiUploadCloud,
    title: 'Contract Upload',
    description:
      'Upload PDF, DOCX, or TXT contracts instantly. Supports drag & drop for a frictionless experience.',
    accent: '#3b82f6',
    bg: 'bg-blue-500/8',
    border: 'border-blue-500/15',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: FiShield,
    title: 'Risk Detection',
    description:
      'Automatically identify high, medium, and low-risk clauses across every section of your contract.',
    accent: '#ef4444',
    bg: 'bg-red-500/8',
    border: 'border-red-500/15',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
  },
  {
    icon: FiFileText,
    title: 'Clause Analysis',
    description:
      "Get detailed plain-English explanations for each clause so you know exactly what you're agreeing to.",
    accent: '#8b5cf6',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/15',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    icon: FiZap,
    title: 'Smart Suggestions',
    description:
      'Receive AI-crafted alternative clause language designed to reduce legal risk and protect your interests.',
    accent: '#10b981',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/15',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
];

// ── Trust points ─────────────────────────────────────────────────────────────
const TRUST = [
  'No file storage — documents deleted immediately after analysis',
  'Supports PDF, DOCX, and plain text contracts',
  'Modular architecture ready for AI & blockchain integration',
];

// ── Steps ────────────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { step: '01', title: 'Upload Your Contract', desc: 'Drag & drop or browse for your PDF, DOCX, or TXT file.' },
  { step: '02', title: 'Automated Analysis', desc: 'The engine extracts and scores every clause by risk level.' },
  { step: '03', title: 'Review the Dashboard', desc: 'Explore risks, read explanations, and apply suggested alternatives.' },
];

// ── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '12+', label: 'Clause Types' },
  { value: '3', label: 'File Formats' },
  { value: '< 5s', label: 'Analysis Time' },
  { value: '100%', label: 'Free' },
];

function LandingPage() {
  return (
    <div className="relative overflow-x-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #1d4ed8 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute top-[30%] right-[-8%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', filter: 'blur(80px)', animationDelay: '2s' }}
        />
        <div
          className="absolute bottom-[15%] left-[25%] w-[350px] h-[350px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)', filter: 'blur(70px)', animationDelay: '4s' }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-400 text-xs font-bold mb-7 animate-fade-in-up">
            <FiShield size={11} />
            AI-Powered Contract Intelligence Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 animate-fade-in-up animation-delay-100">
            <span className="text-slate-50">Know What You're</span>
            <br />
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Signing With
            </span>{' '}
            <span className="text-slate-50">LexGuard AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Upload any legal contract and instantly receive a comprehensive risk dashboard.
            Identify dangerous clauses, understand implications, and negotiate with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 animate-fade-in-up animation-delay-300">
            <Link
              to="/analyze"
              id="hero-cta-analyze"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
            >
              Analyze Contract
              <FiArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#features"
              id="hero-cta-learn"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-slate-300 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-100 transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          {/* Stats strip */}
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm animate-fade-in-up animation-delay-400">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl font-black text-blue-400">{s.value}</div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="features"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 mb-4">
            Everything You Need to Analyze Contracts
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            LexGuard AI gives legal teams, startups, and individuals a complete contract
            intelligence platform — no legal expertise required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${f.bg} ${f.border}`}
                style={{ '--glow': f.accent }}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 border ${f.iconBg} ${f.border}`}>
                  <Icon size={20} className={f.iconColor} />
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-blue-500/10 bg-gradient-to-br from-slate-900/80 to-slate-800/30 p-10 sm:p-14 backdrop-blur-sm">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-3xl font-black text-slate-100 mb-3">How It Works</h2>
            <p className="text-slate-500 text-sm">Three steps to contract clarity</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="absolute hidden sm:block top-8 left-[16.7%] right-[16.7%] h-px bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20" />

            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 z-10">
                  <span className="text-xl font-black text-blue-500/60 font-mono">{item.step}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TRUST / PRIVACY SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {TRUST.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <FiCheckCircle size={14} className="text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-500">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-100 mb-4">
            Ready to Analyze Your Contract?
          </h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed">
            Upload your contract and get an instant risk analysis — completely free,
            no account required.
          </p>
          <Link
            to="/analyze"
            id="bottom-cta-analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/45 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
          >
            Get Started — It's Free
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
