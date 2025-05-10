"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
    subscribe: false,
  })

  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, subscribe: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setFormStatus(null) // Reset form status
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      setFormStatus("success")
      // Reset form after success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
        subscribe: false,
      })
      // Clear success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus("error")
    }
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-[#0A1D37] py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-outfit text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="font-work-sans mt-4 text-lg text-gray-300">
              Have questions or want to join? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="font-outfit text-3xl font-bold text-[#0A1D37]">Get In Touch</h2>
              <p className="font-work-sans mt-4 text-gray-600">
                Whether you have a question about membership, events, or just want to say hello, we&apos;re here to help.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-[#F7B32B]" />
                  <div>
                    <h3 className="font-outfit text-lg font-semibold text-[#0A1D37]">Visit Us</h3>
                    <p className="font-work-sans text-gray-600">
                      Campus Arts Building, Room 302
                      <br />
                      123 University Ave
                      <br />
                      Collegetown, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-[#F7B32B]" />
                  <div>
                    <h3 className="font-outfit text-lg font-semibold text-[#0A1D37]">Email Us</h3>
                    <p className="font-work-sans text-gray-600">
                      <a href="mailto:info@adlibphoto.club" className="text-[#F7B32B] hover:underline">
                        info@adlibphoto.club
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-[#F7B32B]" />
                  <div>
                    <h3 className="font-outfit text-lg font-semibold text-[#0A1D37]">Call Us</h3>
                    <p className="font-work-sans text-gray-600">
                      <a href="tel:+15551234567" className="text-[#F7B32B] hover:underline">
                        (555) 123-4567
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-outfit text-lg font-semibold text-[#0A1D37]">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7B32B]/10 text-[#F7B32B] transition-colors hover:bg-[#F7B32B] hover:text-white"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7B32B]/10 text-[#F7B32B] transition-colors hover:bg-[#F7B32B] hover:text-white"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7B32B]/10 text-[#F7B32B] transition-colors hover:bg-[#F7B32B] hover:text-white"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="mt-10 rounded-lg bg-[#E5E5E5] p-6">
                <h3 className="font-outfit text-lg font-semibold text-[#0A1D37]">Club Hours</h3>
                <div className="font-work-sans mt-4 space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>12:00 PM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="font-work-sans mt-4 text-sm text-gray-500">
                  Hours may vary during holidays and special events. Check our social media for updates.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs">
                <h2 className="font-outfit text-2xl font-bold text-[#0A1D37]">Send Us a Message</h2>
                <p className="font-work-sans mt-2 text-gray-600">We&apos;ll get back to you as soon as possible.</p>

                {formStatus === "success" && (
                  <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-700">
                    <p className="font-work-sans font-medium">Thank you for your message! We&apos;ll be in touch soon.</p>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
                    <p className="font-work-sans font-medium">
                      There was an error sending your message. Please try again.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-outfit">
                      Your Name
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
                    <Label className="font-outfit">Type of Inquiry</Label>
                    <RadioGroup
                      value={formData.inquiryType}
                      onValueChange={handleRadioChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general" className="font-work-sans">
                          General Question
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="membership" id="membership" />
                        <Label htmlFor="membership" className="font-work-sans">
                          Membership Inquiry
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="event" id="event" />
                        <Label htmlFor="event" className="font-work-sans">
                          Event Information
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="font-work-sans">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-outfit">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is your message about?"
                      required
                      className="font-work-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-outfit">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                      className="font-work-sans"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="subscribe" checked={formData.subscribe} onCheckedChange={handleCheckboxChange} />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="subscribe" className="font-work-sans text-sm text-gray-600">
                        Subscribe to our newsletter for updates on events and workshops
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#0A1D37] hover:bg-[#0A1D37]/90">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
