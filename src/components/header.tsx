"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ApertureIcon from "@/components/aperture-icon"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-xs" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ApertureIcon className="h-8 w-8 text-adlib-secondary" />
              <span className="font-outfit text-xl font-bold text-adlib-primary dark:text-white">ADLIB</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "font-outfit text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-adlib-secondary"
                    : "text-adlib-primary dark:text-white hover:text-adlib-secondary dark:hover:text-adlib-secondary",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle />
          </div>

          {/* Mobile navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white dark:bg-black">
                <div className="flex flex-col space-y-6 py-6">
                  <Link href="/" className="flex items-center space-x-2">
                    <ApertureIcon className="h-8 w-8 text-adlib-secondary" />
                    <span className="font-outfit text-xl font-bold text-adlib-primary dark:text-white">ADLIB</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "font-outfit text-base font-medium transition-colors",
                          pathname === item.href
                            ? "text-adlib-secondary"
                            : "text-adlib-primary dark:text-white hover:text-adlib-secondary dark:hover:text-adlib-secondary",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
