/**
 * StatCard — single metric display card for the analysis dashboard.
 *
 * @param {{ label: string, value: string|number, colorClass?: string, icon?: ReactNode }} props
 */
function StatCard({ label, value, colorClass = 'text-slate-200', subtext }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600/70 transition-colors duration-200">
      <span className={`text-2xl font-extrabold tabular-nums ${colorClass}`}>
        {value}
      </span>
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-center leading-tight">
        {label}
      </span>
      {subtext && (
        <span className="text-[9px] text-slate-600">{subtext}</span>
      )}
    </div>
  );
}

export default StatCard;
