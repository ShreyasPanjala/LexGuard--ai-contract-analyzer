import { FiShield, FiFileText } from 'react-icons/fi';
import RiskMeter from './RiskMeter';
import ClauseCard from './ClauseCard';
import StatCard from './StatCard';

/**
 * AnalysisDashboard — renders the full contract risk analysis result.
 *
 * @param {{ data: Object }} props   data: the analysis object from the API
 */
function AnalysisDashboard({ data }) {
  const { overallRisk, summary, stats, clauses, metadata } = data;

  const highRisk   = clauses.filter((c) => c.risk === 'High');
  const mediumRisk = clauses.filter((c) => c.risk === 'Medium');
  const lowRisk    = clauses.filter((c) => c.risk === 'Low');

  // Sort: High → Medium → Low
  const sortedClauses = [...highRisk, ...mediumRisk, ...lowRisk];

  return (
    <div className="space-y-4 animate-fade-in-up">

      {/* ── Risk overview card ── */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Meter */}
          <div className="shrink-0 flex justify-center w-full sm:w-auto">
            <RiskMeter score={overallRisk} />
          </div>

          {/* Summary text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <FiShield size={15} className="text-blue-400 shrink-0" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                AI Risk Summary
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{summary}</p>

            {metadata && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {metadata.wordCount != null && (
                  <span className="text-xs text-slate-600">
                    Words:{' '}
                    <span className="text-slate-500 font-medium">
                      {metadata.wordCount.toLocaleString()}
                    </span>
                  </span>
                )}
                {metadata.analyzedAt && (
                  <span className="text-xs text-slate-600">
                    Analyzed:{' '}
                    <span className="text-slate-500 font-medium">
                      {new Date(metadata.analyzedAt).toLocaleTimeString()}
                    </span>
                  </span>
                )}
                {metadata.engine && (
                  <span className="text-xs text-slate-700">
                    Engine: <span className="font-mono">{metadata.engine}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Statistics grid ── */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Total Clauses"
          value={stats.totalClauses}
          colorClass="text-blue-400"
        />
        <StatCard
          label="Risky Clauses"
          value={stats.riskyClauses}
          colorClass="text-red-400"
        />
        <StatCard
          label="Safe Clauses"
          value={stats.safeClauses}
          colorClass="text-emerald-400"
        />
      </div>

      {/* ── Clause list header ── */}
      <div className="flex items-center justify-between pt-1">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <FiFileText size={12} />
          Clause Breakdown ({clauses.length})
        </h3>
        <div className="flex gap-1.5 text-[10px] font-bold">
          {highRisk.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              {highRisk.length} High
            </span>
          )}
          {mediumRisk.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {mediumRisk.length} Med
            </span>
          )}
          {lowRisk.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {lowRisk.length} Low
            </span>
          )}
        </div>
      </div>

      {/* ── Scrollable clause cards ── */}
      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-0.5 custom-scrollbar">
        {sortedClauses.map((clause, i) => (
          <div
            key={clause.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <ClauseCard clause={clause} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalysisDashboard;
