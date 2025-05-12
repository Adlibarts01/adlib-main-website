"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Landscape", "Abstract","Wildlife", "Artchitecture","Insects",]

const galleryItems = [
  {
    id: 1,
    title: "Lazy Lion",
    photographer: "Mohit Hemarath",
    category: "Wildlife",
    image: "/gallery/animals/IMG-20241005-WA0026.jpg",
    metadata: "f/8, 1/125s, ISO 100",
  },
  {
    id: 2,
    title: "Clock Tower",
    photographer: "Rounak Gupta",
    category: "Artchitecture",
    image: "/gallery/artitecture/IMG-20241005-WA0021.jpg",
    metadata: "f/2.8, 1/200s, ISO 400",
  },
  {
    id: 3,
    title: "Kingfisher",
    photographer: "Abhiday U",
    category: "Wildlife",
    image: "/gallery/birds/IMG-20241005-WA0040.jpg",
    metadata: "f/5.6, 1/60s, ISO 800",
  },
  {
    id: 4,
    title: "Spider Eye",
    photographer: "Rakshit M S",
    category: "Insects",
    image: "/gallery/insects/1000009113.jpg",
    metadata: "f/11, 1/15s, ISO 200",
  },
  {
    id: 5,
    title: "Mini Car",
    photographer: "Rakshit M S",
    category: "Abstract",
    image: "/gallery/miniature/df5e5943-62a1-4103-bef8-1ca6a3991413.jpeg",
    metadata: "f/16, 1/30s, ISO 100",
  },
  {
    id: 6,
    title: "Netravati",
    photographer: "Casey Kim",
    category: "Landscape",
    image: "/gallery/scenery/IMG-20241005-WA0036.jpg",
    metadata: "f/4, 1/250s, ISO 400",
  },
  
]

export default function FeaturedGallery() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredGallery =
    activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <section className="py-16 md:py-24 bg-[#E5E5E5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-outfit text-3xl font-bold text-[#0A1D37] md:text-4xl">Featured Photography</h2>
          <p className="font-work-sans mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of stunning photographs captured by our talented club members.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={cn(
                "font-outfit",
                activeCategory === category
                  ? "bg-[#F7B32B] text-[#0A1D37] border-[#F7B32B]"
                  : "bg-white text-[#0A1D37] hover:bg-[#F7B32B]/10",
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGallery.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg bg-white shadow-md">
              <div className="aspect-4/3 relative overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-outfit text-lg font-semibold text-[#0A1D37]">{item.title}</h3>
                    <p className="font-work-sans text-sm text-gray-600">by {item.photographer}</p>
                  </div>
                  <span className="font-outfit text-xs font-medium px-2 py-1 rounded-full bg-[#E5E5E5] text-[#0A1D37]">
                    {item.category}
                  </span>
                </div>
                <p className="font-work-sans text-xs text-gray-500 mt-2 font-mono">{item.metadata}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-[#0A1D37] hover:bg-[#0A1D37]/90">
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
