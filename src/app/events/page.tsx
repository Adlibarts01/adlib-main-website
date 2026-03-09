"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Bell, ChevronDown, ChevronUp, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import RegistrationForm from "@/components/registration-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { announcements, eventsWithPhotos, upcomingEvents } from "@/lib/data/events"

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


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    } 
  },
}

const photoContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const photoItem = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    } 
  },
}

const expandContent = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: -10,
  },
  show: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: -10,
    transition: { 
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    } 
  },
}

export default function EventsPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false)
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
  const [selectedEventPhotos, setSelectedEventPhotos] = useState<string[]>([])

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

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId)
  }

  const openPhotoModal = (photos: string[], index: number) => {
    setSelectedEventPhotos(photos)
    setSelectedPhotoIndex(index)
  }

  const closePhotoModal = () => {
    setSelectedPhotoIndex(null)
    setSelectedEventPhotos([])
  }

  const goToNextPhoto = () => {
    if (selectedPhotoIndex !== null && selectedEventPhotos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % selectedEventPhotos.length)
    }
  }

  const goToPreviousPhoto = () => {
    if (selectedPhotoIndex !== null && selectedEventPhotos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + selectedEventPhotos.length) % selectedEventPhotos.length)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="py-24 md:py-32 section-dark relative overflow-hidden">
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 50% 60%, rgba(212,160,66,0.06) 0%, transparent 70%)"}} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full w-fit mx-auto" style={{borderRadius:"9999px"}}>
              <span className="font-outfit text-xs font-medium text-amber-400/80 uppercase tracking-widest">Schedule</span>
            </div>
            <h1 className="font-outfit text-4xl font-bold text-white md:text-5xl">Events &amp; <span className="text-amber-gradient">Workshops</span></h1>
            <p className="font-work-sans text-base text-white/50">
              Join us for workshops, photo walks, exhibitions, and other exciting photography events.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-12 section-surface frosted-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-outfit text-2xl font-bold text-white flex items-center">
              <Bell className="mr-2 h-5 w-5 text-amber-400" />
              Announcements
            </h2>
          </div>

          <motion.div className="grid gap-6 md:grid-cols-3" variants={container} initial="hidden" animate="show">
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                className="glass-card !rounded-2xl overflow-hidden relative cursor-pointer"
                variants={item}
                whileHover={{ y: -5 }}
                onClick={() => openAnnouncementModal(announcement)}
              >
                {announcement.isNew && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-amber-500 text-black text-xs font-bold px-3 py-1 font-outfit">
                      NEW
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-outfit text-lg font-bold text-white mb-2">
                    {announcement.title}
                  </h3>
                  <p className="font-outfit text-xs text-amber-400 mb-3">{announcement.date}</p>
                  <p className="font-work-sans text-sm text-white/55">{announcement.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 md:py-24 section-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-outfit text-3xl font-bold text-white">Upcoming Events</h2>
              <p className="font-work-sans mt-4 text-white/50 max-w-2xl mx-auto">
                Register early as our events often reach capacity quickly. Club members receive priority registration.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={item}
                  className="group relative glass-card !rounded-2xl overflow-hidden transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="p-6 md:p-8 relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="font-outfit text-xl font-bold text-white flex-1">
                        {event.title}
                      </h3>
                      <span className="font-outfit text-xs text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/20 whitespace-nowrap">
                        {event.date}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Clock className="h-4 w-4 text-amber-400/70" />
                        <span className="font-work-sans">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <MapPin className="h-4 w-4 text-amber-400/70" />
                        <span className="font-work-sans">{event.location}</span>
                      </div>
                      {event.capacity && (
                        <div className="flex items-center gap-2 text-sm text-white/50">
                          <span className="font-work-sans">Capacity: {event.capacity}</span>
                        </div>
                      )}
                      {event.difficulty && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-work-sans px-3 py-1 rounded-full bg-white/8 text-white/60">
                            {event.difficulty}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <p className="font-work-sans text-white/50 mb-6 leading-relaxed line-clamp-3 text-sm">
                      {event.description}
                    </p>
                    
                    <Button
                      onClick={() => {
                        setSelectedEvent(event)
                        setIsRegistrationOpen(true)
                      }}
                      className="w-full bg-amber-500 text-black hover:bg-amber-400 font-outfit font-semibold rounded-full shadow-[0_4px_16px_rgba(212,160,66,0.3)]"
                    >
                      Register Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Events Gallery Section */}
      <section className="py-16 section-surface frosted-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-outfit text-3xl font-bold text-white md:text-4xl">Our Events</h2>
              <p className="font-work-sans mt-2 text-white/45 max-w-2xl mx-auto">
                Explore our past events, workshops, and activities. Each event includes detailed descriptions and photo galleries.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {eventsWithPhotos.map((event) => (
              <motion.div
                key={event.id}
                variants={item}
                className="group relative glass-card !rounded-2xl overflow-hidden transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                
                {/* Event Header */}
                <motion.div 
                  className="p-6 md:p-8 cursor-pointer relative z-10"
                  onClick={() => toggleEventExpansion(event.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <motion.h3 
                          className="font-outfit text-xl md:text-2xl font-bold text-white"
                          whileHover={{ scale: 1.02 }}
                        >
                          {event.title}
                        </motion.h3>
                        <motion.span 
                          className="font-outfit text-xs text-amber-400 bg-amber-500/15 px-4 py-1.5 rounded-full border border-amber-500/20"
                          whileHover={{ scale: 1.05 }}
                        >
                          {event.date}
                        </motion.span>
                      </div>
                      {(event.location || event.time) && (
                        <motion.div 
                          className="flex flex-wrap items-center gap-4 text-sm text-white/45 mb-3"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {event.location && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                              <MapPin className="h-4 w-4 text-amber-400/70" />
                              <span className="font-work-sans">{event.location}</span>
                            </div>
                          )}
                          {event.time && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                              <Clock className="h-4 w-4 text-amber-400/70" />
                              <span className="font-work-sans">{event.time}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                      {expandedEventId !== event.id && (
                        <p className="font-work-sans text-gray-600 dark:text-gray-300 mt-3 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: expandedEventId === event.id ? 180 : 0 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-4 rounded-full bg-white/5 hover:bg-amber-500/15"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleEventExpansion(event.id)
                        }}
                      >
                        {expandedEventId === event.id ? (
                          <ChevronUp className="h-5 w-5 text-amber-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-amber-400" />
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence mode="wait">
                  {expandedEventId === event.id && (
                    <motion.div
                      variants={expandContent}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="overflow-hidden border-t border-white/8"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4">
                        <motion.p 
                          className="font-work-sans text-white/55 mb-8 leading-relaxed text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {event.description}
                        </motion.p>
                        
                        {/* Photo Gallery */}
                        <motion.div 
                          className="mb-4"
                          variants={photoContainer}
                          initial="hidden"
                          animate="show"
                        >
                          <motion.h4 
                            className="font-outfit text-base font-semibold text-white mb-6 flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <span className="h-1 w-8 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
                            Event Photos ({event.photos.length})
                          </motion.h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {event.photos.map((photo, index) => (
                              <motion.div
                                key={index}
                                variants={photoItem}
                                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => openPhotoModal(event.photos, index)}
                              >
                                <Image
                                  src={photo}
                                  alt={`${event.title} - Photo ${index + 1}`}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <span className="text-white text-xs font-outfit font-medium">View Full Size</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Propose Event Section */}
      <section className="py-16 section-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-outfit text-3xl font-bold text-white">Have an Event Idea?</h2>
            <p className="font-work-sans mt-4 text-white/50">
              We welcome suggestions from our members. If you have an idea for a workshop, photo walk, or other event,
              let us know!
            </p>
            <div className="mt-6">
              <Button asChild className="bg-amber-500 text-black hover:bg-amber-400 rounded-full font-outfit font-semibold px-8 shadow-[0_4px_16px_rgba(212,160,66,0.3)]">
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
              <DialogTitle className="text-xl font-bold text-white">
                {selectedAnnouncement.title}
              </DialogTitle>
              <DialogDescription className="font-outfit text-sm text-amber-400">
                {selectedAnnouncement.date}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2">
              <p className="font-work-sans text-white/60 text-sm">{selectedAnnouncement.content}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={closeAnnouncementModal}
                className="bg-amber-500 text-black hover:bg-amber-400 rounded-full font-outfit font-semibold"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Photo Modal */}
      <AnimatePresence mode="wait">
        {selectedPhotoIndex !== null && selectedEventPhotos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={closePhotoModal}
          >
            <motion.div 
              className="relative w-full max-w-6xl h-full flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 z-10"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full backdrop-blur-sm"
                  onClick={closePhotoModal}
                >
                  <X className="h-6 w-6" />
                </Button>
              </motion.div>

              {/* Previous Button */}
              {selectedEventPhotos.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4 z-10"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      goToPreviousPhoto()
                    }}
                  >
                    <ChevronDown className="h-8 w-8 rotate-90" />
                  </Button>
                </motion.div>
              )}

              {/* Next Button */}
              {selectedEventPhotos.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-4 z-10"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      goToNextPhoto()
                    }}
                  >
                    <ChevronDown className="h-8 w-8 -rotate-90" />
                  </Button>
                </motion.div>
              )}

              {/* Image */}
              <motion.div
                className="relative w-full h-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={selectedEventPhotos[selectedPhotoIndex]}
                  alt={`Photo ${selectedPhotoIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>

              {/* Photo Counter */}
              {selectedEventPhotos.length > 1 && (
                <motion.div 
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-2 rounded-full font-outfit text-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedPhotoIndex + 1} / {selectedEventPhotos.length}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
