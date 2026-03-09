import Link from "next/link"
import { Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/6">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="block">
              <Logo className="w-40 opacity-90" />
            </Link>
            <p className="font-work-sans text-sm text-white/40 leading-relaxed">
              Capturing moments, framing perspectives. A community of photographers dedicated to the art of visual storytelling.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://www.instagram.com/sit_adlib/"
                className="flex h-9 w-9 items-center justify-center rounded-full glass-button text-white/50 hover:text-amber-400 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-outfit text-sm font-semibold text-white/80 mb-5 uppercase tracking-wider">Quick Links</h3>
            <ul className="font-work-sans space-y-3">
              {["/", "/gallery", "/events", "/team", "/about", "/contact"].map((href, i) => {
                const labels = ["Home", "Gallery", "Events", "Team", "About", "Contact"];
                return (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/40 hover:text-amber-400 transition-colors">
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-outfit text-sm font-semibold text-white/80 mb-5 uppercase tracking-wider">Resources</h3>
            <ul className="font-work-sans space-y-3">
              {["Photography Tips", "Equipment Guide", "Editing Tutorials", "Membership Info", "FAQ"].map((label) => (
                <li key={label}>
                  <Link href="#" className="text-sm text-white/40 hover:text-amber-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-outfit text-sm font-semibold text-white/80 mb-5 uppercase tracking-wider">Contact</h3>
            <ul className="font-work-sans space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400/70 mt-0.5 shrink-0" />
                <span className="text-sm text-white/40">
                  Golden Jublie Block<br />
                  Siddaganga Institute of Technology<br />
                  Tumakuru, Karnataka, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400/70 shrink-0" />
                <a href="mailto:adlibarts01@gmail.com" className="text-sm text-white/40 hover:text-amber-400 transition-colors">
                  adlibarts01@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400/70 shrink-0" />
                <a href="tel:7981103350" className="text-sm text-white/40 hover:text-amber-400 transition-colors">
                  7981103350
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/6 pt-8">
          <p className="font-work-sans text-center text-xs text-white/25">
            &copy; {new Date().getFullYear()} Adlib Photography Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
