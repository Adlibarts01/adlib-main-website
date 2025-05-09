"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ApertureIcon from "@/components/aperture-icon"
import { motion } from "framer-motion"

const heroImages = [
  {
    src: "/placeholder.svg?height=1080&width=1920",
    alt: "Landscape photography",
    title: "Explore Landscapes",
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    alt: "Portrait photography",
    title: "Master Portraits",
  },
  {
    src: "/placeholder.svg?height=1080&width=1920",
    alt: "Street photography",
    title: "Capture Street Life",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-adlib-primary/70 dark:bg-black/70" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            className="max-w-3xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4">
              <ApertureIcon className="h-12 w-12" />
              <h1 className="font-outfit text-5xl font-bold text-white md:text-6xl">ADLIB</h1>
            </div>
            <p className="font-outfit text-xl font-light text-white md:text-2xl">
              Capturing moments, framing perspectives
            </p>
            <p className="font-work-sans text-lg text-gray-200">
              Join our community of photographers dedicated to the art and science of visual storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="bg-adlib-secondary text-white hover:bg-adlib-tertiary">
                <Link href="/gallery">Explore Gallery</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-adlib-primary"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between max-w-3xl">
              <div className="flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className="h-2 w-8 rounded-full transition-colors"
                    style={{
                      backgroundColor: currentSlide === index ? "#22c55e" : "rgba(255, 255, 255, 0.5)",
                    }}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="font-outfit text-white">
                <span className="text-adlib-secondary">{currentSlide + 1}</span>
                <span className="mx-2">/</span>
                <span>{heroImages.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
