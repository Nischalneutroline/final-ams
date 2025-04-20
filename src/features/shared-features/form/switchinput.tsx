import { InputSchema } from "@/schemas/schema";
import { getFormErrorMsg } from "@/utils/utils";
import { FormSpanError } from "./error/fromspanerror";
import { formDivCss, formLabelCss, formInputCss, formErrorCss } from "./props";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";

export default function SwitchInput(props: InputSchema) {
  const { common, actions, form, css } = props;
  const {
    input,
    label,
    defaultValue,
    showImportant,
    icon,
    leftLabel,
    rightLabel,
  } = common;
  const { register, errors, setValue } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } =
    actions! || {};
  const { divCss, labelCss, inputCss, errorCss } = css || {};

  // Watch the value inside the form

  const [isChecked, setIsChecked] = useState<boolean>(defaultValue ?? false);

  useEffect(() => {
    console.log("Default:", defaultValue);
    setIsChecked(defaultValue ?? false);
  }, [defaultValue]);

  useEffect(() => {
    setValue(input, isChecked); // Ensure form state updates
  }, [isChecked, setValue, input]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setValue(input, event.target.checked); // Update form state

    // Trigger custom onChange handler
    if (handleOnChange) handleOnChange(event);
  };

  const errorMsg = getFormErrorMsg(errors, input);

  // Final CSS values
  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;
  const finalInputCss = inputCss ?? formInputCss;
  const errorProps = {
    css: { customCss: errorCss ?? formErrorCss },
    title: errorMsg,
  };

  return (
    <>
      {leftLabel || rightLabel ? (
        <div className={`${finalDivCss} px-2 min-w-[150px]`}>
          {label && (
            <label className={finalLabelCss} htmlFor={input}>
              {icon && icon} {label}
              {showImportant && <span className="text-red-400">*</span>}
            </label>
          )}

          <div className="flex items-center h-[40px] sm:h-[35px] lg:h-[40px] 2xl:h-[45px] space-x-2">
            <span className="text-sm text-gray-600">
              {props.common?.leftLabel || "Off"}
            </span>

            <Switch
              id={input}
              {...(register && register(input))}
              checked={isChecked}
              onChange={handleSwitchChange}
              onClick={handleClick}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              className={` rounded-md text-black  ${finalInputCss}`}
            />

            <span className="text-sm text-gray-600">
              {props.common?.rightLabel || "On"}
            </span>
          </div>

          <div className="-translate-y-17">
            {errorMsg && <FormSpanError {...errorProps} />}
          </div>
        </div>
      ) : (
        <div className={`${finalDivCss}  flex flex-row items-center gap-4`}>
          {label && (
            <label className={`${finalLabelCss}`} htmlFor={input}>
              {icon && icon} {label}
              {showImportant && <span className="text-red-400">*</span>}
            </label>
          )}

          <Switch
            id={input}
            {...(register && register(input))}
            onChange={handleSwitchChange}
            onClick={handleClick}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            className={`
    ${finalInputCss}
  `}
          />

          <div className="-translate-y-17">
            {errorMsg && <FormSpanError {...errorProps} />}
          </div>
        </div>
      )}
    </>
  );
}
