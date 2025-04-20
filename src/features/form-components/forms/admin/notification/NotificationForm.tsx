"use client";

import React, { useState } from "react";
import {
  addUserBtnProps,
  cancelBtnProps,
  commonActions,
  fullNameProps,
  messageProps,
  roleProps,
} from "@/features/shared-features/form/formporps";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import { setAddNotificationFormTrue } from "@/state/admin/AdminSlice";
import Button from "@/features/shared-features/common/button";
import SelectInput from "@/features/shared-features/form/selectinput";
import { ReminderCheckboxes } from "@/features/shared-features/form/remindercheckerinput";
import TextInput from "@/features/shared-features/form/inputtext";
import { DaysSelection } from "@/features/shared-features/form/dayinput";
import {
  formDivCss,
  formLabelCss,
  formOuterDivCss,
  formSubmitDivCss,
} from "@/features/shared-features/form/props";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { CheckboxInput } from "@/features/shared-features/form/checkboxinput";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { retriveService } from "@/state/admin/AdminServices";
import { Service } from "../../../../../data/structure";

const ReminderForm = (props: any) => {
  const { serviceOptions } = props;
  const dispatch = useAppDispatch();
  const [reminderType, setReminderType] = useState("Upcoming");
  const [scenario, setScenario] = useState("default");

  // Redux Variable
  const prepareNotification = (notification?: string[]) => {
    if (!notification || !Array.isArray(notification)) return [];
    return notification.map((method) => ({ method }));
  };

  // Submit handler
  const onSubmit = (data: any) => {
    // const notification = data.notification; // Make sure this exists
    // const transformedData = {
    //   ...data,
    //   type: reminderType,
    //   notification: prepareNotification(notification),
    // };

    console.log("Transformed data:", data);
  };
  // const { detials } = useAppSelector(
  //   (state: RootState) => state.admin.admin.service.view.response
  // );

  // React-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
    trigger,
    control,
  } = useForm({});

  const form = {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    watch,
    getValues,
    control,
    trigger,
  };

  const remaining = { actions: commonActions, form, css: {} };

  const notificationOptions = [
    { label: "Email", value: "Email" },
    { label: "SMS", value: "SMS" },
    { label: "Push Notification", value: "Push Notification" },
  ];
  const expireAtOptions = [
    { label: "7 days", value: "7 DAYS" },
    { label: "30 days", value: "30 DAYS" },
    { label: "Never", value: "NEVER" },
  ];
  const upcomingOptions = [
    {
      label: `48 hours before appointment`,
      value: "email",
      offset: 2880,
    },
    {
      label: `24 hours before appointment`,
      value: "sms",
      offset: 1440,
    },
    {
      label: `1 hours before appointment`,
      value: "push",
      offset: 60,
    },
    { label: "Schedule Reminder", value: "schedule", offset: null },
  ];
  const followUpOptions = [
    {
      label: `Same day after appointment`,
      value: "email",
      offset: 2880,
    },
    {
      label: `1 day after appointment`,
      value: "sms",
      offset: 1440,
    },
    {
      label: `2 days after appointment`,
      value: "push",
      offset: 60,
    },
    { label: "Schedule Reminder", value: "schedule", offset: null },
  ];
  const cancelledOptions = [
    {
      label: `Only booked Customer`,
      value: "email",
      offset: 2880,
    },
    {
      label: `Both Customer & Admin`,
      value: "sms",
      offset: 1440,
    },

    { label: "Schedule Reminder", value: "schedule", offset: null },
  ];
  const missedOptions = [
    {
      label: `1 hour after appointment`,
      value: "email",
      offset: 2880,
    },
    {
      label: `24 hours after appointment`,
      value: "sms",
      offset: 1440,
    },
    {
      label: `48 hours after appointment`,
      value: "push",
      offset: 60,
    },
    { label: "Schedule Reminder", value: "schedule", offset: null },
  ];

  const customOptions = [
    { label: "Schedule Reminder", value: "schedule", offset: null },
  ];
  const getReminderOptions = (type: string) => {
    switch (type) {
      case "Upcoming":
        return upcomingOptions;
      case "Follow Up":
        return followUpOptions;
      case "Cancelled":
        return cancelledOptions;
      case "Missed":
        return missedOptions;
      default:
        return [];
    }
  };
  const formObj: any = {
    title: {
      common: fullNameProps({
        input: "title",
        label: "Title",
        placeholder: `Enter a title for this ${reminderType} reminder`,
        showImportant: true,
      }),
      ...remaining,
    },
    description: {
      common: messageProps({
        input: "description",
        label: "Description",
        placeholder: `Enter a short description for this ${reminderType} reminder`,
        showImportant: true,
      }),
      ...remaining,
    },
    message: {
      common: messageProps({
        placeholder:
          "“Your appointment on {selected_appointment_date} for {selected_service_name} has been cancelled. If you’d like to reschedule, please visit your dashboard or contact us.”",
      }),
      ...remaining,
    },
    notification: {
      common: roleProps({
        input: "notification",
        label: "Send Via",
        placeholder: "",
      }),
      options: notificationOptions,
      ...remaining,
    },
    serviceId: {
      common: roleProps({
        input: "serviceId",
        label: "Service",
        placeholder: "Select a service associated with this reminder",
        showImportant: true,
        icon: (
          <MarkUnreadChatAltIcon
            className="text-[#6C757D]"
            sx={{
              fontSize: {
                xs: "16px",
                sm: "16px",
                lg: "16px",
              },
            }}
          />
        ),
      }),
      options: serviceOptions,
      ...remaining,
    },

    appointment: {
      common: roleProps({
        input: "appointment",
        label: "Choose Appointment",
        placeholder: "Select Appointment",
        showImportant: true,
        icon: (
          <MarkUnreadChatAltIcon
            className="text-[#6C757D]"
            sx={{
              fontSize: {
                xs: "16px",
                sm: "16px",
                lg: "16px",
              },
            }}
          />
        ),
      }),
      options: notificationOptions,
      ...remaining,
    },
    expireAt: {
      common: roleProps({
        input: "exprieAt",
        label: "Auto-delete expired reminder after?",
        placeholder: "Short description about this Reminder",
      }),
      options: expireAtOptions,
      selectionType: "single",
      ...remaining,
    },
    reminderOffset: {
      common: roleProps({
        input: "reminderOffset",
        label: "When to send?",
        placeholder: "Enter a Reminder Title for this Appointment",
        type: reminderType,
        icon: (
          <ScheduleSendIcon
            className="text-[#6C757D]"
            sx={{
              fontSize: {
                xs: "16px",
                sm: "16px",
                lg: "16px",
              },
            }}
          />
        ),
      }),
      options: getReminderOptions(reminderType),
      ...remaining,
    },
  };
  const customFormObj: any = {
    scheduleAt: {
      common: roleProps({
        input: "scheduleAt",
        label: "Set Custom Date and Time",
        showImportant: true,
        icon: (
          <ManageHistoryIcon
            className="text-[#6C757D]"
            sx={{
              fontSize: {
                xs: "16px",
                sm: "16px",
                lg: "16px",
              },
            }}
          />
        ),
      }),
      options: customOptions,
      ...remaining,
    },
    notification: {
      common: roleProps({
        input: "notification",
        label: "Send Via",
        placeholder: "",
      }),
      options: notificationOptions,
      ...remaining,
    },
    sendTo: {
      common: roleProps({
        input: "sendTo",
        label: "Send To",
        placeholder: "",
      }),
      options: notificationOptions,
      ...remaining,
    },
    customer: {
      common: roleProps({
        input: "customer",
        label: "Select Customer",
        placeholder: "Select Customer",
        showImportant: true,
      }),
      options: notificationOptions,
      ...remaining,
    },
    host: {
      common: roleProps({
        input: "host",
        label: "Select Host",
        placeholder: "Select Host",
        showImportant: true,
      }),
      options: notificationOptions,
      ...remaining,
    },
    expireAt: {
      common: roleProps({
        input: "exprieAt",
        label: "Auto-delete expired reminder after?",
        placeholder: "Short description about this Reminder",
      }),
      options: expireAtOptions,
      selectionType: "single",
      ...remaining,
    },
    message: {
      common: messageProps({
        placeholder:
          "“Your appointment on {selected_appointment_date} for {selected_service_name} has been cancelled. If you’d like to reschedule, please visit your dashboard or contact us.”",
      }),
      ...remaining,
    },
  };
  const handleCancleButton = () => {
    dispatch(setAddNotificationFormTrue(false));
  };
  return (
    <div className="relative flex flex-col gap-2 pb-8">
      <div className="flex gap-2 items-center justify-start px-16 pt-8">
        <div
          onClick={() => setScenario("default")}
          className={`cursor-pointer border rounded-lg px-4 py-1 transition-colors ${
            scenario === "default"
              ? "bg-blue-500 text-white border-blue-500 shadow-inner shadow-lg"
              : "bg-white text-gray-800 border-gray-400 shadow-inner shadow-lg"
          }`}
        >
          Default
        </div>
        <div
          onClick={() => setScenario("custom")}
          className={`cursor-pointer border rounded-lg px-4 py-1 transition-colors ${
            scenario === "custom"
              ? "bg-blue-500 text-white border-blue-500 shadow-inner shadow-lg"
              : "bg-white text-gray-800 border-gray-400 shadow-inner shadow-lg"
          }`}
        >
          Custom
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={`${formOuterDivCss} `}>
        <div className="flex flex-col gap-2 px-4 py-2 ">
          <div className="flex gap-2 items-center">
            <AllInboxIcon
              className="text-[#6C757D]"
              sx={{
                fontSize: {
                  xs: "16px",
                  sm: "16px",
                  lg: "16px",
                },
              }}
            />
            <div className={formLabelCss}>Reminder Type</div>
          </div>
          <div className="flex justify-between bg-slate-200 px-2 w-full rounded-md h-[38px] items-center">
            <button
              className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
                reminderType === "Upcoming"
                  ? "bg-white text-black"
                  : "bg-slate-200 text-black"
              }`}
              type="button"
              onClick={() => setReminderType("Upcoming")}
            >
              Up-Coming
            </button>
            <button
              className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
                reminderType === "Follow Up"
                  ? "bg-white text-black"
                  : "bg-slate-200 text-black"
              }`}
              type="button"
              onClick={() => setReminderType("Follow Up")}
            >
              Follow-up
            </button>
            <button
              className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
                reminderType === "Cancelled"
                  ? "bg-white text-black"
                  : "bg-slate-200 text-black"
              }`}
              type="button"
              onClick={() => setReminderType("Cancelled")}
            >
              Cancellation
            </button>
            <button
              className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
                reminderType === "Missed"
                  ? "bg-white text-black"
                  : "bg-slate-200 text-black"
              }`}
              type="button"
              onClick={() => setReminderType("Missed")}
            >
              Missed
            </button>
            <button
              className={`flex gap-2 justify-center items-center h-[20px] w-[60px] lg:w-[120px] sm:h-[24px] sm:w-[80px] lg:h-[34px] font-medium   text-[12px] sm:text-[12px] lg:text-[14px] rounded-md cursor-pointer ${
                reminderType === "Custom"
                  ? "bg-white text-black"
                  : "bg-slate-200 text-black"
              }`}
              type="button"
              onClick={() => setReminderType("Custom")}
            >
              Custom
            </button>
          </div>
          <div className="text-[#667085] text-[12px] font-[400] ">
            Notify user about their {reminderType} appointment
          </div>
        </div>
        {scenario === "default" && (
          <div className="flex flex-col gap-2 ">
            <TextInput {...formObj.title} />
            <TextInput {...formObj.description} />
            <SelectInput {...formObj.serviceId} />
            <ReminderCheckboxes {...formObj.reminderOffset} />
            <DaysSelection {...formObj.notification} />
            <CheckboxInput {...formObj.expireAt} />
            <TextInput {...formObj.message} />
          </div>
        )}
        {scenario === "custom" && (
          <>
            <ReminderCheckboxes {...customFormObj.scheduleAt} />
            <DaysSelection {...customFormObj.notification} />
            <DaysSelection {...customFormObj.sendTo} />
            <SelectInput {...customFormObj.customer} />
            <SelectInput {...customFormObj.host} />
            <CheckboxInput {...customFormObj.expireAt} />
            <TextInput {...customFormObj.message} />
          </>
        )}

        <div className={formSubmitDivCss}>
          <Button {...cancelBtnProps(handleCancleButton)} />

          <Button {...addUserBtnProps} />
        </div>
      </form>
    </div>
  );
};

export default ReminderForm;
