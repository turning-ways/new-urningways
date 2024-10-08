'use client';
import { motion } from 'framer-motion';
import { User, Church, History, Contact2Icon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

// Define the tabs outside to prevent recreation on every render
const tabLists = [
  {
    name: 'Personal Information',
    smallerName: 'Personal',
    view: 'personal',
    icon: User,
  },
  {
    name: 'Contact Information',
    smallerName: 'Contact',
    view: 'contact',
    icon: Contact2Icon,
  },
  {
    name: 'Church Information',
    smallerName: 'Church',
    view: 'church',
    icon: Church,
  },
  {
    name: 'Member History',
    smallerName: 'History',
    view: 'history',
    icon: History,
  },
];

const CreateAndEditTabs = [
  {
    name: 'Personal Information',
    smallerName: 'Personal',
    view: 'personal',
    icon: User,
  },
  {
    name: 'Contact Information',
    smallerName: 'Contact',
    view: 'contact',
    icon: Contact2Icon,
  },
  {
    name: 'Church Information',
    smallerName: 'Church',
    view: 'church',
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
    const { churchId } = useParams();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'personal'; // Get the current view from the URL

    const handleTabClick = useCallback(
      (view: string) => {
        if (create) {
          router.push(`/admin/${churchId}/directory/new?view=${view}`);
        } else if (edit) {
          router.push(
            `/admin/${churchId}/directory/${memberId}/edit?view=${view}`,
          );
        } else {
          router.push(`/admin/${churchId}/directory/${memberId}?view=${view}`);
        }
      },
      [create, edit, memberId, router],
    );
    const tabList = create || edit ? CreateAndEditTabs : tabLists;
    const tabs = useMemo(
      () =>
        tabList.map((tab) => ({
          ...tab,
          selected: tab.view === currentView,
          onClick: () => handleTabClick(tab.view),
        })),
      [currentView, handleTabClick],
    );

    return (
      <div className="my-4 flex gap-2 flex-wrap justify-center lg:justify-normal">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            text={tab.name}
            smallText={tab.smallerName}
            selected={tab.selected}
            onClick={tab.onClick}
          />
        ))}
      </div>
    );
  },
);

InfoTabs.displayName = 'InfoTabs';

export default InfoTabs;

const Tab = React.memo(
  ({
    icon: Icon,
    text,
    smallText,
    selected,
    onClick,
  }: {
    icon: React.ElementType;
    text: string;
    smallText: string;
    selected: boolean;
    onClick: () => void;
  }) => {
    return (
      <button
        onClick={onClick}
        className={`${
          selected
            ? 'text-main !fill-main_primary'
            : 'text-slate-400 fill-slate-400 hover:text-slate-500 hover:bg-slate-50'
        } text-xs md:text-sm transition-colors px-1 md:px-2.5 py-1 rounded-md relative`}
      >
        <span className="relative z-10 flex gap-2 items-center">
          <Icon className="size-4 md:size-5" />
          <span className="mt-0.5 hidden md:flex">{text}</span>
          <span className="mt-0.5 flex md:hidden">{smallText}</span>
        </span>
        {selected && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: 'spring', duration: 0.5 }}
            className="absolute inset-x-0 origin-bottom bottom-0 z-0 h-1 bg-gradient-to-r from-main to-mainLight rounded-md "
          ></motion.span>
        )}
      </button>
    );
  },
);

Tab.displayName = 'Tab';
