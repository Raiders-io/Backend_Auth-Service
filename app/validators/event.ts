import vine from '@vinejs/vine'
import { type InferInput } from '@vinejs/vine/types'

export const AuthStartedEvent = vine.create({
  type: vine.literal('auth.started'),
  payload: vine.object({
    message: vine.string().minLength(1),
  }),
})
export type AuthStartedEvent = InferInput<typeof AuthStartedEvent>

export const AuthUserCreatedEvent = vine.create({
  type: vine.literal('auth.user.created'),
  payload: vine.object({
    userId: vine.string().uuid({ version: [4] }),
  }),
})
export type AuthUserCreatedEvent = InferInput<typeof AuthUserCreatedEvent>

export const AuthUserDeletedEvent = vine.create({
  type: vine.literal('auth.user.deleted'),
  payload: vine.object({
    userId: vine.string().uuid({ version: [4] }),
  }),
})
export type AuthUserDeletedEvent = InferInput<typeof AuthUserDeletedEvent>
