import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

export default function Create() {
  return (
    <div className="w-full flex gap-2 bg-white py-6 px-4 rounded-lg">
      <Avatar className='w-12 h-12'>
        <AvatarImage src={''} alt="User avatar" className="object-cover" />
        <AvatarFallback className="bg-main_primary text-white pt-1">
          {'Mayokun Church HQ'
            .split(' ')
            .filter((n) => n)
            .map((part, index, arr) =>
              index === 0 || index === arr.length - 1
                ? part[0].toUpperCase()
                : null,
            )
            .filter(Boolean)
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className='bg-[#EEEEEE] rounded-xl w-full flex items-center px-8 h-12'>
            <p className='text-md text-textDark'>Share your thoughts...</p>
      </div>
    </div>
  );
}
