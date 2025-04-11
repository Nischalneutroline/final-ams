import { serve } from "inngest/next"
import { appointmentReminder } from "@/tasks/inngest/function"
import { inngestClient } from "@/tasks/inngest/client"

export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [appointmentReminder],
})
