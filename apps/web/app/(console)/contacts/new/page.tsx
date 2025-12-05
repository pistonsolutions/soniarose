import Link from 'next/link';
import { ContactForm } from '@/components/contacts/contact-form';

export default function NewContactPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold">Add a contact</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Capture the essentials so SoniaRose can manage automations and outreach.
            </p>
          </div>
          <Link
            href="/contacts"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-300"
          >
            Back to contacts
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <ContactForm />
      </section>
    </div>
  );
}
