'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useGetChurch } from '@/lib/client/useChurches';
import { ProfileNameFormatter } from '@/lib/utils/capitalize';
import { formatDate } from '@/lib/utils/date-formatter';
import Link from 'next/link';

export default function ViewProfile() {
  const { data, isLoading } = useGetChurch();
  return !isLoading ? (
    <div className="w-full h-full pb-12 flex flex-col gap-12 ">
      <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-between md:px-6 py-2 border-b-2 pb-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/images/avatar.jpg" alt="User avatar" />
            <AvatarFallback className="bg-yellow-500 text-white pt-1">
              {ProfileNameFormatter(data?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm md:text-base text-textGray">
            <h1 className="text-base md:text-xl">{data?.name}</h1>
            <p>{data?.isHq && 'Headquarters Church'}</p>
          </div>
        </div>
        <Link className="w-full md:max-w-32" href={'profile/edit'}>
          <Button className="bg-transparent border-2 w-full  border-textGray text-textGray hover:bg-transparent hover:text-textGray text-base font-normal p-5">
            Edit Profile
          </Button>
        </Link>
      </div>
      <div className="w-full h-full grid md:grid-cols-2 gap-4">
        <ul className="w-full flex flex-col gap-4">
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Church Name</h4>
            <p className="text-lg text-textGray font-medium">{data?.name}</p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Website</h4>
            <a href={data?.website} target='_blank' className="text-lg hover:text-main_DarkBlueHover hover:underline text-textGray font-medium">{data?.website}</a>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Email</h4>
            <p className="text-lg text-textGray font-medium">{data?.email}</p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Phone Number</h4>
            <p className="text-lg text-textGray font-medium">{data?.phone}</p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Is this a parent church?</h4>
            <p className="text-lg text-textGray font-medium">
              {data?.isHq ? 'Yes' : 'No'}
            </p>
          </li>
        </ul>
        <ul className="w-full flex flex-col gap-4">
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Founded</h4>
            <p className="text-lg text-textGray font-medium">
              {formatDate(data?.foundedDate  || "") || 'None'}
            </p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Church Address</h4>
            <p className="text-lg text-textGray font-medium">{data?.address}</p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>City</h4>
            <p className="text-lg text-textGray font-medium">{data?.city}</p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>State</h4>
            <p className="text-lg text-textGray font-medium">{data?.state}</p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Zip/Postal Code</h4>
            <p className="text-lg text-textGray font-medium">
              {data?.zip || 'None'}
            </p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4>Country</h4>
            <p className="text-lg text-textGray font-medium">{data?.country}</p>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <ViewProfileSkeleton />
  );
}

function ViewProfileSkeleton() {
  return (
    <div className="w-full h-full pb-12 flex flex-col gap-12 ">
      <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-between md:px-6 py-2 border-b-2 pb-6">
        <div className="flex items-center gap-4  animate-pulse">
          <Avatar>
            <AvatarImage src="/images/avatar.jpg" alt="User avatar" />
            <AvatarFallback className="bg-yellow-500 animate-pulse text-white pt-1"></AvatarFallback>
          </Avatar>
          <div className="text-sm md:text-base text-textGray">
            <h1 className="text-base md:text-xl animate-pulse"></h1>
            <p className="animate-pulse"></p>
          </div>
        </div>
        <Link className="w-full md:max-w-32" href={'profile/edit'}>
          <Button className="bg-transparent border-2 w-full animate-pulse border-textGray text-textGray hover:bg-transparent hover:text-textGray text-base font-normal p-5"></Button>
        </Link>
      </div>
      <div className="w-full h-full grid md:grid-cols-2 gap-4">
        <ul className="w-full flex flex-col gap-4">
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <a className="text-lg text-textGray font-medium animate-pulse"></a>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
        </ul>
        <ul className="w-full flex flex-col gap-4">
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray animate-pulse font-medium"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className="animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
          <li className="text-base flex flex-col gap-2 text-textDark px-2 py-1 border-b">
            <h4 className=" animate-pulse"></h4>
            <p className="text-lg text-textGray font-medium animate-pulse"></p>
          </li>
        </ul>
      </div>
    </div>
  );
}
