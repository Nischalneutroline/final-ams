/* eslint-disable @typescript-eslint/no-explicit-any */
// These are custom styles you may have or need to define

import { InputSchema } from "@/schemas/schema";
import { getFormErrorMsg } from "@/utils/utils";
import { FormSpanError } from "./error/fromspanerror";
import {
  formDivCss,
  formLabelCss,
  formInputCss,
  formSwitchDivCss,
} from "./props";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";

export default function SwitchInput(props: InputSchema) {
  // Props
  const { common, actions, form, css } = props;

  // Props variables
  const { input, label, defaultValue } = common;

  const { register, errors, setValue, watch } = form;
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } = actions!;
  const { divCss, labelCss, inputCss } = css!;

  // Watch the value inside the form
  const watchedValue = watch(input, defaultValue ?? false);

  // State (We control the Switch)
  const [isChecked, setIsChecked] = useState<boolean>(defaultValue ?? false);

  // Sync state with form
  useEffect(() => {
    setValue(input, isChecked); // Ensure form state updates
  }, [isChecked, setValue, input]);

  // Handle Switch Toggle
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setValue(input, event.target.checked); // Manually update form state
  };

  // Values
  const errorMsg = getFormErrorMsg(errors, input);

  // Css
  const finalDivCss = divCss ?? formSwitchDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;
  const finalInputCss = inputCss ?? formInputCss;
  // Error Props

  const errorProps = { css: {}, title: errorMsg };

  return (
    <div className={`flex ${finalDivCss}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={input}
          className={`flex items-center text-sm font-semibold text-gray-700 ${finalLabelCss}`}
        >
          {label}
        </label>
      )}

      {/* Material-UI Switch */}
      <FormControlLabel
        control={
          <Switch
            id={input}
            {...(register && register(input))} // Register the input field
            checked={watchedValue} // Sync with form state
            onChange={handleSwitchChange} // Handle change manually
            onClick={handleClick}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
          />
        }
      />

      {/* Error Message */}
      {errorMsg && <FormSpanError {...errorProps} />}
    </div>
  );
}
