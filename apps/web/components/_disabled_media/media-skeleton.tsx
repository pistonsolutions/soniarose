export function MediaSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="space-y-2">
                <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-96 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="space-y-4 p-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="h-4 w-1/6 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/6 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/6 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/6 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/6 rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-4 w-1/6 rounded bg-slate-200 dark:bg-slate-800" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
