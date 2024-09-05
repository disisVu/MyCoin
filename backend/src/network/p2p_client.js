/* eslint-disable no-console */
import WS from 'ws'
import readline from 'readline'
import { requestBlockchain } from '~/network/client_helper'

const SERVER_URL = 'ws://localhost:6001'

const ws = new WS(SERVER_URL)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'blockchain-cli> '
})

rl.prompt()

ws.on('open', () => {
  console.log(`Connected to ${SERVER_URL}`)
  rl.setPrompt('peer-client> ')
  rl.prompt()
})

ws.on('message', (message) => {
  console.log(`Received message: ${message}`)
})

ws.on('close', () => {
  console.log('Disconnected from server')
  process.exit(0)
})

ws.on('error', (error) => {
  console.error(`WebSocket error: ${error}`)
})

rl.on('line', (line) => {
  const input = line.trim().split(' ')
  const command = input[0]
  //const args = input.slice(1)

  switch (command) {
  case 'request-chain':
    requestBlockchain()
    break
  case 'exit':
    rl.close()
    break
  default:
    console.log(`Unknown command: ${command}`)
    break
  }

  rl.prompt()
}).on('close', () => {
  console.log('Exiting blockchain CLI')
  process.exit(0)
})
