/* eslint-disable no-console */
import { Block } from '~/models/classes/Block'
import { Transaction } from '~/models/classes/Transaction'
import { Account } from '~/models/classes/Account'

class Blockchain {
  constructor() {
    this.chain = [Blockchain.createGenesisBlock()]
    this.accounts = new Map()
    this.validators = new Map()
    this.pendingTxs = []
  }

  addAccount(privateKey) {
    const newAccount = new Account(privateKey)
    this.accounts.set(newAccount.address, new Account(privateKey))
  }

  getAccount(address) {
    if (!this.accounts.has(address)) {
      console.log(`Account with address ${address} doesn't exist`)
    }
    return this.accounts.get(address)
  }

  createTransaction(account, recipient, amount) {
    const transaction = new Transaction(account.address, recipient, amount, account.nonce)
    this.addTransaction(transaction)
    account.increaseNonce()
  }

  addTransaction(transaction) {
    this.pendingTxs.add(transaction)
  }

  static createGenesisBlock() {
    return new Block(0, '0', [])
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  generateNextBlock(data) {
    const prevBlock = this.getLatestBlock()
    const nextIndex = prevBlock.index + 1
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
    else if (newBlock.calculateHash() != newBlock.hash) {
      console.log('Invalid hash')
      return false
    }
    return true
  }

  static isValidChain(blockchain) {
    if (JSON.stringify(blockchain.chain[0]) != JSON.stringify(Blockchain.createGenesisBlock())) {
      return false
    }
    const tempBlockchain = [blockchain.chain[0]]
    for (let i = 1; i < blockchain.chain.length; i++) {
      if (Blockchain.isValidNewBlock(blockchain.chain[i], tempBlockchain[i - 1])) {
        tempBlockchain.push(blockchain.chain[i])
      }
      else {
        return false
      }
    }
    return true
  }

  replaceChain(newBlockchain) {
    if (Blockchain.isValidChain(newBlockchain) && newBlockchain.chain.length > this.chain.length) {
      console.log('Received blockchain is valid')
      this.chain = newBlockchain.chain
    }
    else {
      console.log('Received blockchain invalid')
    }
  }

  // Validator
  addValidator(validator) {
    this.validators.set(validator.account.address, {
      account: validator.account,
      stake: validator.stake
    })
  }

  removeValidator(address) {
    this.validators.delete(address)
  }

  getValidator(address) {
    return this.validators.get(address)
  }

  selectValidator() {
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

  rewardValidator(address, amount) {
    const validator = this.validators.find(v => v.account.address == address)
    if (validator) {
      validator.account.credit(amount)
    }
  }

  slashValidator(address, amount) {
    const validator = this.validators.find(v => v.account.address == address)
    if (validator) {
      validator.account.debit(amount)
    }
  }

  // Method to verify each transaction in a block
  verifyBlockTransactions(block) {
    for (const transaction of block.transactions) {
      if (!this.verifyTransaction(transaction)) {
        return false // If any transaction is invalid, return false
      }
    }
    return true // All transactions are valid
  }

  // Method to verify a single transaction
  verifyTransaction(transaction) {
    // 1. Verify transaction syntax
    if (!this.verifyTransactionSyntax(transaction)) {
      return false
    }

    // 2. Verify signatures
    if (!this.verifyTransactionSignatures(transaction)) {
      return false
    }

    return true // Transaction is valid
  }

  // Verify transaction syntax
  verifyTransactionSyntax(transaction) {
    // Check for proper format, etc.
    return transaction != null && Array.isArray(transaction.txIns) && Array.isArray(transaction.txOuts)
  }

  // Verify transaction signatures
  verifyTransactionSignatures(transaction) {
    // Verify each TxIn's signature
    return transaction.txIns.every(txIn => {
      const { txOutId, txOutIndex, signature } = txIn
      const txOut = this.utxos.find(utxo => utxo.txOutId === txOutId && utxo.txOutIndex === txOutIndex)
      if (!txOut) {
        return false // UTXO must exist
      }
      return Transaction.verifySignature(txOut.address, transaction.id, signature)
    })
  }
}

const MyCoinChain = new Blockchain()

export { Blockchain, MyCoinChain }