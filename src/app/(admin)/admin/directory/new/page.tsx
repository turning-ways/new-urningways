'use client';

import Church from '@/components/common/admin/directory/new/church-info';
import Contact from '@/components/common/admin/directory/new/contact-info';
import Personal from '@/components/common/admin/directory/new/personal-info';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import InfoTabs from '@/components/ui/member-tabs';
import { UploadAvatar } from '@/components/ui/upload-avatar';
import { ADMIN_DIRECTORY } from '@/constants/route-constants';
import { useContactContext } from '@/context/contact-context';
import { base64ToFile } from '@/lib/utils/image';
import {
  ChevronLeft,
  CloudUpload,
  ImagePlus,
  LucidePencilLine,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const views = ['personal', 'contact', 'church'];
  const view = searchParams.get('view') || 'personal';
  const [image, setImage] = useState('');
  const { contacts } = useContactContext();

  const currentViewIndex = views.indexOf(view);

  useEffect(() => {
    // Set the default view to "personal" on mount
    router.replace(`${ADMIN_DIRECTORY}/new?view=personal`);
  }, [router]);

  return (
    <Suspense>
      <div className="flex flex-col w-full py-4 relative overflow-auto px-2 h-full">
        <Link
          className="bg-blue-50 rounded-lg p-2 w-fit cursor-pointer  hover:bg-blue-100 lg:self-auto absolute top-1 left-0"
          href={ADMIN_DIRECTORY}
        >
          <ChevronLeft className="text-main_DarkBlue size-6" />
        </Link>
        <div className="flex justify-center w-full py-4 px-2">
          <Dialog>
            <DialogTrigger>
              <div className="relative">
                <Avatar className="size-28 ">
                  <AvatarImage
                    src={image}
                    alt="User avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-4 right-1  flex size-5 rounded-full justify-center items-center bg-white">
                  <ImagePlus size={16} />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="px-0 py-0 max-w-md">
              <DialogTitle>{''}</DialogTitle>
              <UploadAvatar image={image} setImage={setImage} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col w-full py-4 px-2">
          <InfoTabs create={true} />
          {/* <Personal /> */}
          {view === 'personal' && <Personal />}
          {view === 'contact' && <Contact />}
          {view === 'church' && (
            <Church image={base64ToFile(image, 'image')} contact={contacts} />
          )}
        </div>
      </div>
    </Suspense>
  );
}
