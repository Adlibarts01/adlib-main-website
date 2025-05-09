import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, ArrowRight } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Club President",
    bio: "Specializes in architectural photography and long exposures. Leading the club since 2023.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "Workshop Coordinator",
    bio: "Portrait and fashion photographer with a background in studio lighting techniques.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Sam Wilson",
    role: "Events Manager",
    bio: "Documentary photographer focused on storytelling through visual narratives.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Taylor Reed",
    role: "Equipment Manager",
    bio: "Technical expert with extensive knowledge of camera systems and accessories.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
  },
]

export default function TeamPreview() {
  return (
    <section className="py-16 md:py-24 bg-[#0A1D37] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-outfit text-3xl font-bold md:text-4xl">Meet Our Team</h2>
          <p className="font-work-sans mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            The passionate photographers and educators behind Adlib Photography Club.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="group text-center">
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-[#F7B32B]">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="mt-6 space-y-2">
                <h3 className="font-outfit text-xl font-bold">{member.name}</h3>
                <p className="font-outfit text-sm font-light text-[#F7B32B]">{member.role}</p>
                <p className="font-work-sans text-sm text-gray-300">{member.bio}</p>
                <div className="flex justify-center space-x-4 pt-2">
                  <a
                    href={member.instagram}
                    className="text-gray-300 hover:text-[#F7B32B] transition-colors"
                    aria-label={`${member.name}'s Instagram`}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="text-gray-300 hover:text-[#F7B32B] transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-[#0A1D37]">
            <Link href="/team">
              View Full Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
