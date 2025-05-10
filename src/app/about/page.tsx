import Image from "next/image"
// Removing unused imports
import { Camera, Users, ImageIcon } from "lucide-react"
import ApertureIcon from "@/components/aperture-icon"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-[#0A1D37] py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-outfit text-4xl font-bold md:text-5xl">About Adlib Photography Club</h1>
            <p className="font-work-sans mt-4 text-lg text-gray-300">
              Our story, mission, and the community we&apos;re building.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-outfit text-3xl font-bold text-[#0A1D37]">Our Story</h2>
              <div className="font-work-sans mt-6 space-y-4 text-gray-600">
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
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="Group of photographers at a club event"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 md:py-24 bg-[#E5E5E5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-outfit text-3xl font-bold text-[#0A1D37]">Our Mission & Values</h2>
            <p className="font-work-sans mt-4 text-gray-600">
              At Adlib Photography Club, we&apos;re guided by a set of core principles that shape everything we do.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7B32B]/10">
                <Camera className="h-6 w-6 text-[#F7B32B]" />
              </div>
              <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">Technical Excellence</h3>
              <p className="font-work-sans mt-2 text-gray-600">
                We believe in mastering the technical aspects of photography as the foundation for creative expression.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7B32B]/10">
                <ApertureIcon className="h-6 w-6" bladeCount={6} animated={false} />
              </div>
              <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">Creative Vision</h3>
              <p className="font-work-sans mt-2 text-gray-600">
                We encourage members to develop their unique artistic voice and perspective through photography.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7B32B]/10">
                <Users className="h-6 w-6 text-[#F7B32B]" />
              </div>
              <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">Community Learning</h3>
              <p className="font-work-sans mt-2 text-gray-600">
                We learn and grow together, sharing knowledge, techniques, and constructive feedback.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7B32B]/10">
                <ImageIcon className="h-6 w-6 text-[#F7B32B]" />
              </div>
              <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">Visual Storytelling</h3>
              <p className="font-work-sans mt-2 text-gray-600">
                We value photography&apos;s power to communicate ideas, emotions, and narratives through visual means.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-outfit text-3xl font-bold text-[#0A1D37]">What We Offer</h2>
            <p className="font-work-sans mt-4 text-gray-600">
              As a member of Adlib Photography Club, you&apos;ll have access to a variety of resources and opportunities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">Workshops & Training</h3>
              <ul className="font-work-sans mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Weekly technical workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Guest photographer presentations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Editing and post-processing tutorials</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Genre-specific technique sessions</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">Community & Events</h3>
              <ul className="font-work-sans mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Monthly photo walks and field trips</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Seasonal exhibitions and showcases</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Photography competitions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Social gatherings and networking</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="font-outfit text-xl font-bold text-[#0A1D37]">Resources & Support</h3>
              <ul className="font-work-sans mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Equipment lending library</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Studio space access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Online portfolio reviews</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#F7B32B]">•</span>
                  <span>Mentorship opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    
    </div>
  )
}
