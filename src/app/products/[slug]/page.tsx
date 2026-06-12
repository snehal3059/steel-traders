"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Download, MessageCircle, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/product-data"

function getProductImage(category: string): string {
  const catMap: Record<string, string> = {
    "ms-sheet": "/ms-sheet.jpg",
    "ms-plate": "/ms-plate.jpg",
    "ms-beam": "/ms-beam.jpg",
    "ms-channel": "/ms-channel.jpg",
    "ms-angle": "/ms-angle.jpg",
    "ms-round": "/ms-round.jpg",
    "ms-hollow-pipes": "/ms-pipes.jpg",
  }
  return catMap[category] || "/ms-sheet.jpg"
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug]
  if (!product) notFound()

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", quantity: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, product_slug: params.slug, product_title: product.title }),
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
    `Hi! I'm interested in ${product.title}.\n\n${product.description}\n\nPlease share pricing and availability.`
  )

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted mb-6">
              <img
                src={getProductImage(product.category)}
                alt={product.categoryName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Badge>{product.categoryName}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{product.title}</h1>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {product.specifications.map((spec) => (
                <div key={spec.key} className="flex justify-between items-center px-4 py-3 rounded-lg bg-muted/50">
                  <span className="text-sm font-medium">{spec.key}</span>
                  <span className="text-sm text-muted-foreground text-right ml-4">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {product.pdfUrl && (
                <a href={product.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Spec Sheet
                  </Button>
                </a>
              )}
              <a href={`https://wa.me/919876543210?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="h-4 w-4" />
                  Inquiry via WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Request a Quote</h3>
              {submitted ? (
                <div className="text-center py-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="mt-4 font-medium text-green-600">Inquiry Sent!</p>
                  <p className="mt-2 text-sm text-muted-foreground">We will contact you shortly with pricing and availability.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" required value={formData.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required value={formData.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" required value={formData.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" value={formData.company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Required Quantity</Label>
                    <Input id="quantity" placeholder="e.g., 10 tons, 50 sheets" value={formData.quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, quantity: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea id="message" rows={3} value={formData.message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      "Send Inquiry"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}