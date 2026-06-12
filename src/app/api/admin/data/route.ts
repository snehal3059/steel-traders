import { NextResponse } from "next/server"
import { getInquiries, getContacts } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const inquiries = await getInquiries()
    const contacts = await getContacts()
    return NextResponse.json({ inquiries, contacts })
  } catch (err) {
    console.error("Admin data error:", err)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
