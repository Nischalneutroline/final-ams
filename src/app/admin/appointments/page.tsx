"use client";
import AppointmentPageHeader from "@/features/appointment/components/appointmentpageheader";
import AppointmentCardView from "@/features/shared-features/cards/AppointmentCardView";
import { UserColumns } from "@/features/shared-features/table/columns";
import { usersData } from "@/features/shared-features/table/data";
import { AppointmentDataTable } from "@/features/shared-features/table/data-table/appointmentdata-table";
import { RootState, useAppSelector } from "@/state/store";

import React from "react";

const page = () => {
  const { view } = useAppSelector(
    (state: RootState) => state.admin.admin.appointment?.viewType
  );
  return (
    <div className="flex flex-col gap-4">
      <AppointmentPageHeader />
      {view ? (
        <AppointmentDataTable data={usersData} columns={UserColumns} />
      ) : (
        <AppointmentCardView user={usersData} />
      )}
    </div>
  );
};

export default page;
