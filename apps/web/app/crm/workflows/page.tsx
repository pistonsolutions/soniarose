import type { ReactNode } from 'react';
import Link from 'next/link';
import { RetryWorkflowButton } from '@/components/workflows/retry-workflow-button';
import { auth } from '@clerk/nextjs/server';
import { getWorkflowOverview, getWorkflowRuns } from '@/lib/api';
import { WorkflowStats } from '@/components/workflows/workflow-stats';
import { WorkflowRunsTable } from '@/components/workflows/workflow-runs-table';
import { formatDate, formatName, formatWorkflowKey, formatWorkflowStatus } from '@/lib/format';

export default async function WorkflowsPage() {
  const { getToken } = await auth();
  const token = await getToken();
  const [overviewData, runsData] = await Promise.all([
    getWorkflowOverview(token),
    getWorkflowRuns(20, token),
  ]);

  const overview = overviewData.data;
  const runs = runsData.data ?? [];

  const counts = overview?.counts ?? {
    waiting: 0,
    active: 0,
    completed: 0,
    failed: 0,
    delayed: 0,
  };

  const metricEntries: Array<{ key: keyof typeof counts; label: string; tone: MetricTone }> = [
    { key: 'waiting', label: 'Waiting', tone: 'neutral' },
    { key: 'active', label: 'In progress', tone: 'positive' },
    { key: 'completed', label: 'Completed', tone: 'positive' },
    { key: 'failed', label: 'Failed', tone: 'negative' },
    { key: 'delayed', label: 'Delayed', tone: 'warning' },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold">Workflows</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track automation queues, inspect run histories, and rerun failed jobs without leaving the console.
        </p>
        {(overviewData.error || runsData.error) && (
          <p className="rounded-md border border-amber-500 bg-amber-100 px-3 py-2 text-xs text-amber-800 dark:border-amber-400 dark:bg-amber-900/30 dark:text-amber-200">
            We couldn&apos;t load the full workflow snapshot. Showing whatever data was available.
          </p>
        )}
        {overview?.paused && (
          <p className="rounded-md border border-rose-500 bg-rose-100 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-400 dark:bg-rose-900/30 dark:text-rose-200">
            Queue is paused — resume processing in BullMQ before scheduling more automations.
          </p>
        )}
      </header>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {metricEntries.map((metric) => (
          <MetricCard key={metric.key} label={metric.label} tone={metric.tone}>
            {counts[metric.key].toLocaleString()}
          </MetricCard>
        ))}
      </section>

      <section className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Recent runs</h3>
          <span className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Most recent {runs.length} entries</span>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-100/70 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Workflow</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Steps</th>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Updated</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
              {runs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No workflow runs recorded yet. Enroll a contact to kick off automations.
                  </td>
                </tr>
              ) : (
                runs.map((run) => {
                  const WORKFLOW_TOTAL_STEPS: Record<string, number> = {
                    FIVE_DAYS_OF_JOY: 5,
                    POST_TRANSACTION_SEQ: 4,
                    SELLER_LEAD_START: 5,
                    BUYER_LEAD_START: 5,
                    EXPIRED_LISTING_SEQ: 3,
                    FSBO_SEQ: 3,
                    CALL_PIPELINE_SEQ: 1,
                    SIGNS_OF_LIFE: 1,
                    SOCIAL_LEAD_IMPORT: 1,
                    BIRTHDAY_GREETING: 1,
                    HOLIDAY_GREETING: 1,
                    MONTHLY_NEWSLETTER: 1,
                    LONG_TERM_NURTURE: 4,
                  };

                  // ... inside the map function ...
                  const failed = run.status === 'FAILED';
                  const stepsCompleted = run.steps.filter((step) => step.status === 'COMPLETED').length;
                  const latestStep = run.steps[run.steps.length - 1];
                  const totalSteps = Math.max(run.steps.length, WORKFLOW_TOTAL_STEPS[run.workflowKey] || 0);

                  return (
                    <tr key={run.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-3 align-top">
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-100">
                            {formatWorkflowKey(run.workflowKey)}
                          </span>
                          {run.errorMessage && (
                            <p className="text-xs text-rose-500 dark:text-rose-300">{run.errorMessage}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <StatusBadge status={run.status} label={formatWorkflowStatus(run.status)} />
                      </td>
                      <td className="px-4 py-3 align-top text-blue-600 dark:text-blue-300">
                        <Link href={`/contacts/${run.contact.id}`} className="font-medium hover:underline">
                          {formatName(run.contact.firstName, run.contact.lastName)}
                        </Link>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{run.contact.phone}</div>
                      </td>
                      <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                        <div className="text-sm font-medium">
                          {stepsCompleted}/{totalSteps > 0 ? totalSteps : '?'} complete
                        </div>
                        {latestStep && (
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Last step: {latestStep.name} ({formatWorkflowStatus(latestStep.status)})
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                        {formatDate(run.createdAt)}
                      </td>
                      <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                        {formatDate(run.updatedAt ?? run.completedAt ?? run.cancelledAt ?? run.createdAt)}
                      </td>
                      <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                        {failed ? <RetryWorkflowButton runId={run.id} /> : <span className="text-xs text-slate-400">—</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

type MetricTone = 'neutral' | 'positive' | 'warning' | 'negative';

function MetricCard({ label, tone, children }: { label: string; tone: MetricTone; children: ReactNode }) {
  const toneClasses: Record<MetricTone, string> = {
    neutral: 'border-slate-200 text-slate-900 dark:border-slate-800 dark:text-white',
    positive: 'border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300',
    warning: 'border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300',
    negative: 'border-rose-300 text-rose-700 dark:border-rose-800 dark:text-rose-300',
  };

  return (
    <article className={`rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900 ${toneClasses[tone]}`}>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{children}</p>
    </article>
  );
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  const palette: Record<string, string> = {
    PENDING: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
    RUNNING: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200',
    PAUSED: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
    COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
    CANCELLED: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    FAILED: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${palette[status] ?? palette.PENDING}`}>
      {label}
    </span>
  );
}
