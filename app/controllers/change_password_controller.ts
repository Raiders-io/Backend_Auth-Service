import FieldErrorException from '#exceptions/field_error_exception'
import User from '#models/user'
import { changePasswordValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class ChangePasswordController {
  async update({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { currentPassword, password } = await request.validateUsing(changePasswordValidator)

    await User.verifyCredentials(user.email, currentPassword)

    if (await hash.verify(user.password, password)) {
      throw new FieldErrorException(
        'password',
        'The new password must be different from the current one.',
        'same_password'
      )
    }

    user.password = password
    await user.save()

    return {
      message: 'Password updated successfully',
    }
  }
}
