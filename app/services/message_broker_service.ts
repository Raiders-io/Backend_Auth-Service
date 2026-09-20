import { type ApiEvent } from '@yosone/broker'
import { z } from 'zod'

export const AuthUserCreatedEvent = z.object({
  type: z.literal('auth.user.created'),
  payload: z.object({
    userId: z.string(),
  }),
})
export type AuthUserCreatedEvent = z.infer<typeof AuthUserCreatedEvent>

export const AuthUserDeletedEvent = z.object({
  type: z.literal('auth.user.deleted'),
  payload: z.object({
    userId: z.string(),
  }),
})
export type AuthUserDeletedEvent = z.infer<typeof AuthUserDeletedEvent>

export async function handleAsyncMessage(msg: ApiEvent<any>) {
  switch (msg.type) {
    // case 'msg.type':
    // break
    default:
      // console.log('unknown event received')
      return
  }
}
