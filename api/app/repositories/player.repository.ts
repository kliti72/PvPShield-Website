import { db } from '../../config/db'
import { eq, desc } from 'drizzle-orm'
import type { Player } from '../types/player.type'
import { players } from '../../config/schema'

export const playerRepository = {
  findAll(): Player[] {
    return db.select().from(players).orderBy().all()
  },

  findById(id: number): Player | undefined {
    return db.select().from(players).where(eq(players.id, id)).get()
  },

  findByUUID(uuid: string): Player | undefined {
    return db.select().from(players).where(eq(players.uuid, uuid)).get()
  },

  insert(dto: Player): Player {
    return db.insert(players).values(dto).returning().get()!
  },

  update(id: number, dto: Partial<Player>): Player | undefined {
    return db.update(players).set(dto).where(eq(players.id, id)).returning().get()
  },

  remove(id: number): boolean {
    const result = db.delete(players).where(eq(players.id, id)).returning().get()
    return result != undefined;
  }

}
