/**
 * Animated skeleton loaders for the analysis dashboard.
 */

function SkeletonLine({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

/**
 * Full dashboard skeleton shown while the API request is in-flight.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Risk overview skeleton */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-5">
        <SkeletonLine className="h-4 w-28 mb-4" />
        <div className="flex items-center gap-6">
          <SkeletonLine className="h-28 w-48 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-2.5">
            <SkeletonLine className="h-3.5 w-full" />
            <SkeletonLine className="h-3.5 w-5/6" />
            <SkeletonLine className="h-3.5 w-4/6" />
            <SkeletonLine className="h-3.5 w-3/6 mt-4" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 flex flex-col items-center gap-2">
            <SkeletonLine className="h-7 w-10" />
            <SkeletonLine className="h-2.5 w-16" />
          </div>
        ))}
      </div>

      {/* Clause header */}
      <div className="flex items-center justify-between">
        <SkeletonLine className="h-4 w-32" />
        <div className="flex gap-2">
          <SkeletonLine className="h-5 w-14 rounded-full" />
          <SkeletonLine className="h-5 w-16 rounded-full" />
        </div>
      </div>

      {/* Clause card skeletons */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4"
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          <div className="flex items-center gap-3">
            <SkeletonLine className="h-9 w-9 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonLine className="h-3.5 w-36" />
              <SkeletonLine className="h-3 w-52" />
            </div>
            <SkeletonLine className="h-6 w-16 rounded-full shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
