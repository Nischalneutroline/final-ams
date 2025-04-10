"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RootState, useAppSelector } from "@/state/store";

export interface SidebarMenusProps {
  menu: string;
  icon: React.ReactNode;
  path: string;
}
export interface SideBarProps {
  title: string;
  menus: SidebarMenusProps[];
}

const sidebarVariants = {
  hidden: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};
const MobileSidebar = (props: SideBarProps) => {
  const { menus } = props;
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.sidebar.add
  );
  const pathname = usePathname();
  return (
    <motion.div
      className="absolute top-[12px] left-[20px] h-[calc(100vh-20px)] max-w-[60px] bg-[#FFFFFF] text-gray-600 rounded-[24px] shadow-lg px-8 py-8 flex flex-col gap-20 z-[10]"
      initial="hidden"
      animate={isFlag ? "visible" : "hidden"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col gap-10 mt-20 items-center">
        {menus?.map((menu: SidebarMenusProps, index: number) => {
          const isActive = pathname === menu.path;
          return (
            <nav className="flex " key={index}>
              <Link
                href={menu.path}
                className={`flex items-center gap-3 font-semibold ${
                  isActive ? "text-[#287AFF]" : " text-gray-500"
                } hover:text-[#287AFF]`}
              >
                {menu.icon}
              </Link>
            </nav>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileSidebar;
