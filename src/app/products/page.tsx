"use client"

import { Suspense, useState, useMemo } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

const allProducts = [
  { title: "CR Sheet 0.5mm (DQ Grade)", slug: "cr-sheet-0-5mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Cold rolled sheet for precise panel work and auto components." },
  { title: "CR Sheet 1mm (DD Grade)", slug: "cr-sheet-1mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Deep drawing quality sheet for press-formed parts and enclosures." },
  { title: "CR Sheet 1.5mm (EDD Grade)", slug: "cr-sheet-1-5mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Extra deep drawing quality for complex automotive stampings." },
  { title: "CR Sheet 2mm (DQ Grade)", slug: "cr-sheet-2mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Cold rolled sheet for general fabrication and engineering." },
  { title: "HR Sheet 2.5mm (E250)", slug: "hr-sheet-2-5mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Hot rolled sheet for structural and heavy fabrication." },
  { title: "HR Sheet 3mm (E350)", slug: "hr-sheet-3mm", category: "ms-sheet", categoryName: "MS Sheet", description: "High-strength hot rolled sheet for industrial applications." },
  { title: "HR Sheet 4mm (E250)", slug: "hr-sheet-4mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Hot rolled sheet suitable for structural and boiler applications." },
  { title: "HR Sheet 5mm (E350)", slug: "hr-sheet-5mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Heavy-duty sheet for machinery and heavy equipment." },
  { title: "HR Sheet 6mm (E410)", slug: "hr-sheet-6mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Extra-thick hot rolled sheet for heavy structural use." },
  { title: "Chequered Plate 3mm (E250)", slug: "chequered-plate-3mm", category: "ms-sheet", categoryName: "MS Sheet", description: "Patterned floor plate for anti-skid industrial flooring." },

  { title: "MS Plate 6mm (E250)", slug: "ms-plate-6mm", category: "ms-plate", categoryName: "MS Plate", description: "Light plate for fabrication and general engineering." },
  { title: "MS Plate 8mm (E350)", slug: "ms-plate-8mm", category: "ms-plate", categoryName: "MS Plate", description: "Medium-duty plate for structural supports and frames." },
  { title: "MS Plate 10mm (E250)", slug: "ms-plate-10mm", category: "ms-plate", categoryName: "MS Plate", description: "Structural plate for building frames and machinery bases." },
  { title: "MS Plate 12mm (E350)", slug: "ms-plate-12mm", category: "ms-plate", categoryName: "MS Plate", description: "Industrial plate for heavy equipment and load-bearing structures." },
  { title: "MS Plate 16mm (E410)", slug: "ms-plate-16mm", category: "ms-plate", categoryName: "MS Plate", description: "Heavy plate for bridges, cranes, and pressure vessels." },
  { title: "MS Plate 20mm (E350)", slug: "ms-plate-20mm", category: "ms-plate", categoryName: "MS Plate", description: "Extra-heavy plate for transmission towers and offshore structures." },
  { title: "MS Plate 25mm (E410)", slug: "ms-plate-25mm", category: "ms-plate", categoryName: "MS Plate", description: "Heavy-gauge plate for shipbuilding and heavy machinery." },
  { title: "MS Plate 32mm (E450)", slug: "ms-plate-32mm", category: "ms-plate", categoryName: "MS Plate", description: "Ultra-heavy plate for mining equipment and heavy engineering." },
  { title: "MS Plate 40mm (E410)", slug: "ms-plate-40mm", category: "ms-plate", categoryName: "MS Plate", description: "Industrial plate for heavy presses and structural columns." },
  { title: "MS Plate 50mm (E450)", slug: "ms-plate-50mm", category: "ms-plate", categoryName: "MS Plate", description: "Jumbo plate for large-scale infrastructure and defence projects." },

  { title: "ISMB 100x50 Beam", slug: "ismb-100x50", category: "ms-beam", categoryName: "MS Beam", description: "Light I-beam for residential framing and small structures." },
  { title: "ISMB 125x70 Beam", slug: "ismb-125x70", category: "ms-beam", categoryName: "MS Beam", description: "Medium I-beam for mezzanine floors and light industrial sheds." },
  { title: "ISMB 150x75 Beam", slug: "ismb-150x75", category: "ms-beam", categoryName: "MS Beam", description: "Standard I-beam for building frames and support columns." },
  { title: "ISMB 175x85 Beam", slug: "ismb-175x85", category: "ms-beam", categoryName: "MS Beam", description: "Heavy I-beam for multi-storey buildings and bridges." },
  { title: "ISMB 200x100 Beam", slug: "ismb-200x100", category: "ms-beam", categoryName: "MS Beam", description: "Structural I-beam for industrial sheds and flyovers." },
  { title: "ISMB 225x110 Beam", slug: "ismb-225x110", category: "ms-beam", categoryName: "MS Beam", description: "Extra-heavy beam for high-rise construction and heavy loads." },
  { title: "ISMB 250x125 Beam", slug: "ismb-250x125", category: "ms-beam", categoryName: "MS Beam", description: "Large I-beam for factories, warehouses, and stadiums." },
  { title: "ISMB 300x140 Beam", slug: "ismb-300x140", category: "ms-beam", categoryName: "MS Beam", description: "Jumbo beam for large-span roofs and heavy industrial plants." },
  { title: "ISMB 350x140 Beam", slug: "ismb-350x140", category: "ms-beam", categoryName: "MS Beam", description: "Heavy jumbo beam for bridges and large infrastructure." },
  { title: "ISMB 400x140 Beam", slug: "ismb-400x140", category: "ms-beam", categoryName: "MS Beam", description: "Extra-jumbo beam for mega projects and port structures." },

  { title: "ISMC 75x40 Channel", slug: "ismc-75x40", category: "ms-channel", categoryName: "MS Channel", description: "Light channel for cable trays and light structural framing." },
  { title: "ISMC 100x50 Channel", slug: "ismc-100x50", category: "ms-channel", categoryName: "MS Channel", description: "Standard channel for roof purlins and structural supports." },
  { title: "ISMC 125x65 Channel", slug: "ismc-125x65", category: "ms-channel", categoryName: "MS Channel", description: "Medium channel for mezzanine floors and building frames." },
  { title: "ISMC 150x75 Channel", slug: "ismc-150x75", category: "ms-channel", categoryName: "MS Channel", description: "Heavy channel for bridge girders and industrial structures." },
  { title: "ISMC 175x75 Channel", slug: "ismc-175x75", category: "ms-channel", categoryName: "MS Channel", description: "Extra-heavy channel for transmission towers and heavy framing." },
  { title: "ISMC 200x75 Channel", slug: "ismc-200x75", category: "ms-channel", categoryName: "MS Channel", description: "Structural channel for heavy machinery and plant structures." },
  { title: "ISMC 225x80 Channel", slug: "ismc-225x80", category: "ms-channel", categoryName: "MS Channel", description: "Large channel for infrastructure and heavy-load applications." },
  { title: "ISMC 250x80 Channel", slug: "ismc-250x80", category: "ms-channel", categoryName: "MS Channel", description: "Jumbo channel for bridges, docks, and heavy construction." },
  { title: "ISMC 300x90 Channel", slug: "ismc-300x90", category: "ms-channel", categoryName: "MS Channel", description: "Extra-jumbo channel for large-scale industrial projects." },
  { title: "MC 100x50 Light Channel", slug: "mc-100x50-light", category: "ms-channel", categoryName: "MS Channel", description: "Lightweight channel for prefab structures and false ceilings." },

  { title: "Equal Angle 25x25x3mm", slug: "equal-angle-25x25", category: "ms-angle", categoryName: "MS Angle", description: "Light angle for gates, grills, and minor fabrication." },
  { title: "Equal Angle 30x30x3mm", slug: "equal-angle-30x30", category: "ms-angle", categoryName: "MS Angle", description: "Small angle for brackets, frames, and light supports." },
  { title: "Equal Angle 40x40x5mm", slug: "equal-angle-40x40", category: "ms-angle", categoryName: "MS Angle", description: "Medium angle for structural frames and towers." },
  { title: "Equal Angle 45x45x5mm", slug: "equal-angle-45x45", category: "ms-angle", categoryName: "MS Angle", description: "Standard angle for building frames and rack structures." },
  { title: "Equal Angle 50x50x5mm", slug: "equal-angle-50x50", category: "ms-angle", categoryName: "MS Angle", description: "Multi-purpose angle for general structural and fabrication work." },
  { title: "Equal Angle 55x55x6mm", slug: "equal-angle-55x55", category: "ms-angle", categoryName: "MS Angle", description: "Heavy angle for transmission towers and industrial sheds." },
  { title: "Equal Angle 60x60x6mm", slug: "equal-angle-60x60", category: "ms-angle", categoryName: "MS Angle", description: "Structural angle for bridges, trusses, and heavy frames." },
  { title: "Equal Angle 65x65x6mm", slug: "equal-angle-65x65", category: "ms-angle", categoryName: "MS Angle", description: "Extra-heavy angle for heavy structural applications." },
  { title: "Equal Angle 75x75x6mm", slug: "equal-angle-75x75", category: "ms-angle", categoryName: "MS Angle", description: "Heavy-duty angle for towers, cranes, and heavy equipment." },
  { title: "Equal Angle 80x80x8mm", slug: "equal-angle-80x80", category: "ms-angle", categoryName: "MS Angle", description: "Jumbo angle for large infrastructure and industrial frames." },
  { title: "Equal Angle 90x90x8mm", slug: "equal-angle-90x90", category: "ms-angle", categoryName: "MS Angle", description: "Extra-jumbo angle for heavy bridges and port structures." },
  { title: "Equal Angle 100x100x10mm", slug: "equal-angle-100x100", category: "ms-angle", categoryName: "MS Angle", description: "Ultra-heavy angle for mega construction and defence projects." },
  { title: "Unequal Angle 75x50x6mm", slug: "unequal-angle-75x50", category: "ms-angle", categoryName: "MS Angle", description: "Unequal section for specialized structural and fabrication needs." },
  { title: "Unequal Angle 100x75x8mm", slug: "unequal-angle-100x75", category: "ms-angle", categoryName: "MS Angle", description: "Heavy unequal angle for asymmetrical load-bearing structures." },

  { title: "MS Round Bar 6mm", slug: "ms-round-6mm", category: "ms-round", categoryName: "MS Round", description: "Thin round for pins, rivets, and light machining." },
  { title: "MS Round Bar 8mm", slug: "ms-round-8mm", category: "ms-round", categoryName: "MS Round", description: "Small diameter for bolts, studs, and general fasteners." },
  { title: "MS Round Bar 10mm", slug: "ms-round-10mm", category: "ms-round", categoryName: "MS Round", description: "Standard round for shafts, axles, and engineering parts." },
  { title: "MS Round Bar 12mm", slug: "ms-round-12mm", category: "ms-round", categoryName: "MS Round", description: "Medium round for machine components and structural ties." },
  { title: "MS Round Bar 16mm", slug: "ms-round-16mm", category: "ms-round", categoryName: "MS Round", description: "Industrial round for forging, coupling, and heavy machining." },
  { title: "MS Round Bar 20mm", slug: "ms-round-20mm", category: "ms-round", categoryName: "MS Round", description: "Heavy round for large shafts, rollers, and structural parts." },
  { title: "MS Round Bar 25mm", slug: "ms-round-25mm", category: "ms-round", categoryName: "MS Round", description: "Thick round for heavy forging, anchors, and stabilizers." },
  { title: "MS Round Bar 32mm", slug: "ms-round-32mm", category: "ms-round", categoryName: "MS Round", description: "Extra-heavy round for heavy machinery and marine applications." },
  { title: "MS Round Bar 36mm", slug: "ms-round-36mm", category: "ms-round", categoryName: "MS Round", description: "Jumbo round for large-scale engineering and structural supports." },
  { title: "MS Round Bar 40mm", slug: "ms-round-40mm", category: "ms-round", categoryName: "MS Round", description: "Ultra-heavy round for presses, rams, and heavy equipment." },
  { title: "MS Round Bar 50mm", slug: "ms-round-50mm", category: "ms-round", categoryName: "MS Round", description: "Extra-jumbo round for hydraulic cylinders and heavy shafts." },
  { title: "MS Round Bar 60mm", slug: "ms-round-60mm", category: "ms-round", categoryName: "MS Round", description: "Super-heavy round for industrial rollers and large forgings." },
  { title: "MS Round Bar 75mm", slug: "ms-round-75mm", category: "ms-round", categoryName: "MS Round", description: "Massive round for naval and defence applications." },
  { title: "MS Round Bar 100mm", slug: "ms-round-100mm", category: "ms-round", categoryName: "MS Round", description: "Jumbo round for heavy engineering and infrastructure projects." },

  { title: "GP Pipe 1/2 inch Medium", slug: "gp-pipe-half-inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Light pipe for handrails, furniture, and small plumbing." },
  { title: "GP Pipe 3/4 inch Medium", slug: "gp-pipe-3quarter-inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Standard pipe for domestic plumbing and electrical conduits." },
  { title: "GP Pipe 1 inch Heavy", slug: "gp-pipe-1inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Heavy pipe for water lines and structural handrails." },
  { title: "GP Pipe 1.25 inch Medium", slug: "gp-pipe-1-25inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Medium pipe for garden watering and light structural use." },
  { title: "GP Pipe 1.5 inch Heavy", slug: "gp-pipe-1-5inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Heavy-duty pipe for scaffolding and water mains." },
  { title: "ERW Pipe 2 inch Medium", slug: "erw-pipe-2inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "ERW pipe for plumbing, scaffolding, and structural columns." },
  { title: "ERW Pipe 2.5 inch Heavy", slug: "erw-pipe-2-5inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Heavy ERW pipe for industrial water supply and structures." },
  { title: "ERW Pipe 3 inch Heavy", slug: "erw-pipe-3inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Large ERW pipe for fire mains, piles, and heavy structures." },
  { title: "ERW Pipe 4 inch Heavy", slug: "erw-pipe-4inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Extra-heavy ERW pipe for gas lines and industrial piping." },
  { title: "ERW Pipe 5 inch Heavy", slug: "erw-pipe-5inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Jumbo ERW pipe for large-diameter water and sewerage mains." },
  { title: "ERW Pipe 6 inch Heavy", slug: "erw-pipe-6inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Super-heavy ERW pipe for piling and large infrastructure." },
  { title: "Seamless Pipe 2 inch SCH40", slug: "seamless-pipe-2inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Seamless pipe for high-pressure applications and boilers." },
  { title: "Seamless Pipe 3 inch SCH80", slug: "seamless-pipe-3inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Heavy seamless pipe for oil & gas and critical services." },
  { title: "Seamless Pipe 4 inch SCH40", slug: "seamless-pipe-4inch", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Large seamless pipe for industrial process piping." },
  { title: "MS Square Pipe 40x40mm", slug: "ms-square-pipe-40x40", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Square hollow section for gates, frames, and structures." },
  { title: "MS Square Pipe 50x50mm", slug: "ms-square-pipe-50x50", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Heavy square section for columns, towers, and trusses." },
  { title: "MS Rectangular Pipe 50x25mm", slug: "ms-rect-pipe-50x25", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Rectangular hollow section for handrails and fabrications." },
  { title: "MS Rectangular Pipe 80x40mm", slug: "ms-rect-pipe-80x40", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Large rectangular section for structural frames and supports." },
  { title: "MS Rectangular Pipe 100x50mm", slug: "ms-rect-pipe-100x50", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Jumbo rectangular section for heavy structural applications." },
  { title: "MS Square Pipe 100x100mm", slug: "ms-square-pipe-100x100", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes", description: "Extra-jumbo square section for large columns and towers." },
]

const categories = [
  { slug: "ms-sheet", name: "MS Sheet" },
  { slug: "ms-plate", name: "MS Plate" },
  { slug: "ms-beam", name: "MS Beam" },
  { slug: "ms-channel", name: "MS Channel" },
  { slug: "ms-angle", name: "MS Angle" },
  { slug: "ms-round", name: "MS Round" },
  { slug: "ms-hollow-pipes", name: "MS Hollow Pipes" },
]

const categoryCounts: Record<string, number> = {}
for (const p of allProducts) {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") || ""
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCategory = !activeCategory || p.category === activeCategory
      const matchSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64 shrink-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Link
              href="/products"
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                !activeCategory ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
              }`}
            >
              <span>All Products</span>
              <span className="text-xs opacity-70">{allProducts.length}</span>
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  activeCategory === cat.slug ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-xs opacity-70">{categoryCounts[cat.slug] || 0}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </aside>

      <div className="flex-1">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src={getProductImage(product.category)}
                    alt={product.categoryName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">{product.categoryName}</Badge>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Our Products</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse our comprehensive range of {allProducts.length} MS steel products
          </p>
        </div>

        <Suspense fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          <ProductsContent />
        </Suspense>
      </div>
    </div>
  )
}