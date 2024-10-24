'use client';
import { Fragment, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MemberHeader from '@/components/common/admin/directory/member-header';
import InfoTabs from '@/components/ui/member-tabs';
import Personal from '@/components/common/admin/directory/personal-info';
import ContactInfo from '@/components/common/admin/directory/contact-info';
import ChurchInfo from '@/components/common/admin/directory/church-info';
import MemberHistoryInfo from '@/components/common/admin/directory/member-history';
import { useMember } from '@/lib/client/useMember';
import SkeletonLoader from '@/components/common/admin/skeleton-loader';
import { useContactContext } from '@/context/contact-context';

export default function Page({
  params,
}: {
  params: { churchId: string; memberId: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { memberId, churchId } = params;
  const { contacts } = useContactContext();

  const { data, isLoading } = useMember({
    churchId: contacts?.churchId ?? '',
    memberId: memberId,
  });

  const views = ['personal', 'contact', 'church', 'history'];
  const view = searchParams.get('view') || 'personal';

  const currentViewIndex = views.indexOf(view);

  useEffect(() => {
    router.replace(`/admin/${churchId}/directory/${memberId}?view=personal`);
  }, []);

  const handleNavigation = (direction: 'next' | 'prev') => {
    const newIndex =
      direction === 'next' ? currentViewIndex + 1 : currentViewIndex - 1;
    if (newIndex >= 0 && newIndex < views.length) {
      router.push(
        `/admin/${churchId}/directory/${memberId}?view=${views[newIndex]}`,
      );
    }
  };

  return (
    <Suspense>
      <div className="flex flex-col w-full py-4 relative overflow-auto px-2">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Fragment>
            <MemberHeader
              member={data}
              churchId={contacts?.churchId ?? ''}
              editor={contacts}
            />
            <InfoTabs memberId={memberId} />
            <div className="w-full">
              {view === 'personal' && <Personal member={data} />}
              {view === 'contact' && <ContactInfo member={data} />}
              {view === 'church' && <ChurchInfo member={data} />}
              {view === 'history' && <MemberHistoryInfo member={data} />}
            </div>
            <div className="flex justify-between mt-4 w-full relative h-36">
              {currentViewIndex !== 0 && (
                <button
                  onClick={() => handleNavigation('prev')}
                  disabled={currentViewIndex === 0}
                  className="bg-gray-300 px-5 py-2 rounded-md text-lg disabled:opacity-50 absolute left-1"
                >
                  Previous
                </button>
              )}
              {currentViewIndex !== views.length - 1 && (
                <button
                  onClick={() => handleNavigation('next')}
                  disabled={currentViewIndex === views.length - 1}
                  className="bg-main_DarkBlue hover:bg-main_DarkBlueHover transition-all duration-600 text-white px-5 py-2 rounded-md text-lg disabled:opacity-50 absolute right-1"
                >
                  Next
                </button>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </Suspense>
  );
}
