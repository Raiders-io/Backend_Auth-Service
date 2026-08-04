import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import app from '@adonisjs/core/services/app'

export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const { fullName, email, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ fullName, email, password })
    const token = await User.accessTokens.create(user)
    const pub = await app.container.make('rabbitmq.publisher')
    await pub.send({ exchange: 'auth', routingKey: 'auth.user.created' }, { userId: user.id })
    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
