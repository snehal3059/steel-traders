"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, MessageCircle, Clock, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      alert("Something went wrong. Please try again or email us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappMessage = encodeURIComponent(
    "Hi! I would like to know more about your steel products and pricing."
  )

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Get in touch for inquiries, quotes, and expert advice
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              {submitted ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-green-600">Message Sent!</h3>
                    <p className="mt-2 text-muted-foreground">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="e.g., Quotation request, Product inquiry" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your requirements, quantity, delivery location..." />
                  </div>
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="font-semibold text-lg">Contact Information</h3>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Address</p>
                      <a href="https://maps.app.goo.gl/HRctjJiCb6ztU5UZ9" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        77 / 5 / 6, Benaras Rd, Belgachia,<br />Salkia, Howrah, West Bengal 711101
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Phone</p>
                      <a href="tel:+919123857784" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                        +91 91238 57784
                      </a>
                      <a href="tel:+919830031148" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                        +91 98300 31148
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <a href="mailto:OMKARA_COMMLPVTLTD@HOTMAIL.COM" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                        OMKARA_COMMLPVTLTD@HOTMAIL.COM
                      </a>
                      <a href="mailto:OMKARA.COMMLPVTLTD@GMAIL.COM" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                        OMKARA.COMMLPVTLTD@GMAIL.COM
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Working Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon - Sat: 9:00 AM - 7:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Quick Inquiry</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant responses via WhatsApp
                  </p>
                  <a
                    href={`https://wa.me/919123857784?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                      <MessageCircle className="h-5 w-5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}