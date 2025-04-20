"use client";

import {
  addUserBtnProps,
  commonActions,
  fullNameProps,
} from "@/features/shared-features/form/formporps";

import { useForm } from "react-hook-form";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { motion, AnimatePresence } from "framer-motion";
import CenterSection from "@/features/shared-features/section/centersection";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "@/features/shared-features/form/inputtext";
import Button from "@/features/shared-features/common/button";
import { RootState, useAppDispatch, useAppSelector } from "@/state/store";
import {
  setAddFAQFormTrue,
  setEditFAQFormTrue,
} from "@/state/admin/AdminSlice";
import { useEffect, useRef } from "react";
import {
  formContainerCss,
  formOuterDivCss,
  formSmallContainerCss,
  formSubTitleCss,
  formSubmitDivCss,
  formTitleCss,
  formTitleDivCss,
} from "@/features/shared-features/form/props";

const EditFAQ = () => {
  // On submit funciton
  const onSubmit = (data: any) => {
    console.log("Transformed data:", data);
    reset();
    dispatch(setAddFAQFormTrue(false));
  };

  const dispatch = useAppDispatch();
  const { isFlag } = useAppSelector(
    (state: RootState) => state.admin.admin.faq.edit
  );

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

  const formRef = useRef<HTMLDivElement>(null);

  const remaining = { actions: commonActions, form, css: {} };

  const formObj = {
    question: {
      common: fullNameProps({
        input: "question",
        label: "Questions",
        placeholder: "Enter FAQ Question.",
        showImportant: true,
        type: "text",
      }),
      ...remaining,
    },
    answer: {
      common: fullNameProps({
        input: "answer",
        label: "Answer",
        placeholder: "Enter FAQ Answer.",
        showImportant: true,
        type: "textbox",
      }),
      ...remaining,
    },
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
        dispatch(setEditFAQFormTrue(false));
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
  }, [isFlag]);
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
            className={`${formSmallContainerCss} lg:h-[40%]`}
          >
            <div className={formTitleDivCss}>
              <div className={formTitleCss}>Edit FAQ</div>
              <div className={formSubTitleCss}>
                You’re creating an account on behalf of a user. Please ensure
                accuracy. ⚠️
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`${formOuterDivCss} overflow-y-hidden gap-4`}
            >
              <div className="flex flex-col gap-3">
                <TextInput {...formObj.question} />
                <TextInput {...formObj.answer} />
              </div>
              <div className=" flex flex-col mb-4  justify-center gap-4">
                <Button {...addUserBtnProps} />
              </div>
            </form>
          </motion.div>
        </CenterSection>
      )}
    </AnimatePresence>
  );
};

export default EditFAQ;
