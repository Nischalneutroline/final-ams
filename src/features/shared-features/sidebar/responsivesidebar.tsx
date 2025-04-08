"use client";
import React, { useEffect, useState } from "react";

import Sidebar, { SideBarProps } from "./sidebar";
import MobileSidebar from "./mobilesidebar";

const ResponsiveSidebar = (props: SideBarProps) => {
  const { title, menus } = props;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust breakpoint as needed
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize); // Listen for changes

    return () => window.removeEventListener("resize", checkScreenSize); // Cleanup
  }, []);

  return isMobile ? (
    <MobileSidebar title={title} menus={menus} />
  ) : (
    <Sidebar title={title} menus={menus} />
  );
};

export default ResponsiveSidebar;
