"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ApertureIconProps {
  className?: string
  bladeCount?: number
  animated?: boolean
}

export default function ApertureIcon({ className, bladeCount = 8, animated = true }: ApertureIconProps) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!animated) return

    const interval = setInterval(() => {
      setIsOpen((prev) => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [animated])

  const renderBlades = () => {
    const blades = []
    const angleStep = 360 / bladeCount

    for (let i = 0; i < bladeCount; i++) {
      const angle = i * angleStep
      const rotateStyle = {
        transform: `rotate(${angle}deg)`,
      }

      blades.push(
        <div
          key={i}
          className={cn(
            "absolute left-1/2 top-1/2 h-1/2 w-[20%] -translate-x-1/2 origin-bottom rounded-t-full bg-current transition-all duration-1000",
            isOpen ? "-translate-y-[10%]" : "-translate-y-[40%]",
          )}
          style={rotateStyle}
        />,
      )
    }

    return blades
  }

  return (
    <div className={cn("relative h-8 w-8 text-adlib-secondary", className)}>
      <div className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
      {renderBlades()}
    </div>
  )
}
