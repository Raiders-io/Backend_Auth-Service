import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import app from '@adonisjs/core/services/app'

export default class UsersController {
  async index({ auth, response }: HttpContext) {
    const currentUser = auth.user!
    const users = await User.query()
      .whereNot('id', currentUser.id)
      .select('id', 'fullName', 'email')
    return response.ok({ data: users })
  }

  async destroy ({ auth, response }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    await User.query().where('id', currentUser.id).delete()
    const pub = await app.container.make('rabbitmq.publisher')
    await pub.send(
      { exchange: 'auth', routingKey: 'auth.user.deleted' },
      { userId: currentUser.id }
    )
    return response.ok({ message: 'User deleted successfully' })
  }
}
