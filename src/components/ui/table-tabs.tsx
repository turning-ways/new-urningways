"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Tabs = ({
  tabs,
  setSelected,
  selected,
}: {
  tabs: { name: string }[];
  setSelected: Function;
  selected: { name: string };
}) => {
  useEffect(() => {
    setSelected(tabs[0]);
  }, []);

  return (
    <div className="border-gray-400 border rounded-md flex divide-x">
      {tabs.map((tab, index) => (
        <Chip
          key={index}
          text={tab.name}
          selected={selected.name === tab.name}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
}: {
  text: string;
  selected: boolean;
  setSelected: Function;
}) => {
  return (
    <button
      onClick={() => setSelected({ name: text })}
      className={`${
        selected
          ? "text-white"
          : "text-slate-900 hover:text-slate-500 hover:bg-slate-50"
      } text-sm transition-colors px-2.5 py-1 rounded-md relative`}>
      <span className="relative z-10 flex gap-2 px-2 py-2 items-center">
        {text}
      </span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.5 }}
          className={`absolute inset-0  z-0 h-full bg-gradient-to-r from-blue-300 to-blue-400 ${
            text === "All Members" ? "rounded-s-md" : ""
          } ${
            text === "Upcoming Birthday" ? "rounded-e-md" : ""
          } `}></motion.span>
      )}
    </button>
  );
};

export default Tabs;
