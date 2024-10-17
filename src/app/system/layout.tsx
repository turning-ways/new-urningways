import SystemNavBar from '@/components/common/system/nav';
import React, { Suspense } from 'react';

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="flex flex-col w-full min-h-screen">
        <SystemNavBar />
        <div className="py-8">{children}</div>
      </div>
    </Suspense>
  );
}
