/* eslint-disable no-console */
import { Block } from '~/models/classes/Block'
import { Transaction, UnspentTxOut } from '~/models/classes/Transaction'
import { Validator } from '~/models/classes/Validator'

class Blockchain {
  public chain: Block[]
  public validators: Validator[]
  public pendingTxs: Transaction[]
  private utxos: UnspentTxOut[]

  constructor() {
    this.chain = [Blockchain.createGenesisBlock()]
    this.validators = []
    this.pendingTxs = []
    this.utxos = this.getAllUnspentTxOuts()
  }

  static createGenesisBlock() {
    return new Block(0, '0', [])
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
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
    if (JSON.stringify(this.chain[0]) != JSON.stringify(Blockchain.createGenesisBlock())) {
      return false
    }
    const tempBlockchain = [this.chain[0]]
    for (let i = 1; i < this.chain.length; i++) {
      if (Blockchain.isValidNewBlock(this.chain[i], tempBlockchain[i - 1])) {
        tempBlockchain.push(this.chain[i])
      }
      else {
        return false
      }
    }
    return true
  }

  replaceChain(newBlockchain: Blockchain) {
    if (newBlockchain.isValidChain() && newBlockchain.chain.length > this.chain.length) {
      console.log('Received blockchain is valid')
      this.chain = newBlockchain.chain
    }
    else {
      console.log('Received blockchain invalid')
    }
  }

  getAllUnspentTxOuts(): UnspentTxOut[] {
    const unspentTxOuts: UnspentTxOut[] = []
    this.chain.forEach(block => {
      block.data.forEach(transaction => {
        transaction.txOuts.forEach((txOut, index) => {
          unspentTxOuts.push(new UnspentTxOut(transaction.id, index, txOut.address, txOut.amount))
        })
        transaction.txIns.forEach(txIn => {
          const indexToRemove = unspentTxOuts.findIndex(utxo => utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex)
          if (indexToRemove >= 0) {
            unspentTxOuts.splice(indexToRemove, 1)
          }
        })
      })
    })
    return unspentTxOuts
  }

  updateUnspentTxOuts(newTransactions: Transaction[]): void {
    newTransactions.forEach(transaction => {
      // Add new UTXOs from the transaction outputs
      transaction.txOuts.forEach((txOut, index) => {
        this.utxos.push(new UnspentTxOut(transaction.id, index, txOut.address, txOut.amount))
      })
      // Remove spent UTXOs referenced by the transaction inputs
      transaction.txIns.forEach(txIn => {
        const indexToRemove = this.utxos.findIndex(
          utxo => utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex
        )
        if (indexToRemove >= 0) {
          this.utxos.splice(indexToRemove, 1)
        }
      })
    })
  }

  stakeCoins(address: string, amount: number) {
    const validator = this.validators.find(v => v.address === address)
    if (validator) {
      validator.stake += amount
    } else {
      this.validators.push(new Validator(address, amount))
    }
  }

  selectValidator() : Validator {
    const totalStake = this.validators.reduce((sum, v) => sum + v.stake, 0)
    const random = Math.random() * totalStake
    let cumulativeStake = 0
    for (const validator of this.validators) {
      cumulativeStake += validator.stake
      if (cumulativeStake >= random) {
        return validator
      }
    }
    return this.validators[0]
  }

  rewardValidator(address: string, reward: number) {
    const validator = this.validators.find(v => v.address == address)
    if (validator) {
      validator.stake += reward
    }
  }
}

export { Blockchain }