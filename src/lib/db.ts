import { createClient } from "@libsql/client"
import path from "path"

function getClient() {
  const url = process.env.TURSO_DB_URL
  const token = process.env.TURSO_DB_TOKEN

  if (url && token) {
    return createClient({ url, authToken: token })
  }

  const filePath = path.join(process.cwd(), "data", "omkara.db")
  return createClient({ url: `file:${filePath}` })
}

const client = getClient()

export async function initDb() {
  await client.execute(`
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
  await client.execute(`
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

initDb().catch(console.error)

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
  const { product_slug, product_title, name, email, phone, company, quantity, message } = data
  await client.execute({
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
  const { name, email, phone, subject, message } = data
  await client.execute({
    sql: `INSERT INTO contacts (name, email, phone, subject, message)
          VALUES (?, ?, ?, ?, ?)`,
    args: [name, email, phone ?? null, subject ?? null, message],
  })
}

export async function getInquiries() {
  const rs = await client.execute("SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 100")
  return rs.rows
}

export async function getContacts() {
  const rs = await client.execute("SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100")
  return rs.rows
}
