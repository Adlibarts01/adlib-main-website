"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const heroImages = [
  {
    src: "/gallery/animals/IMG-20241005-WA0034.jpg",
    alt: "Wildlife photography",
    title: "Explore Landscapes",
  },
  {
    src: "/gallery/IMG-20241005-WA0033.jpg",
    alt: "Portrait photography",
    title: "Master Portraits",
  },
  {
    src: "/gallery/artitecture/IMG_20250211_191303_661.jpg",
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
    <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <Image src={image.src || "/home/dark_logo.png"} alt={image.alt} fill priority className="object-cover scale-105" />
            {/* Dark cinematic gradient — no more flat blue overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            className="max-w-3xl space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tag line */}
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full !rounded-full w-fit"
                 style={{ borderRadius: "9999px" }}>
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-outfit text-xs font-medium text-white/70 uppercase tracking-widest">
                Photography Club · SIT Tumakuru
              </span>
            </div>

            <h1 className="font-outfit text-5xl font-bold text-white md:text-7xl leading-tight">
              Adlib<span className="text-amber-gradient">-Arts</span>
            </h1>
            <p className="font-outfit text-xl font-light text-white/80 md:text-2xl">
              Capturing moments, framing perspectives
            </p>
            <p className="font-work-sans text-base text-white/55 max-w-lg">
              Join our community of photographers dedicated to the art and science of visual storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                className="bg-amber-500 text-black hover:bg-amber-400 font-outfit font-semibold rounded-full px-7 shadow-[0_4px_20px_rgba(212,160,66,0.35)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(212,160,66,0.5)]"
              >
                <Link href="/gallery">Explore Gallery</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="glass-button border-white/20 text-white hover:bg-white/15 font-outfit rounded-full px-7"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-0 right-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between max-w-3xl">
              <div className="flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: currentSlide === index ? "2rem" : "0.5rem",
                      backgroundColor: currentSlide === index ? "#D4A042" : "rgba(255, 255, 255, 0.35)",
                    }}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="font-outfit text-white/50 text-sm">
                <span className="text-amber-400 font-medium">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="mx-2 text-white/20">/</span>
                <span>{String(heroImages.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
