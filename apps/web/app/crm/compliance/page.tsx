import { Suspense } from 'react';
import { ComplianceContent } from '@/components/compliance/compliance-content';
import { ComplianceSkeleton } from '@/components/compliance/compliance-skeleton';

export default function CompliancePage() {
  return (
    <Suspense fallback={<ComplianceSkeleton />}>
      <ComplianceContent />
    </Suspense>
  );
}
