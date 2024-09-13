import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col w-full py-4 relative overflow-auto">
      <div className="flex gap-6 pl-4 w-full">
        <Skeleton className="size-24 rounded-full" />
        <div className="flex flex-col gap-4 mb-4 w-full">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-8" />
        </div>
      </div>

      <div className="w-full mb-4">
        <Skeleton className="w-full h-6 mb-2" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border-b border-gray-300 pb-2 w-full">
              <Skeleton className="w-1/2 h-4" />
              <Skeleton className="w-full h-6" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-4 w-full relative h-36">
        <Skeleton className="bg-gray-300 px-5 py-2 rounded-md text-lg h-10 w-28" />
        <Skeleton className="bg-gray-300 px-5 py-2 rounded-md text-lg h-10 w-28" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
