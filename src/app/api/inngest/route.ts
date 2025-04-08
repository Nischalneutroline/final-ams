import { serve } from "inngest/next";
import { cronReminder } from "@/tasks/inngest/function";
import {inngestClient} from "@/tasks/inngest/client"

console.log("Inngest API route initialized"); 
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [
  cronReminder
  ],
});