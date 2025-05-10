"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Users, Calendar, ImageIcon, ArrowRight } from "lucide-react"
import ApertureIcon from "@/components/aperture-icon"
import HeroSection from "@/components/hero-section"
import FeaturedGallery from "@/components/featured-gallery"
import EventsPreview from "@/components/events-preview"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <motion.div
              className="relative aspect-square w-full max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <ApertureIcon className="h-64 w-64 text-adlib-secondary opacity-10" bladeCount={12} />
              </div>
              <div className="relative h-full w-full rounded-full overflow-hidden border-8 border-adlib-gray dark:border-gray-800">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Photographer in action"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-outfit text-3xl font-bold text-adlib-primary dark:text-white md:text-4xl">
                About Adlib Photography Club
              </h2>
              <p className="font-work-sans text-lg text-adlib-darkgray dark:text-gray-300">
                Founded in 2018, Adlib Photography Club brings together passionate photographers of all skill levels to
                learn, create, and grow together.
              </p>
              <p className="font-work-sans text-adlib-darkgray dark:text-gray-400">
                Our name &quot;Adlib&quot; represents the balance between technical precision and creative spontaneity that
                defines great photography. We provide a supportive community where members can develop their skills,
                share their work, and explore new techniques.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-adlib-secondary/10">
                    <Camera className="h-5 w-5 text-adlib-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-outfit text-lg font-semibold text-adlib-primary dark:text-white">
                      Weekly Workshops
                    </h3>
                    <p className="font-work-sans text-sm text-adlib-darkgray dark:text-gray-400">
                      Hands-on learning experiences for all skill levels
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-adlib-secondary/10">
                    <Users className="h-5 w-5 text-adlib-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-outfit text-lg font-semibold text-adlib-primary dark:text-white">
                      Community Support
                    </h3>
                    <p className="font-work-sans text-sm text-adlib-darkgray dark:text-gray-400">
                      Connect with like-minded photographers
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-adlib-secondary/10">
                    <Calendar className="h-5 w-5 text-adlib-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-outfit text-lg font-semibold text-adlib-primary dark:text-white">
                      Regular Events
                    </h3>
                    <p className="font-work-sans text-sm text-adlib-darkgray dark:text-gray-400">
                      Photo walks, exhibitions, and competitions
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-adlib-secondary/10">
                    <ImageIcon className="h-5 w-5 text-adlib-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-outfit text-lg font-semibold text-adlib-primary dark:text-white">
                      Equipment Access
                    </h3>
                    <p className="font-work-sans text-sm text-adlib-darkgray dark:text-gray-400">
                      Borrow professional gear for your projects
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  asChild
                  className="bg-adlib-primary hover:bg-adlib-primary/90 dark:bg-adlib-secondary dark:text-white dark:hover:bg-adlib-tertiary"
                >
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedGallery />
      <EventsPreview />

      {/* CTA Section */}
      <section className="py-16 bg-adlib-primary dark:bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
        <h2 className="font-outfit text-3xl font-bold md:text-4xl">Interested in Our Events?</h2>
        <p className="font-work-sans text-lg text-gray-300">
          Join our upcoming photography events and workshops to experience what we&apos;re all about.
        </p>
        <div className="flex justify-center pt-4">
          <Button
            asChild
            className="bg-adlib-secondary text-white hover:bg-adlib-tertiary"
          >
            <Link href="/events">View Upcoming Events</Link>
          </Button>
        </div>
          </div>
        </div>
      </section>
    </div>
  )
}
