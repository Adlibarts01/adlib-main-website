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

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  eventTitle?: string
}

export default function RegistrationForm({ isOpen, onClose, eventTitle }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipStatus: "non-member",
    equipment: "",
    experience: "beginner",
    dietaryRestrictions: "",
    agreeToTerms: false,
  })

  const [formStep, setFormStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => prev - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
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
          dietaryRestrictions: "",
          agreeToTerms: false,
        })
        setFormStep(0)
        setIsSubmitted(false)
        onClose()
      }, 3000)
    }, 1500)
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
                <p className="font-work-sans text-gray-700 dark:text-gray-300 mb-4">
                  Thank you for registering! We've sent a confirmation email with all the details.
                </p>
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
                        <Label htmlFor="dietaryRestrictions" className="font-outfit">
                          Dietary Restrictions (if applicable)
                        </Label>
                        <Textarea
                          id="dietaryRestrictions"
                          name="dietaryRestrictions"
                          value={formData.dietaryRestrictions}
                          onChange={handleChange}
                          placeholder="Please list any dietary restrictions or allergies"
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
                            <span className="font-medium">Dietary Restrictions:</span>{" "}
                            {formData.dietaryRestrictions || "None"}
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
