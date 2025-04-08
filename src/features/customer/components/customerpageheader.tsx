"use client";
import React, { ReactEventHandler, useState } from "react";
import Button from "@/features/shared-features/common/button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setAddCustomerFormTrue } from "@/state/admin/AdminSlice";

import { RootState, useAppSelector } from "@/state/store";

import { setCustomerView } from "@/state/admin/AdminSlice";
import { IdCard, Sheet } from "lucide-react";
import { Button1 } from "@/features/shared-features/table/components/ui/button";
const CustomerPageHeader = () => {
  const [selectedView, setSelectedView] = useState<String>("");
  const dispatch = useDispatch();
  const { view } = useAppSelector(
    (state: RootState) => state.admin.admin.user?.viewType
  );

  const handleButtonClick = (e: ReactEventHandler) => {
    dispatch(setAddCustomerFormTrue(true));
  };

  return (
    <div className="w-full flex justify-between lg:max-w-[calc(100vw-370px)]">
      {/* Page Header Title */}
      <div className=" flex flex-col">
        <div className=" flex gap-4 items-center">
          <div className="font-semibold text-lg">Customers</div>
          <div className="flex items-center px-2 h-[25px] bg-blue-50 text-blue-400 text-sm rounded-xl">
            Today
          </div>
        </div>
        <div className="text-[#667085] text-[13px] sm:text-sm lg:text-md tracking-wide">
          View and Manage Your Customer here.
        </div>
      </div>

      {/* Page Header View and Post Form*/}

      <div className="flex gap-4 justify-between items-center">
        <Button1
          variant="outline"
          size="sm"
          onClick={() => dispatch(setCustomerView(!view))}
        >
          {view ? (
            <Sheet className="mr-2 size-4" />
          ) : (
            <IdCard className="mr-2 size-5" />
          )}
          {view ? "Card" : "Table"} View
        </Button1>
        <div className="flex items-center">
          <Button
            css={{
              customCss:
                "flex gap-2 justify-center items-center w-[170px] h-[38px] bg-[#0070FF] font-medium text-white text-[14px] rounded-md cursor-pointer",
            }}
            title="Add Customer"
            icon={
              <AddIcon
                className="text-white"
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "20px",
                    lg: "22px",
                    xl: "24px",
                  },
                }}
              />
            }
            handleAction={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerPageHeader;
