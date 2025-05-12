import Image from 'next/image'

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/home/dark_logo.png"
        alt="Adlib-Arts - Life Through Lens"
        width={50}
        height={100}
        className="object-contain"
      />
    </div>
  )
}
