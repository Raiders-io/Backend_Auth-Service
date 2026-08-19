import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"
import UserTransformer from "#transformers/user_transformer"

export default class OauthController {
	async redirect({ params, response, ally, session }: HttpContext) {
		if (params.provider === undefined) {
			return response.badRequest({ error: 'Provider not specified' })
		}
		const provider = params.provider.toLowerCase()
		if (provider !== 'github') {
			return response.badRequest({ error: 'Invalid provider' })
		}
		session.put('redirect.previousUrl', '/login')
		return ally.use('github').redirect()
	}

	async callback({ params, response, ally, serialize }: HttpContext) {
		if (params.provider === undefined) {
			return response.badRequest({ error: 'Provider not specified' })
		}
		const provider = params.provider.toLowerCase()
		if (provider !== 'github') {
			return response.badRequest({ error: 'Invalid provider' })
		}
		const github = ally.use('github')
		const githubUser = await github.user()
		if (githubUser.emailVerificationState === 'unverified') {
			return response.badRequest({ error: 'Email not verified' })
		}
		
		let user =  await User.query().where('email', githubUser.email).first()
		if (!user) {
			user = await User.create({
				email: githubUser.email,
				fullName: githubUser.nickName,
				password: githubUser.token.token,
			})
		}
		if (!user) {
			throw new Error('Failed to create user')
		}
		const token = await User.accessTokens.create(user)
		console.log('token', token)
		console.log('githubUser', githubUser)
		return serialize({
			user: UserTransformer.transform(user),
			token: token.value!.release(),
		})
	}
}
