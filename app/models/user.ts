import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { beforeCreate } from '@adonisjs/lucid/orm'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @beforeCreate()
  static assignUuid(user: User) {
    user.id = crypto.randomUUID()
  }
}
