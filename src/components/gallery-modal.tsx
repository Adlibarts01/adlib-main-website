"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Photo {
  id: number
  title: string
  photographer: string
  category: string
  image: string
  metadata: string
  description: string
}

interface GalleryModalProps {
  photos: Photo[]
  currentPhoto: Photo | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function GalleryModal({ currentPhoto, isOpen, onClose, onNext, onPrevious }: GalleryModalProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Reset loading state when photo changes
      setIsLoading(true)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, currentPhoto])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (showControls) {
      timeout = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [showControls])

  if (!isOpen || !currentPhoto) return null

  const handleMouseMove = () => {
    setShowControls(true)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs"
        onClick={onClose}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showControls ? 1 : 0, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <X size={24} />
        </motion.button>

        {/* Navigation buttons */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: showControls ? 1 : 0, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showControls ? 1 : 0, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Main content */}
        <div
          className="h-full w-full flex flex-col md:flex-row items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image container */}
          <div className="relative w-full md:w-3/4 h-[60vh] md:h-full flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-adlib-secondary border-t-transparent animate-spin"></div>
              </div>
            )}
            <Image
              src={currentPhoto.image || "/placeholder.svg"}
              alt={currentPhoto.title}
              fill
              className={cn("object-contain transition-opacity duration-500", isLoading ? "opacity-0" : "opacity-100")}
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Details panel */}
          <motion.div
            className={cn(
              "w-full md:w-1/4 h-auto md:h-full bg-white dark:bg-black p-6 overflow-y-auto",
              showControls ? "translate-x-0" : "translate-x-full md:translate-x-0",
            )}
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="font-outfit text-2xl font-bold text-adlib-primary dark:text-white">
                  {currentPhoto.title}
                </h2>
                <p className="font-work-sans text-adlib-darkgray dark:text-gray-300">by {currentPhoto.photographer}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-outfit text-sm font-medium px-3 py-1 rounded-full bg-adlib-secondary/20 text-adlib-secondary dark:bg-adlib-secondary/30">
                  {currentPhoto.category}
                </span>
              </div>

              <div className="py-2 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-outfit text-lg font-semibold mb-2 text-adlib-primary dark:text-white">
                  Technical Details
                </h3>
                <p className="font-mono text-sm text-adlib-darkgray dark:text-gray-400">{currentPhoto.metadata}</p>
              </div>

              <div className="py-2 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-outfit text-lg font-semibold mb-2 text-adlib-primary dark:text-white">
                  About This Photo
                </h3>
                <p className="font-work-sans text-adlib-darkgray dark:text-gray-300">{currentPhoto.description}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "rounded-full transition-colors",
                    isLiked ? "text-adlib-secondary border-adlib-secondary" : "text-gray-500 dark:text-gray-400",
                  )}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={cn("h-5 w-5", isLiked ? "fill-adlib-secondary" : "")} />
                </Button>

                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
