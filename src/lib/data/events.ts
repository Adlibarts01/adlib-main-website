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
  // {
  //   id: 1,
  //   title: "New Equipment Available",
  //   date: "April 28, 2025",
  //   content:
  //     "We've added new Sony Alpha a7 IV cameras and lenses to our equipment library. Members can now borrow these for their projects.",
  //   isNew: true,
  // },
  // {
  //   id: 2,
  //   title: "Summer Exhibition Call for Submissions",
  //   date: "April 15, 2025",
  //   content: "Submit your best work for our annual summer exhibition by July 1st. This year's theme is 'Urban Nature'.",
  //   isNew: true,
  // },
  // {
  //   id: 3,
  //   title: "Workshop Schedule Change",
  //   date: "April 10, 2025",
  //   content: "The Portrait Lighting Masterclass has been rescheduled from May 25 to June 2 due to venue availability.",
  //   isNew: false,
  // },
]

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "SHUTTER TRAILS",
    date: "May 29-JUNE 2, 2025",
    time: "10:00 AM - 10:00 PM",
    location: "Campus",
    description:
      "SHUTTER TRAILS is a thrilling photography hunt where every riddle leads you closer to the perfect shot! Decode clues, chase moments, and capture stories—one frame at a time.",
    capacity: "100 participants",
    difficulty: "All levels"
  }
]