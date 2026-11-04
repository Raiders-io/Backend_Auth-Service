import type { AuthStartedEvent } from '#validators/event'
import type { ApplicationService } from '@adonisjs/core/types'
import { Broker, publish } from '@yosone/broker'

export default class MessageBrokerProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {
    Broker.init({
      redisUrl: process.env.REDIS_URL || 'redis://redis:6379',
      group: 'auth-service',
      consumer: 'auth-service',
    })

    const event: AuthStartedEvent = {
      type: 'auth.started',
      payload: {
        message: 'Auth service has been started',
      },
    }

    publish('auth.events', event)
  }
  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    Broker.disconnect()
  }
}
