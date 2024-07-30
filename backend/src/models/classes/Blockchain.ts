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
      block.transactions.forEach(transaction => {
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

  // Method to verify each transaction in a block
  verifyBlockTransactions(block: Block): boolean {
    for (const transaction of block.transactions) {
      if (!this.verifyTransaction(transaction)) {
        return false // If any transaction is invalid, return false
      }
    }
    return true // All transactions are valid
  }

  // Method to verify a single transaction
  private verifyTransaction(transaction: Transaction): boolean {
    // 1. Verify transaction syntax
    if (!this.verifyTransactionSyntax(transaction)) {
      return false
    }

    // 2. Verify signatures
    if (!this.verifyTransactionSignatures(transaction)) {
      return false
    }

    // 3. Validate inputs
    if (!this.validateTransactionInputs(transaction)) {
      return false
    }

    // 4. Validate outputs
    if (!this.validateTransactionOutputs(transaction)) {
      return false
    }

    // 5. Check for double spending
    if (!this.checkForDoubleSpending(transaction)) {
      return false
    }

    return true // Transaction is valid
  }

  // Verify transaction syntax
  private verifyTransactionSyntax(transaction: Transaction): boolean {
    // Check for proper format, etc.
    return transaction != null && Array.isArray(transaction.txIns) && Array.isArray(transaction.txOuts)
  }

  // Verify transaction signatures
  private verifyTransactionSignatures(transaction: Transaction): boolean {
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

  // Validate transaction inputs
  private validateTransactionInputs(transaction: Transaction): boolean {
    // Inputs must be unspent
    return transaction.txIns.every(txIn => {
      return this.utxos.some(utxo => utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex)
    })
  }

  // Validate transaction outputs
  private validateTransactionOutputs(transaction: Transaction): boolean {
    const totalInputValue = transaction.txIns.reduce((sum, txIn) => {
      const utxo = this.utxos.find(utxo => utxo.txOutId === txIn.txOutId && utxo.txOutIndex === txIn.txOutIndex)
      return sum + (utxo ? utxo.amount : 0)
    }, 0)

    const totalOutputValue = transaction.txOuts.reduce((sum, txOut) => sum + txOut.amount, 0)

    // Total input must be greater than or equal to total output
    return totalInputValue >= totalOutputValue
  }

  // Check for double spending
  private checkForDoubleSpending(transaction: Transaction): boolean {
    // Check that the inputs are not already spent in the current block
    const usedInputs = new Set<string>()
    return transaction.txIns.every(txIn => {
      const inputId = `${txIn.txOutId}:${txIn.txOutIndex}`
      if (usedInputs.has(inputId)) {
        return false // Double spend detected
      }
      usedInputs.add(inputId)
      return true
    })
  }
}

export { Blockchain }