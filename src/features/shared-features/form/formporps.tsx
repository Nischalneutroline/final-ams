import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export const fullNameProps = ({ defaultValue }: any) => ({
  input: "full_name",
  label: "Full Name",
  type: "text",
  placeholder: "Enter Full Name",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <PersonOutlineIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const emailProps = ({ defaultValue }: any) => ({
  input: "email",
  label: "Email",
  type: "text",
  placeholder: "Enter Email Address",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <MailOutlineIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const phoneProps = ({ defaultValue }: any) => ({
  input: "phone_number",
  label: "Phone Number",
  type: "phone",
  placeholder: "Enter Phone Number (+9779867373778)",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const roleProps = ({ defaultValue }: any) => ({
  input: "role",
  label: "Role",
  type: "select",
  placeholder: "Select Role",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});

export const serviceProps = ({ defaultValue }: any) => ({
  input: "service",
  label: "Service",
  type: "select",
  placeholder: "Select Service",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const dateProps = ({ defaultValue }: any) => ({
  input: "date",
  label: "Date",
  type: "input",
  placeholder: "Select Date",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const timeProps = ({ defaultValue }: any) => ({
  input: "time",
  label: "Time",
  type: "input",
  placeholder: "Select Time",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const messageProps = ({ defaultValue }: any) => ({
  input: "message",
  label: "Message",
  type: "textbox",
  placeholder: "Something to tell...",
  showImportant: true,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-gray-400"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const isActiveProps = ({ defaultValue }: any) => ({
  input: "isActive",
  label: "isActive",
  showImportant: true,
  defaultValue: defaultValue ?? false,
  icon: (
    <LocalPhoneIcon
      className="text-black"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const passwordProps = ({ defaultValue }: any) => ({
  input: "password",
  label: "Password",
  showImportant: true,
  placeholder: "Enter your password",
  showForgotPassword: false,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-black"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});
export const dayInputProps = ({ defaultValue }: any) => ({
  input: "business_days",
  label: "Business Days",
  showImportant: true,
  // placeholder: "Enter your password",
  // showForgotPassword: false,
  defaultValue: defaultValue ?? "",
  icon: (
    <LocalPhoneIcon
      className="text-black"
      sx={{
        fontSize: {
          xs: "18px",
          sm: "20px",
          lg: "22px",
          xl: "24px",
        },
      }}
    />
  ),
});

export const commonActions = {
  handleClick: null,
  handleKeyUp: null,
  handleKeyDown: null,
  handleOnChange: null,
};

export const addUserBtnProps = {
  title: "Create",
  type: "submit",
  css: {
    customCss:
      "px-4 py-2 flex gap-1 justify-center items-center  bg-gradient-to-r from-[#2B73FF] to-[#038FFF] text-white  font-[700] text-[14px] rounded-sm",
  },
};
export const addAppointmentBtnProps = {
  title: "Create Appointment",
  type: "submit",
  css: {
    customCss:
      "px-4 py-2 flex gap-1 justify-center items-center  bg-gradient-to-r from-[#2B73FF] to-[#038FFF] text-white  font-[700] text-[14px] rounded-sm",
  },
};
export const cancelBtnProps = (handleClick: () => void) => ({
  title: "Cancel",
  type: "button",
  handleAction: handleClick,
  css: {
    customCss:
      "px-4 py-2 flex gap-1 justify-center items-center bg-gradient-to-l from-gray-500 to-gray-600 text-white font-[700] text-[14px] rounded-sm",
  },
});
