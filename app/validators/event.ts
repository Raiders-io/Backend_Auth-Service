import vine from '@vinejs/vine'
import { InferInput } from '@vinejs/vine/types'

export const AuthUserDeletedEvent = vine.create({
  type: vine.literal('auth.user.deleted'),
  payload: vine.object({
    userId: vine.string().uuid({ version: [4] }),
  }),
})
export type AuthUserDeletedEvent = InferInput<typeof AuthUserDeletedEvent>

export const AuthUserCreatedEvent = vine.create({
  type: vine.literal('auth.user.created'),
  payload: vine.object({
    userId: vine.string().uuid({ version: [4] }),
  }),
})
export type AuthUserCreatedEvent = InferInput<typeof AuthUserCreatedEvent>
