import Image from "next/image"
// Removing unused imports
import { Camera, Users, ImageIcon } from "lucide-react"
import ApertureIcon from "@/components/aperture-icon"
import { LucideIcon } from "lucide-react"

type ValueItem = {
  icon?: LucideIcon
  label: string
  desc: string
  isAperture?: boolean
}

export default function AboutPage() {
  return (
    <div className="flex flex-col" style={{backgroundColor:"#080808"}}>
      {/* Page Header */}
      <section className="py-24 md:py-32 section-dark relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 via-transparent to-transparent" style={{background:"radial-gradient(ellipse at 50% 60%, rgba(212,160,66,0.06) 0%, transparent 70%)"}} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full w-fit mx-auto" style={{borderRadius:"9999px"}}>
              <span className="font-outfit text-xs font-medium text-amber-400/80 uppercase tracking-widest">About Us</span>
            </div>
            <h1 className="font-outfit text-4xl font-bold text-white md:text-5xl">
              Adlib <span className="text-amber-gradient">Photography Club</span>
            </h1>
            <p className="font-work-sans text-base text-white/50">
              Our story, mission, and the community we&apos;re building.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 section-surface frosted-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div className="space-y-5">
              <h2 className="font-outfit text-3xl font-bold text-white">Our Story</h2>
              <div className="font-work-sans space-y-4 text-white/55 leading-relaxed">
                <p>
                  Adlib Photography Club was founded in 2018 by a small group of photography students who wanted to
                  create a supportive community for learning and creative exploration beyond the classroom.
                </p>
                <p>
                  The name &quot;Adlib&quot; was chosen to represent the balance between technical precision and creative
                  spontaneity that defines great photography. Just as musicians might improvise (ad lib) within the
                  structured framework of music theory, photographers balance technical knowledge with creative vision.
                </p>
                <p>
                  What began as informal meetups has grown into a thriving community of over 200 members from across
                  campus and the broader community, united by a passion for visual storytelling through photography.
                </p>
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Image
                src="/team/WhatsApp Image 2025-05-27 at 10.41.43 PM.jpeg"
                alt="Group of photographers at a club event"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 md:py-24 section-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full w-fit mx-auto" style={{borderRadius:"9999px"}}>
              <span className="font-outfit text-xs font-medium text-amber-400/80 uppercase tracking-widest">Values</span>
            </div>
            <h2 className="font-outfit text-3xl font-bold text-white">Our Mission &amp; Values</h2>
            <p className="font-work-sans text-sm text-white/45">
              At Adlib Photography Club, we&apos;re guided by core principles that shape everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Camera, label: "Technical Excellence", desc: "We believe in mastering the technical aspects of photography as the foundation for creative expression." },
              { label: "Creative Vision", desc: "We encourage members to develop their unique artistic voice and perspective through photography.", isAperture: true },
              { icon: Users, label: "Community Learning", desc: "We learn and grow together, sharing knowledge, techniques, and constructive feedback." },
              { icon: ImageIcon, label: "Visual Storytelling", desc: "We value photography's power to communicate ideas, emotions, and narratives through visual means." },
            ].map(({ icon: Icon, label, desc, isAperture }: ValueItem) => (
              <div key={label} className="glass-card p-6 flex flex-col gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/12 border border-amber-500/15">
                  {isAperture
                    ? <ApertureIcon className="h-5 w-5 text-amber-400" bladeCount={6} animated={false} />
                    : Icon && <Icon className="h-5 w-5 text-amber-400" />}
                </div>
                <div>
                  <h3 className="font-outfit text-base font-bold text-white">{label}</h3>
                  <p className="font-work-sans mt-2 text-sm text-white/50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 md:py-24 section-surface frosted-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 rounded-full w-fit mx-auto" style={{borderRadius:"9999px"}}>
              <span className="font-outfit text-xs font-medium text-amber-400/80 uppercase tracking-widest">Membership</span>
            </div>
            <h2 className="font-outfit text-3xl font-bold text-white">What We Offer</h2>
            <p className="font-work-sans text-sm text-white/45">
              As a member of Adlib Photography Club, you&apos;ll have access to a variety of resources and opportunities.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Workshops & Training",
                items: ["Weekly technical workshops", "Guest photographer presentations", "Editing and post-processing tutorials", "Genre-specific technique sessions"],
              },
              {
                title: "Community & Events",
                items: ["Monthly photo walks and field trips", "Seasonal exhibitions and showcases", "Photography competitions", "Social gatherings and networking"],
              },
              {
                title: "Resources & Support",
                items: ["Equipment lending library", "Studio space access", "Online portfolio reviews", "Mentorship opportunities"],
              },
            ].map(({ title, items }) => (
              <div key={title} className="glass-card p-6">
                <h3 className="font-outfit text-lg font-bold text-white mb-4">{title}</h3>
                <ul className="font-work-sans space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
                      <span className="text-sm text-white/55">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    
    </div>
  )
}
