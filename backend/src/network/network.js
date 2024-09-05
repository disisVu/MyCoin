import { env } from '~/config/environment'
import WS from 'ws'
import { Blockchain, MyCoinChain } from '~/models/classes/Blockchain'

const PORT = env.P2P_PORT ? parseInt(env.P2P_PORT) : 5000
const PEERS = env.PEERS ? env.PEERS.split(',') : []
const MY_ADDRESS = 'ws://localhost:5000'
const server = new WS.Server({ port: PORT })

let tempChain = new Blockchain()

function produceMessage(type, data) {
  return { type, data }
}

function sendMessage(message) {
  opened.forEach(node => {
    node.socket.send(JSON.stringify(message))
  })
}

// THE CONNECTION LISTENER
server.on('connection', async(socket) => {
  // Nghe những tin nhắn
  socket.on('message', message => {
    // Parse JSON sang object
    const _message = JSON.parse(message)

    switch (_message.type) {
    case 'TYPE_HANDSHAKE': {
      const nodes = _message.data
      nodes.forEach(node => connect(node))
      break
    }
    case 'TYPE_CREATE_TRANSACTION': {
      const transaction = _message.data
      MyCoinChain.addTransaction(transaction)
      break
    }
    case 'TYPE_REPLACE_CHAIN': {
      const newBlockchain = _message.data
      MyCoinChain.replaceChain(newBlockchain)
      break
    }
    case 'TYPE_SEND_CHAIN': {
      const { block, finished } = _message.data
      if (!finished) {
        tempChain.chain.push(block)
      } else {
        tempChain.chain.push(block)
        if (Blockchain.isValidChain(tempChain)) {
          MyCoinChain.chain = tempChain.chain
        }
        tempChain = new Blockchain()
      }
      break
    }
    case 'TYPE_REQUEST_CHAIN': {
      const socket = opened.filter(node => node.address === _message.data)[0].socket
      for (let i = 1; i < MyCoinChain.chain.length; i++) {
        socket.send(JSON.stringify(produceMessage(
          'TYPE_SEND_CHAIN',
          {
            block: MyCoinChain.chain[i],
            finished: i === MyCoinChain.chain.length - 1
          }
        )))
      }
      break
    }
    case 'TYPE_REQUEST_INFO': {
      opened.filter(node => node.address === _message.data)[0].socket.send(JSON.stringify(produceMessage(
        'TYPE_SEND_INFO',
        [MyCoinChain.validators, MyCoinChain.pendingTxs, MyCoinChain.utxos]
      )))
      break
    }
    case 'TYPE_SEND_INFO':{
      [MyCoinChain.validators, MyCoinChain.pendingTxs, MyCoinChain.utxos] = _message.data
      break
    }
    }
  })
})

let opened = [], connected = []
// Mình sẽ lưu địa chỉ và socket vào opened, địa chỉ vào connected.

async function connect(address) {
  // Chúng ta sẽ chỉ kết nối với các node mà ta chưa kết nối, và ta cũng không được tự kết nối với bản thân
  if (!connected.find(peerAddress => peerAddress === address) && address !== MY_ADDRESS) {
    const socket = new WS(address)

    socket.on('open', () => {
      // Mình sẽ sử dụng spread operator để cho tất cả các địa chỉ của các node đã kết nối vào nội dung của tin nhắn rồi gửi nó đi.
      socket.send(JSON.stringify(produceMessage('TYPE_HANDSHAKE', [MY_ADDRESS, ...connected])))

      // Chúng ta nên cho những node mà ta đã kết nối địa chỉ của node này và bảo hộ kết nối với nó.
      opened.forEach(node => node.socket.send(JSON.stringify(produceMessage('TYPE_HANDSHAKE', [address]))))

      // Chúng ta sẽ push vào "opened" nếu chúng ta chưa từng kết nối với nó
      if (!opened.find(peer => peer.address === address) && address !== MY_ADDRESS) {
        opened.push({ socket, address })
      }

      // Chúng ta sẽ push vào "opened" nếu chúng ta chưa từng kết nối với nó
      if (!connected.find(peerAddress => peerAddress === address) && address !== MY_ADDRESS) {
        connected.push(address)
      }

      // Hai lệnh if trên dùng để khắc phục code chạy bất đồng bộ. Vì chúng chạy đồng thời, nên lệnh if đầu tiên
      // có thể bị vượt qua một cách dễ dàng, từ đó sinh ra sự lặp lại không đáng có.
    })

    // Khi họ ngắt kết nối, ta sẽ xóa địa chỉ họ khỏi connected và opened.
    socket.on('close', () => {
      opened.splice(connected.indexOf(address), 1)
      connected.splice(connected.indexOf(address), 1)
    })
  }
}

PEERS.forEach(peer => connect(peer))

export { sendMessage }