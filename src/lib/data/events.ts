export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string;
  difficulty: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  isNew: boolean;
}

export interface EventWithPhotos {
  id: string;
  title: string;
  date: string;
  description: string;
  photos: string[];
  location?: string;
  time?: string;
}

/**
 * ============================================
 * ANNOUNCEMENTS
 * ============================================
 * To add/edit announcements, simply add or modify objects in the array below.
 * Each announcement needs: id, title, date, content, and isNew (boolean)
 */
export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Visual Storytelling Workshop — Register Now!",
    date: "March 9, 2026",
    content:
      "Ad-Lib Arts is hosting an immersive Photography & Filmmaking Workshop on March 13, 2026 at 5:00 PM in Birla Auditorium, SIT Tumkur. Learn to capture compelling photographs, compose powerful shots, and edit like a pro. All skill levels welcome — don't miss out!",
    isNew: true,
  },
]

/**
 * ============================================
 * UPCOMING EVENTS
 * ============================================
 * Events that are coming up - shown in the upcoming events section
 */
export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "VISUAL STORYTELLING WORKSHOP",
    date: "March 13, 2026",
    time: "5:00 PM",
    location: "Birla Auditorium, SIT Tumkur",
    description:
      "Join Ad-Lib Arts for an immersive photography and filmmaking workshop designed to help you master the complete visual storytelling process. In this hands-on session, you will learn how to capture compelling photographs, compose visually powerful shots, and transform your visuals through professional editing tools.",
    capacity: "Open to all",
    difficulty: "All levels"

  },

]

/**
 * ============================================
 * PAST EVENTS WITH PHOTOS
 * ============================================
 * 
 * HOW TO ADD/EDIT EVENTS:
 * 
 * 1. To ADD a new event:
 *    - Copy an existing event object below
 *    - Change the id to a unique string (e.g., "5", "6", etc.)
 *    - Update title, date, description, location, time
 *    - Add photo paths in the photos array
 * 
 * 2. To EDIT an event:
 *    - Find the event by its id
 *    - Modify any field you want (title, date, description, photos, etc.)
 * 
 * 3. To DELETE an event:
 *    - Simply remove the entire event object from the array
 * 
 * 4. To ADD PHOTOS:
 *    - Add image paths to the photos array
 *    - Photos should be in the /public folder
 *    - Use paths like: "/gallery/folder/image.jpg" or "/events/image.jpg"
 *    - You can add as many photos as you want
 * 
 * 5. PHOTO PATHS:
 *    - All paths start with "/" (they're relative to the public folder)
 *    - Example: "/gallery/animals/IMG-20241005-WA0034.jpg"
 *    - Make sure the images exist in your public folder
 * 
 * TIP: Keep events in reverse chronological order (newest first) for better display
 */
export const eventsWithPhotos: EventWithPhotos[] = [
  {
    id: "1",
    title: "Photography Workshop",
    date: "Sep 15, 2024",
    description: "This is the Fresher event of the club ,We Teach the basics of photography to the freshers and help them to improve their skills in photography.",
    photos: [
      "/gallery/photography workshop.jpg",
      "/gallery/photoworkop1.jpg",
      "/gallery/photoworkshop.jpg",
    ],
    location: "Media Center",
    time: "5:15 PM - 6:30 PM"
  },
  
]