'use client';

import { memo, useCallback, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { retryWorkflowRun } from '@/lib/api';

interface RetryWorkflowButtonProps {
  runId: string;
}

export const RetryWorkflowButton = memo(function RetryWorkflowButton({ runId }: RetryWorkflowButtonProps) {
  const router = useRouter();
  const { getToken } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRetry = useCallback(async () => {
    if (pending) {
      return;
    }

    setPending(true);
    setError(null);

    const token = await getToken();
    const result = await retryWorkflowRun(runId, token);

    if (result.error) {
      setError(result.error);
      setPending(false);
      return;
    }

    router.refresh();
    setPending(false);
  }, [pending, getToken, runId, router]);

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleRetry}
        className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        disabled={pending}
      >
        {pending ? 'Retrying…' : 'Retry run'}
      </button>
      {error && <span className="text-[11px] text-rose-500 dark:text-rose-300">{error}</span>}
    </div>
  );
});
