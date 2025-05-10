"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  eventTitle?: string
  eventId?: number
}

export default function RegistrationForm({ isOpen, onClose, eventTitle, eventId = 0 }: RegistrationFormProps) {
  type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipStatus: "non-member",
    equipment: "",
    experience: 'beginner' as ExperienceLevel,
    comments: "",
    agreeToTerms: false,
  })

  const [formStep, setFormStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const experienceMap: Record<ExperienceLevel, string> = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced'
      }

      // Send registration data to API
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          eventTitle: eventTitle,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          experience: experienceMap[formData.experience],
          equipment: formData.equipment,
          comments: formData.comments,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed')
      }

      // Show success
      setIsSubmitted(true)
      
      // Reset form after 3 seconds and close
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          membershipStatus: "non-member",
          equipment: "",
          experience: "beginner",
          comments: "",
          agreeToTerms: false,
        })
        setFormStep(0)
        setIsSubmitted(false)
        onClose()
      }, 3000)

    } catch (error) {
      console.error('Registration error:', error)
      setSubmitError(error instanceof Error ? error.message : 'An error occurred during registration. Please try again.')
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration. Please try again.",
        variant: "destructive"
      })
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

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
      <AnimatePresence>
        <motion.div
          className="relative w-full max-w-md bg-white dark:bg-[#0A1D37] rounded-lg shadow-xl overflow-hidden"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="p-6">
            <h2 className="font-outfit text-2xl font-bold text-[#0A1D37] dark:text-white mb-1">
              {isSubmitted ? "Registration Complete!" : "Event Registration"}
            </h2>
            {eventTitle && !isSubmitted && <p className="font-outfit text-[#F7B32B] mb-4">{eventTitle}</p>}

            {submitError && !isSubmitted && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md mb-4 text-sm">
                {submitError}
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-[#0A1D37] dark:text-white mb-2">
                  Registration Complete!
                </h3>
                <div className="bg-white dark:bg-[#142B4D] p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4 text-left">
                  <p className="font-work-sans text-gray-700 dark:text-gray-300 mb-4">
                    Thank you for registering for <span className="font-semibold">{eventTitle}</span>!
                  </p>
                  <p className="font-work-sans text-gray-700 dark:text-gray-300 mb-4">
                    We've sent a confirmation email to <span className="font-semibold">{formData.email}</span> with all the details.
                  </p>
                  <div className="bg-[#E8F7EE] dark:bg-[#1A3A2A] p-3 rounded-md mb-2">
                    <p className="font-work-sans text-gray-800 dark:text-gray-200 font-medium">
                      Please join our WhatsApp group for event updates and communication:
                    </p>
                    <div className="flex justify-center mt-3">
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "WhatsApp Group Link",
                            description: "Please check your email for the WhatsApp group link!",
                            variant: "default"
                          });
                        }}
                        className="inline-flex items-center px-4 py-2 bg-[#25D366] text-white rounded-md font-medium hover:bg-[#22C15E] transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.571-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Check Email for Link
                      </a>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  className="bg-[#0A1D37] dark:bg-[#F7B32B] dark:text-[#0A1D37] hover:bg-[#0A1D37]/90 dark:hover:bg-[#F7B32B]/90"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Progress indicator */}
                <div className="flex justify-between mb-6">
                  {[0, 1, 2].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          formStep >= step
                            ? "bg-[#F7B32B] text-[#0A1D37]"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {formStep > step ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step + 1
                        )}
                      </div>
                      <div className="text-xs mt-1 font-work-sans text-gray-500 dark:text-gray-400">
                        {step === 0 ? "Personal" : step === 1 ? "Details" : "Confirm"}
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {formStep === 0 && (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-outfit">
                          Full Name
                        </Label>
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
                        <Label htmlFor="email" className="font-outfit">
                          Email Address
                        </Label>
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

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-outfit">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(123) 456-7890"
                          className="font-work-sans"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="font-outfit">Membership Status</Label>
                        <RadioGroup
                          value={formData.membershipStatus}
                          onValueChange={(value) => handleRadioChange("membershipStatus", value)}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="member" id="member" />
                            <Label htmlFor="member" className="font-work-sans">
                              Current Member
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-member" id="non-member" />
                            <Label htmlFor="non-member" className="font-work-sans">
                              Non-Member
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 1 && (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="equipment" className="font-outfit">
                          Equipment You'll Bring
                        </Label>
                        <Input
                          id="equipment"
                          name="equipment"
                          value={formData.equipment}
                          onChange={handleChange}
                          placeholder="Camera model, lenses, etc."
                          className="font-work-sans"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="font-outfit">Experience Level</Label>
                        <RadioGroup
                          value={formData.experience}
                          onValueChange={(value) => handleRadioChange("experience", value)}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="beginner" id="beginner" />
                            <Label htmlFor="beginner" className="font-work-sans">
                              Beginner
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="intermediate" id="intermediate" />
                            <Label htmlFor="intermediate" className="font-work-sans">
                              Intermediate
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="advanced" id="advanced" />
                            <Label htmlFor="advanced" className="font-work-sans">
                              Advanced
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments" className="font-outfit">
                          Comments or Questions
                        </Label>
                        <Textarea
                          id="comments"
                          name="comments"
                          value={formData.comments}
                          onChange={handleChange}
                          placeholder="Any additional information you'd like to share"
                          className="font-work-sans"
                        />
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div
                      key="step3"
                      variants={stepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-outfit text-lg font-semibold text-[#0A1D37] dark:text-white mb-3">
                          Registration Summary
                        </h3>
                        <div className="space-y-2 font-work-sans text-sm">
                          <p>
                            <span className="font-medium">Name:</span> {formData.name}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span> {formData.email}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span> {formData.phone || "Not provided"}
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            {formData.membershipStatus === "member" ? "Current Member" : "Non-Member"}
                          </p>
                          <p>
                            <span className="font-medium">Equipment:</span> {formData.equipment || "Not specified"}
                          </p>
                          <p>
                            <span className="font-medium">Experience:</span>{" "}
                            {formData.experience.charAt(0).toUpperCase() + formData.experience.slice(1)}
                          </p>
                          <p>
                            <span className="font-medium">Comments:</span>{" "}
                            {formData.comments || "None"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked)}
                          required
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="agreeToTerms"
                            className="font-work-sans text-sm text-gray-600 dark:text-gray-300"
                          >
                            I agree to the event terms and conditions, and I understand the cancellation policy.
                          </Label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  {formStep > 0 ? (
                    <Button type="button" variant="outline" onClick={prevStep} className="font-work-sans">
                      Back
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" onClick={onClose} className="font-work-sans">
                      Cancel
                    </Button>
                  )}

                  {formStep < 2 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#0A1D37] dark:bg-[#F7B32B] dark:text-[#0A1D37] hover:bg-[#0A1D37]/90 dark:hover:bg-[#F7B32B]/90 font-work-sans"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.agreeToTerms}
                      className="bg-[#0A1D37] dark:bg-[#F7B32B] dark:text-[#0A1D37] hover:bg-[#0A1D37]/90 dark:hover:bg-[#F7B32B]/90 font-work-sans"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-[#0A1D37]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing
                        </>
                      ) : (
                        "Complete Registration"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
