import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const commands = sqliteTable('commands', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    command: text('text').notNull(),
    executed: integer({ mode: 'boolean' })
})

export const players = sqliteTable('players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  uuid: text('uuid').notNull(),
})
