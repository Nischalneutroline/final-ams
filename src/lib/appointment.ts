// Create appointment
// src/lib/createAppointment.js
// Import Prisma client for database operations
import { prisma } from "@/lib/prisma"

// Function to create an appointment and set up its reminders
export async function createAppointment(appointmentData: any) {
  // Create the appointment record
  const appointment = await prisma.appointment.create({ data: appointmentData })

  // Fetch all reminders associated with the appointment’s service
  const reminders = await prisma.reminder.findMany({
    where: { services: { some: { id: appointment.serviceId } } },
    include: { reminderOffset: true }, // Include offset details
  })

  // Create AppointmentReminderOffset for each reminder offset
  for (const reminder of reminders) {
    for (const offset of reminder.reminderOffset) {
      // Calculate when this reminder should fire
      const scheduledAt = new Date(
        appointment.selectedDate.getTime() +
          (offset.sendBefore ? -offset.sendOffset : offset.sendOffset) *
            60 *
            1000
      )
      // Create a record linking this appointment to the offset
      await prisma.appointmentReminderOffset.create({
        data: {
          appointmentId: appointment.id, // Link to this appointment
          reminderOffsetId: offset.id, // Link to the generic offset
          scheduledAt, // Specific time for this reminder
          sent: false, // Initially not sent
        },
      })
    }
  }

  // Return the created appointment
  return appointment
}

// Pre populate default reminder data
// src/lib/prepopulateReminders.js

// Function to create a reminder for a service with default offsets
export async function createReminderForService(serviceId: string, type: any) {
  // Create the reminder record
  const reminder = await prisma.reminder.create({
    data: {
      type, // REMINDER, FOLLOW_UP, etc.
      title: `${type} Reminder`, // E.g., "REMINDER Reminder"
      description: `Default ${type.toLowerCase()} notification`, // Description
      services: { connect: { id: serviceId } }, // Link to service
    },
  })

  // Define default offsets (48h, 24h, 1h)
  const offsets = [
    { sendOffset: 48 * 60, sendBefore: type === "REMINDER" }, // 48 hours
    { sendOffset: 24 * 60, sendBefore: type === "REMINDER" }, // 24 hours
    { sendOffset: 1 * 60, sendBefore: type === "REMINDER" }, // 1 hour
  ]

  // Create each offset record
  for (const offset of offsets) {
    await prisma.reminderOffset.create({
      data: {
        reminderId: reminder.id, // Link to reminder
        sendOffset: offset.sendOffset, // Offset in minutes
        sendBefore: offset.sendBefore, // Before or after appointment
      },
    })
  }

  // Return the created reminder
  return reminder
}

