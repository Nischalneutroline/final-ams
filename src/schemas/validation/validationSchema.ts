import { z } from "zod";
import libphonenumber from "google-libphonenumber";
export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// Define your validation rules

export const adminUserSchema = z.object({
  full_name: z.string().min(1, { message: "First Name is required" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  phone_number: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .refine(
      (number: any) => {
        try {
          const phoneNumber = phoneUtil.parse(number);
          return phoneUtil.isValidNumber(phoneNumber);
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid mobile number" }
    ),
  role: z.string().min(1, { message: "Role is required" }),

  isActive: z.boolean().optional(),

  password: z
    .string()
    .min(8, { message: "Password must be 8 character long." }),

  // business_days: z
  //   .array(z.enum(daysOfWeek))
  //   .min(1, "At least one day must be selected.")
  //   .default([]),

  // password: z
  //   .string({ required_error: "Password is required" })
  //   .min(6, { message: "Password must be at least 6 characters long" })
  //   .max(100, { message: "Password cannot exceed 100 characters" }),

  // role: z.enum(["Admin", "User"], {
  //   required_error: "Role is required",
  //   message: "Role must be either 'Admin' or 'User'",
  // }),

  // isActive: z.boolean({ required_error: "isActive is required" }),
});

export type AdminUserFormValues = z.infer<typeof adminUserSchema>;

export const adminAppointmentSchema = z.object({
  full_name: z.string().min(1, { message: "First Name is required" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  phone_number: z
    .string()
    .min(1, { message: "Phone Number is required" })
    .refine(
      (number: any) => {
        try {
          const phoneNumber = phoneUtil.parse(number);
          return phoneUtil.isValidNumber(phoneNumber);
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid mobile number" }
    ),
  service: z.string().min(1, { message: "Role is required" }),
  date: z.coerce.date(),

  time: z.coerce.date(),
  // .union([z.string(), z.object({ hours: z.number(), minutes: z.number() })]) // Accepts either string or object
  // .transform((val) => {
  //   if (typeof val === "string") {
  //     return val; // If it's already a string, use it directly
  //   } else if (val && typeof val === "object" && val.hours && val.minutes) {
  //     // If it's an object, format it to HH:mm
  //     const hours = val.hours.toString().padStart(2, "0");
  //     const minutes = val.minutes.toString().padStart(2, "0");
  //     return `${hours}:${minutes}`; // Format as HH:mm
  //   }
  //   return ""; // Return an empty string if no valid format is found
  // })
  // .refine((val) => /^([0-9]{2}):([0-9]{2})$/.test(val), {
  //   message: "Time must be in the format HH:mm (e.g., 14:30)",
  // }),

  message: z.string().min(8, { message: "Password must be 8 character long." }),
});

export type AdminAppointmentFormValues = z.infer<typeof adminAppointmentSchema>;
