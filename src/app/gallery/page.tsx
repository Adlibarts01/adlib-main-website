"use client"

import { SetStateAction, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryModal from "@/components/gallery-modal"
import { motion } from "framer-motion"

const categories = ["All", "Landscape", "Portrait", "Street", "Abstract", "Macro", "Wildlife", "Artitecture","Insects"]

const galleryItems = [
  {
    id: 1,
    title: "Lazy Lion",
    photographer: "Mohit Hiremath",
    category: "Wildlife",
    image: "/gallery/animals/IMG-20241005-WA0026.jpg",
    metadata: "f/8, 1/125s, ISO 100",
    description: "A lion lounging in the grass, showcasing",
  },
  {
    id: 2,
    title: "Clock Tower",
    photographer: "Rounak Gupta",
    category: "Artitecture",
    image: "/gallery/artitecture/IMG-20241005-WA0021.jpg",
    metadata: "f/2.8, 1/200s, ISO 400",
    description: "A close-up of a clock tower with intricate details and textures, showcasing architectural beauty.",
  },
  {
    id: 3,
    title: "Spider's eye",
    photographer: "Rakshit M S",
    category: "Insects",
    image: "/gallery/insects/1000009113.jpg",
    metadata: "f/5.6, 1/60s, ISO 800",
    description: "Close-up of a spider's eye, showcasing intricate details and textures in macro photography.",
  },
  {
    id: 4,
    title: "Light Patterns",
    photographer: "Taylor Reed",
    category: "Abstract",
    image: "/gallery/Abstract/IMG-20241005-WA0019.jpg",
    metadata: "f/11, 1/15s, ISO 200",
    description: "Abstract patterns created by light and shadow-sm playing across architectural elements.",
  },
  {
    id: 5,
    title: "Kingfisher",
    photographer: "Abhiday U",
    category: "Wildlife",
    image: "/gallery/birds/IMG-20241005-WA0040.jpg",
    metadata: "f/16, 1/30s, ISO 100",
    description: "Vibrant colors of sunset reflecting on calm ocean waters with distant silhouettes.",
  },
  {
    id: 6,
    title: "Street Vendor",
    photographer: "Casey Kim",
    category: "Street",
    image: "/gallery/street vendor/IMG_20250206_083525_977.jpg",
    metadata: "f/4, 1/250s, ISO 400",
    description: "Authentic moment of a street vendor preparing food, capturing daily life in the city.",
  },
  {
    id: 7,
    title: "Flower Close-up",
    photographer: "Riley Johnson",
    category: "Macro",
    image: "/gallery/macro/IMG-20241005-WA0015.jpg",
    metadata: "f/2.8, 1/60s, ISO 200",
    description: "Extreme close-up of a wildflower showing intricate details invisible to the naked eye.",
  },
  {
    id: 8,
    title: "Alligator's eye",
    photographer: "Mohit Hiremath",
    category: "Wildlife",
    image: "/gallery/animals/IMG-20241005-WA0027.jpg",
    metadata: "f/11, 1/125s, ISO 100",
    description: "Sweeping sand dunes with dramatic shadows emphasizing the desert's natural textures.",
  },
  {
    id: 9,
    title: "Portrait",
    photographer: "Sujal R T",
    category: "Portrait",
    image: "/gallery/street vendor/IMG_20250209_231708_266.jpg",
    metadata: "f/5.6, 1/160s, ISO 200",
    description: "Professionally lit studio portrait with careful attention to lighting and composition.",
  },
  {
    id: 10,
    title: "Shri Murudeshwara Temple",
    photographer: "Shubham Kumar",
    category: "Artitecture",
    image: "/gallery/artitecture/IMG-20241005-WA0035.jpg",
    metadata: "f/8, 1/250s, ISO 400",
    description: "A stunning view of the Shri Murudeshwara Temple, showcasing its intricate architecture and serene surroundings.",
  },
  {
    id: 11,
    title: "Tiger Yawning",
    photographer: "Mohit Hiremath",
    category: "Wildlife",
    image: "/gallery/animals/IMG-20241005-WA0034.jpg",
    metadata: "f/5.6, 1/500s, ISO 800",
    description: "A tiger yawning in the wild, showcasing its powerful jaws and fierce expression.",
  },
  {
    id: 12,
    title: "Miniature Optimus",
    photographer: "Rakshit M S",
    category: "Abstract",
    image: "/gallery/miniature/bb60f98a-04a4-4632-b60d-84330b2257aa.jpeg",
    metadata: "f/2.8, 1/1000s, ISO 400",
    description: "Macro photograph of a water droplet showing world refraction with incredible detail.",
  },
  {
    id: 13,
    title: "Street Vendor",
    photographer: "SUJAL",
    category: "Street",
    image: "/gallery/street vendor/IMG_20250206_083642_502.jpg",
    metadata: "f/4, 1/125s, ISO 200",
    description: "Vibrant street art mural capturing the essence of urban culture and creativity.",
  },
  {
    id: 14,
    title: "Bee",
    photographer: "Sam Wilson",
    category: "Insects",
    image: "/gallery/insects/IMG-20241005-WA0041.jpg",
    metadata: "f/5.6, 1/200s, ISO 100",
    description: "A bee collecting nectar from a flower, showcasing its delicate wings and fuzzy body.",
  },
  {
    id: 15,
    title: "Netravati Peak",
    photographer: "Alex Morgan",
    category: "Landscape",
    image: "/gallery/scenery/IMG-20241005-WA0036.jpg",
    metadata: "f/11, 1/60s, ISO 200",
    description: "Stunning mountain range with dramatic peaks and valleys under a clear blue sky.",
  },
  {
    id: 16,
    title: "St. Philomena Church",
    photographer: "Aditya Raj",
    category: "Artitecture",
    image: "/gallery/artitecture/IMG-20241011-WA0070 (1).jpg",
    metadata: "f/2.8, 1/50s, ISO 800",
    description: "Gothic-style church with intricate stained glass windows and towering spires.",
  },
  {
    id: 17,
    title: "Candid Moment",
    photographer: "",
    category: "Macro",
    image: "/gallery/macro/1000070091.jpg",
    metadata: "f/4, 1/125s, ISO 400",
    description: "",
  },
  {
    id: 18,
    title: "car",
    photographer: "Rakshit M S",
    category: "Abstract",
    image: "/gallery/miniature/df5e5943-62a1-4103-bef8-1ca6a3991413.jpeg",
    metadata: "f/8, 1/60s, ISO 100",
    description: "A close-up of a car's headlight reflecting the city lights, creating an abstract bokeh effect.",
  },
  {
    id: 19,
    title: "Abstract Car",
    photographer: "Jordan Lee",
    category: "Abstract",
    image: "/gallery/IMG-20241005-WA0033.jpg",
    metadata: "f/2.8, 1/30s, ISO 400",
    description: "Long exposure shot capturing light trails from moving vehicles on a busy street.",
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

// Using underscore prefix to indicate intentionally unused variable
const _item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    id: number;
    title: string;
    photographer: string;
    category: string;
    image: string;
    metadata: string;
    description: string;
  } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredGallery =
    activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  const openModal = (photo: SetStateAction<{ id: number; title: string; photographer: string; category: string; image: string; metadata: string; description: string } | null>) => {
    setSelectedPhoto(photo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToNextPhoto = () => {
    if (!selectedPhoto) return
    const currentIndex = filteredGallery.findIndex((photo) => photo.id === selectedPhoto.id)
    const nextIndex = (currentIndex + 1) % filteredGallery.length
    setSelectedPhoto(filteredGallery[nextIndex])
  }

  const goToPreviousPhoto = () => {
    if (!selectedPhoto) return
    const currentIndex = filteredGallery.findIndex((photo) => photo.id === selectedPhoto.id)
    const previousIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length
    setSelectedPhoto(filteredGallery[previousIndex])
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-[#0A1D37] py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-outfit text-4xl font-bold md:text-5xl">Our Photography Gallery</h1>
            <p className="font-work-sans mt-4 text-lg text-gray-300">
              Explore a collection of stunning photographs captured by our talented club members.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
            <div className="mb-10 overflow-x-auto">
              <TabsList className="inline-flex w-auto p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="font-outfit px-4 py-2 data-[state=active]:bg-[#F7B32B] data-[state=active]:text-[#0A1D37]"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <motion.div
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {(category === "All" ? galleryItems : galleryItems.filter((item) => item.category === category)).map(
                    (item) => (
                      <motion.div
                        key={item.id}
                        className="group relative overflow-hidden rounded-lg bg-white dark:bg-[#1A2E4A] shadow-md hover:shadow-lg transition-all duration-300"
                        variants={_item}
                        whileHover={{ y: -5 }}
                      >
                        <div className="aspect-4/3 relative overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-white text-white hover:bg-white hover:text-[#0A1D37]"
                              onClick={() => openModal(item)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-outfit text-lg font-semibold text-[#0A1D37] dark:text-white">
                                {item.title}
                              </h3>
                              <p className="font-work-sans text-sm text-gray-600 dark:text-gray-300">
                                by {item.photographer}
                              </p>
                            </div>
                            <span className="font-outfit text-xs font-medium px-2 py-1 rounded-full bg-[#E5E5E5] dark:bg-[#0A1D37] text-[#0A1D37] dark:text-white">
                              {item.category}
                            </span>
                          </div>
                          <p className="font-work-sans text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                            {item.metadata}
                          </p>
                        </div>
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        photos={filteredGallery}
        currentPhoto={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={goToNextPhoto}
        onPrevious={goToPreviousPhoto}
      />
    </div>
  )
}
