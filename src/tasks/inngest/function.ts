import { inngestClient } from "@/tasks/inngest/client";
import { prisma } from "@/lib/prisma";
import { sendReminderEmail } from "../email/email";

export const cronReminder = inngestClient.createFunction(
  {
    id: "cron-reminder",
    name: "Send Reminder (CRON)",
  },
  {
    /*  cron: "0 * * * *", */ // every 1 hr
    cron: "* * * * *",
  },
  async ({ step }) => {
    // Step 1: Fetch all reminders
    const reminders = await prisma.reminder.findMany({
      include: {
        services: {
          include: {
            appointments: true,
          },
        },
        notifications: true,
        reminderOffset: true,
      },
    });
    //to do - fetch reminder
    //4 functions for reminder, followup,missed and cancellation
    //check appointment for each 

    //perform db relations with user to fetch the email and name

    await step.run("process-reminders", async () => {
      // Get the current time
      const now = new Date();

      for (const reminder of reminders) {
        let shouldUpdate = false;

        // Loop through each reminder's offsets and check scheduledAt
        for (const offset of reminder.reminderOffset) {
          for (const service of reminder.services) {
            for (const appointment of service.appointments) {
              const scheduledAt = new Date(offset.scheduledAt);

              // Calculate the difference in milliseconds
              const diffInMilliseconds = scheduledAt.getTime() - now.getTime(); //send before and after check

              // Convert milliseconds to minutes
              const diffInMinutes = diffInMilliseconds / 1000 / 60;

              console.log(
                `Time difference for reminder: ${diffInMinutes} minutes`
              );
             
              // Compare with 48 hours (2880 minutes), 24 hours (1440 minutes), and 1 hour (60 minutes)
              if (
                diffInMinutes <= 105 &&
                diffInMinutes > 1 &&
                reminder.send1hr === false
              ) {
                console.log(
                  "Around 1-hour left for appointment ...",
                );

                //send email
                  await sendReminderEmail(
                  appointment.email,
                  appointment.customerName,
                  /* offset.sendOffset */ 1
                );

                // Send reminder for 48 hours
                reminder.send1hr = true; // Update the status to sent in db for send1hr
                shouldUpdate = true;
              } else if (
                diffInMinutes <= 36 * 60 &&
                diffInMinutes > 12 * 60 &&
                reminder.send24hr === false
              ) {
                console.log(
                  "Around 24-hour left for appointment ...",
                );

                  await sendReminderEmail(
                  appointment.email,
                  appointment.customerName,
                  /* offset.sendOffset */ 24
                );

                // Send reminder for 24 hours
                reminder.send24hr = true; // Update the status to sent in db for send24hr
                shouldUpdate = true;
              } else if (
                diffInMinutes <= 56 * 60 &&
                diffInMinutes > 36 * 60 &&
                reminder.send48hr === false
              ) {
                console.log(
                  "Around 48-hour left for appointment ...",
                );

                //send email
                  await sendReminderEmail(
                  appointment.email,
                  appointment.customerName,
                  /* offset.sendOffset */ 48
                );

                // Send reminder for 1 hour
                reminder.send48hr = true; // Update the status to sent in db for send48hr
                shouldUpdate = true;
              }
            }
          }
        }
          // Save to DB if any flag changed
          if (shouldUpdate) {
            await prisma.reminder.update({
              where: { id: reminder.id },
              data: {
                send1hr: reminder.send1hr,
                send24hr: reminder.send24hr,
                send48hr: reminder.send48hr,
              },
            });
          }
          return "Reminders processed successfully";
      }
    });
  }
);
