import { FeaturePlaceholder } from '@/components/feature-placeholder';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure Twilio credentials, call routing, and workspace preferences.
        </p>
      </header>

      <FeaturePlaceholder
        title="Configuration forms on deck"
        description="We&apos;ll plug in environment-aware forms for Twilio keys, messaging services, and branding options here."
      />
    </div>
  );
}
