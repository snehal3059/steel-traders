import Link from "next/link"
import { ArrowRight, ShieldCheck, BadgeCheck, HeadphonesIcon, Clock, Calculator, FileText, Star, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "MS Sheet", slug: "ms-sheet", description: "High-quality mild steel sheets in various thicknesses" },
  { name: "MS Plate", slug: "ms-plate", description: "Durable mild steel plates for heavy-duty applications" },
  { name: "MS Beam", slug: "ms-beam", description: "Structural steel beams for construction and infrastructure" },
  { name: "MS Channel", slug: "ms-channel", description: "Versatile channel sections for structural support" },
  { name: "MS Angle", slug: "ms-angle", description: "Steel angles for framing and structural integrity" },
  { name: "MS Round", slug: "ms-round", description: "Round steel bars for machining and fabrication" },
  { name: "MS Hollow Pipes", slug: "ms-hollow-pipes", description: "Hollow pipes for plumbing, structure, and industrial use" },
]

const features = [
  { icon: BadgeCheck, title: "Premium Quality", description: "IS-certified steel products sourced from top mills" },
  { icon: Clock, title: "<48 Hrs Dispatch", description: "Rapid dispatch for stocked items to keep your projects on schedule" },
  { icon: ShieldCheck, title: "Best Pricing", description: "Competitive rates with bulk order discounts" },
  { icon: HeadphonesIcon, title: "Expert Support", description: "Dedicated team for product consultation and support" },
]

const testimonials = [
  { name: "Rajesh Kumar", role: "Project Head, Ganges Construction", company: "Kolkata, WB", content: "We have been sourcing beams and channels from Omkara for over 5 years. Consistent quality, on-time delivery, and very competitive pricing — they are our preferred steel partner." },
  { name: "Anita Sharma", role: "Purchase Manager, FabTech Industries", company: "Jamshedpur, JH", content: "Their MS plate range is outstanding. The IS 2062 E350 plates we ordered were true to specification with proper mill certification. Highly recommended for structural steel." },
  { name: "Vikram Singh", role: "Director, Singh Infrastructure", company: "Patna, BR", content: "What sets Omkara apart is their responsiveness. Even urgent last-minute orders are handled professionally. Their weight calculator and grade reference tools are a bonus for quick checks." },
  { name: "Priya Das", role: "Procurement Lead, East India Engineering", company: "Bhubaneswar, OD", content: "Excellent range of hollow sections and pipes. The team helped us choose the right schedule for our industrial piping project. Great after-sales support." },
]

const manufacturers = [
  { name: "SAIL", description: "Steel Authority of India Ltd." },
  { name: "TATA Steel", description: "Tata Steel Limited" },
  { name: "GAGAN GOLD", description: "Gagan Gold Steel" },
  { name: "SHYAM SEL", description: "Shyam SEL & Power Ltd." },
  { name: "ELEGANT", description: "Elegant Steel" },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm text-blue-300 mb-6">
              Howrah, West Bengal | Est. 2008
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Trusted Partner in{" "}
              <span className="text-blue-400">Iron & Steel Trading</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 sm:text-xl max-w-2xl">
              Based in Howrah, West Bengal — we supply premium quality Flat Products & Long Structural Steel 
              for construction, infrastructure, and industrial applications across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="text-base px-8">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-base px-8">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturer Logos */}
      <section className="py-12 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            AUTHORISED STOCKIST & DISTRIBUTOR OF
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {manufacturers.map((m) => (
              <Card key={m.name} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-center h-20 p-4">
                  <div className="text-center">
                    <div className="text-sm font-bold tracking-tight">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{m.description}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Welcome to OMKARA COMMERCIAL PVT. LTD.</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2008 by Shri Somnath Gupta, OMKARA COMMERCIAL PVT. LTD. is a premier 
                iron and steel trading company based in Howrah, West Bengal. What began as a small trading 
                venture has grown into a trusted supplier of high-quality MS steel products across India.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under the continued leadership of the second generation, we bring fresh digital insight 
                while preserving the timeless values of integrity, transparency, and customer commitment 
                that our founder instilled.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We specialise in <strong>Flat Products</strong> (HR Sheet, CR Sheet, MS Plate, Chequered Plate) 
                and <strong>Long Structural Products</strong> (ISMB Beams, ISMC Channels, MS Angles, MS Round Bars, 
                MS Hollow Pipes), sourcing from India&apos;s finest steel mills.
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Years in Business", value: "15+" },
                  { label: "Products Supplied", value: "500+" },
                  { label: "Happy Clients", value: "1000+" },
                  { label: "Cities Served", value: "50+" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground text-center border-t pt-4">
                <span className="font-medium text-foreground">Est. 2008</span> by Shri Somnath Gupta
                <br />Under 2nd Generation Leadership
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Product Range</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of Flat Products & Long Structural Steel
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group relative rounded-xl border bg-card p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Us</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on trust, driven by quality — serving India since 2008
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>  
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by engineers, fabricators, and construction companies across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <Card key={t.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} &middot; {t.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Resources</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Tools and references to help you make informed decisions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Link href="/grades" className="group rounded-xl border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Grades & Specifications</h3>
              <p className="mt-2 text-sm text-muted-foreground">Complete reference of IS, ASTM, EN grades with mechanical properties</p>
            </Link>
            <Link href="/weight-calculator" className="group rounded-xl border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Weight Calculator</h3>
              <p className="mt-2 text-sm text-muted-foreground">Calculate theoretical weight for plates, bars, pipes, and structurals</p>
            </Link>
            <a href="/api/catalogue" target="_blank" className="group rounded-xl border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Product Catalogue</h3>
              <p className="mt-2 text-sm text-muted-foreground">Download our full product catalogue with specifications and pricing</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-900">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Place Your Order?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Contact us today for competitive pricing, bulk order discounts, and expert product recommendations
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 text-base px-8">
                Contact Us
              </Button>
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base px-8">
                WhatsApp Inquiry
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}