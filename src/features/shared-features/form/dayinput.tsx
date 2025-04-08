/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { InputSchema } from "@/schemas/schema";
import { getFormErrorMsg } from "@/utils/utils";
import { useState, useEffect, useRef } from "react";
import { FormSpanError } from "./error/fromspanerror";
import { formDivCss, formLabelCss, formErrorCss, formInputCss } from "./props";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const daysOfWeek = [
  { label: "Mon", value: "Monday" },
  { label: "Tue", value: "Tuesday" },
  { label: "Wed", value: "Wednesday" },
  { label: "Thu", value: "Thursday" },
  { label: "Fri", value: "Friday" },
  { label: "Sat", value: "Saturday" },
  { label: "Sun", value: "Sunday" },
];

export function DaysSelection(props: InputSchema) {
  // Props
  const { common, form, css } = props;
  // Props variables
  const { input, label } = common;
  const { setValue, errors } = form;
  const { divCss, labelCss, errorCss } = css!;

  // States
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Values
  const errorMsg = getFormErrorMsg(errors, input);

  // Css
  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;

  // Update form value when selectedDays changes
  useEffect(() => {
    setValue(input, selectedDays); // Register the selected days to React Hook Form
  }, [selectedDays, setValue, input]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className={finalDivCss}>
      {label && (
        <label className={finalLabelCss} htmlFor={input}>
          {label}
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDays.includes(day.value);
          return (
            <div
              key={day.value}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleDay(day.value)}
            >
              {/* Checkbox Icon */}
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-sm border transition-all
                  ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-400 text-gray-500"
                  }`}
              >
                {isSelected ? "✓" : "-"}
              </div>
              {/* Day Label */}
              <span
                className={`border px-4 py-[6px] rounded-md transition-all
                  ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-400 text-black"
                  }`}
              >
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <FormSpanError
          css={{ customCss: errorCss ?? formErrorCss }}
          title={errorMsg}
        />
      )}
    </div>
  );
}

export function DateInput(props: InputSchema) {
  const { common, actions, form, css } = props;
  const { input, label, defaultValue, placeholder, showImportant, icon } =
    common;
  const { register, errors, trigger, control } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } =
    actions || {};
  const { divCss, labelCss, inputCss, errorCss } = css || {};

  const errorMsg = getFormErrorMsg(errors, input);

  const highlightBorder =
    "border focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const errorBorder =
    "border border-red-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400";
  const border = errorMsg ? errorBorder : highlightBorder;

  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;
  const finalInputCss = inputCss ?? formInputCss;

  const errorProps = {
    css: { customCss: errorCss ?? formErrorCss },
    title: errorMsg,
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await trigger(input);
    if (handleOnChange) {
      handleOnChange(e);
    }
  };

  return (
    <div className={`${finalDivCss}  min-w-[150px]`}>
      {label && (
        <label
          // className="text-black font-semibold flex gap-2 text-[12px] sm:text-[14px] lg:text-[16px] 2xl:text-[18px] items-center"
          className={finalLabelCss}
          htmlFor={input}
        >
          {icon && icon} {label}
          {showImportant && <span className="text-red-400">*</span>}
        </label>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={input}
          control={control}
          defaultValue={defaultValue ?? ""}
          render={({ field }) => (
            <DatePicker
              className="datePicker"
              value={field.value || null}
              onChange={(newValue) => field.onChange(newValue)}
              slotProps={{
                textField: {
                  id: input,
                  placeholder,
                  onClick: handleClick,
                  onKeyDown: handleKeyDown,
                  onKeyUp: handleKeyUp,

                  error: false,
                  sx: {
                    "& .MuiInputBase-root": {
                      borderRadius: "0.375rem", // rounded-md
                      height: {
                        xs: "36px",
                        sm: "40px",
                        lg: "45px",
                      },
                      display: "flex",
                      px: "0.5rem", // px-2
                      gap: "0.25rem", // gap-1
                      fontSize: "13px",
                      color: "black",
                      backgroundColor: "#F8F9FA",
                      borderColor: "#cbd5e0", // border-gray-400
                      width: "100%",
                      alignItems: "center",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cbd5e0", // border-gray-400
                    },
                  },
                },
              }}
            />
          )}
        />
      </LocalizationProvider>

      <div className="-translate-y-17">
        {errorMsg && <FormSpanError {...errorProps} />}
      </div>
    </div>
  );
}

export function TimeInput(props: InputSchema) {
  const { common, actions, form, css } = props;
  const { input, label, defaultValue, placeholder, showImportant, icon } =
    common;
  const { register, errors, trigger, control } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } =
    actions || {};
  const { divCss, labelCss, inputCss, errorCss } = css || {};

  const errorMsg = getFormErrorMsg(errors, input);

  const highlightBorder =
    "border focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const errorBorder =
    "border border-red-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400";
  const border = errorMsg ? errorBorder : highlightBorder;

  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;
  const finalInputCss = inputCss ?? formInputCss;

  const errorProps = {
    css: { customCss: errorCss ?? formErrorCss },
    title: errorMsg,
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await trigger(input);
    if (handleOnChange) {
      handleOnChange(e);
    }
  };

  return (
    <div className={`${finalDivCss}  min-w-[150px]`}>
      {label && (
        <label
          // className="text-black font-semibold flex gap-2 text-[12px] sm:text-[14px] lg:text-[16px] 2xl:text-[18px] items-center"
          className={finalLabelCss}
          htmlFor={input}
        >
          {icon && icon} {label}
          {showImportant && <span className="text-red-400">*</span>}
        </label>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={input}
          control={control}
          defaultValue={defaultValue ?? ""}
          render={({ field }) => (
            <TimePicker
              className="datePicker"
              value={field.value || null}
              onChange={(newValue: string) => field.onChange(newValue)}
              slotProps={{
                textField: {
                  id: input,
                  placeholder,
                  onClick: handleClick,
                  onKeyDown: handleKeyDown,
                  onKeyUp: handleKeyUp,
                  error: false,
                  sx: {
                    "& .MuiInputBase-root": {
                      borderRadius: "0.375rem", // rounded-md
                      height: {
                        xs: "36px", // Default for small screens
                        sm: "40px", // Medium screens
                        lg: "45px", // Large screens
                      },
                      display: "flex",
                      px: "0.5rem", // px-2
                      gap: "0.25rem", // gap-1
                      fontSize: "13px", // Adjust font size
                      color: "black",
                      backgroundColor: "#F8F9FA",
                      borderColor: "#cbd5e0", // border-gray-400
                      width: "100%",
                      alignItems: "center",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#cbd5e0", // border-gray-400
                    },
                  },
                },
              }}
            />
          )}
        />
      </LocalizationProvider>

      <div className="-translate-y-17">
        {errorMsg && <FormSpanError {...errorProps} />}
      </div>
    </div>
  );
}
