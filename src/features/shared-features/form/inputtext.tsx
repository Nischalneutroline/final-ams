import { InputSchema } from "@/schemas/schema";
import { formDivCss, formErrorCss, formInputCss, formLabelCss } from "./props";
import { FormSpanError } from "./error/fromspanerror";
import { getFormErrorMsg } from "@/utils/utils";

export default function TextInput(props: InputSchema) {
  // Props
  const { common, actions, form, css } = props;
  // Props variables
  const { input, label, defaultValue, placeholder, showImportant, icon, type } =
    common;
  const { register, errors, trigger } = form; // Include trigger
  const { handleClick, handleKeyUp, handleKeyDown, handleOnChange } =
    actions! || {};
  const { divCss, labelCss, inputCss, errorCss } = css || {};

  // Values
  const errorMsg = getFormErrorMsg(errors, input);

  // Css
  const highlightBorder =
    "border focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
  const errorBorder =
    "border border-red-400 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400";
  const border = errorMsg ? errorBorder : highlightBorder;

  // Final Css
  // Final Css
  const finalDivCss = divCss ?? formDivCss;
  const finalLabelCss = labelCss ?? formLabelCss;
  const finalInputCss = inputCss ?? formInputCss;

  // Error Props
  const errorProps = {
    css: { customCss: errorCss ?? formErrorCss },
    title: errorMsg,
  };

  // Handle input change
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Trigger validation for the specific field
    await trigger(input); // Trigger validation

    // Call custom onChange handler if provided
    if (handleOnChange) {
      handleOnChange(e);
    }
  };

  return (
    <div
      // className={`relative h-[65px] sm:h-[65px] lg:h-[75px] 2xl:h-[95px] pt-1 flex flex-col gap-1 text-[11px] text-dark-100 w-full px-2 min-w-[150px] `}
      className={`${finalDivCss} px-2 min-w-[150px]`}
    >
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

      <input
        id={input}
        {...(register && register(input))}
        // className={`bg-[#F8F9FA] rounded-md relative  h-[40px] sm:h-[35px] lg:h-[40px] 2xl:h-[45px] px-2  text-[11px] 2xl:text-[16px] text-black border-gray-400 text-left w-full ${border} ${finalInputCss}`}
        className={`${formInputCss} ${border} ${finalInputCss}`}
        type={type}
        placeholder={placeholder}
        key={input}
        defaultValue={defaultValue ?? ""}
        onClick={handleClick}
        onChange={handleInputChange} // Trigger validation on change
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />
      <div className="-translate-y-17">
        {errorMsg && <FormSpanError {...errorProps} />}
      </div>
    </div>
  );
}
