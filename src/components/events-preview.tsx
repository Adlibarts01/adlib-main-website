import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: "Night Photography Workshop",
    date: "May 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Campus Arts Building, Room 302",
    description: "Learn techniques for capturing stunning night scenes with minimal equipment.",
  },
  {
    id: 2,
    title: "Portrait Lighting Masterclass",
    date: "June 2, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Photography Studio, Media Center",
    description: "Explore creative lighting setups for portrait photography.",
  },
  {
    id: 3,
    title: "Summer Photo Walk: Urban Exploration",
    date: "June 18, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Downtown Arts District (Meet at Central Plaza)",
    description: "Join us for a guided photo walk through the city's most photogenic locations.",
  },
]

export default function EventsPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-outfit text-3xl font-bold text-[#0A1D37] md:text-4xl">Upcoming Events</h2>
          <p className="font-work-sans mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for workshops, photo walks, and other exciting photography events.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs transition-all hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="font-outfit inline-block rounded-full bg-[#F7B32B]/10 px-3 py-1 text-sm font-medium text-[#F7B32B]">
                  Event
                </div>
                <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">{event.title}</h3>
                <p className="font-work-sans text-gray-600">{event.description}</p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4 text-[#F7B32B]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 h-4 w-4 text-[#F7B32B]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2 h-4 w-4 text-[#F7B32B]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-[#0A1D37] hover:bg-[#0A1D37]/90">
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
