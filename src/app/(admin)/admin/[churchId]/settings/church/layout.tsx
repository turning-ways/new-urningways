'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
  return (
    <div className="w-full h-full pt-6 flex flex-col gap-6 overflow-auto">
      <div onClick={() => router.back()} className="text-main_DarkBlue rounded-full border-2 w-10 cursor-pointer bg-slate-200 flex items-center justify-center px-2 py-1.5">
        <ChevronLeft size={25} />
      </div>
      <div className="px-2 md:p-6 w-full h-full ">{children}</div>
    </div>
  );
}
