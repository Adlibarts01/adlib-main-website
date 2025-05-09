"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Bell } from "lucide-react"
import { motion } from "framer-motion"
import RegistrationForm from "@/components/registration-form"

const announcements = [
  {
    id: 1,
    title: "New Equipment Available",
    date: "April 28, 2025",
    content:
      "We've added new Sony Alpha a7 IV cameras and lenses to our equipment library. Members can now borrow these for their projects.",
    isNew: true,
  },
  {
    id: 2,
    title: "Summer Exhibition Call for Submissions",
    date: "April 15, 2025",
    content: "Submit your best work for our annual summer exhibition by July 1st. This year's theme is 'Urban Nature'.",
    isNew: true,
  },
  {
    id: 3,
    title: "Workshop Schedule Change",
    date: "April 10, 2025",
    content: "The Portrait Lighting Masterclass has been rescheduled from May 25 to June 2 due to venue availability.",
    isNew: false,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Night Photography Workshop",
    date: "May 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Campus Arts Building, Room 302",
    description:
      "Learn techniques for capturing stunning night scenes with minimal equipment. This hands-on workshop will cover long exposure techniques, light painting, and astrophotography basics.",
    capacity: "20 participants",
    difficulty: "Beginner to Intermediate",
  },
  {
    id: 2,
    title: "Portrait Lighting Masterclass",
    date: "June 2, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Photography Studio, Media Center",
    description:
      "Explore creative lighting setups for portrait photography. This workshop will cover one, two, and three-light setups, as well as how to use modifiers effectively to shape light.",
    capacity: "15 participants",
    difficulty: "Intermediate",
  },
  {
    id: 3,
    title: "Summer Photo Walk: Urban Exploration",
    date: "June 18, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Downtown Arts District (Meet at Central Plaza)",
    description:
      "Join us for a guided photo walk through the city's most photogenic locations. We'll explore urban textures, architecture, and street scenes while practicing composition techniques.",
    capacity: "25 participants",
    difficulty: "All Levels",
  },
  {
    id: 4,
    title: "Macro Photography Workshop",
    date: "July 5, 2025",
    time: "1:00 PM - 4:00 PM",
    location: "Botanical Gardens, Education Center",
    description:
      "Discover the fascinating world of macro photography. Learn how to capture stunning close-up images of flowers, insects, and small objects with incredible detail.",
    capacity: "12 participants",
    difficulty: "Intermediate",
  },
  {
    id: 5,
    title: "Photo Editing with Lightroom",
    date: "July 20, 2025",
    time: "6:00 PM - 8:30 PM",
    location: "Campus Computer Lab, Room 105",
    description:
      "Master the essentials of Adobe Lightroom for organizing and editing your photographs. Learn workflow techniques, color grading, and how to develop your personal editing style.",
    capacity: "18 participants",
    difficulty: "Beginner to Intermediate",
  },
  {
    id: 6,
    title: "Summer Exhibition Opening",
    date: "August 10, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Campus Gallery, Arts Building",
    description:
      "Join us for the opening reception of our annual summer exhibition featuring work from club members. Refreshments will be served, and many of the photographers will be present to discuss their work.",
    capacity: "Open to Public",
    difficulty: "N/A",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function EventsPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const openRegistration = (event) => {
    setSelectedEvent(event)
    setIsRegistrationOpen(true)
  }

  const closeRegistration = () => {
    setIsRegistrationOpen(false)
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-[#0A1D37] py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-outfit text-4xl font-bold md:text-5xl">Events & Workshops</h1>
            <p className="font-work-sans mt-4 text-lg text-gray-300">
              Join us for workshops, photo walks, exhibitions, and other exciting photography events.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-10 bg-[#F7B32B]/10 dark:bg-[#F7B32B]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-outfit text-2xl font-bold text-[#0A1D37] dark:text-white flex items-center">
              <Bell className="mr-2 h-5 w-5 text-[#F7B32B]" />
              Announcements
            </h2>
          </div>

          <motion.div className="grid gap-6 md:grid-cols-3" variants={container} initial="hidden" animate="show">
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                className="bg-white dark:bg-[#1A2E4A] rounded-lg shadow-md overflow-hidden relative"
                variants={item}
                whileHover={{ y: -5 }}
              >
                {announcement.isNew && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#F7B32B] text-[#0A1D37] text-xs font-bold px-3 py-1 font-outfit transform rotate-0 origin-top-right">
                      NEW
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-outfit text-xl font-bold text-[#0A1D37] dark:text-white mb-2">
                    {announcement.title}
                  </h3>
                  <p className="font-outfit text-sm text-[#F7B32B] mb-3">{announcement.date}</p>
                  <p className="font-work-sans text-gray-600 dark:text-gray-300">{announcement.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Events Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-outfit text-3xl font-bold text-[#0A1D37] dark:text-white">Upcoming Events</h2>
            <p className="font-work-sans mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Register early as our events often reach capacity quickly. Club members receive priority registration.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-[#F7B32B] before:to-transparent md:before:mx-auto md:before:translate-x-0">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="relative flex items-start md:justify-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7B32B] text-white md:relative md:left-auto md:top-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="h-5 w-5" />
                  </motion.div>

                  <motion.div
                    className="ml-12 rounded-lg bg-white dark:bg-[#1A2E4A] p-6 shadow-md md:ml-0 md:mr-0 md:max-w-md md:even:ml-12 md:odd:mr-12 hover:shadow-lg transition-shadow duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-2 font-outfit text-sm font-semibold text-[#F7B32B]">{event.date}</div>
                    <h3 className="font-outfit text-xl font-bold text-[#0A1D37] dark:text-white">{event.title}</h3>
                    <p className="font-work-sans mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="mr-2 h-4 w-4 text-[#F7B32B]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="mr-2 h-4 w-4 text-[#F7B32B]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="mr-2 h-4 w-4 text-[#F7B32B]" />
                        <span>{event.capacity}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-outfit text-xs font-medium px-2 py-1 rounded-full bg-[#E5E5E5] dark:bg-[#0A1D37] text-[#0A1D37] dark:text-white">
                        {event.difficulty}
                      </span>
                      <Button
                        className="bg-[#0A1D37] dark:bg-[#F7B32B] dark:text-[#0A1D37] hover:bg-[#0A1D37]/90 dark:hover:bg-[#F7B32B]/90"
                        onClick={() => openRegistration(event)}
                      >
                        Register
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Propose Event Section */}
      <section className="py-16 bg-[#E5E5E5] dark:bg-[#0A1D37]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-outfit text-3xl font-bold text-[#0A1D37] dark:text-white">Have an Event Idea?</h2>
            <p className="font-work-sans mt-4 text-gray-600 dark:text-gray-300">
              We welcome suggestions from our members. If you have an idea for a workshop, photo walk, or other event,
              let us know!
            </p>
            <div className="mt-6">
              <Button asChild className="bg-[#F7B32B] text-[#0A1D37] hover:bg-[#F7B32B]/90">
                <Link href="/contact">Propose an Event</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      {selectedEvent && (
        <RegistrationForm isOpen={isRegistrationOpen} onClose={closeRegistration} eventTitle={selectedEvent.title} />
      )}
    </div>
  )
}
