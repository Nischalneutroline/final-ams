import AdminPageHeader from "@/features/customer/components/adminpageheader";
import TicketPageHeader from "@/features/customer/components/ticketpageheader";
import {
  AppointmentColumns,
  TicketsColumns,
} from "@/features/shared-features/table/columns";
import { TicketsDataTable } from "@/features/shared-features/table/data-table/ticketsdata-table";
import React from "react";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-10 w-full px-3 sm:px-20 pt-4 ">
      <div className="w-[100%] h-[53px] flex flex-col justify-start  gap-4 rounded-md px-[11px]">
        <AdminPageHeader />
        <TicketsDataTable columns={TicketsColumns} />
      </div>
    </div>
  );
};

export default AdminPage;
