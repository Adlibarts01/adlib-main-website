"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Mail, Phone, Instagram } from "lucide-react"

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
      <section className="section-dark py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,160,66,0.12) 0%, transparent 70%)'}} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-outfit text-4xl font-bold md:text-5xl"><span className="text-amber-gradient">Contact</span> Us</h1>
            <p className="font-work-sans mt-4 text-lg text-white/55">
              Have questions or want to join? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}

      <section className="py-16 section-surface frosted-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="font-outfit text-3xl font-bold text-white">Get In Touch</h2>
              <p className="font-work-sans mt-4 text-white/55">
                Whether you have a question about membership, events, or just want to say hello, we&apos;re here to help.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-4 h-6 w-6 text-amber-400" />
                  <div>
                    <h3 className="font-outfit text-lg font-semibold text-white">Visit Us</h3>
                    <p className="font-work-sans text-white/55">
                    Golden Jublie Block
                    <br />
                      Siddaganga Institute of Technology
                      <br />
                      Tumakuru , Karnataka 572103
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-amber-400" />
                  <div>
                    <h3 className="font-outfit text-lg font-semibold text-white">Email Us</h3>
                    <p className="font-work-sans text-white/55">
                      <a href="mailto:adlibarts01@gmail.com" className="text-amber-400 hover:text-amber-300">
                        adlibarts01@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-amber-400" />
                  <div>
                    <h3 className="font-outfit text-lg font-semibold text-white">Call Us</h3>
                    <p className="font-work-sans text-white/55">
                      <a href="tel:7981103350" className="text-amber-400 hover:text-amber-300">
                      7981103350
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-outfit text-lg font-semibold text-white">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                  <a
                    href="https://www.instagram.com/sit_adlib/"
                    className="flex h-10 w-10 items-center justify-center rounded-full glass-button text-white/40 transition-colors hover:text-amber-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
        
                </div>
              </div>

              
            </div>

            {/* Contact Form */}
            <div>
              <div className="glass-card p-6">
                <h2 className="font-outfit text-2xl font-bold text-white">Send Us a Message</h2>
                <p className="font-work-sans mt-2 text-white/50">We&apos;ll get back to you as soon as possible.</p>

                {formStatus === "success" && (
                  <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 text-amber-300">
                    <p className="font-work-sans font-medium">Thank you for your message! We&apos;ll be in touch soon.</p>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-300">
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
                      <Label htmlFor="subscribe" className="font-work-sans text-sm text-white/50">
                        Subscribe to our newsletter for updates on events and workshops
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-amber-500 text-black hover:bg-amber-400 rounded-full font-semibold">
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
