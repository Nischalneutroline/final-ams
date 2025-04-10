import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarMenusProps {
  menu: string;
  icon: React.ReactNode;
  path: string;
}
export interface SideBarProps {
  title: string;
  menus: SidebarMenusProps[];
}

const Sidebar = (props: SideBarProps) => {
  const { title, menus } = props;
  const pathname = usePathname();
  return (
    <div className="absolute top-[12px] left-[20px] h-[calc(100vh-20px)] min-w-[265px] bg-[#FFFFFF] text-gray-600 rounded-[24px] shadow-lg px-8 py-8 flex flex-col gap-20 z-[10]">
      <div className="text-black font-bold text-[23px] leading-[150%] ">
        {title}
      </div>
      <div className="flex flex-col gap-10">
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
                <span className="">{menu.menu}</span>
              </Link>
            </nav>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
