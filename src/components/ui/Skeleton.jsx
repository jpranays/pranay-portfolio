export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-white/[0.06] ${className}`}
      aria-hidden="true"
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="glass-card p-5 flex items-center gap-4">
      <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  );
}
