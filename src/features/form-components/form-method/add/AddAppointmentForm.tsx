"use client";

import {
  AdminUserFormValues,
  adminAppointmentSchema,
  adminUserSchema,
} from "@/schemas/validation/validationSchema";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commonActions,
  dateProps,
  emailProps,
  fullNameProps,
  messageProps,
  phoneProps,
  serviceProps,
  timeProps,
} from "@/features/shared-features/form/formporps";
import CenterSection from "@/features/shared-features/section/centersection";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useForm } from "react-hook-form";
import { RootState, useAppSelector } from "@/state/store";
import { useDispatch } from "react-redux";
import { setAddAppointmentFormTrue } from "@/state/admin/AdminSlice";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentForm from "../../forms/admin/AppointmentForm";

const AddAppointmentForm = () => {
  // Redux Variable
  const dispatch = useDispatch();
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.appointment.add
  );

  // Submit handler
  const onSubmit = (data: AdminUserFormValues) => {
    console.log("Form Submitted:", data);
    reset();
    dispatch(setAddAppointmentFormTrue(false));
  };

  //  Ref for closing modal on outside click
  const formRef = useRef<HTMLDivElement>(null);

  // React-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
    control,
    trigger,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(adminAppointmentSchema),
  });

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

  const options = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Staff", value: "staff" },
  ];

  const formObj: any = {
    full_name: {
      common: fullNameProps({}),
      ...remaining,
    },
    email: {
      common: emailProps({}),
      ...remaining,
    },
    phone_number: {
      common: phoneProps({}),
      ...remaining,
    },
    service: {
      common: serviceProps({}),
      options,
      ...remaining,
    },
    date: {
      common: dateProps({}),
      ...remaining,
    },
    time: { common: timeProps({}), ...remaining },
    message: { common: messageProps({}), ...remaining },
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popup = document.querySelector(
        '.MuiPickersPopper-root, [role="dialog"]'
      );
      const clickedInsideCalendar =
        popup?.contains(event.target as Node) ?? false;
      const clickedInsideForm =
        formRef.current?.contains(event.target as Node) ?? false;

      if (!clickedInsideForm && !clickedInsideCalendar) {
        reset();
        dispatch(setAddAppointmentFormTrue(false));
      }
    };
    if (isFlag) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlag, dispatch]);
  return (
    <AnimatePresence>
      {isFlag && (
        <CenterSection>
          <motion.div
            ref={formRef}
            initial={{ y: 50, scale: 0.9 }}
            animate={{ y: 0, scale: [0.9, 1.02, 1] }}
            exit={{ y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className=" lg:pb-8 w-[90%] sm:w-[75%] lg:w-[60%] bg-white rounded-2xl shadow-xl flex flex-col overflow-y-auto px-4"
          >
            <div className="relative h-[120px] lg:h-[140px]  flex flex-col text-black justify-items-center  py-8 px-4">
              <div className="flex items-center justify-start space-x-4  pt-3 px-2">
                {/* <PersonAddAltIcon
                  sx={{
                    fontSize: {
                      xs: "20px",
                      sm: "22px",
                      lg: "24px",
                      xl: "28px",
                    },
                  }}
                /> */}
                <div className="text-[20px] sm:text-[22px] md:text-[24px] 2xl:text-[28px] font-medium md:font-semibold  text-[#287AFF]">
                  Add Appointment
                </div>
              </div>
              <div className="flex justify-start text-center text-[11px] sm:text-[13px] lg:text-[14px] text-[#455A64] px-2">
                You’re creating an account on behalf of a user. Please ensure
                accuracy. ⚠️
              </div>
              <div
                className="absolute top-3 right-4 text-red-600 cursor-pointer"
                onClick={(e: any) => dispatch(setAddAppointmentFormTrue(false))}
              >
                <CloseIcon />
              </div>
            </div>
            <AppointmentForm formObj={formObj} form={form} />
          </motion.div>
        </CenterSection>
      )}
    </AnimatePresence>
  );
};

export default AddAppointmentForm;
