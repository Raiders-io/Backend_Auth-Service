import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { publish } from '@yosone/broker'

export default class UsersController {
  async index({ auth, response }: HttpContext) {
    const currentUser = auth.user!
    const users = await User.query()
      .whereNot('id', currentUser.id)
      .select('id', 'fullName', 'email')
    return response.ok({ data: users })
  }

  async destroy({ auth, response }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    await User.query().where('id', currentUser.id).delete()

    publish('auth.events', {
      type: 'auth.user.deleted',
      payload: { userId: currentUser.id },
    })
    return response.ok({ message: 'User deleted successfully' })
  }
}
