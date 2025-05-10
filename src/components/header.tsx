"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import ApertureIcon from "@/components/aperture-icon"
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

          {/* Mobile navigation */}
          <div className="flex items-center space-x-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 border-l border-gray-200 dark:border-gray-800">
                <div className="flex flex-col h-full">
                  <div className="sr-only">
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </div>
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <Link href="/" className="flex items-center space-x-2">
                      <ApertureIcon className="h-8 w-8 text-adlib-secondary" />
                      <span className="font-outfit text-xl font-bold text-adlib-primary dark:text-white">ADLIB</span>
                    </Link>
                    <SheetTrigger asChild>
                      {/* <Button variant="ghost" size="icon" aria-label="Close menu">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </Button> */}
                    </SheetTrigger>
                  </div>
                  
                  <nav className="flex-1 overflow-auto py-6 px-4">
                    <div className="flex flex-col space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-md font-outfit text-base font-medium transition-colors",
                            pathname === item.href
                              ? "bg-adlib-secondary/10 text-adlib-secondary"
                              : "text-adlib-primary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-adlib-secondary dark:hover:text-adlib-secondary"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">© ADLIB {new Date().getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
