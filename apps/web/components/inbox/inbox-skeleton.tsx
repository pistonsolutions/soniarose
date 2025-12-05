export function InboxSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="space-y-2">
                <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-96 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid h-[calc(100vh-12rem)] grid-cols-1 gap-6 overflow-hidden lg:grid-cols-3">
                <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
                    <div className="border-b border-slate-100 p-4 dark:border-slate-800">
                        <div className="h-10 w-full rounded-lg bg-slate-100 dark:bg-slate-800" />
                    </div>
                    <div className="space-y-2 p-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-16 rounded-lg bg-slate-50 dark:bg-slate-800/50" />
                        ))}
                    </div>
                </div>
                <div className="hidden h-full rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2 lg:block">
                    <div className="flex h-full items-center justify-center">
                        <div className="h-8 w-64 rounded bg-slate-100 dark:bg-slate-800" />
                    </div>
                </div>
            </div>
        </div>
    );
}
