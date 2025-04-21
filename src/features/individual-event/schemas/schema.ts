import { z } from 'zod'

export const videoProviderEnum = z.enum(['ZOOM', 'GOOGLE_MEET'])

export const meetingSchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
    timeSlot: z.coerce.date(),
    bookedByName: z.string().min(1, "Name is required"),
    bookedByEmail: z.string().email("Invalid email"),
    customAnswers: z.any().optional(),
  
    videoUrl: z.string().url("Invalid video URL").optional(),
    videoProvider: videoProviderEnum.optional(),
    slug: z.string().optional(), // Assuming slug is optional during creation
  })
  

  export const availabilitySchema = z.object({
    eventId: z.string().min(1, "Event ID is required"),
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: z.string().min(1, "Start time is required"), // can add time format validation
    endTime: z.string().min(1, "End time is required"),
  })
  

  export const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    duration: z.number().int().positive(),
    location: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
  
    userId: z.string().min(1, "User ID is required"),
    createdById: z.string().optional(),
  })
