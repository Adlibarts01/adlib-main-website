import Link from "next/link"
import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"

export default function Footer() {
  return (
    <footer className="bg-adlib-primary dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="block">
              <Logo className="w-48" />
            </Link>
            <p className="font-work-sans text-sm text-gray-300">
              Capturing moments, framing perspectives. A community of photographers dedicated to the art and science of
              visual storytelling.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/sit_adlib/" className="text-gray-300 hover:text-adlib-secondary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              
              
            </div>
          </div>

          <div>
            <h3 className="font-outfit text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="font-work-sans space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-adlib-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-adlib-secondary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-adlib-secondary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-300 hover:text-adlib-secondary">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-adlib-secondary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-adlib-secondary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-outfit text-lg font-semibold mb-4">Resources</h3>
            <ul className="font-work-sans space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-adlib-secondary">
                  Photography Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-adlib-secondary">
                  Equipment Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-adlib-secondary">
                  Editing Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-adlib-secondary">
                  Membership Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-adlib-secondary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-outfit text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="font-work-sans space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-adlib-secondary mr-2 mt-0.5" />
                <span className="text-gray-300">
                  Golden Jublie Block
                  <br />
                  Siddaganga Institute of Technology
                  <br />
                  Tumakuru , Karnataka, India
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-adlib-secondary mr-2" />
                <a href="mailto:adlibarts01@gmail.com" className="text-gray-300 hover:text-adlib-secondary">
                  adlibarts01@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-adlib-secondary mr-2" />
                <a href="tel:7981103350" className="text-gray-300 hover:text-adlib-secondary">
                  7981103350
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="font-work-sans text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Adlib Photography Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
