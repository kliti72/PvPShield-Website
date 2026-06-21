import { eq } from 'drizzle-orm'
import { db } from '../../config/db'
import { commands } from '../../config/schema'
import type { Command } from '../types/command.type'


export const commandRepository = {

  findAll(): Command[] {
    return db.select().from(commands).all()
  },

  put(command : Command): Command {
    const row = db.insert(commands).values(command).returning().get();
    return row;
  }

}

