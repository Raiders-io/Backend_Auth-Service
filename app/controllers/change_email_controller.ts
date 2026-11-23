import User from '#models/user'
import { changeEmailValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ChangeEmailController {
  async update({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { email, password } = await request.validateUsing(changeEmailValidator)

    await User.verifyCredentials(user.email, password)

    user.email = email
    await user.save()

    return {
      message: 'Email updated successfully',
    }
  }
}
