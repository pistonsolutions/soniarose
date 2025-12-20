import { Suspense } from 'react';
import { InboxContent } from '@/components/inbox/inbox-content';
import { InboxSkeleton } from '@/components/inbox/inbox-skeleton';

export default function InboxPage() {
  return (
    <Suspense fallback={<InboxSkeleton />}>
      <InboxContent />
    </Suspense>
  );
}
