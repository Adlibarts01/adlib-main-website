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
  }
]