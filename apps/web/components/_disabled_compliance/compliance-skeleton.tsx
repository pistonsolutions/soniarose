export function ComplianceSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="space-y-2">
                <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-96 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="mt-2 h-8 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="h-6 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="h-16 rounded-lg bg-slate-50 dark:bg-slate-800/60" />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-64 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" />
            </div>
        </div>
    );
}
