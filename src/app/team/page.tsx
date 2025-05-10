"use client"

import { useState } from "react"
import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

const teamMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Club President",
    bio: "Specializes in architectural photography and long exposures. Leading the club since 2023. Alex has a background in fine arts and brings a unique perspective to technical photography.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "alex@adlibphoto.club",
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "Workshop Coordinator",
    bio: "Portrait and fashion photographer with a background in studio lighting techniques. Jamie organizes and leads many of our technical workshops and has been teaching photography for over 5 years.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "jamie@adlibphoto.club",
  },
  {
    id: 3,
    name: "Sam Wilson",
    role: "Events Manager",
    bio: "Documentary photographer focused on storytelling through visual narratives. Sam coordinates our photo walks, exhibitions, and social events, creating opportunities for members to connect and share their work.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "sam@adlibphoto.club",
  },
  {
    id: 4,
    name: "Taylor Reed",
    role: "Equipment Manager",
    bio: "Technical expert with extensive knowledge of camera systems and accessories. Taylor maintains our equipment library and provides guidance to members on gear selection for their projects.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "taylor@adlibphoto.club",
  },
  {
    id: 5,
    name: "Jordan Lee",
    role: "Treasurer",
    bio: "Landscape and nature photographer with a passion for conservation. Jordan manages the club's finances and helps secure funding for special projects and equipment purchases.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "jordan@adlibphoto.club",
  },
  {
    id: 6,
    name: "Riley Johnson",
    role: "Social Media Coordinator",
    bio: "Macro and product photographer with a background in digital marketing. Riley manages our online presence and helps showcase member work to a broader audience.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "riley@adlibphoto.club",
  },
  {
    id: 7,
    name: "Casey Kim",
    role: "Membership Coordinator",
    bio: "Street photographer with a talent for capturing candid moments. Casey welcomes new members and ensures everyone feels included in our community activities.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "casey@adlibphoto.club",
  },
  {
    id: 8,
    name: "Dr. Morgan Zhang",
    role: "Faculty Advisor",
    bio: "Professor of Visual Arts with a specialization in digital photography. Dr. Zhang provides guidance to the club and helps connect us with university resources and opportunities.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "mzhang@university.edu",
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

export default function TeamPage() {
  // State is used for hover effects, but we only need the setter
  const [, setHoveredMember] = useState<number | null>(null)

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-[#0A1D37] py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-outfit text-4xl font-bold md:text-5xl">Meet Our Team</h1>
            <p className="font-work-sans mt-4 text-lg text-gray-300">
              The passionate photographers and educators behind Adlib Photography Club.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="group"
                variants={item}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredMember(member.id)}
                onHoverEnd={() => setHoveredMember(null)}
              >
                <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-[30%] border-4 border-[#F7B32B] transition-all duration-500 group-hover:rounded-[20%]">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="font-outfit text-xl font-bold text-[#0A1D37] dark:text-white">{member.name}</h3>
                  <p className="font-outfit text-sm font-light text-[#F7B32B]">{member.role}</p>
                  <p className="font-work-sans mt-3 text-gray-600 dark:text-gray-300">{member.bio}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <motion.a
                      href={member.instagram}
                      className="text-gray-400 hover:text-[#F7B32B] transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Instagram className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={member.linkedin}
                      className="text-gray-400 hover:text-[#F7B32B] transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-[#F7B32B] transition-colors"
                      aria-label={`Email ${member.name}`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="py-16 bg-[#E5E5E5] dark:bg-[#0A1D37]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-outfit text-3xl font-bold text-[#0A1D37] dark:text-white">Interested in Leadership?</h2>
            <p className="font-work-sans mt-4 text-gray-600 dark:text-gray-300">
              We&apos;re always looking for passionate photographers to join our leadership team. Elections for officer
              positions are held at the beginning of each academic year.
            </p>
            <p className="font-work-sans mt-2 text-gray-600 dark:text-gray-300">
              Contact our current president at{" "}
              <a href="mailto:alex@adlibphoto.club" className="text-[#F7B32B] hover:underline">
                alex@adlibphoto.club
              </a>{" "}
              to learn more about upcoming opportunities.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
