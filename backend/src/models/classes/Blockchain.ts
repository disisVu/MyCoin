/* eslint-disable no-console */
import { Block } from '~/models/classes/Block'
import { Transaction } from '~/models/classes/Transaction'

class Blockchain {
  public blockchain: Block[]

  constructor() {
    this.blockchain = [Blockchain.createGenesisBlock()]
  }

  static createGenesisBlock() {
    return new Block(0, '0', [])
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1]
  }

  generateNextBlock(data: Transaction[]) {
    const prevBlock = this.getLatestBlock()
    const nextIndex = prevBlock.index + 1
    return new Block(nextIndex, prevBlock.hash, data)
  }

  static isValidNewBlock(newBlock: Block, prevBlock: Block) {
    if (prevBlock.index + 1 != newBlock.index) {
      console.log('Invalid index')
      return false
    }
    else if (prevBlock.hash != newBlock.prevHash) {
      console.log('Invalid previous hash')
      return false
    }
    else if (newBlock.calculateHash() != newBlock.hash) {
      console.log('Invalid hash')
      return false
    }
    return true
  }

  isValidChain() {
    if (JSON.stringify(this.blockchain[0]) != JSON.stringify(Blockchain.createGenesisBlock())) {
      return false
    }
    const tempBlockchain = [this.blockchain[0]]
    for (let i = 1; i < this.blockchain.length; i++) {
      if (Blockchain.isValidNewBlock(this.blockchain[i], tempBlockchain[i - 1])) {
        tempBlockchain.push(this.blockchain[i])
      }
      else {
        return false
      }
    }
    return true
  }

  replaceChain(newBlockchain: Blockchain) {
    if (newBlockchain.isValidChain() && newBlockchain.blockchain.length > this.blockchain.length) {
      console.log('Received blockchain is valid')
      this.blockchain = newBlockchain.blockchain
    }
    else {
      console.log('Received blockchain invalid')
    }
  }
}

export { Blockchain }