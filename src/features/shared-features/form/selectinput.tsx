/* eslint-disable @typescript-eslint/no-explicit-any */

import { SelectInputSchema } from "@/schemas/schema";
import { getFormErrorMsg } from "@/utils/utils";
import { FormSpanError } from "./error/fromspanerror";
import { formInputCss, formErrorCss, formDivCss, formLabelCss } from "./props";
import { ChevronDown } from "lucide-react"; // You can replace this with any icon

export default function SelectInput(props: SelectInputSchema) {
  const { common, actions, form, css, options } = props;
  const { input, label, defaultValue, placeholder, showImportant, icon } =
    common;
  const { register, errors } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } = actions!;
  const { divCss, labelCss, inputCss, errorCss } = css!;

  const errorMsg = getFormErrorMsg(errors, input);

  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;
  const finalInputCss = inputCss ?? formInputCss;

  const highlightBorder =
    "border focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";
  const errorBorder =
    "border border-red-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400";
  const border = errorMsg ? errorBorder : highlightBorder;

  const errorProps = {
    css: { customCss: errorCss ?? formErrorCss },
    title: errorMsg,
  };

  return (
    <div className={`${finalDivCss}`}>
      {label && (
        <label className={finalLabelCss} htmlFor={input}>
          {icon && icon} {label}
          {showImportant && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* Relative wrapper for icon positioning */}
      <div className="relative w-full">
        <select
          id={`${input}`}
          {...register(input)}
          className={`${finalInputCss} ${border} appearance-none pr-10`} // Ensure padding-right for icon space
          placeholder={placeholder}
          key={`${input}-select`}
          defaultValue={defaultValue || ""}
          onClick={handleClick}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        >
          <option key={"placeholder"} value="" disabled hidden>
            {placeholder || "Select an option"}
          </option>
          {options?.map((item: any, idx: number) => (
            <option key={`${idx}. ${item.value}`} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Icon */}
        <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2  -translate-x-[10px] text-gray-500">
          <ChevronDown size={18} />
        </div>
      </div>

      <div className="-translate-y-17">
        {errorMsg && <FormSpanError {...errorProps} />}
      </div>
    </div>
  );
}
