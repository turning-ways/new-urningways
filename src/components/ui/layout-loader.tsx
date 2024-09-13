"use client";

import { LoadingSpinner } from "./loading-spinner"; // Assuming you already have this
import { motion } from "framer-motion";

export default function LayoutLoader({
  text = "Loading...",
}: {
  text?: string;
}) {
  const animation = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.8],
      color: ["#555", "#333", "#555"], // Cycle through different text colors
    },
  };

  return (
    <div className="flex h-[calc(100vh-16px)] items-center justify-center">
      <LoadingSpinner />
      <motion.div
        className="ml-4 text-lg font-semibold"
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        variants={animation}>
        {text}
      </motion.div>
    </div>
  );
}
