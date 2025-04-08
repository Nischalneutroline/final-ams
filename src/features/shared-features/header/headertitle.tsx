"use client";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu"; // Import the MenuIcon
import { useDispatch } from "react-redux";

import { setOpenSidebarTrue } from "@/state/admin/AdminSlice";
import { useAppSelector } from '@/state/store';

interface HeaderTitleProps {
  icon: React.ReactNode;
  pageTitle: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ icon, pageTitle }) => {
  const dispatch = useDispatch();
  const { isFlag } = useAppSelector((state) => state.admin.admin.sidebar.add);
  return (
    <div className="flex gap-3 justify-between items-center px-2">
      {icon}
      <span className="flex items-end text-[19px] text-white font-[600] leading-[30px] -tracking-[2%]">
        {pageTitle}
      </span>
      <div onClick={() => dispatch(setOpenSidebarTrue(!isFlag))}>
        <MenuIcon sx={{ fontSize: "24px" }} className="text-white" />
      </div>
    </div>
  );
};

export default HeaderTitle;
