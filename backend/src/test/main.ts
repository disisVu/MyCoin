/* eslint-disable no-console */
import { Block } from '~/models/classes/Block'
import { Blockchain } from '~/models/classes/Blockchain'

// const { Block } = await import('~/models/classes/Block')
// const { Blockchain } = require('~/models/classes/Blockchain')

const chain: Blockchain = new Blockchain()
chain.generateNextBlock([])
chain.generateNextBlock([])

chain.blockchain.map((block: Block) => {
  console.log('Block ', block.index)
})