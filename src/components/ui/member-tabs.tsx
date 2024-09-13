"use client";
import { motion } from "framer-motion";
import { User, Church, History, Contact2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DIRECTORY } from "@/constants/route-constants";
import React, { useCallback, useMemo } from "react";

// Define the tabs outside to prevent recreation on every render
const tabLists = [
  {
    name: "Personal Information",
    view: "personal",
    icon: User,
  },
  {
    name: "Contact Information",
    view: "contact",
    icon: Contact2Icon,
  },
  {
    name: "Church Information",
    view: "church",
    icon: Church,
  },
  {
    name: "Member History",
    view: "history",
    icon: History,
  },
];

const CreateAndEditTabs = [
  {
    name: "Personal Information",
    view: "personal",
    icon: User,
  },
  {
    name: "Contact Information",
    view: "contact",
    icon: Contact2Icon,
  },
  {
    name: "Church Information",
    view: "church",
    icon: Church,
  },
];

const InfoTabs = React.memo(
  ({
    memberId,
    edit,
    create,
  }: {
    memberId?: string;
    edit?: boolean;
    create?: boolean;
  }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "personal"; // Get the current view from the URL

    const handleTabClick = useCallback(
      (view: string) => {
        if (create) {
          router.push(`${ADMIN_DIRECTORY}/new?view=${view}`);
        } else if (edit) {
          router.push(`${ADMIN_DIRECTORY}/${memberId}/edit?view=${view}`);
        } else {
          router.push(`${ADMIN_DIRECTORY}/${memberId}?view=${view}`);
        }
      },
      [create, edit, memberId, router]
    );
    const tabList = create || edit ? CreateAndEditTabs : tabLists;
    const tabs = useMemo(
      () =>
        tabList.map((tab) => ({
          ...tab,
          selected: tab.view === currentView,
          onClick: () => handleTabClick(tab.view),
        })),
      [currentView, handleTabClick]
    );

    return (
      <div className="my-4 flex gap-2 flex-wrap justify-center lg:justify-normal">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            text={tab.name}
            selected={tab.selected}
            onClick={tab.onClick}
          />
        ))}
      </div>
    );
  }
);

InfoTabs.displayName = "InfoTabs";

export default InfoTabs;

const Tab = React.memo(
  ({
    icon: Icon,
    text,
    selected,
    onClick,
  }: {
    icon: React.ElementType;
    text: string;
    selected: boolean;
    onClick: () => void;
  }) => {
    return (
      <button
        onClick={onClick}
        className={`${
          selected
            ? "text-main !fill-main_primary"
            : "text-slate-400 fill-slate-400 hover:text-slate-500 hover:bg-slate-50"
        } text-xs md:text-sm transition-colors px-1 md:px-2.5 py-1 rounded-md relative`}>
        <span className="relative z-10 flex gap-2 items-center">
          <Icon className="size-4 md:size-5" />
          <span className="mt-0.5">{text}</span>
        </span>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-x-0 origin-bottom bottom-0 z-0 h-1 bg-gradient-to-r from-main to-mainLight rounded-md "></motion.span>
        )}
      </button>
    );
  }
);

Tab.displayName = "Tab";
