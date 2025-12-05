import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { getMediaAssets } from '@/lib/api';
import { formatBytes, formatDate, formatName } from '@/lib/format';

export async function MediaContent() {
    const { getToken } = await auth();
    const token = await getToken();
    const { data, error } = await getMediaAssets(50, token);
    const assets = data ?? [];

    return (
        <div className="space-y-8">
            <header className="space-y-2">
                <h2 className="text-3xl font-semibold">Media library</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Upload, catalog, and reuse video assets that fuel the SoniaRose campaigns.
                </p>
                {error && (
                    <p className="rounded-md border border-amber-500 bg-amber-100 px-3 py-2 text-xs text-amber-800 dark:border-amber-400 dark:bg-amber-900/30 dark:text-amber-200">
                        Unable to load media assets from the API. Showing any cached records we have.
                    </p>
                )}
            </header>

            <section className="space-y-4">
                <header className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">Stored assets</h3>
                    <span className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {assets.length.toLocaleString()} total
                    </span>
                </header>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm glass-panel">
                    <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
                        <thead className="bg-slate-100/70 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                            <tr>
                                <th className="px-4 py-3 text-left">Object key</th>
                                <th className="px-4 py-3 text-left">Owner</th>
                                <th className="px-4 py-3 text-left">Mime type</th>
                                <th className="px-4 py-3 text-left">Size</th>
                                <th className="px-4 py-3 text-left">Expires</th>
                                <th className="px-4 py-3 text-left">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                            {assets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                        No media assets yet. Upload a video to make it available for campaigns.
                                    </td>
                                </tr>
                            ) : (
                                assets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-4 py-3 align-top font-mono text-xs text-slate-600 dark:text-slate-300">
                                            <span className="line-clamp-2 break-words">{asset.objectKey}</span>
                                        </td>
                                        <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                                            {asset.contact ? (
                                                <Link href={`/contacts/${asset.contact.id}`} className="text-blue-600 hover:underline dark:text-blue-300">
                                                    {formatName(asset.contact.firstName, asset.contact.lastName)}
                                                </Link>
                                            ) : (
                                                <span className="text-slate-400 dark:text-slate-500">Unassigned</span>
                                            )}
                                            {asset.ownerLabel && (
                                                <div className="text-xs text-slate-500 dark:text-slate-400">{asset.ownerLabel}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 align-top text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            {asset.mimeType}
                                        </td>
                                        <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                                            {formatBytes(asset.sizeBytes)}
                                        </td>
                                        <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                                            {formatDate(asset.expiresAt)}
                                        </td>
                                        <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-300">
                                            {formatDate(asset.createdAt)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
