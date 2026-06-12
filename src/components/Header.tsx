"use client"

import Link from "next/link"
import { Menu, X, Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Grades", href: "/grades" },
  { name: "Weight Calculator", href: "/weight-calculator" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2" aria-label="OMKARA COMMERCIAL Home">
            <img src="/mini.svg" alt="OMKARA COMMERCIAL" className="h-10 w-auto" />
            <span className="hidden font-bold text-xl sm:block leading-tight">
              OMKARA <span className="text-primary">COMMERCIAL</span>
            </span>
          </Link>

          <div className="hidden md:flex md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>+91 98765 43210</span>
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t bg-white py-4">
          <div className="space-y-4 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-gray-600 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}