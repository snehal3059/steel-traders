const grades = [
  {
    category: "Structural Steel (IS 2062)",
    description: "For beams, channels, angles, plates, and structural applications",
    specs: [
      { grade: "E250 (Fe410W)", yield: "250 MPa min", tensile: "410 MPa min", elongation: "23% min", application: "General structural — beams, channels, angles, plates" },
      { grade: "E350 (Fe490)", yield: "350 MPa min", tensile: "490 MPa min", elongation: "22% min", application: "High-strength structural — bridges, cranes, heavy equipment" },
      { grade: "E410 (Fe540)", yield: "410 MPa min", tensile: "540 MPa min", elongation: "20% min", application: "Extra-high strength — offshore, pressure vessels, heavy structurals" },
      { grade: "E450 (Fe590)", yield: "450 MPa min", tensile: "590 MPa min", elongation: "20% min", application: "Premium strength — mining, defence, ultra-heavy structures" },
    ],
  },
  {
    category: "Cold Rolled Steel (IS 513)",
    description: "For CR sheets with superior surface finish and tight tolerances",
    specs: [
      { grade: "DQ (Drawing Quality)", yield: "170-330 MPa", tensile: "270-410 MPa", elongation: "30% min", application: "General fabrication, automotive panels, enclosures" },
      { grade: "DD (Deep Drawing)", yield: "140-280 MPa", tensile: "270-410 MPa", elongation: "33% min", application: "Deep-drawn parts, press-formed components" },
      { grade: "EDD (Extra Deep Drawing)", yield: "130-260 MPa", tensile: "270-390 MPa", elongation: "38% min", application: "Complex automotive stampings, intricate press-work" },
    ],
  },
  {
    category: "Hot Rolled Steel (IS 2062 / IS 1079)",
    description: "For HR sheets and plates in structural and general engineering",
    specs: [
      { grade: "HR1 (E250)", yield: "250 MPa min", tensile: "410-540 MPa", elongation: "28% min", application: "General structural, industrial flooring, light fabrication" },
      { grade: "HR2 (E350)", yield: "350 MPa min", tensile: "490-630 MPa", elongation: "23% min", application: "Heavy machinery, pressure vessels, high-stress structures" },
      { grade: "HR3 (E410)", yield: "410 MPa min", tensile: "540-680 MPa", elongation: "20% min", application: "Bridges, cranes, offshore platforms, heavy engineering" },
    ],
  },
  {
    category: "Steel Pipes & Tubes",
    description: "For ERW, seamless, GP, and hollow sections",
    specs: [
      { grade: "IS 1239 (Medium/Heavy)", yield: "200 MPa min", tensile: "320-440 MPa", elongation: "20% min", application: "GP pipes, water lines, scaffolding, handrails" },
      { grade: "IS 1161 (ERW)", yield: "250-350 MPa", tensile: "410-540 MPa", elongation: "20% min", application: "Structural tubes, scaffolding, columns, piling" },
      { grade: "IS 3589 (ERW Large Dia)", yield: "250-410 MPa", tensile: "410-590 MPa", elongation: "20% min", application: "Large-diameter pipes, water mains, oil & gas" },
      { grade: "IS 4923 (Hollow Sections)", yield: "250-350 MPa", tensile: "410-540 MPa", elongation: "15% min", application: "Square & rectangular hollow sections, structural frames" },
      { grade: "API 5L Gr.B", yield: "241 MPa min", tensile: "414 MPa min", elongation: "21% min", application: "Oil & gas pipelines, high-pressure transmission" },
      { grade: "ASTM A106 Gr.B", yield: "240 MPa min", tensile: "415 MPa min", elongation: "22% min", application: "Seamless pipes for high-temperature, boilers, refineries" },
    ],
  },
  {
    category: "Engineering Steels (EN Series)",
    description: "For round bars, shafts, and precision components",
    specs: [
      { grade: "EN8 (080M40)", yield: "280-465 MPa", tensile: "550-700 MPa", elongation: "16% min", application: "General shafts, studs, bolts, light engineering" },
      { grade: "EN9 (070M55)", yield: "310-495 MPa", tensile: "620-770 MPa", elongation: "14% min", application: "Heavy-duty shafts, gears, wear-resistant parts" },
      { grade: "EN19 (709M40)", yield: "540-785 MPa", tensile: "700-1000 MPa", elongation: "13% min", application: "High-strength shafts, connecting rods, heavy forgings" },
      { grade: "EN24 (817M40)", yield: "600-925 MPa", tensile: "850-1200 MPa", elongation: "12% min", application: "Premium shafts, aircraft components, gears, heavy axles" },
    ],
  },
  {
    category: "Structural Sections (IS 808)",
    description: "Standard specifications for beams, channels, and angles",
    specs: [
      { grade: "ISMB (I-Beams)", yield: "250-410 MPa", tensile: "410-590 MPa", elongation: "23% min", application: "Building frames, bridges, industrial sheds (100mm - 400mm)" },
      { grade: "ISMC (Channels)", yield: "250-410 MPa", tensile: "410-590 MPa", elongation: "23% min", application: "Roof purlins, structural supports, frames (75mm - 300mm)" },
      { grade: "Equal Angles", yield: "250-410 MPa", tensile: "410-590 MPa", elongation: "23% min", application: "Framing, towers, trusses, general fabrication" },
      { grade: "Unequal Angles", yield: "250-350 MPa", tensile: "410-540 MPa", elongation: "23% min", application: "Asymmetric loads, special frames, customized structures" },
    ],
  },
]

export default function GradesPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Grades & Specifications</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Complete reference of steel grades, mechanical properties, and applications for all products we supply
          </p>
        </div>

        <div className="space-y-12">
          {grades.map((section) => (
            <section key={section.category}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{section.category}</h2>
                <p className="text-muted-foreground mt-1">{section.description}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Grade</th>
                      <th className="text-left py-3 px-4 font-semibold">Yield Strength</th>
                      <th className="text-left py-3 px-4 font-semibold">Tensile Strength</th>
                      <th className="text-left py-3 px-4 font-semibold">Elongation</th>
                      <th className="text-left py-3 px-4 font-semibold hidden lg:table-cell">Typical Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.specs.map((spec) => (
                      <tr key={spec.grade} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium">{spec.grade}</td>
                        <td className="py-3 px-4 text-muted-foreground">{spec.yield}</td>
                        <td className="py-3 px-4 text-muted-foreground">{spec.tensile}</td>
                        <td className="py-3 px-4 text-muted-foreground">{spec.elongation}</td>
                        <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">{spec.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-xl bg-muted/50 border">
          <h3 className="font-semibold text-lg mb-2">Need Help Choosing the Right Grade?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our team can help you select the optimal grade for your specific application, load requirements, and budget.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+919876543210" className="text-sm font-medium text-primary hover:underline">+91 98765 43210</a>
            <span className="text-muted-foreground">|</span>
            <a href="mailto:info@omkaracommercial.com" className="text-sm font-medium text-primary hover:underline">info@omkaracommercial.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}