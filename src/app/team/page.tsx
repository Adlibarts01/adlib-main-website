"use client"

import { useState } from "react"
import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

const teamMembers = [
  {
    id: 1,
    name: "Rounak Gupta",
    role: "Club President",
    bio: "",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "",
  },
  {
    id: 2,
    name: "Abhiday",
    role: "Workshop Coordinator",
    bio: "Portrait and fashion photographer with a background in studio lighting techniques. Jamie organizes and leads many of our technical workshops and has been teaching photography for over 5 years.",
    image: "/placeholder.svg?height=400&width=400",
    instagram: "#",
    linkedin: "#",
    email: "jamie@adlibphoto.club",
  },
  {
    id: 3,
    name: "Aparna",
    role: "Treasurer",
    bio: "Documentary photographer focused on storytelling through visual narratives. Sam coordinates our photo walks, exhibitions, and social events, creating opportunities for members to connect and share their work.",
    image: "/team/IMG_20250510_100151 - Aparna Verma.jpg",
    instagram: "https://www.instagram.com/apaxrnaaaa/",
    linkedin: "https://www.linkedin.com/in/aparna-4bba15296/",
    email: "aparna3567@gmail.com",
  },
  {
    id: 4,
    name: "Shesha kshitij c r",
    role: "Vice president ",
    bio: "Technical expert with extensive knowledge of camera systems and accessories. Taylor maintains our equipment library and provides guidance to members on gear selection for their projects.",
    image: "/team/IMG_7465(1)~2 - Shesha Kshitij C r.jpg",
    instagram: "https://www.instagram.com/sheshakshitij_cr?igsh=MWRzNzNjdmU0cmpyeA==",
    linkedin: "https://www.linkedin.com/in/prerana-m-ballakkuraya-45ba57337",
    email: "sheshakshitijcr11@gmail.com",
  },
  {
    id: 5,
    name: "Aadya Singh",
    role: "Video Editor",
    image: "/placeholder.svg?height=400&width=400",
    bio: "I Create Memories out of moments.",
    instagram: "https://www.instagram.com/aa.d.ya/",
    linkedin: "https://www.linkedin.com/in/aadya-singh-85a9b2275/",
    email: "aadyas72@gmail.com",
  },
  {
    id: 6,
    name: "Aditya Raj",
    role: "Member",
    bio: "Macro and product photographer with a background in digital marketing. Riley manages our online presence and helps showcase member work to a broader audience.",
    image: "/team/add.jpeg",
    instagram: "https://www.instagram.com/aditya_raj1135/",
    linkedin: "https://www.linkedin.com/in/aditya-raj-0a474927a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "adityaraj112341@gmail.com",
  },
  {
    id: 7,
    name: "Himanshu Rai",
    role: "Member",
    bio: "Street photographer with a talent for capturing candid moments. Casey welcomes new members and ensures everyone feels included in our community activities.",
    image: "/team/491842761_1024009479172125_8172366150956934924_n - Himanshu Rai.jpg",
    instagram: "https://www.instagram.com/enghimanshu/",
    linkedin: "https://www.linkedin.com/in/himanshu-rai-246121278/",
    email: "himanshuraimau9@gmail.com",
  },
  {
    id: 8,
    name: "Prerana Ballakkuraya",
    role: "Member",
    bio: "Professor of Visual Arts with a specialization in digital photography. Dr. Zhang provides guidance to the club and helps connect us with university resources and opportunities.",
    image: "/team/IMG-20240824-WA0043 - PRERANA MB.jpg",
    instagram: "https://www.instagram.com/prerana__ballakkuraya?igsh=MWdzN2N1aWt4czh0Yw==",
    linkedin: "https://www.linkedin.com/in/prerana-m-ballakkuraya-45ba57337",
    email: "mbprerana29@gmail.com",
  },
  {
    id: 9,
    name: "Babul Kumar ",
    role: "Member",
    bio: "Wildlife photographer with a focus on conservation efforts. Morgan coordinates our community outreach programs and helps organize events that promote photography as a tool for social change.",
    image: "/team/IMG_20241027_135037 - Babul Kumar.jpg",
    instagram: "(https://www.instagram.com/babul_clickx_?igsh=MXNldHB1dHZ5d2d5ZQ==)",
    linkedin: "(https://www.linkedin.com/in/babul-kumar-a0a45a27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)",
    email: "babulkumarstm328@gmail.com",
  },
  {
    id: 10,
    name: "Sirilakshmi s",
    role: "Member",
    bio: "Fashion and editorial photographer with a background in graphic design. Taylor manages our social media accounts and helps promote club events and member work.",
    image: "/team/IMG_0465 - 1SI23CI067 SIRILAKSHMI S.JPG",
    instagram: "https://www.instagram.com/_.siri______/",
    linkedin: "https://linkedin.com/in/siri-lakshmis-7688a5358",
    email: "sirilakshmis2005@gmail.com",
  },
  {
    id: 11,
    name: "Shreyas A Jain ",
    role: "Member",
    bio: "I am a passionate photography and video editor who loves capturing moments and transforming them into compelling stories. I focus on creating high-quality visuals that leave a lasting impact, whether it’s through stunning photoshoots or engaging video projects.",
    image: "/team/IMG_20240501_153607296 - Shreyas Jain.jpg",
    instagram: "https://www.instagram.com/shrey_yaz_/",
    linkedin: "",
    email: "shreyasjain910@gmail.com",
  },
  {
    id: 12,
    name: "Sanmathi Jain B J ",
    role: "Member",
    bio: "Encrypted identity. Decrypted mind.",
    image: "/team/IMG_20250510_191518 - Sanmathi Jain.jpg",
    instagram: "https://www.instagram.com/sanmathi_sannu___/",
    linkedin: "https://www.linkedin.com/in/sanmathi-jain-624241292/",
    email: "sanmathijain20@gmail.com",
  },
  {
    id: 13,
    name: "Gagannaag",
    role: "Member",
    bio: "I am a passionate photography and video editor who loves capturing moments and transforming them into compelling stories. I focus on creating high-quality visuals that leave a lasting impact, whether it’s through stunning photoshoots or engaging video projects.",
    image: "/team/IMG_5362 - Gagan aag Krishna.jpeg",
    instagram: "https://www.instagram.com/nagkrish_07/",
    linkedin: "",
    email: "",
  },
  {
    id: 14,
    name: "Keshav",
    role: "Member",
    bio: "I am a passionate photography and video editor who loves capturing moments and transforming them into compelling stories. I focus on creating high-quality visuals that leave a lasting impact, whether it’s through stunning photoshoots or engaging video projects.",
    image: "/team/IMG_20241011_134909_Burst20 - Keshav N.jpg",
    instagram: "https://www.instagram.com/_kesh.v_/",
    linkedin: "",
    email: "",
  },
  {
    id: 15,
    name: "Srividya V Rao",
    role: "Member",
    bio: "",
    image: "/team/IMG_20241011",
    instagram: "https://www.instagram.com/srividya_v_rao?igsh=bHkwNWF1cDkwdjR6",
    linkedin: "",
    email: "",
  }
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
     
    </div>
  )
}
