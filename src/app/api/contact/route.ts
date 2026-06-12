import { NextRequest, NextResponse } from "next/server"
import { insertContact } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    await insertContact({ name, email, phone, subject, message })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
