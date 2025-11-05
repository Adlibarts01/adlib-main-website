"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Bell } from "lucide-react"
import { motion } from "framer-motion"
import RegistrationForm from "@/components/registration-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { announcements, upcomingEvents } from "@/lib/data/events"

// Define interfaces outside the component
interface Event {
  id: string;  // Changed from number to string
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string;
  difficulty: string;
}

interface Announcement {
  id: string;  // Changed from number to string
  title: string;
  date: string;
  content: string;
  isNew: boolean;
}

interface RecentEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

const recentEvents: RecentEvent[] = [
  {
    id: "1",
    title: "Portrait Workshop",
    date: "Sep 15, 2025",
    description: "Members learned advanced portrait lighting techniques with hands-on practice.",
    imageUrl: "/events/portrait-workshop.jpg",
  },
  {
    id: "2",
    title: "Monsoon Photo Walk",
    date: "Aug 28, 2025",
    description: "A fun outdoor session capturing the beauty of the rainy season.",
    imageUrl: "/events/monsoon-walk.jpg",
  },
  // Add more recent events here
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false)

  const openRegistration = (event: Event) => {
    setSelectedEvent(event)
    setIsRegistrationOpen(true)
  }

  const closeRegistration = () => {
    setIsRegistrationOpen(false)
  }

  const openAnnouncementModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setIsAnnouncementModalOpen(true)
  }

  const closeAnnouncementModal = () => {
    setIsAnnouncementModalOpen(false)
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-[#0A1D37] dark:bg-black py-16 text-white">
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
                className="bg-white dark:bg-[#1A2E4A] rounded-lg shadow-md overflow-hidden relative cursor-pointer"
                variants={item}
                whileHover={{ y: -5 }}
                onClick={() => openAnnouncementModal(announcement)}
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
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="py-16 bg-white dark:bg-[#1A2E4A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-outfit text-3xl font-bold text-[#0A1D37] dark:text-white">Recent Club Activities</h2>
            <p className="font-work-sans mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take a look at some of our latest workshops, photo walks, and club events.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentEvents.map((event) => (
              <div key={event.id} className="bg-white dark:bg-[#223A5F] rounded-lg shadow-md overflow-hidden">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="font-outfit text-xl font-bold text-[#0A1D37] dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="font-work-sans text-sm text-[#F7B32B] mb-2">{event.date}</p>
                  <p className="font-work-sans text-gray-600 dark:text-gray-300">{event.description}</p>
                </div>
              </div>
            ))}
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
        <RegistrationForm 
          isOpen={isRegistrationOpen} 
          onClose={closeRegistration} 
          eventTitle={selectedEvent.title}
          eventId={selectedEvent.id}
        />
      )}

      {/* Announcement Modal */}
      <Dialog open={isAnnouncementModalOpen} onOpenChange={setIsAnnouncementModalOpen}>
        {selectedAnnouncement && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#0A1D37] dark:text-white">
                {selectedAnnouncement.title}
              </DialogTitle>
              <DialogDescription className="font-outfit text-sm text-[#F7B32B]">
                {selectedAnnouncement.date}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              <p className="font-work-sans text-gray-600 dark:text-gray-300">{selectedAnnouncement.content}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={closeAnnouncementModal}
                className="bg-[#0A1D37] dark:bg-[#F7B32B] dark:text-[#0A1D37] hover:bg-[#0A1D37]/90 dark:hover:bg-[#F7B32B]/90"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
