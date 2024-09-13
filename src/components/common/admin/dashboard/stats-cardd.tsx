import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function StatsCard({
  title,
  value,
  color_variant,
  isLoading,
}: {
  title: string;
  value: string | number;
  color_variant?: string;
  isLoading?: boolean;
}) {
  return (
    <Card className="max-w-full lg:max-w-[240px] relative border-0 font-sans">
      <CardContent className="pb-3 !border-0 shadow-md h-full shadow-blue-50 flex flex-col justify-center items-center">
        <div
          style={{ backgroundColor: color_variant }}
          className="absolute left-0 z-10 bg-main h-full w-2 rounded-s-md "
        />
        <div className="flex items-center justify-center w-full">
          <h1 className="text-sm lg:text-base mt-2 text-gray-400 font-normal text-center">
            {title}
          </h1>
        </div>
        {isLoading ? (
          <Skeleton className="h-10 w-20" />
        ) : (
          <div className="flex items-center justify-center w-full text-2xl lg:text-3xl">
            {value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
