import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { players } from '../../config/schema'

export type Player = Omit<InferSelectModel<typeof players>, "id">
