/* eslint-disable @next/next/no-img-element */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@radix-ui/react-select';
import {
  Bookmark,
  EllipsisVertical,
  Heart,
  MessageCircle,
  Share2,
} from 'lucide-react';

export default function Post() {
  return (
    <div>
      <div className="bg-white flex flex-col gap-6 items-start w-full rounded-lg  py-6 px-4">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex justify-between items-center cursor-pointer p-2 rounded-lg">
            <div className="w-full flex gap-2 ">
              <Avatar>
                <AvatarImage
                  src={''}
                  alt="User avatar"
                  className="object-cover"
                />
                <AvatarFallback className="bg-main_primary text-white pt-1">
                  {'Winners Chapel International'
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
              <div>
                <h5 className="text-base font-medium">
                  Winners Chapel International
                </h5>
                <p className="text-sm text-textDark">Today at 12:00am</p>
              </div>
            </div>
            <div>
              <EllipsisVertical />
            </div>
          </div>
          <div className="capitalize text-base">
            <p>
              Developing a relationship with God is a deeply personal and
              transformative journey. It begins with an openness to explore your
              spirituality,
              <span className="text-textDark ">... see more</span>
            </p>
          </div>
          <div className="w-full">
            <img
              className="w-full h-64 rounded-lg"
              src="/assets/images/Home/post.png"
              alt="Profile"
            />
          </div>
          <div className="border-y-2 border-textDark flex justify-between items-center p-2 text-sm lg:text-base">
            <div className="flex gap-1 items-center text-textDark">
              <Heart />
              <span className="hidden lg:block">32 Likes</span>
            </div>
            <div className="flex gap-1 items-center text-textDark">
              <MessageCircle />
              <span className="hidden lg:block">32 Comments</span>
            </div>
            <div className="flex gap-1 items-center text-textDark">
              <Share2 />
              <span className="hidden lg:block">Share</span>
            </div>
            <div className="flex gap-1 items-center text-textDark">
              <Bookmark />
              <span className="hidden lg:block">Save</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
