'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ViewMore({ id }: { id: string }) {
  const { churchId } = useParams();
  return (
    <div className="flex justify-center">
      <Link
        href={`/admin/${churchId}/directory/${id}`}
        className="flex items-center gap-2 text-secondary font-normal group"
      >
        View More{' '}
        <div className="transform group-hover:translate-x-1 transition-transform duration-300">
          <ArrowRight size={16} />
        </div>
      </Link>
    </div>
  );
}
