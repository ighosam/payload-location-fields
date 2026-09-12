
import * as sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import * as path from 'path'
import { fileURLToPath } from 'url'
/*
let db: Database | null = null
const dbPath = path.join(process.cwd(), 'cardb.db')

export const getDB = async (): Promise<Database> => {
  if (db) return db

  const __dirname = path.dirname(fileURLToPath(import.meta.url))


  db = await open({
    filename: path.join(__dirname, '../geodata.db'),
    //filename:dbPath,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  })

  return db
}
*/


/*
import * as sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
*/

let db: Database | null = null

export const getDB = async (dbPath: string): Promise<Database> => {
  if (db) return db

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  })

  return db
}

