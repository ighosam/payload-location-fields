import path from 'path'
import { getDB } from '../getDb.js' 
import { queryConfig } from "../config/queryConfig.js"
import type { Entity, Filters } from "../config/queryConfig.js"
import { getDataByPath } from 'payload/shared'
import { getDatabasePath } from '../utilities/getDatabasePath.js'

export async function getOptions(
  entity: Entity,
  filters: Filters = {},
) {
   
  const dbPath = getDatabasePath()

  const db = await getDB(dbPath)

  const config = queryConfig[entity]
/*
Note by Sam: you can read dependsOn
eigher from config or from admin
*/


  const where =
    config.dependsOn.length === 0
      ? ''
      : `WHERE ${config.build(filters)}`

  const rows = await db.all(`
    SELECT DISTINCT name
    FROM ${config.table}
    ${where}
    ORDER BY name
  `)

  return rows.map((r: { name: string }) => ({
    label: r.name,
    value: r.name,
  }))
}