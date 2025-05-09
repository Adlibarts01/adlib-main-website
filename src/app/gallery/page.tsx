"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryModal from "@/components/gallery-modal"
import { motion } from "framer-motion"

const categories = ["All", "Landscape", "Portrait", "Street", "Abstract", "Macro", "Wildlife"]

const galleryItems = [
  {
    id: 1,
    title: "Mountain Sunrise",
    photographer: "Alex Morgan",
    category: "Landscape",
    image: "/placeholder.svg?height=600&width=800",
    metadata: "f/8, 1/125s, ISO 100",
    description: "A breathtaking view of mountains at sunrise with golden light streaming through the valley.",
  },
  {
    id: 2,
    title: "Urban Portrait",
    photographer: "Jamie Chen",
    category: "Portrait",
    image: "/placeholder.svg?height=800&width=600",
    metadata: "f/2.8, 1/200s, ISO 400",
    description: "Candid portrait shot on the streets of downtown, capturing raw emotions against an urban backdrop.",
  },
  {
    id: 3,
    title: "City Reflections",
    photographer: "Sam Wilson",
    category: "Street",
    image: "/placeholder.svg?height=600&width=800",
    metadata: "f/5.6, 1/60s, ISO 800",
    description: "Puddle reflections after rain showing the city skyline in a unique perspective.",
  },
  {
    id: 4,
    title: "Light Patterns",
    photographer: "Taylor Reed",
    category: "Abstract",
    image: "/placeholder.svg?height=800&width=800",
    metadata: "f/11, 1/15s, ISO 200",
    description: "Abstract patterns created by light and shadow-sm playing across architectural elements.",
  },
  {
    id: 5,
    title: "Ocean Sunset",
    photographer: "Jordan Lee",
    category: "Landscape",
    image: "/placeholder.svg?height=600&width=800",
    metadata: "f/16, 1/30s, ISO 100",
    description: "Vibrant colors of sunset reflecting on calm ocean waters with distant silhouettes.",
  },
  {
    id: 6,
    title: "Street Vendor",
    photographer: "Casey Kim",
    category: "Street",
    image: "/placeholder.svg?height=800&width=600",
    metadata: "f/4, 1/250s, ISO 400",
    description: "Authentic moment of a street vendor preparing food, capturing daily life in the city.",
  },
  {
    id: 7,
    title: "Flower Close-up",
    photographer: "Riley Johnson",
    category: "Macro",
    image: "/placeholder.svg?height=800&width=800",
    metadata: "f/2.8, 1/60s, ISO 200",
    description: "Extreme close-up of a wildflower showing intricate details invisible to the naked eye.",
  },
  {
    id: 8,
    title: "Desert Landscape",
    photographer: "Alex Morgan",
    category: "Landscape",
    image: "/placeholder.svg?height=600&width=800",
    metadata: "f/11, 1/125s, ISO 100",
    description: "Sweeping sand dunes with dramatic shadows emphasizing the desert's natural textures.",
  },
  {
    id: 9,
    title: "Studio Portrait",
    photographer: "Jamie Chen",
    category: "Portrait",
    image: "/placeholder.svg?height=800&width=600",
    metadata: "f/5.6, 1/160s, ISO 200",
    description: "Professionally lit studio portrait with careful attention to lighting and composition.",
  },
  {
    id: 10,
    title: "Urban Geometry",
    photographer: "Taylor Reed",
    category: "Abstract",
    image: "/placeholder.svg?height=800&width=800",
    metadata: "f/8, 1/250s, ISO 400",
    description: "Abstract architectural composition highlighting geometric patterns in the city.",
  },
  {
    id: 11,
    title: "Fox in Forest",
    photographer: "Jordan Lee",
    category: "Wildlife",
    image: "/placeholder.svg?height=600&width=800",
    metadata: "f/5.6, 1/500s, ISO 800",
    description: "A red fox caught in natural morning light in its forest habitat.",
  },
  {
    id: 12,
    title: "Water Droplet",
    photographer: "Riley Johnson",
    category: "Macro",
    image: "/placeholder.svg?height=800&width=800",
    metadata: "f/2.8, 1/1000s, ISO 400",
    description: "Macro photograph of a water droplet showing world refraction with incredible detail.",
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

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredGallery =
    activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  const openModal = (photo) => {
    setSelectedPhoto(photo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToNextPhoto = () => {
    const currentIndex = filteredGallery.findIndex((photo) => photo.id === selectedPhoto.id)
    const nextIndex = (currentIndex + 1) % filteredGallery.length
    setSelectedPhoto(filteredGallery[nextIndex])
  }

  const goToPreviousPhoto = () => {
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
                        variants={item}
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
