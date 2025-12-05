export default function ContactNotFound() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Contact not found</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        The contact you&apos;re trying to view either no longer exists or hasn&apos;t been synced yet.
      </p>
    </section>
  );
}
