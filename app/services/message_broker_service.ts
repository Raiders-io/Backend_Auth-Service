import { AsyncMessage } from 'rabbitmq-client'

export async function handleAsyncMessage(msg: AsyncMessage) {
  console.log('received message ', msg)
  console.log('message content is ', msg.body)
}

export async function handleLogMessage(str: String) {
  console.log({
    time: `${new Date().toISOString()}`,
    msg: str,
  })
}
