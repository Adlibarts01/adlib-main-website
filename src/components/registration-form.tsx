"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  eventTitle?: string
  eventId?: string
}

export default function RegistrationForm({ isOpen, onClose, eventTitle, eventId }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    branch: "",
    year: "",
    phone: "",
    email: "",
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          eventTitle,
          ...formData
        }),
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Non-JSON response:', text.substring(0, 200))
        throw new Error('Server returned an invalid response. Please check your API configuration.')
      }

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Registration failed')
      }

      // Show success
      setIsSubmitted(true)

      // Reset form after 3 seconds and close
      setTimeout(() => {
        setFormData({
          name: "",
          usn: "",
          branch: "",
          year: "",
          phone: "",
          email: "",
          agreeToTerms: false,
        })
        setIsSubmitted(false)
        onClose()
      }, 3000)

    } catch (error) {
      console.error('Registration error:', error)
      if (error instanceof SyntaxError && error.message.includes('JSON')) {
        setSubmitError('Server configuration error. Please contact the administrator.')
      } else {
        setSubmitError(error instanceof Error ? error.message : 'An error occurred during registration. Please try again.')
      }
      toast(
        "Registration failed",
       )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <AnimatePresence>
        <motion.div
          className="relative w-full max-w-md glass-strong rounded-2xl overflow-hidden border border-white/10"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="p-6">
            <h2 className="font-outfit text-2xl font-bold text-white mb-1">
              {isSubmitted ? "Registration Complete!" : "Event Registration"}
            </h2>
            {eventTitle && !isSubmitted && <p className="font-outfit text-amber-400 mb-4">{eventTitle}</p>}

            {submitError && !isSubmitted && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-xl mb-4 text-sm">
                {submitError}
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-amber-500/15 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-white mb-2">
                  Registration Complete!
                </h3>
                <div className="glass-card p-4 !rounded-xl mb-4 text-left">
                  <p className="font-work-sans text-white/70 mb-4">
                    Thank you for registering for <span className="font-semibold text-white">{eventTitle}</span>!
                  </p>
                  <p className="font-work-sans text-white/70 mb-4">
                    We&apos;ve sent a confirmation email to <span className="font-semibold text-white">{formData.email}</span> with all the details.
                  </p>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-2">
                    <p className="font-work-sans text-white/70 font-medium">
                      Join our WhatsApp group for event updates and communication:
                    </p>
                    <div className="flex justify-center mt-3">
                      <a
                        href="https://chat.whatsapp.com/Cbu618FKcOsDRoMX4ZOqga?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-[#25D366] text-white rounded-md font-medium hover:bg-[#22C15E] transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.571-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Join WhatsApp Group
                      </a>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  className="bg-amber-500 text-black hover:bg-amber-400 rounded-full font-semibold"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-outfit">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="font-work-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usn" className="font-outfit">USN</Label>
                    <Input
                      id="usn"
                      name="usn"
                      value={formData.usn}
                      onChange={handleChange}
                      placeholder="Enter your USN"
                      required
                      className="font-work-sans uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch" className="font-outfit">Branch</Label>
                    <Input
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      placeholder="Your branch (e.g., CSE, ISE)"
                      required
                      className="font-work-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year" className="font-outfit">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="Current year (e.g., 1st, 2nd)"
                      required
                      className="font-work-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-outfit">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                      className="font-work-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-outfit">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="font-work-sans"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked)}
                      required
                    />
                    <Label
                      htmlFor="agreeToTerms"
                      className="font-work-sans text-sm text-gray-600 dark:text-gray-300"
                    >
                      I agree to the event terms and conditions
                    </Label>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button type="button" variant="outline" onClick={onClose} className="font-work-sans">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.agreeToTerms}
                    className="bg-amber-500 text-black hover:bg-amber-400 rounded-full font-semibold font-work-sans"
                  >
                    {isSubmitting ? "Processing..." : "Register"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
