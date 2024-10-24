import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Following() {
  return (
    <div className="bg-white flex flex-col gap-6 items-start w-full rounded-lg  py-6 px-4">
      <h4 className="font-medium">Churches You Follow</h4>
      <div className="w-full ">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="w-full flex gap-2 cursor-pointer hover:bg-slate-200 p-2 rounded-lg"
          >
            <Avatar>
              <AvatarImage
                src={''}
                alt="User avatar"
                className="object-cover"
              />
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
            <div>
              <h5 className="text-base font-medium">Mayokun Church HQ</h5>
              <p className="text-sm text-textDark">Saved By Grace</p>
            </div>
          </div>
        ))}
      </div>
      <p className="font-medium text-main cursor-pointer">See More</p>
    </div>
  );
}