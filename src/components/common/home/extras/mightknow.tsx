import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function MightKnow() {
  return (
    <div className="bg-white flex flex-col gap-6 items-start w-full rounded-lg  py-6 px-4">
      <h4 className="font-medium capitalize">People You Might know</h4>
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
                  {'Mayokun Areola'
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
                <h5 className="text-base font-medium">Mayokun Areola</h5>
                <p className="text-sm text-textDark">Saved By Grace</p>
              </div>
            </div>
            <div>
              <Button
                className={`${
                  index === 0
                    ? 'border-main bg-transparent border-2 text-main hover:bg-transparent hover:text-main'
                    : 'bg-main_primaryDark hover:bg-main'
                } `}
              >
               {index === 0 ? "Following" :"Follow"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
