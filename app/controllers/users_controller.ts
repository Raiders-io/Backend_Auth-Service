import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async index({ auth, response }: HttpContext) {
    const currentUser = auth.user!
    const users = await User.query()
      .whereNot('id', currentUser.id)
      .select('id', 'fullName', 'email')
    return response.ok({ data: users })
  }
}
