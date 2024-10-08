'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ImagePlus } from 'lucide-react';
import InfoTabs from '@/components/ui/member-tabs';
import { UploadAvatar } from '@/components/ui/upload-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import PersonalEdit from '@/components/common/admin/directory/edit/personal-edit';
import { useContactContext } from '@/context/contact-context';
import { useMemberUpdateStore } from '@/lib/stores/updateMember.store';
import { useMember, useUpdateMember } from '@/lib/client/useMember';
import { ProfileNameFormatter } from '@/lib/utils/capitalize';
import ContactEdit from '@/components/common/admin/directory/edit/contact-edit';
import ChurchEdit from '@/components/common/admin/directory/edit/church-edit';
import { useRoles } from '@/lib/client/useRoles';
import { toast } from 'sonner';
import { IMember } from '@/types/member';
import { base64ToFile, uploadImage } from '@/lib/utils/image';

export default function MemberEditPage({
  params,
}: {
  params: {
    churchId: string;
    memberId: string;
  };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { memberId, churchId } = params;
  const view = searchParams.get('view') || 'personal';

  // To Handle image upload
  const [image, setImage] = useState<string>('');
  // Store to handle form data in multi-step form
  const { setFormData, formData, resetFormData } = useMemberUpdateStore();
  const { contacts } = useContactContext();
  const { data, isLoading } = useMember({
    churchId: contacts?.churchId ?? '',
    memberId,
  });
  const mutation = useUpdateMember();
  // Fetch roles and set default to empty array
  const { data: roles = [] } = useRoles(contacts?.churchId ?? ''); // Fetch roles and set default to empty array

  const views = ['personal', 'contact', 'church'];
  const currentViewIndex = views.indexOf(view);
  const isLastView = currentViewIndex === views.length - 1;
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const churchRole = data?.role[0]?.id;
      setFormData({ ...data, churchRole }); // Set form data when fetched
    }

    return () => {
      resetFormData(); // Reset form data when component unmounts
    };
  }, [data, resetFormData, setFormData]);

  // Navigation handlers for previous and next view
  const navigateToView = (index: number) => {
    if (index >= 0 && index < views.length) {
      router.replace(
        `/admin/${churchId}/directory/${memberId}/edit?view=${views[index]}`,
      );
    }
  };

  // Function to handle saving of form data
  const saveMember = async (Idata: any) => {
    setIsLoading(true);
    // Validate required fields
    if (
      !Idata.firstName ||
      !Idata.lastName ||
      !Idata.phone ||
      !Idata.dateOfBirth ||
      !Idata.gender ||
      !Idata.churchRole
    ) {
      toast.error('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    let imageUrl = '';
    if (image && image !== '') {
      try {
        const file = base64ToFile(image, 'image');
        imageUrl = await uploadImage(file, data?.id ?? '');
      } catch {
        setIsLoading(false);
        // Handle image upload error so the member is still created and the user can try again later
        toast.error('An error occurred while uploading the image');
      }
    }

    try {
      // 2. Use the mutation to update the member
      await mutation.mutateAsync(
        {
          churchId: contacts?.churchId ?? '',
          memberId,
          data: {
            ...formData,
            ...Idata,
            photo: imageUrl && imageUrl !== '' ? imageUrl : data?.photo,
            dateOfBirth: Idata?.dateOfBirth
              ? Idata.dateOfBirth
              : formData.dateOfBirth,
          },
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            toast.success('Member Updated Successfully');
            router.replace(`/admin/${churchId}/directory/${memberId}`);
          },
        },
      );
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col w-full py-4 relative overflow-auto px-2 h-full">
      <Link
        className="bg-blue-50 rounded-lg p-2 w-fit cursor-pointer hover:bg-blue-100 absolute top-1 left-0"
        href={`/admin/${churchId}/directory/${memberId}`}
      >
        <ChevronLeft className="text-main_DarkBlue size-6" />
      </Link>

      <div className="flex justify-center w-full py-4">
        <Dialog>
          <DialogTrigger>
            <div className="relative">
              <Avatar className="size-28 border border-gray-300">
                <AvatarImage
                  src={(image && image !== ''
                    ? image
                    : data?.photo ?? ''
                  ).toString()}
                  alt="User avatar"
                  className="object-cover "
                />
                <AvatarFallback className="bg-red-200 text-red-500 text-3xl pt-1 font-semibold">
                  {ProfileNameFormatter(data?.firstName, data?.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-4 right-1  flex size-5 rounded-full justify-center items-center bg-white">
                <ImagePlus size={16} />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="px-0 py-0 max-w-md">
            <DialogTitle></DialogTitle>
            <UploadAvatar image={image} setImage={setImage} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col w-full py-4 px-2">
        <InfoTabs edit={true} memberId={memberId} />
        {!isLoading && (
          <>
            {view === 'personal' && (
              <PersonalEdit
                setFormData={setFormData}
                formData={formData}
                initialData={data}
                currentViewIndex={currentViewIndex}
                maxViewIndex={views.length}
                previousView={() => navigateToView(currentViewIndex - 1)}
                nextView={() => navigateToView(currentViewIndex + 1)}
                saveMember={saveMember}
                isLoading={isloading}
              />
            )}
            {view === 'contact' && (
              <ContactEdit
                setFormData={setFormData}
                formData={formData}
                currentViewIndex={currentViewIndex}
                maxViewIndex={views.length}
                previousView={() => navigateToView(currentViewIndex - 1)}
                nextView={() => navigateToView(currentViewIndex + 1)}
                saveMember={saveMember}
                isLoading={isloading}
              />
            )}
            {view === 'church' && (
              <ChurchEdit
                setFormData={setFormData}
                formData={formData}
                currentViewIndex={currentViewIndex}
                maxViewIndex={views.length}
                previousView={() => navigateToView(currentViewIndex - 1)}
                nextView={() => navigateToView(currentViewIndex + 1)}
                roles={roles}
                isLastView={isLastView}
                saveMember={saveMember}
                isLoading={isloading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
