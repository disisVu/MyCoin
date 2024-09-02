import CryptoJS from 'crypto-js'
import Joi from 'joi'

class Block {
  constructor(index, prevHash, transactions) {
    this.index = index
    this.prevHash = prevHash
    this.timestamp = new Date().getTime() / 1000
    this.transactions = transactions
    this.hash = this.calculateHash()
  }

  static get schema() {
    return Joi.object({
      index: Joi.number().integer().required(),
      prevHash: Joi.string().required(),
      timestamp: Joi.number().required(),
      transactions: Joi.array(),
      hash: Joi.string().required()
    })
  }

  static async validateAsync(block) {
    return this.schema.validateAsync(block, { abortEarly: false })
  }

  calculateHash() {
    const hash = CryptoJS.SHA256(this.index + this.prevHash + this.timestamp + this.transactions).toString()
    return hash
  }
}

export { Block }