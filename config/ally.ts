import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'

const allyConfig = defineConfig({
  github: services.github({
    clientId: env.get('OAUTH_GITHUB_CLIENT_ID'),
    clientSecret: env.get('OAUTH_GITHUB_CLIENT_SECRET'),
    callbackUrl: `https://127.0.0.1:4443/api/v1/auth/github/callback`,
    scopes: ['user:email', 'read:user'],
  }),
  // google: services.google({
  //   clientId: env.get('OAUTH_GOOGLE_CLIENT_ID'),
  //   clientSecret: env.get('OAUTH_GOOGLE_CLIENT_SECRET'),
  //   callbackUrl: `${env.get('APP_URL')}/oauth/google/callback`,
  //   scopes: ['profile', 'email']
  // }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
