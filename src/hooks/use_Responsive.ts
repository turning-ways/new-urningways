"use client";

import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Set the initial value based on the current window width
    checkIsMobile();

    // Update the value when the window is resized
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
