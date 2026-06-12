import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET() {
  try {
    const db = getDb()
    const inquiries = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 100").all()
    const contacts = db.prepare("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100").all()
    return NextResponse.json({ inquiries, contacts })
  } catch (err) {
    console.error("Admin data error:", err)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
