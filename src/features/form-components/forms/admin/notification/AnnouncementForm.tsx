"use client";

import React, { useState } from "react";
import {
  addUserBtnProps,
  cancelBtnProps,
  commonActions,
  messageProps,
  roleProps,
} from "@/features/shared-features/form/formporps";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/state/store";
import { setAddNotificationFormTrue } from "@/state/admin/AdminSlice";
import Button from "@/features/shared-features/common/button";
import SelectInput from "@/features/shared-features/form/selectinput";
import { ReminderCheckboxes } from "@/features/shared-features/form/remindercheckerinput";
import TextInput from "@/features/shared-features/form/inputtext";
import { DaysSelection } from "@/features/shared-features/form/dayinput";
import { CheckboxInput } from "@/features/shared-features/form/checkboxinput";
import { CheckboxWithSchedule } from "@/features/shared-features/form/checkboxwithschedule";
import { XIcon } from "lucide-react";
import { Message } from "@mui/icons-material";
import { formSubmitDivCss } from "@/features/shared-features/form/props";

const AnnouncementForm = () => {
  const [reminderType, setReminderType] = useState("REMINDER");

  // Redux Variable
  const dispatch = useAppDispatch();

  const prepareNotification = (notification?: string[]) => {
    if (!notification || !Array.isArray(notification)) return [];
    return notification.map((method) => ({ method }));
  };

  const extractDateTime = (dateStr: string, timeStr: string): string | null => {
    try {
      const date = new Date(dateStr);
      const time = new Date(timeStr);

      // Add one day to the date
      const merged = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1, // ✅ Add one day
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );

      return merged.toISOString(); // 👉 "2025-05-23T09:30:00.000Z"
    } catch (err) {
      console.error("Error parsing date/time:", err);
      return null;
    }
  };
  // Submit handler
  const onSubmit = (data: any) => {
    const showOn = data.showOn[0].method;
    const title = data.title;
    const description = data.description;
    const message = data.message;
    const audience = data.targetAudience;
    const expiredAt = data.expiryReminder[0].method;
    const isImmediate =
      data.announcement[0].method === "Immediately" ? true : false;
    let scheduledAt: string | null = null;

    if (isImmediate) {
      scheduledAt = new Date().toISOString(); // ✅ use current time
    } else {
      scheduledAt = extractDateTime(
        data.scheduledTime.date,
        data.scheduledTime.time
      ); // ✅ use extracted +1 day
    }
    // const scheduledTime = data.scheduledTime || {};

    // const hasDate = scheduledTime?.date;
    // const hasTime = scheduledTime?.time;

    // const isValidDate = (val: any) =>
    //   typeof val === "string" && val.trim().length > 0;
    // const isValidTime = (val: any) =>
    //   typeof val === "string" && val.trim().length > 0;

    // const isImmediate = !(isValidDate(hasDate) && isValidTime(hasTime));

    // let scheduledAt: string | null = null;
    // if (!isImmediate) {
    //   const isoString = new Date(`${hasDate}T${hasTime}`);
    //   if (!isNaN(isoString.getTime())) {
    //     scheduledAt = isoString.toISOString();
    //   } else {
    //     console.error("Invalid date/time:", hasDate, hasTime);
    //   }
    // }

    // const transformedData = {
    //   title: data.title,
    //   description: data.description || "",
    //   message: data.message || "",
    //   audience: data.targetAudience || "ALL",
    //   isImmediate,
    //   scheduledAt,
    //   showOn: data.showOn?.[0]?.method || "BANNER", // this must match Prisma enum type
    //   expiredAt: data.expiryReminder?.[0]?.method || "THIRTY_DAYS", // also must match Prisma enum
    // };
    const transformedData = {
      title,
      description,
      message,
      audience,
      isImmediate,
      scheduledAt,
      showOn,
      expiredAt,
      type: reminderType, // assuming reminderType is available in the scope
    };
    console.log(data);
    console.log(transformedData, "transformedData");

    // Optional: send to API
    // await fetch("/api/announcements", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(transformedData),
    // });
  };

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

  const targetAudienceOptions = [
    { label: "Appointments Users", value: "APPOINTED_USERS" },
    { label: "Cancelled Users", value: "CANCELLED_USERS" },
    { label: "All", value: "ALL" },
  ];
  const announcemnetOptions = [
    { label: "Immediately", value: "Immediately", showSchedule: false },
    { label: "Schedule", value: "Schedule", showSchedule: true },
  ];

  const showOnOptions = [
    { label: "Top Banner", value: "BANNER", showSchedule: false },
    {
      label: "Push Notification",
      value: "PUSH_NOTIFICATION",
      showSchedule: false,
    },
    {
      label: "Email",
      value: "Email",
      showSchedule: false,
    },
    {
      label: "All",
      value: "ALL",
      showSchedule: false,
    },
  ];
  const expiryReminderOptions = [
    { label: "1 day", value: "ONE_DAY", showSchedule: false },
    {
      label: "3 days",
      value: "THREE_DAYS",
      showSchedule: false,
    },
    {
      label: "7 days",
      value: "SEVEN_DAYS",
      showSchedule: false,
    },
    {
      label: "30 days",
      value: "THIRTY_DAYS",
      showSchedule: false,
    },
    {
      label: "Never",
      value: "NEVER",
      showSchedule: false,
    },
  ];
  const formObj: any = {
    message: {
      common: messageProps({
        placeholder: "Enter a message to show with announcement.",
      }),
      ...remaining,
    },
    customer: {
      common: roleProps({
        input: "customer",
        label: "Select Customer",
        placeholder: "Select Customer",
      }),
      options: targetAudienceOptions,

      ...remaining,
    },
    host: {
      common: roleProps({
        input: "host",
        label: "Select Host",
        placeholder: "Select Host",
      }),
      options: targetAudienceOptions,

      ...remaining,
    },
    targetAudience: {
      common: roleProps({
        input: "targetAudience",
        label: "Target Audience",
        placeholder: "Select a service associated with this reminder",
      }),
      options: targetAudienceOptions,
      ...remaining,
    },
    announcement: {
      common: roleProps({
        input: "announcement",
        label: "Schedule Announcement",
        placeholder: "",
      }),
      options: announcemnetOptions,
      ...remaining,
    },
    showOn: {
      common: roleProps({
        input: "showOn",
        label: "Show On",
        placeholder: "",
      }),
      options: showOnOptions,
      ...remaining,
    },
    expiryReminder: {
      common: roleProps({
        input: "expiryReminder",
        label: "Expiry Reminder",
        placeholder: "",
      }),
      options: expiryReminderOptions,
      ...remaining,
    },

    title: {
      common: roleProps({
        input: "title",
        label: "Announcement Titile",
        placeholder: "Enter a Announcement Title for this Appointment",
      }),

      ...remaining,
    },
    description: {
      common: roleProps({
        input: "description",
        label: "Announcement Description",
        placeholder: "Short description about this Reminder",
        type: "textbox",
      }),

      ...remaining,
    },
    reminderOffset: {
      common: roleProps({
        input: "reminderOffset",
        label: "Announcement Offset",
        placeholder: "Enter a Reminder Title for this Appointment",
        type: reminderType,
      }),

      ...remaining,
    },
  };
  const handleCancleButton = () => {
    dispatch(setAddNotificationFormTrue(false));
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-2 sm:gap-4 px-4 w-full"
    >
      <TextInput {...formObj.title} />
      <TextInput {...formObj.description} />
      <TextInput {...formObj.message} />

      <CheckboxInput {...formObj.targetAudience} selectionType="single" />

      <CheckboxWithSchedule {...formObj.announcement} selectionType="single" />
      <CheckboxWithSchedule {...formObj.showOn} selectionType="single" />
      <CheckboxWithSchedule
        {...formObj.expiryReminder}
        selectionType="single"
      />

      <div className={formSubmitDivCss}>
        <Button {...cancelBtnProps(handleCancleButton)} />

        <Button {...addUserBtnProps} />
      </div>
    </form>
  );
};

export default AnnouncementForm;
