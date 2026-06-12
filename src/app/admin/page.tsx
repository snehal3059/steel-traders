"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Inquiry {
  id: number
  product_slug: string | null
  product_title: string | null
  name: string
  email: string
  phone: string
  company: string | null
  quantity: string | null
  message: string | null
  created_at: string
}

interface Contact {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  created_at: string
}

export default function AdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [tab, setTab] = useState<"inquiries" | "contacts">("inquiries")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/data")
      .then((r) => r.json())
      .then((data) => {
        setInquiries(data.inquiries || [])
        setContacts(data.contacts || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Product inquiries and contact submissions</p>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab("inquiries")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "inquiries" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>
            Product Inquiries ({inquiries.length})
          </button>
          <button onClick={() => setTab("contacts")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "contacts" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>
            Contact Messages ({contacts.length})
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : tab === "inquiries" ? (
          inquiries.length === 0 ? (
            <p className="text-muted-foreground">No inquiries yet.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <Card key={inq.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{inq.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{inq.email} &middot; {inq.phone}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{inq.created_at}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    {inq.product_title && <p><span className="font-medium">Product:</span> {inq.product_title}</p>}
                    {inq.company && <p><span className="font-medium">Company:</span> {inq.company}</p>}
                    {inq.quantity && <p><span className="font-medium">Quantity:</span> {inq.quantity}</p>}
                    {inq.message && <p><span className="font-medium">Message:</span> {inq.message}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ) : (
          contacts.length === 0 ? (
            <p className="text-muted-foreground">No contact messages yet.</p>
          ) : (
            <div className="space-y-4">
              {contacts.map((c) => (
                <Card key={c.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{c.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{c.email}{c.phone ? ` \u00b7 ${c.phone}` : ""}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{c.created_at}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    {c.subject && <p><span className="font-medium">Subject:</span> {c.subject}</p>}
                    <p><span className="font-medium">Message:</span> {c.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}
