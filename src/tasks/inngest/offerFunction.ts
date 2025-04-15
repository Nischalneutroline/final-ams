import { inngestClient } from "@/tasks/inngest/client"
import { prisma } from "@/lib/prisma"
import { ExpirationDuration } from "@/features/announcement-offer/types/types"


function calculateExpirationDate(start: Date, duration: ExpirationDuration): Date {
  const d = new Date(start);
  switch (duration) {
    case "ONE_DAY":
      d.setDate(d.getDate() + 1);
      break;
    case "THREE_DAYS":
      d.setDate(d.getDate() + 3);
      break;
    case "SEVEN_DAYS":
      d.setDate(d.getDate() + 7);
      break;
    case "THIRTY_DAYS":
      d.setDate(d.getDate() + 30);
      break;
    case "NEVER":
    default:
      return new Date("9999-12-31");
  }
  return d;
}


export const processAnnouncements = inngestClient.createFunction(
  {
    id: "process-announcements",
    name: "Process Scheduled Announcements",
  },
  { cron: "0 0 * * *" }, // CRON: Every day at 00:00 UTC
  async ({ step }) => {
    const now = new Date()

    // Step 1: Fetch scheduled but inactive announcements
    const pendingAnnouncements = await step.run("fetch-pending", async () => {
      return prisma.announcementOrOffer.findMany({
        where: {
          isImmediate: false,
          scheduledAt: {
            lte: now,
          },
          expiredAt: { not: "NEVER" },
        },
      })
    })

    for (const announcement of pendingAnnouncements) {
      const expiration = calculateExpirationDate(new Date(announcement .scheduledAt), announcement.expiredAt as ExpirationDuration);
      if (now <= expiration) {
        console.log(` Scheduled announcement: ${announcement .title} | Audience: ${announcement.audience}`);
      }
    }

    return { count: pendingAnnouncements.length };
  }
);