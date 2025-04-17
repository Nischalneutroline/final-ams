import { inngestClient } from "@/tasks/inngest/client"
import { prisma } from "@/lib/prisma"


export const sendAnnouncement = inngestClient.createFunction(
  { id: "send-announcement-or-offer" },
  { event: "announcement/send" },
  async ({ event, step }) => {
    const { id, lastUpdate } = event.data;

    // Fetch the latest record from DB inside a step
    const announcement = await step.run("fetch-announcement", async () => {
      return await prisma.announcementOrOffer.findUnique({
        where: { id },
      });
    });

    // If the announcement is missing, don't continue
    if (!announcement) {
      return { success: false, message: "Announcement not found" };
    }

    // Skip if version is outdated (announcement was updated after the event was scheduled)
    if (new Date(announcement.updatedAt).toISOString() !== lastUpdate) {
      return { success: false, message: "Stale event – announcement was updated" };
    }

    // TODO: Send email, push notification, or SMS here
    await step.run("send-email", async () => {
      // Call your email service or notification handler
      console.log(`Sending announcement to audience: ${announcement.audience}`);
      // Add actual email/push logic here
    });

    return { success: true };
  }
);
