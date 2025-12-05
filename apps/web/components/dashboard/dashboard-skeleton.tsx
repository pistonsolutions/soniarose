export function DashboardSkeleton() {
    return (
        <div className="space-y-12 animate-pulse">
            <div className="space-y-2 border-b border-slate-200 pb-6">
                <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-96 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                        <div className="mt-4 h-10 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-64 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900" />
            </div>
        </div>
    );
}
