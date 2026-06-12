"use client"

import { useState } from "react"
import { Calculator, RotateCcw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { allCategories, beams, channels, equalAngles, rounds } from "@/lib/steel-data"

const DENSITY = 7850

interface ShapeConfig {
  label: string
  fields: { key: string; label: string; placeholder: string; unit: string }[]
  calculate: (values: Record<string, number>) => number
}

const shapes: Record<string, ShapeConfig> = {
  plate: {
    label: "Plate / Sheet",
    fields: [
      { key: "length", label: "Length", placeholder: "e.g. 2000", unit: "mm" },
      { key: "width", label: "Width", placeholder: "e.g. 1000", unit: "mm" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 10", unit: "mm" },
    ],
    calculate: (v) => (v.length / 1000) * (v.width / 1000) * (v.thickness / 1000) * DENSITY,
  },
  round: {
    label: "Round / TMT Bar",
    fields: [
      { key: "diameter", label: "Diameter", placeholder: "e.g. 20", unit: "mm" },
      { key: "length", label: "Length", placeholder: "e.g. 6000", unit: "mm" },
    ],
    calculate: (v) => Math.PI * Math.pow(v.diameter / 2000, 2) * (v.length / 1000) * DENSITY,
  },
  pipe: {
    label: "Pipe / Tube (Round)",
    fields: [
      { key: "od", label: "Outer Diameter", placeholder: "e.g. 60.3", unit: "mm" },
      { key: "wt", label: "Wall Thickness", placeholder: "e.g. 4.0", unit: "mm" },
      { key: "length", label: "Length", placeholder: "e.g. 6000", unit: "mm" },
    ],
    calculate: (v) => Math.PI * ((v.od - v.wt) / 1000) * (v.wt / 1000) * (v.length / 1000) * DENSITY,
  },
  squarePipe: {
    label: "Square Hollow Section",
    fields: [
      { key: "side", label: "Side", placeholder: "e.g. 50", unit: "mm" },
      { key: "wt", label: "Wall Thickness", placeholder: "e.g. 3.0", unit: "mm" },
      { key: "length", label: "Length", placeholder: "e.g. 6000", unit: "mm" },
    ],
    calculate: (v) => 4 * (v.wt / 1000) * ((v.side - v.wt) / 1000) * (v.length / 1000) * DENSITY,
  },
  angle: {
    label: "Equal Angle",
    fields: [
      { key: "leg", label: "Leg", placeholder: "e.g. 50", unit: "mm" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 5", unit: "mm" },
      { key: "length", label: "Length", placeholder: "e.g. 6000", unit: "mm" },
    ],
    calculate: (v) => ((2 * v.leg - v.thickness) / 1000) * (v.thickness / 1000) * (v.length / 1000) * DENSITY,
  },
  unequalAngle: {
    label: "Unequal Angle",
    fields: [
      { key: "leg1", label: "Leg 1", placeholder: "e.g. 75", unit: "mm" },
      { key: "leg2", label: "Leg 2", placeholder: "e.g. 50", unit: "mm" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 6", unit: "mm" },
      { key: "length", label: "Length", placeholder: "e.g. 6000", unit: "mm" },
    ],
    calculate: (v) => ((v.leg1 + v.leg2 - v.thickness) / 1000) * (v.thickness / 1000) * (v.length / 1000) * DENSITY,
  },
  flat: {
    label: "Flat Bar",
    fields: [
      { key: "width", label: "Width", placeholder: "e.g. 50", unit: "mm" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 6", unit: "mm" },
      { key: "length", label: "Length", placeholder: "e.g. 6000", unit: "mm" },
    ],
    calculate: (v) => (v.width / 1000) * (v.thickness / 1000) * (v.length / 1000) * DENSITY,
  },
  square: {
    label: "Square Bar",
    fields: [
      { key: "side", label: "Side", placeholder: "e.g. 20", unit: "mm" },
      { key: "length", label: "Length", placeholder: "e.g. 6000", unit: "mm" },
    ],
    calculate: (v) => (v.side / 1000) * (v.side / 1000) * (v.length / 1000) * DENSITY,
  },
}

interface StandardSection {
  category: string
  label: string
  sections: { section: string; weight: number }[]
}

const standardSections: StandardSection[] = [
  {
    category: "Beams (I-Sections)",
    label: "Beam",
    sections: beams.map((b) => ({ section: b.section, weight: b.weight })),
  },
  {
    category: "Channels",
    label: "Channel",
    sections: channels.map((c) => ({ section: c.section, weight: c.weight })),
  },
  {
    category: "Equal Angles",
    label: "Equal Angle",
    sections: equalAngles.map((a) => ({ section: a.section, weight: a.weight })),
  },
  {
    category: "TOR / TMT / Rounds",
    label: "Round Bar",
    sections: rounds.map((r) => ({ section: r.section, weight: r.weight })),
  },
]

export default function WeightCalculatorPage() {
  const [shape, setShape] = useState("plate")
  const [values, setValues] = useState<Record<string, number>>({})
  const [result, setResult] = useState<{ perMeter: number; total: number; inMT: number } | null>(null)
  const [quantity, setQuantity] = useState(1)

  const [stdCategory, setStdCategory] = useState(standardSections[0].category)
  const [stdSection, setStdSection] = useState("")
  const [stdLength, setStdLength] = useState(6000)
  const [stdQty, setStdQty] = useState(1)
  const [stdResult, setStdResult] = useState<{ perMeter: number; total: number; inMT: number } | null>(null)

  const config = shapes[shape]

  const currentStd = standardSections.find((s) => s.category === stdCategory)
  const currentSections = currentStd?.sections ?? []
  const selectedEntry = currentSections.find((s) => s.section === stdSection)

  const handleCalculate = () => {
    const filled = config.fields.every((f) => values[f.key] && values[f.key] > 0)
    if (!filled) return
    const totalKg = config.calculate(values)
    const length = values.length || 1
    const perMeter = totalKg / (length / 1000)
    setResult({
      perMeter: Math.round(perMeter * 100) / 100,
      total: Math.round(totalKg * quantity * 100) / 100,
      inMT: Math.round((totalKg * quantity / 1000) * 100) / 100,
    })
  }

  const handleStdCalculate = () => {
    if (!selectedEntry || !stdLength) return
    const perMeter = selectedEntry.weight
    const total = perMeter * (stdLength / 1000) * stdQty
    setStdResult({
      perMeter,
      total: Math.round(total * 100) / 100,
      inMT: Math.round((total / 1000) * 100) / 100,
    })
  }

  const handleReset = () => {
    setValues({})
    setResult(null)
    setQuantity(1)
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Weight Calculator</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate theoretical weight for MS steel products. Density: 7,850 kg/m&sup3;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Custom Shape Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label>Shape</Label>
                  <Select value={shape} onValueChange={(v) => { setShape(v); setResult(null); setValues({}) }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(shapes).map(([key, s]) => (
                        <SelectItem key={key} value={key}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {config.fields.map((field) => (
                  <div key={field.key}>
                    <Label htmlFor={field.key}>
                      {field.label} ({field.unit})
                    </Label>
                    <Input
                      id={field.key}
                      type="number"
                      step="any"
                      placeholder={field.placeholder}
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                ))}

                <div>
                  <Label htmlFor="qty">Quantity (pieces)</Label>
                  <Input id="qty" type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleCalculate} className="flex-1 gap-2">
                    <Calculator className="h-4 w-4" />
                    Calculate
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>

                {result && (
                  <div className="rounded-lg bg-primary/5 p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Weight per meter</span>
                      <span className="font-semibold">{result.perMeter} kg/m</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total weight ({quantity} pcs)</span>
                      <span className="font-semibold">{result.total} kg</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total weight</span>
                      <span className="font-semibold text-primary">{result.inMT} MT</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Standard Section Lookup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label>Category</Label>
                  <Select value={stdCategory} onValueChange={(v) => { setStdCategory(v); setStdSection(""); setStdResult(null) }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {standardSections.map((s) => (
                        <SelectItem key={s.category} value={s.category}>{s.category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Section</Label>
                  <Select value={stdSection} onValueChange={(v) => { setStdSection(v); setStdResult(null) }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentSections.map((s) => (
                        <SelectItem key={s.section} value={s.section}>
                          {s.section} &mdash; {s.weight} kg/m
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stdLength">Length (mm)</Label>
                  <Input id="stdLength" type="number" min="1" value={stdLength} onChange={(e) => setStdLength(parseFloat(e.target.value) || 0)} />
                </div>

                <div>
                  <Label htmlFor="stdQty">Quantity (pieces)</Label>
                  <Input id="stdQty" type="number" min="1" value={stdQty} onChange={(e) => setStdQty(parseInt(e.target.value) || 1)} />
                </div>

                <Button onClick={handleStdCalculate} disabled={!selectedEntry} className="w-full gap-2">
                  <Calculator className="h-4 w-4" />
                  Calculate
                </Button>

                {stdResult && (
                  <div className="rounded-lg bg-primary/5 p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Section</span>
                      <span className="font-semibold">{stdSection}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Weight per meter</span>
                      <span className="font-semibold">{stdResult.perMeter} kg/m</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total weight ({stdQty} pcs @ {stdLength}mm)</span>
                      <span className="font-semibold">{stdResult.total} kg</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total weight</span>
                      <span className="font-semibold text-primary">{stdResult.inMT} MT</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Omkara Steel Weight Reference Chart</h2>
            <p className="text-sm text-muted-foreground mb-6">Standard theoretical weights for all sections. All weights in Kg per metre unless noted.</p>
            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
              {allCategories.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold text-primary mb-2">{group.category}</h3>
                  <div className="max-h-64 overflow-y-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-background">
                        <tr className="border-b text-muted-foreground text-xs">
                          <th className="text-left py-1.5 px-3 font-medium">Section</th>
                          <th className="text-right py-1.5 px-3 font-medium">Unit Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item) => (
                          <tr key={item.section + item.weight} className="border-b border-muted/50 hover:bg-muted/30">
                            <td className="py-1 px-3">{item.section}</td>
                            <td className="py-1 px-3 text-right text-muted-foreground whitespace-nowrap">
                              {item.weight} {item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-muted/50 border">
          <h3 className="font-semibold text-lg mb-2">Need Accurate Weights for Your Order?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The calculator provides theoretical weights. Actual weights may vary per mill tolerances.
            Contact our team for certified weight details and pricing.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+919123857784" className="text-sm font-medium text-primary hover:underline">+91 91238 57784</a> / <a href="tel:+919830031148" className="text-sm font-medium text-primary hover:underline">+91 98300 31148</a>
            <span className="text-muted-foreground">|</span>
            <a href="mailto:OMKARA_COMMLPVTLTD@HOTMAIL.COM" className="text-sm font-medium text-primary hover:underline">OMKARA_COMMLPVTLTD@HOTMAIL.COM</a><br /><a href="mailto:OMKARA.COMMLPVTLTD@GMAIL.COM" className="text-sm font-medium text-primary hover:underline">OMKARA.COMMLPVTLTD@GMAIL.COM</a>
          </div>
        </div>
      </div>
    </div>
  )
}
