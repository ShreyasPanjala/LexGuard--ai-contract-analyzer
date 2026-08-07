import { useState } from 'react';
import {
  FiChevronDown,
  FiAlertTriangle,
  FiAlertCircle,
  FiCheckCircle,
  FiMessageSquare,
} from 'react-icons/fi';

import { getRiskBadgeClasses } from '../utils';

const RISK_ICONS = {
  High: FiAlertTriangle,
  Medium: FiAlertCircle,
  Low: FiCheckCircle,
};

const ICON_BG = {
  High: 'bg-red-500/10 text-red-400 border-red-500/20',
  Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

/**
 * ClauseCard — expandable card showing a contract clause's risk details.
 *
 * @param {{ clause: Object }} props
 */
function ClauseCard({ clause }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const Icon = RISK_ICONS[clause.risk] || FiAlertCircle;
  const badgeClasses = getRiskBadgeClasses(clause.risk);
  const iconBg = ICON_BG[clause.risk] || ICON_BG.Low;

  return (
    <div
      className={`
        rounded-xl border transition-all duration-200 ease-out overflow-hidden
        ${isExpanded
          ? 'border-slate-600/70 bg-slate-800/70'
          : 'border-slate-700/50 bg-slate-800/40 hover:border-slate-600/60 hover:bg-slate-800/60'
        }
      `}
    >
      {/* ── Card header (always visible, click to expand) ── */}
      <button
        className="w-full flex items-center gap-3 p-4 text-left group"
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
      >
        {/* Risk icon */}
        <div className={`p-2 rounded-xl border shrink-0 ${iconBg}`}>
          <Icon size={14} />
        </div>

        {/* Title + preview */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-100 truncate">{clause.title}</p>
          <p className="text-xs text-slate-500 mt-0.5 truncate leading-snug">
            {clause.explanation}
          </p>
        </div>

        {/* Risk badge */}
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 ${badgeClasses}`}
        >
          {clause.risk}
        </span>

        {/* Chevron */}
        <FiChevronDown
          size={15}
          className={`text-slate-500 shrink-0 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* ── Expanded content ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-3 border-t border-slate-700/50 pt-3">
          {/* Analysis */}
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
              Analysis
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">{clause.explanation}</p>
          </div>

          {/* Suggested alternative */}
          <div className="flex gap-2.5 p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/15">
            <FiMessageSquare size={14} className="text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">
                Suggested Alternative
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">{clause.alternative}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClauseCard;
