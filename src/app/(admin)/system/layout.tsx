import SystemNavBar from '@/components/common/system/nav';
import React from 'react';

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <SystemNavBar />
      <div className='py-8'>{children}</div>
    </div>
  );
}
