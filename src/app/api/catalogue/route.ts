import { NextResponse } from "next/server"
import PDFDocument from "pdfkit"
import { products } from "@/lib/product-data"
import fs from "fs"
import path from "path"

const categoryOrder = ["ms-sheet", "ms-plate", "ms-beam", "ms-channel", "ms-angle", "ms-round", "ms-hollow-pipes"]

const categoryDisplay: Record<string, { name: string; image: string }> = {
  "ms-sheet": { name: "MS Sheet", image: "ms-sheet.jpg" },
  "ms-plate": { name: "MS Plate", image: "ms-plate.jpg" },
  "ms-beam": { name: "MS Beam", image: "ms-beam.jpg" },
  "ms-channel": { name: "MS Channel", image: "ms-channel.jpg" },
  "ms-angle": { name: "MS Angle", image: "ms-angle.jpg" },
  "ms-round": { name: "MS Round", image: "ms-round.jpg" },
  "ms-hollow-pipes": { name: "MS Hollow Pipes", image: "ms-pipes.jpg" },
}

const WIDTH = 595.28
const HEIGHT = 841.89
const MARGIN = 50
const CONTENT = WIDTH - MARGIN * 2
const COL2 = (CONTENT - 20) / 2

function addFooter(doc: typeof PDFDocument.prototype) {
  doc.fontSize(8).fillColor("#999")
    .text("OMKARA COMMERCIAL PVT. LTD. — Product Catalogue", MARGIN, HEIGHT - 30, { width: CONTENT, align: "center" })
  doc.fillColor("#000")
}

export async function GET() {
  const doc = new PDFDocument({ size: "A4", margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } })

  const buffers: Buffer[] = []
  doc.on("data", (chunk: Buffer) => buffers.push(chunk))

  await new Promise<void>((resolve) => {
    doc.on("end", () => resolve())

    // --- Cover page ---
    doc.fontSize(36).fillColor("#1e3a5f")
      .text("OMKARA COMMERCIAL", MARGIN, 200, { width: CONTENT, align: "center" })
    doc.fontSize(28).fillColor("#2563eb")
      .text("PVT. LTD.", MARGIN, 240, { width: CONTENT, align: "center" })

    doc.moveTo(MARGIN + 120, 290).lineTo(WIDTH - MARGIN - 120, 290).strokeColor("#2563eb").lineWidth(2).stroke()

    doc.fontSize(20).fillColor("#1e3a5f")
      .text("PRODUCT CATALOGUE", MARGIN, 310, { width: CONTENT, align: "center" })

    doc.fontSize(14).fillColor("#666")
      .text("Premium Iron & Steel Products", MARGIN, 350, { width: CONTENT, align: "center" })

    doc.fontSize(11).fillColor("#888")
      .text("Howrah, West Bengal, India", MARGIN, 380, { width: CONTENT, align: "center" })
      .text("Est. 2008", MARGIN, 398, { width: CONTENT, align: "center" })

    addFooter(doc)
    doc.addPage()

    // --- Table of Contents ---
    doc.fontSize(22).fillColor("#1e3a5f").text("CONTENTS", MARGIN, MARGIN, { width: CONTENT, align: "center" })
    doc.moveDown(2)

    doc.fontSize(12).fillColor("#333")
    categoryOrder.forEach((cat, i) => {
      const info = categoryDisplay[cat]
      doc.text(`${i + 1}. ${info.name}`, MARGIN + 40, undefined)
      doc.moveDown(0.5)
    })

    addFooter(doc)

    // --- Category pages ---
    for (const cat of categoryOrder) {
      const info = categoryDisplay[cat]
      const catProducts = Object.entries(products).filter(([, p]) => p.category === cat)

      // Try to embed the image
      const imgPath = path.join(process.cwd(), "public", info.image)
      if (fs.existsSync(imgPath)) {
        try {
          doc.image(imgPath, MARGIN, MARGIN, { width: CONTENT, height: 120 })
          doc.moveDown(8)
        } catch {
          doc.moveDown(2)
        }
      } else {
        doc.moveDown(2)
      }

      doc.fontSize(22).fillColor("#1e3a5f").text(info.name, MARGIN, undefined, { width: CONTENT })
      doc.moveTo(MARGIN, doc.y + 2).lineTo(WIDTH - MARGIN, doc.y + 2).strokeColor("#2563eb").lineWidth(1.5).stroke()
      doc.moveDown(1)

      catProducts.forEach(([slug, product], idx) => {
        const yStart = doc.y

        if (yStart > HEIGHT - MARGIN - 60) {
          addFooter(doc)
          doc.addPage()
        }

        doc.fontSize(11).fillColor("#1e3a5f").text(product.title, MARGIN, undefined, { width: CONTENT, continued: false })

        doc.fontSize(8).fillColor("#666")
        const specs = product.specifications.map(s => `${s.key}: ${s.value}`).join("  |  ")
        doc.text(specs, MARGIN, undefined, { width: CONTENT, lineGap: 2 })

        doc.moveDown(0.3)
        doc.fontSize(8).fillColor("#999").text(slug, MARGIN, undefined, { width: CONTENT, align: "right" })
        doc.fillColor("#eee")
          .rect(MARGIN, doc.y + 2, CONTENT, 0.5).fill()
        doc.moveDown(0.5)
      })

      addFooter(doc)
      doc.addPage()
    }

    doc.end()
  })

  const pdfBuffer = Buffer.concat(buffers)

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="omkara-catalogue.pdf"',
    },
  })
}
