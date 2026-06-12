import { ShieldCheck, Users, Building2, Award, Clock } from "lucide-react"

const stats = [
  { label: "Years in Business", value: "15+" },
  { label: "Products Supplied", value: "500+" },
  { label: "Happy Clients", value: "1000+" },
  { label: "Cities Served", value: "50+" },
]

const values = [
  { icon: ShieldCheck, title: "Quality Assurance", description: "All our products meet IS and international standards, with rigorous quality checks at every stage." },
  { icon: Users, title: "Customer First", description: "We build lasting relationships through trust, transparency, and exceptional service." },
  { icon: Building2, title: "Industry Expertise", description: "Deep understanding of the steel industry, supply chain, and market dynamics." },
  { icon: Award, title: "Reliability", description: "Consistent quality, <48 hrs dispatch, and competitive pricing you can count on." },
]

export default function AboutPage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm text-blue-300 mb-4">
            Howrah, West Bengal | Est. 2008
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About OMKARA COMMERCIAL PVT. LTD.</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Your trusted partner in iron and steel trading since 2008
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                OMKARA COMMERCIAL PVT. LTD. is a premier iron and steel trading company based in Howrah, West Bengal. 
                Founded in 2008 by <strong>Shri Somnath Gupta</strong>, we have grown into a reliable supplier 
                of high-quality MS steel products to construction companies, fabricators, manufacturers, 
                and infrastructure projects across India.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Today, under the continued leadership of the <strong>second generation</strong>, we blend fresh 
                digital insight with the timeless values — integrity, transparency, and commitment to 
                customer success — that our founder instilled from day one.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We specialise in <strong>Flat Products</strong> and <strong>Long Structural Products</strong>, 
                sourcing from India&apos;s finest mills including SAIL, TATA Steel, Gagan Gold, Shyam SEL, 
                and Elegant. Our extensive network ensures competitive pricing and timely delivery.
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Founded 2008</span> by Shri Somnath Gupta
                </p>
                <p className="text-sm text-muted-foreground">
                  Continuing under 2nd Generation Leadership
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-muted/50 rounded-xl p-8 order-2 lg:order-1">
              <h3 className="font-semibold text-lg mb-4">Flat Products</h3>
              <ul className="space-y-3 mb-6">
                {["HR Sheet (Hot Rolled) - 2.5mm to 6mm", "CR Sheet (Cold Rolled) - 0.5mm to 2mm", "MS Plate - 6mm to 50mm", "Chequered Plate - 3mm"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="font-semibold text-lg mb-4">Long Structural Products</h3>
              <ul className="space-y-3">
                {["I-Beam & H-Beam (ISMB) - 100mm to 400mm", "C-Channel (ISMC) - 75mm to 300mm", "Equal & Unequal Angles", "MS Round Bars - 6mm to 100mm", "Hollow Pipes (ERW/Seamless/GP) - 1/2\" to 6\"", "Square & Rectangular Hollow Sections"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight mb-6">What We Offer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We provide a comprehensive range of mild steel flat and long structural products to meet 
                diverse industrial and construction needs. Our products are sourced from reputed mills 
                and certified to IS standards.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With a commitment to <strong>&lt;48 hours dispatch</strong> for stocked items, we ensure 
                your projects stay on schedule. Our deep inventory and strong mill relationships mean 
                competitive pricing without compromising on quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need materials for a small fabrication project or a large infrastructure development, 
                we have the inventory and expertise to deliver the right products at the right price.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}