/* eslint-disable no-console */
import { Block } from '~/models/classes/Block'

class Blockchain {
  constructor() {
    this.blockchain = [Blockchain.createGenesisBlock()]
  }

  static createGenesisBlock() {
    return new Block(0, '0', 'my genesis block')
  }

  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1]
  }

  generateNextBlock(data) {
    var prevBlock = this.getLatestBlock()
    var nextIndex = prevBlock.index + 1
    return new Block(nextIndex, prevBlock.hash, data)
  }

  static isValidNewBlock(newBlock, prevBlock) {
    if (prevBlock.index + 1 != newBlock.index) {
      console.log('Invalid index')
      return false
    }
    else if (prevBlock.hash != newBlock.prevHash) {
      console.log('Invalid previous hash')
      return false
    }
    else if (newBlock.calculateHash != newBlock.hash) {
      console.log('Invalid hash')
      return false
    }
    return true
  }

  isValidChain() {
    if (JSON.stringify(this.blockchain[0]) != JSON.stringify(Blockchain.createGenesisBlock())) {
      return false
    }
    var tempBlockchain = [this.blockchain[0]]
    for (var i = 1; i < this.blockchain.length; i++) {
      if (Blockchain.isValidNewBlock(this.blockchain[i], tempBlockchain[i - 1])) {
        tempBlockchain.push(this.blockchain[i])
      }
      else {
        return false
      }
    }
    return true
  }

  replaceChain(newBlockchain) {
    if (newBlockchain.isValidChain() && newBlockchain.blockchain.length > this.blockchain.length) {
      console.log('Received blockchain is valid')
      this.blockchain = newBlockchain.blockchain
    }
    else {
      console.log('Received blockchain invalid')
    }
  }
}

export default Blockchain