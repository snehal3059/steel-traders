import Database from "better-sqlite3"
import path from "path"

const dbPath = path.join(process.cwd(), "data", "omkara.db")

let db: Database.Database

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath)
    db.pragma("journal_mode = WAL")
    init()
  }
  return db
}

function init() {
  db.exec(`
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
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `)
}
