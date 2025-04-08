import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const expenseSchema = z.object({
  id: z.string(),
  label: z.string(),
  note: z.string(),
  category: z.string(),
  type: z.string(),
  amount: z.number(),
  date: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // You can adjust this to Date type if you'd prefer.
  totalAppointments: number;
  lastAppointment: string; // Same as dateOfBirth, this can be Date too.
  createdBy: string;
};

export const UserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.string(),
  totalAppointments: z.number(),
  lastAppointment: z.string(),
});
export type User1 = z.infer<typeof UserSchema>;
