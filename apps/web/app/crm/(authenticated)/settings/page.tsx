'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

export default function SettingsPage() {
  const { userId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [settings, setSettings] = useState({
    telnyxApiKey: '',
    tallyApiKey: '',
  });

  const webhookUrl = typeof window !== 'undefined'
    ? `${window.location.origin.replace('3000', '3001')}/api/tally/webhook?userId=${userId}`
    : '';

  useEffect(() => {
    const fetchSettings = async () => {
      if (!userId) return;
      try {
        const token = await getToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/user-settings/me?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setSettings({
            telnyxApiKey: data.telnyxApiKey || '',
            tallyApiKey: data.tallyApiKey || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [userId, getToken]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/user-settings/me?userId=${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleSyncWebhooks = async () => {
    setSyncing(true);
    try {
      const token = await getToken();
      // Remove duplicate /api if present
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api').replace(/\/api$/, '');
      const res = await fetch(`${baseUrl}/api/tally/sync?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ webhookUrl }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`Synced ${data.updated} forms successfully`);
      } else {
        toast.error('Failed to sync webhooks');
      }
    } catch (error) {
      toast.error('An error occurred during sync');
    } finally {
      setSyncing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold">Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your integrations and API keys.
        </p>
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Telnyx Integration</CardTitle>
            <CardDescription>
              Configure your Telnyx API key for SMS and MMS capabilities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telnyxApiKey">Telnyx API Key</Label>
              <Input
                id="telnyxApiKey"
                type="password"
                value={settings.telnyxApiKey}
                onChange={(e) => setSettings({ ...settings, telnyxApiKey: e.target.value })}
                placeholder="KEY0123..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tally Forms Integration</CardTitle>
            <CardDescription>
              Connect your Tally forms to automatically create contacts and trigger workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tallyApiKey">Tally API Key (Optional)</Label>
              <Input
                id="tallyApiKey"
                type="password"
                value={settings.tallyApiKey}
                onChange={(e) => setSettings({ ...settings, tallyApiKey: e.target.value })}
                placeholder="tly-..."
              />
              <p className="text-xs text-muted-foreground">
                Used for fetching form definitions if needed.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 p-2 bg-slate-100 dark:bg-slate-800 rounded text-sm break-all">
                  {webhookUrl}
                </code>
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(webhookUrl)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSyncWebhooks}
                  disabled={syncing || !settings.tallyApiKey}
                >
                  {syncing ? 'Syncing...' : 'Sync Webhooks'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Paste this URL into the "Integrations" &gt; "Webhooks" section of your Tally forms, or click "Sync Webhooks" to do it automatically (requires API Key).
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
