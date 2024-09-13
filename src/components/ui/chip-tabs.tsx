"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import React from "react";

const ChipTabs = ({
  tabs,
  setSelected,
  selected,
  endDate,
  setEndDate,
}: {
  tabs: { name: string; icon?: any }[];
  setSelected: Function;
  selected: { name: string; icon?: any };
  endDate: Date | undefined;
  setEndDate: (date: Date) => void;
}) => {
  useEffect(() => {
    setSelected(tabs[0]);
  }, []);

  useEffect(() => {
    const today = new Date();
    switch (selected.name) {
      case "Till Date":
        setEndDate(today);
        break;
      case "Last Week":
        setEndDate(new Date(today.setDate(today.getDate() - 7)));
        break;
      case "Last Month":
        setEndDate(new Date(today.setMonth(today.getMonth() - 1)));
        break;
      case "Last Quarter":
        setEndDate(new Date(today.setMonth(today.getMonth() - 3)));
        break;
      default:
        setEndDate(today);
        break;
    }
  }, [selected, setEndDate]);

  return (
    <div>
      {tabs.map((tab, index) => (
        <MemoizedChip
          key={index}
          icon={tab.icon}
          text={tab.name}
          selected={selected.name === tab.name}
          setSelected={() => setSelected(tab)}
        />
      ))}
    </div>
  );
};

const Chip = ({
  icon,
  text,
  selected,
  setSelected,
}: {
  icon?: any;
  text: string;
  selected: boolean;
  setSelected: () => void;
}) => {
  return (
    <button
      onClick={setSelected}
      className={`${
        selected
          ? "text-main"
          : "text-slate-900 hover:text-slate-500 hover:bg-slate-50"
      } text-sm transition-colors px-2.5 py-1 rounded-md relative`}>
      <span className="relative z-10 flex gap-2 items-center">
        {icon}
        {text}
      </span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-x-0 origin-bottom bottom-0 z-0 h-1 bg-gradient-to-r from-main to-mainLight rounded-md "></motion.span>
      )}
    </button>
  );
};

// Memoize the Chip component to avoid unnecessary re-renders
const MemoizedChip = React.memo(Chip);

export default ChipTabs;
