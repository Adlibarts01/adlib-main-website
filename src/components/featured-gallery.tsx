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
    <section className="py-20 md:py-28 section-surface frosted-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center space-y-3">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full w-fit mx-auto" style={{borderRadius:"9999px"}}>
            <span className="font-outfit text-xs font-medium text-amber-400/80 uppercase tracking-widest">Portfolio</span>
          </div>
          <h2 className="font-outfit text-3xl font-bold text-white md:text-4xl">Featured Photography</h2>
          <p className="font-work-sans text-base text-white/50 max-w-xl mx-auto">
            Stunning photographs captured by our talented club members.
          </p>
        </div>

        {/* Category Filters — glass pill buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "font-outfit text-sm font-medium px-5 py-2 rounded-full transition-all duration-250 border",
                activeCategory === category
                  ? "bg-amber-500 text-black border-amber-500 shadow-[0_4px_16px_rgba(212,160,66,0.35)]"
                  : "glass-button text-white/70 hover:text-white"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGallery.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl glass-card !p-0">
              <div className="aspect-4/3 relative overflow-hidden rounded-t-2xl">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-outfit text-base font-semibold text-white">{item.title}</h3>
                    <p className="font-work-sans text-xs text-white/50 mt-0.5">by {item.photographer}</p>
                  </div>
                  <span className="font-outfit text-xs font-medium px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 whitespace-nowrap shrink-0">
                    {item.category}
                  </span>
                </div>
                <p className="font-work-sans text-xs text-white/30 mt-2 font-mono">{item.metadata}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="bg-amber-500 text-black hover:bg-amber-400 font-outfit font-semibold rounded-full px-8 shadow-[0_4px_20px_rgba(212,160,66,0.3)]"
          >
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
