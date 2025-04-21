// Video provider types
export enum VideoProvider {
    ZOOM = "ZOOM",
    GOOGLE_MEET = "GOOGLE_MEET",
  }
  
  // Days of the week
  export enum DayOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
  }

  // Meeting model
export interface Meeting {
    id: string
    eventTypeId: string
    timeSlot: string // ISO Date string
    bookedByName: string
    bookedByEmail: string
    customAnswers?: any
    videoUrl?: string
    videoProvider?: VideoProvider
    slug?: string
  
    // Optional nested object, only if you fetch it
    event?: Event
  }
  
  // Availability model
  export interface Availability {
    id: string
    eventTypeId: string
    dayOfWeek: number // 0-6 (Sunday - Saturday)
    startTime: string // format: "HH:mm"
    endTime: string   // format: "HH:mm"
  
    event?: Event
  }
  
  // EventType model
  export interface Event {
    id: string
    title: string
    description?: string
    duration: number
    location?: string
    slug: string
    userId: string

    createdAt: string // ISO Date string
    availability?: Availability[]
    meetings?: Meeting[]
  }