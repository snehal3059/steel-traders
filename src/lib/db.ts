import { createClient } from "@libsql/client"
import type { Client } from "@libsql/client"
import path from "path"

let client: Client | null = null
let initialized = false

async function getClient(): Promise<Client> {
  if (client) return client

  const url = process.env.TURSO_DB_URL
  const token = process.env.TURSO_DB_TOKEN

  if (url && token) {
    client = createClient({ url, authToken: token })
  } else {
    const filePath = path.join(process.cwd(), "data", "omkara.db")
    client = createClient({ url: `file:${filePath}` })
  }

  return client
}

async function init() {
  if (initialized) return
  initialized = true

  const c = await getClient()
  await c.execute(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_slug TEXT,
      product_title TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT,
      quantity TEXT,
      message TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `)
  await c.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `)
}

export async function insertInquiry(data: {
  product_slug?: string
  product_title?: string
  name: string
  email: string
  phone: string
  company?: string
  quantity?: string
  message?: string
}) {
  await init()
  const c = await getClient()
  const { product_slug, product_title, name, email, phone, company, quantity, message } = data
  await c.execute({
    sql: `INSERT INTO inquiries (product_slug, product_title, name, email, phone, company, quantity, message)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [product_slug ?? null, product_title ?? null, name, email, phone, company ?? null, quantity ?? null, message ?? null],
  })
}

export async function insertContact(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  await init()
  const c = await getClient()
  const { name, email, phone, subject, message } = data
  await c.execute({
    sql: `INSERT INTO contacts (name, email, phone, subject, message)
          VALUES (?, ?, ?, ?, ?)`,
    args: [name, email, phone ?? null, subject ?? null, message],
  })
}

export async function getInquiries() {
  await init()
  const c = await getClient()
  const rs = await c.execute("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 100")
  return rs.rows
}

export async function getContacts() {
  await init()
  const c = await getClient()
  const rs = await c.execute("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100")
  return rs.rows
}
