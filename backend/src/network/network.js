import { env } from '~/config/environment'
import WS from 'ws'

const PORT = env.P2P_PORT ? parseInt(env.P2P_PORT) : 5000
const PEERS = env.PEERS ? env.PEERS.split(',') : []
const MY_ADDRESS = 'ws://localhost:5000'
const server = new WS.Server({ port: PORT })

function produceMessage(type, data) {
  return { type, data }
}

// THE CONNECTION LISTENER
server.on('connection', async(socket, req) => {
  // Nghe những tin nhắn
  socket.on('message', message => {
    // Parse JSON sang object
    const _message = JSON.parse(message)

    switch (_message.type) {
    case 'TYPE_HANDSHAKE':
      const nodes = _message.data

      nodes.forEach(node => connect(node))

            // Ta sẽ cần phải xử lí nhiều loại tin nhắn hơn nên mình sử dụng switch-case cho tiện nhé!
    }
  })
})

// THE CONNECT FUNCTION
async function connect(address) {
  // Lấy socket từ địa chỉ
  const socket = new WS(address)

  // Kết nối với địa chỉ đó
  socket.on('open', () => {
    // Gửi cho họ địa chỉ của ta
    socket.send(JSON.stringify(produceMessage('TYPE_HANDSHAKE', [MY_ADDRESS])))
  })
}
