import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class FieldErrorException extends Exception {
  static status = 422
  static code = 'E_FIELD_ERROR'

  constructor(
    readonly field: string,
    message: string,
    readonly rule: string
  ) {
    super(message, { status: 422, code: 'E_FIELD_ERROR' })
  }

  async handle(error: this, { response }: HttpContext) {
    response.status(422).send({
      errors: [{ field: error.field, message: error.message, rule: error.rule }],
    })
  }
}
