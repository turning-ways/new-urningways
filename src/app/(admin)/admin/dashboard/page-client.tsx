"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import {
  Calendar,
  CalendarCheck2,
  CalendarHeart,
  CalendarSearch,
} from "lucide-react";

import AgeChart from "@/components/common/admin/dashboard/age-chart";
import MemberChart from "@/components/common/admin/dashboard/member-chart";
import MemberTable from "@/components/common/admin/dashboard/member-table";
import PieChart from "@/components/common/admin/dashboard/pie-chart";
import StatsCard from "@/components/common/admin/dashboard/stats-cardd";
import ChipTabs from "@/components/ui/chip-tabs";
import Tabs from "@/components/ui/table-tabs";
import { useDash } from "@/lib/client/useDash";
import { useContactContext } from "@/context/contact-context";
import { useSearchParams, useRouter } from "next/navigation"; // Import useSearchParams and useRouter

export default function PageClient() {
  const { contacts } = useContactContext();
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const searchParams = useSearchParams(); // Access search params
  const router = useRouter(); // Use router for navigation

  const memberTabs = useMemo(
    () => [
      { name: "All Members" },
      { name: "First Timers" },
      { name: "Upcoming Birthday" },
    ],
    []
  );

  const tabs = useMemo(
    () => [
      { name: "Till Date", icon: <Calendar size={14} /> },
      { name: "Last Week", icon: <CalendarCheck2 size={14} /> },
      { name: "Last Month", icon: <CalendarSearch size={14} /> },
      { name: "Last Quarter", icon: <CalendarHeart size={14} /> },
    ],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState(memberTabs[0]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const churchId = useMemo(() => {
    return contacts?.churchId ?? "";
  }, [contacts?.churchId]);

  const churchCreatedAt = useMemo(() => {
    return contacts?.churchCreatedAt ?? "";
  }, [contacts?.churchCreatedAt]);

  const { data, isLoading, refetch, isRefetching } = useDash({
    churchId,
    startDate: new Date(churchCreatedAt).toISOString(),
    endDate: endDate?.toISOString(),
  });

  useEffect(() => {
    if (endDate) refetch();
  }, [endDate]);

  useEffect(() => {
    const mainChurchId = searchParams.get("mainChurchId");

    if (mainChurchId) {
      // Perform any operations with the searchParams value here

      // Clear the searchParams by updating the URL without them
      const urlWithoutParams = window.location.pathname; // Get the URL path without query params
      router.replace(urlWithoutParams); // Replace the URL without query params
    }
  }, [searchParams, router]);

  const chartData = useMemo(() => {
    if (data) {
      const maleMembers = data.members.filter(
        (member) => member.gender === "MALE"
      ).length;
      const femaleMembers = data.members.filter(
        (member) => member.gender === "FEMALE"
      ).length;
      return {
        totalMembers: data.totalMembers,
        maleMembers,
        femaleMembers,
      };
    }
    return { totalMembers: 0, maleMembers: 0, femaleMembers: 0 };
  }, [data]);

  const stats = useMemo(() => {
    return [
      {
        title: "Total Members",
        value: data?.totalMembers ?? 0,
        color_variant: "#F2CCCC",
      },
      {
        title: "Verified",
        value: data?.verifiedMembers ?? 0,
        color_variant: "#CFF4CF",
      },
      {
        title: "Unverified",
        value: data?.unverifiedMembers ?? 0,
        color_variant: "#CCCCFF",
      },
      { title: "Active Members", value: "10", color_variant: "green" },
      {
        title: "Contacts",
        value: data?.totalContacts ?? 0,
        color_variant: "#E2CCE2",
      },
    ];
  }, [data]);

  return (
    <Suspense>
      <div className="flex flex-col w-full h-full pt-6 pr-4 overflow-auto gap-4">
        <ChipTabs
          tabs={tabs}
          setSelected={setSelectedTab}
          selected={selectedTab}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <div className="grid gap-4 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              color_variant={stat.color_variant}
              isLoading={isLoading}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 justify-items-center sm:justify-between">
          <MemberChart
            data={data}
            isLoading={isLoading}
            isRefetching={isRefetching}
          />
          <AgeChart
            data={data}
            isLoading={isLoading}
            isRefetching={isRefetching}
          />
          <PieChart
            data={chartData}
            isLoading={isLoading}
            isRefetching={isRefetching}
          />
        </div>
        <div className="w-full h-full lg:flex justify-start items-center hidden font-sans relative">
          <Tabs
            tabs={memberTabs}
            setSelected={setSelectedFilter}
            selected={selectedFilter}
          />
        </div>
        <MemberTable data={data?.members ?? []} />
      </div>
    </Suspense>
  );
}
