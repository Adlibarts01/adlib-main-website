"use client"

import { useState } from "react"
import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

const teamMembers = [
  {
    id: 1,
    name: "Rounak Gupta",
    role: "President",
    bio: "My love for photography began with quiet sunsets and intricate buildings. Nature’s calm and architecture’s symmetry inspire me deeply. Through my lens, I try to capture the beauty in stillness and structure.",
    image: "/team/rounak.jpeg",
    instagram: "https://www.instagram.com/rounak___gupta",
    linkedin: "https://www.linkedin.com/in/rounak-gupta-416616229?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    email: "guptarounak2021@gmail.com",
  },
  { 
    id: 2,
    name: "Abhiday U",
    role: "Co - President",
    bio: "My love for wildlife photography began at eight, sparked by watching birds outside my window. Since then, the forests of India have become my second home a place where my passion for nature truly comes alive.",
    image: "/team/1000029485.jpg",
    instagram: "https://www.instagram.com/wildlife_nature_vibes?igsh=MXYzZDJtZTN5d3Qyag==",
    linkedin: "https://www.linkedin.com/in/abhiday-udhay-b2740624b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "abhiday1727@gmail.com",
  },
  {
    id: 3,
    name: "Deeksha Naik",
    role: "Co - Vice President ",
    bio: "specialized in colour grading, designing and script writing while capturing the essence of stories that often go unnoticed. Let's connect and create something inspiring together",
    image: "/team/20241217_172407.jpg",
    instagram: "https://www.instagram.com/d_naik04?igsh=MXRqd2Q1OGNwZGJ2MQ==",
    linkedin: "https://www.linkedin.com/in/deeksha-naik-534524328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "deekshanaik226@gmail.com",
  },
  {
    id: 4,
    name: "Aparna",
    role: "Treasurer",
    bio: "Documentary photographer focused on storytelling through visual narratives. Sam coordinates our photo walks, exhibitions, and social events, creating opportunities for members to connect and share their work.",
    image: "/team/IMG_20250510_100151 - Aparna Verma.jpg",
    instagram: "https://www.instagram.com/apaxrnaaaa/",
    linkedin: "https://www.linkedin.com/in/aparna-4bba15296/",
    email: "aparna3567@gmail.com",
  },
  {
    id: 5,
    name: "Shesha kshitij c r",
    role: "Vice president ",
    bio: "Technical expert with extensive knowledge of camera systems and accessories. Taylor maintains our equipment library and provides guidance to members on gear selection for their projects.",
    image: "/team/IMG_7465(1)~2 - Shesha Kshitij C r.jpg",
    instagram: "https://www.instagram.com/sheshakshitij_cr?igsh=MWRzNzNjdmU0cmpyeA==",
    linkedin: "https://www.linkedin.com/in/prerana-m-ballakkuraya-45ba57337",
    email: "sheshakshitijcr11@gmail.com",
  },
  {
    id: 6,
    name: "Aadya Singh",
    role: "Video Editor",
    image: "/team/aadya.jpeg",
    bio: "I Create Memories out of moments.",
    instagram: "https://www.instagram.com/aa.d.ya/",
    linkedin: "https://www.linkedin.com/in/aadya-singh-85a9b2275/",
    email: "aadyas72@gmail.com",
  },
  {
    id: 21,
    name: "Vishnu Iyer",
    role: "Member",
    bio: "I have a deep passion for photography and videography, capturing life's moments!  I'm an experiential learner, and also loves automobiles",
    image: "/team/vishnu.jpeg",
    instagram: "https://www.instagram.com/vishnuiyer_",
    linkedin: "https://www.linkedin.com/in/vishnuiyer-",
    email: "Vishnuiyer648492@gmail.com",
  },
  {
    id: 7,
    name: "Aditya Raj",
    role: "Photographer & Editor",
    bio: "Visionary photographer specializing in crafting striking, story-driven imagery. Expert in harnessing light, emotion, and perspective to produce captivating visuals that resonate and inspire.",
    image: "/team/add.jpeg",
    instagram: "https://www.instagram.com/aditya_raj1135/",
    linkedin: "https://www.linkedin.com/in/aditya-raj-0a474927a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "adityaraj112341@gmail.com",
  },
  {
    id: 8,
    name: "Himanshu Rai",
    role: "Photographer",
    bio: "Creative and passionate photographer with a sharp eye for detail, capturing compelling moments and turning them into timeless visuals. Skilled in lighting, composition, and editing to deliver high-quality, emotionally resonant images.",
    image: "/team/491842761_1024009479172125_8172366150956934924_n - Himanshu Rai.jpg",
    instagram: "https://www.instagram.com/enghimanshu/",
    linkedin: "https://www.linkedin.com/in/himanshu-rai-246121278/",
    email: "himanshuraimau9@gmail.com",
  },
  {
    id: 9,
    name: "Sirilakshmi s",
    role: "Poster Designer",
    bio: "Fashion and editorial photographer with a background in graphic design. Taylor manages our social media accounts and helps promote club events and member work.",
    image: "/team/IMG_0465 - 1SI23CI067 SIRILAKSHMI S.JPG",
    instagram: "https://www.instagram.com/_.siri______/",
    linkedin: "https://linkedin.com/in/siri-lakshmis-7688a5358",
    email: "sirilakshmis2005@gmail.com",
  },
  {
    id: 17,
    name: "Vrashabh Devatkal ",
    role: "street photographer",
    bio: "Photographer",
    image: "/team/IMG_20240614_222045_645 - Vrashabh Devatkal.jpg",
    instagram: "https://www.instagram.com/vrashabhdevatkal_05?igsh=MWlodTN3dzJnN2hibA==",
    Linkedin: "",
    email: "vdevatkal@gmail.com",
  },
  {
    id: 18,
    name: "Harshavardhan.D.V",
    role: "Photographer",
    bio: "",
    image: "/team/PXL_20241121_105623709.PORTRAIT - Harshavardhan.D.V.jpg",
    instagram: "https://www.instagram.com/harshavardhan_d_v/",
    linkedin: "https://www.linkedin.com/in/harshavardhan-d-v-6b37822a3/",
    email: "harsha03112006@gmail.com",
  },
  {
    id: 19,
    name: "Sujal RT",
    role: "Member",
    bio: "",
    image: "/team/Picsart_25-05-11_23-41-34-044.png",
    instagram: "https://www.instagram.com/_sujal_rt_?igsh=MWc5b2JzYXY3ZXR6",
    linkedin: "",
    email: "1si23bt001@sit.ac.in",
  },
  {
    id: 12,
    name: "Shreyas A Jain ",
    role: "Member",
    bio: "I am a passionate photography and video editor, capturing moments and crafting impactful visuals.",
    image: "/team/1000103808.jpg",
    instagram: "https://www.instagram.com/shrey_yaz_/",
    linkedin: "https://www.linkedin.com/in/shreyas-jain-9a53002ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    email: "shreyasjain910@gmail.com",
  },
  {
    id: 13,
    name: "Sanmathi Jain B J ",
    role: "Poster Designer",
    bio: "Encrypted identity. Decrypted mind.",
    image: "/team/IMG_20250510_191518 - Sanmathi Jain.jpg",
    instagram: "https://www.instagram.com/sanmathi_sannu___/",
    linkedin: "https://www.linkedin.com/in/sanmathi-jain-624241292/",
    email: "sanmathijain20@gmail.com",
  },
  {
    id: 10,
    name: "Babul Kumar ",
    role: "Member",
    bio: "Wildlife photographer with a focus on conservation efforts. Morgan coordinates our community outreach programs and helps organize events that promote photography as a tool for social change.",
    image: "/team/IMG_20241027_135037 - Babul Kumar.jpg",
    instagram: "(https://www.instagram.com/babul_clickx_?igsh=MXNldHB1dHZ5d2d5ZQ==)",
    linkedin: "(https://www.linkedin.com/in/babul-kumar-a0a45a27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)",
    email: "babulkumarstm328@gmail.com",
  },
  {
    id: 20,
    name: "MS Rakshith ",
    role: "Member",
    bio: "I am a ameture photographer who loves to explore to new and creative fields in photography and try to push the boundaries of creativity by only utilising the things at hand. I believe every moment in life has potential to be brought to life by photography and share the glimpse of that moment  and experience with others.My love lies in capturing birds, insects,landscapes toys,architecture and many more....",
    image: "/team/b942124c-9122-4dc2-b872-5898650081ee.jpeg",
    instagram: "https://www.instagram.com/rakshithphotography_0506?igsh=MW9ycnhneHBzaDN5aw==",
    linkedin: "https://www.linkedin.com/in/rakshithms056",
    email: "msrakshith.0506@gmail.com",
  },
  {
    id: 11,
    name: "Prerana Ballakkuraya",
    role: "Member",
    bio: "Professor of Visual Arts with a specialization in digital photography. Dr. Zhang provides guidance to the club and helps connect us with university resources and opportunities.",
    image: "/team/IMG-20240824-WA0043 - PRERANA MB.jpg",
    instagram: "https://www.instagram.com/prerana__ballakkuraya?igsh=MWdzN2N1aWt4czh0Yw==",
    linkedin: "https://www.linkedin.com/in/prerana-m-ballakkuraya-45ba57337",
    email: "mbprerana29@gmail.com",
  },

  {
    id: 14,
    name: "Gagannaag",
    role: "Member",
    bio: "I am a passionate photography and video editor who loves capturing moments and transforming them into compelling stories. I focus on creating high-quality visuals that leave a lasting impact, whether it’s through stunning photoshoots or engaging video projects.",
    image: "/team/IMG_5362 - Gagan aag Krishna.jpeg",
    instagram: "https://www.instagram.com/nagkrish_07/",
    linkedin: "",
    email: "",
  },
  {
    id: 15,
    name: "Keshav",
    role: "Member",
    bio: "I am a passionate photography and video editor who loves capturing moments and transforming them into compelling stories. I focus on creating high-quality visuals that leave a lasting impact, whether it’s through stunning photoshoots or engaging video projects.",
    image: "/team/IMG_20241011_134909_Burst20 - Keshav N.jpg",
    instagram: "https://www.instagram.com/_kesh.v_/",
    linkedin: "",
    email: "",
  },
  {
    id: 16,
    name: "Srividya V Rao",
    role: "Poster Designer",
    bio: "Capturing stories through still frames, one click at a time",
    image: "/team/Snapchat-572210030 - Srividya V. Rao.jpg",
    instagram: "https://www.instagram.com/srividya_v_rao?igsh=bHkwNWF1cDkwdjR6",
    linkedin: "https://www.linkedin.com/in/srividya-v-rao-2b6345365",
    email: "srividya.magadi@gmail.com",
  },
  {
    id: 22,
    name: "Amogh V Hathwar",
    role: "Member",
    bio: "Passionate photographer capturing the beauty of nature and the magic in everyday moments. Turning fleeting scenes into lasting memories, one frame at a time.",
    image: "/team/IMG_3279 - amogh hathwar.jpg",
    instagram: "https://www.instagram.com/siddharth_rajput_/",
    linkedin: "",
    email: "amogh.v.hathwar@gmail.com",
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
