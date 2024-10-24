import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function Suggested() {
  return (
    <div className="bg-white flex flex-col gap-6 items-start w-full rounded-lg  py-6 px-4">
      <h4 className="font-medium capitalize">Suggested For You</h4>
      <div className="w-full ">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full flex justify-between cursor-pointer  p-2 rounded-lg"
          >
            <div className="w-full flex gap-2 ">
              <Avatar>
                <AvatarImage
                  src={''}
                  alt="User avatar"
                  className="object-cover"
                />
                <AvatarFallback className="bg-main_primary text-white pt-1">
                  {'Jonathan David'
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
                <h5 className="text-base font-medium  text-ellipsis overflow-hidden capitalize truncate max-w-24">
                  Jonathan David
                </h5>
                <p className="text-sm text-textDark  text-ellipsis overflow-hidden capitalize truncate max-w-24">
                  Saved By Grace
                </p>
              </div>
            </div>
            <div>
              <Button className="bg-main_primaryDark hover:bg-main">
                Follow
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
