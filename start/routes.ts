/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import User from '#models/user'

router.get('/auth', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
        router.get('verify', [controllers.VerifyTokens, 'verify']).use(middleware.auth())
        router.get('/users', [controllers.Users, 'index']).use(middleware.auth())

        router
          .get('/github/redirect', ({ ally, request }) => {
            const redirect = request.input('redirect')
            const safeRedirect = redirect.startsWith('/') ? redirect : '/'

            return ally.use('github').redirect((req) => {
              req.param('redirect', safeRedirect)
            })
          })
          .as('github.redirect')

        router
          .get('/github/callback', async ({ ally, request, response }) => {
            const gh = ally.use('github')

            if (!gh) {
              return response.badRequest({ error: 'GitHub provider not configured' })
            }
            if (gh.accessDenied()) {
              return { error: 'Access denied' }
            }
            if (gh.hasError()) {
              return { error: 'Access denied 3' }
            }
            const githubUser = await gh.user()
            const user = await User.firstOrCreate(
              { email: githubUser.email },
              {
                email: githubUser.email,
                fullName: githubUser.name,
                password: crypto.randomUUID(),
              }
            )
            const tmp_token = await User.accessTokens.create(user)
            const redirect = request.input('redirect', '/')
            const redirectUrl = new URL(redirect, 'https://localhost:4443')
            redirectUrl.search = ''
            redirectUrl.searchParams.set('token', encodeURIComponent(tmp_token.value!.release()))
            return response.redirect().toPath(redirectUrl.href)
          })
          .as('github.callback')
      })
      .as('auth')
      .prefix('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1/')
