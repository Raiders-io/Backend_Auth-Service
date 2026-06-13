import type { HttpContext } from '@adonisjs/core/http'

export default class VerifyTokensController {
  async verify({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    return serialize({ userId: user.id })
  }
}
