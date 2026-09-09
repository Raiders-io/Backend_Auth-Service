import { type ApiEvent } from '@yosone/broker'

export async function handleAsyncMessage(msg: ApiEvent<any>) {
  switch (msg.type) {
    // case 'msg.type':
    // break
    default:
      // console.log('unknown event received')
      return
  }
}
