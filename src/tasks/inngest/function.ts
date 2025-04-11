import { inngestClient } from "@/tasks/inngest/client"
import { prisma } from "@/lib/prisma"
import { sendReminderEmail } from "../email/email"

export const appointmentReminder = inngestClient.createFunction(
  {
    id: "appointment-reminder",
    name: "Send Appointment Reminders",
  },
  {
    cron: "*/15 * * * *", // Every 15 minutes
  },
  async ({ step }) => {
    // Step 1: Fetch relevant appointments
    const appointments = await step.run("fetch-appointments", async () => {
      const now = new Date()
      return await prisma.appointment.findMany({
        where: {
          OR: [
            { status: "SCHEDULED" }, // For REMINDER, CUSTOM (before)
            { status: "COMPLETED" }, // For FOLLOW_UP
            { status: "CANCELLED" }, // For CANCELLATION
            { status: "MISSED" }, // For MISSED
          ],
        },
        include: {
          service: {
            include: {
              reminders: {
                include: {
                  reminderOffset: true,
                  notifications: true,
                },
              },
            },
          },
          user: true,
        },
      })
    })

    // Step 2: Process reminders
    await step.run("process-reminders", async () => {
      // Get current time
      const now = new Date()

      // Process each appointment to get appointment, email, and name
      for (const appointment of appointments) {
        // time of the appointment
        const appointmentTime = new Date(appointment.selectedDate)
        // target email and name
        const targetEmail =
          appointment.isForSelf && appointment.user?.email
            ? appointment.user.email
            : appointment.email
        const targetName = appointment.customerName

        // Update scheduledAt for each offset based on appointment time
        // This updates all the reminder's scheduledAt based onthe offset default value: 48, 24, 1 hours
        for (const reminder of appointment.service.reminders) {
          // Update scheduledAt for each offset
          for (const offset of reminder.reminderOffset) {
            // Calculate reminder's scheduledAt based on offset and sendBefore for each reminder
            // Ensure when is the reminder time to be sent
            const scheduledAt = new Date(
              appointmentTime.getTime() +
                (offset.sendBefore ? -offset.sendOffset : offset.sendOffset) *
                  60 *
                  1000
            )

            // Treat offset.scheduledAt as a Date, with fallback if it's a string
            const existingScheduledAt = new Date(offset.scheduledAt)

            // Only update scheduledAt if it's different from offset scheduledAt
            // this will save for each reminder value: 48, 24, 1 or custom
            if (scheduledAt.getTime() !== existingScheduledAt.getTime()) {
              await prisma.reminderOffset.update({
                where: { id: offset.id },
                data: { scheduledAt },
              })
            }
          }
        }

        // Process each reminder
        for (const reminder of appointment.service.reminders) {
          await processReminder(
            now,
            reminder,
            targetEmail,
            targetName,
            appointmentTime,
            appointment
          )
        }
      }
    })
  }
)

// Helper function to process reminders
async function processReminder(
  now: Date,
  reminder: any,
  email: string,
  name: string,
  appointmentTime: Date,
  appointment: any
) {
  // Process each offset of all reminders
  for (const offset of reminder.reminderOffset) {
    // get the reminder time that can of all the offsets: 48,24, 1 or custom as it has already been updated above
    const reminderTime = new Date(offset.scheduledAt)
    // get the time difference
    const diffFromNow = (reminderTime.getTime() - now.getTime()) / 1000 / 60

    // Check if within 15-minute window and not sent

    if (diffFromNow >= 0 && diffFromNow <= 15 && !offset.sent) {
      let shouldSend = false
      let message = ""

      // Check the type of the reminder
      switch (reminder.type) {
        case "REMINDER":
          // Check if sendBefore and appointment is scheduled
          if (offset.sendBefore && appointment.status === "SCHEDULED") {
            shouldSend = true
            message = `${
              offset.sendOffset / 60
            }-hour reminder before your appointment`
          }
          break

        case "FOLLOW_UP":
          // Check if sendBefore and appointment is completed
          if (!offset.sendBefore && appointment.status === "COMPLETED") {
            shouldSend = true
            message = `${
              offset.sendOffset / 60
            }-hour follow-up after your appointment`
          }
          break

        case "CANCELLATION":
          // Check if sendBefore and appointment is cancelled
          if (!offset.sendBefore && appointment.status === "CANCELLED") {
            const timeSinceCancellation =
              (now.getTime() - appointment.updatedAt.getTime()) / 1000 / 60
            if (timeSinceCancellation > 0 && timeSinceCancellation <= 15) {
              shouldSend = true
              message = "Cancellation confirmation"
            }
          }
          break

        case "MISSED":
          // Check if sendBefore and appointment is missed
          if (!offset.sendBefore && appointment.status === "MISSED") {
            shouldSend = true
            message = `${
              offset.sendOffset / 60
            }-hour notice after missed appointment`
          }
          break

        case "CUSTOM":
          // Check if sendBefore and appointment is scheduled
          if (offset.sendBefore && appointment.status === "SCHEDULED") {
            shouldSend = true
            message = `${
              offset.sendOffset / 60
            }-hour custom reminder before appointment`
          } else if (
            !offset.sendBefore &&
            ["COMPLETED", "CANCELLED", "MISSED"].includes(appointment.status)
          ) {
            shouldSend = true
            message = `${
              offset.sendOffset / 60
            }-hour custom notice after appointment`
          }
          break
      }

      // Send email if shouldSend is true
      if (shouldSend) {
        try {
          // sent the email
          await sendReminderEmail(email, name, message)
          // update the sent status in reminderOffset so that it won't be sent again for default 48,24, 1 hour
          await prisma.reminderOffset.update({
            where: { id: offset.id },
            data: { sent: true },
          })
        } catch (error) {
          console.error(`Failed to send reminder ${offset.id}:`, error)
          throw error // Trigger Inngest retry
        }
      }
    }
  }
}
