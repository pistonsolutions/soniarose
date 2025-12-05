import { Suspense } from 'react';
import { MediaContent } from '@/components/media/media-content';
import { MediaSkeleton } from '@/components/media/media-skeleton';

export default function MediaPage() {
  return (
    <Suspense fallback={<MediaSkeleton />}>
      <MediaContent />
    </Suspense>
  );
}

