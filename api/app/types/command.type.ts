import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { commands } from '../../config/schema'

export type Command = Omit<InferSelectModel<typeof commands>, "id">
