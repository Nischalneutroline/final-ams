"use client";
import Button from "@/features/shared-features/common/button";

import { addUserBtnProps } from "@/features/shared-features/form/formporps";

import TextInput from "@/features/shared-features/form/inputtext";
import PasswordInput from "@/features/shared-features/form/passwordinput";
import InputPhone from "@/features/shared-features/form/phoneinput";
import SelectInput from "@/features/shared-features/form/selectinput";
import SwitchInput from "@/features/shared-features/form/switchinput";
import React from "react";
import { cancelBtnProps } from "../../../shared-features/form/formporps";
import {
  setAddAppointmentFormTrue,
  setAddCustomerFormTrue,
} from "@/state/admin/AdminSlice";
import { useDispatch } from "react-redux";
import { DateInput, TimeInput } from "@/features/shared-features/form/dayinput";

const AppointmentForm = (props: any) => {
  const { formObj, form } = props;

  const { handleSubmit, onSubmit } = form;

  const dispatch = useDispatch();

  const handleCancleButton = () => {
    dispatch(setAddAppointmentFormTrue(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-2 sm:gap-4 px-4"
    >
      <TextInput {...formObj.full_name} />

      <TextInput {...formObj.email} />

      <TextInput {...formObj.phone_number} />

      <SelectInput {...formObj.service} />
      <div className="flex justify-between items-center">
        <DateInput {...formObj.date} />
        <TimeInput {...formObj.time} />
      </div>
      <TextInput {...formObj.message} />

      <div className=" flex mb-4 w-full justify-center bottom-4 gap-4">
        <Button {...cancelBtnProps(handleCancleButton)} />

        <Button {...addUserBtnProps} />
      </div>
    </form>
  );
};

export default AppointmentForm;
