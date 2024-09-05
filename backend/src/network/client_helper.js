import { sendMessage } from '~/network/p2p_server'

function requestBlockchain() {
  sendMessage({
    type: 'TYPE_REQUEST_CHAIN',
    data: null
  })
}

export {
  requestBlockchain
}