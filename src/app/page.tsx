"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Users, Calendar, ImageIcon, ArrowRight } from "lucide-react";
import HeroSection from "@/components/hero-section";
import FeaturedGallery from "@/components/featured-gallery";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* About Section */}
      <section className="py-20 md:py-28 section-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <motion.div
              className="relative aspect-square w-full max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <Image
                  src="/home/Logo club.png"
                  alt="Photographer in action"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full w-fit" style={{borderRadius:"9999px"}}>
                <span className="font-outfit text-xs font-medium text-amber-400/80 uppercase tracking-widest">Our Story</span>
              </div>
              <h2 className="font-outfit text-3xl font-bold text-white md:text-4xl leading-tight">
                About Adlib<br className="hidden md:block" />
                <span className="text-amber-gradient"> Photography Club</span>
              </h2>
              <p className="font-work-sans text-base text-white/60 leading-relaxed">
                Founded in 2018, Adlib Photography Club brings together passionate photographers of all skill levels to
                learn, create, and grow together.
              </p>
              <p className="font-work-sans text-sm text-white/45 leading-relaxed">
                Our name &quot;Adlib&quot; represents the balance between technical precision and creative spontaneity that
                defines great photography. We provide a supportive community where members can develop their skills,
                share their work, and explore new techniques.
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                {[
                  { icon: Camera, label: "Weekly Workshops", desc: "Hands-on learning for all skill levels" },
                  { icon: Users, label: "Community Support", desc: "Connect with like-minded photographers" },
                  { icon: Calendar, label: "Regular Events", desc: "Photo walks, exhibitions, and competitions" },
                  { icon: ImageIcon, label: "Equipment Access", desc: "Borrow professional gear for projects" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="glass-card p-4 flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
                      <Icon className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-outfit text-sm font-semibold text-white">{label}</h3>
                      <p className="font-work-sans text-xs text-white/50 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  className="bg-amber-500 text-black hover:bg-amber-400 font-outfit font-semibold rounded-full px-7 shadow-[0_4px_20px_rgba(212,160,66,0.3)]"
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
    </div>
  );
}
