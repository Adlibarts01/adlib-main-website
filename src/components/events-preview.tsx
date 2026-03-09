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
    <section className="py-20 md:py-28 section-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center space-y-3">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full w-fit mx-auto" style={{borderRadius:"9999px"}}>
            <span className="font-outfit text-xs font-medium text-amber-400/80 uppercase tracking-widest">Upcoming</span>
          </div>
          <h2 className="font-outfit text-3xl font-bold text-white md:text-4xl">Events &amp; Workshops</h2>
          <p className="font-work-sans text-base text-white/50 max-w-xl mx-auto">
            Join us for workshops, photo walks, and exciting photography events.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="glass-card p-6 flex flex-col gap-4 group cursor-default"
            >
              <div className="space-y-3">
                <div className="inline-block font-outfit text-xs font-medium px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  Event
                </div>
                <h3 className="font-outfit text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {event.title}
                </h3>
                <p className="font-work-sans text-sm text-white/50 leading-relaxed">{event.description}</p>
              </div>
              <div className="space-y-2 pt-1 border-t border-white/8">
                <div className="flex items-center text-xs text-white/45">
                  <Calendar className="mr-2 h-3.5 w-3.5 text-amber-400/70" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-xs text-white/45">
                  <Clock className="mr-2 h-3.5 w-3.5 text-amber-400/70" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-xs text-white/45">
                  <MapPin className="mr-2 h-3.5 w-3.5 text-amber-400/70" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="bg-amber-500 text-black hover:bg-amber-400 font-outfit font-semibold rounded-full px-8 shadow-[0_4px_20px_rgba(212,160,66,0.3)]"
          >
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
