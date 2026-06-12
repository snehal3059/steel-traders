import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { product_slug, product_title, name, email, phone, company, quantity, message } = body

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    const db = getDb()
    const stmt = db.prepare(
      `INSERT INTO inquiries (product_slug, product_title, name, email, phone, company, quantity, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    stmt.run(product_slug || null, product_title || null, name, email, phone, company || null, quantity || null, message || null)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Inquiry error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
