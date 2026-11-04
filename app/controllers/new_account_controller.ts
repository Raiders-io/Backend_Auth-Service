import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { publish } from '@yosone/broker'
import { type AuthUserCreatedEvent } from '#validators/event'

export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ email, password })
    const token = await User.accessTokens.create(user)

    const event: AuthUserCreatedEvent = {
      type: 'auth.user.created',
      payload: { userId: user.id },
    }

    publish('auth.events', event)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
