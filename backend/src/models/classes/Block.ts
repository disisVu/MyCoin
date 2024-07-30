import CryptoJS from 'crypto-js'
import Joi from 'joi'
import { Transaction } from '~/models/classes/Transaction'

class Block {
  public index: number
  public prevHash: string
  public timestamp: number
  public transactions: Transaction[]
  public hash: string

  constructor(index: number, prevHash: string, transactions: Transaction[]) {
    this.index = index
    this.prevHash = prevHash
    this.timestamp = new Date().getTime() / 1000
    this.transactions = transactions
    this.hash = this.calculateHash()
  }

  private static get schema() {
    return Joi.object({
      index: Joi.number().integer().required(),
      prevHash: Joi.string().required(),
      timestamp: Joi.number().required(),
      transactions: Joi.array(),
      hash: Joi.string().required()
    })
  }

  static async validateAsync(block: Block) {
    return this.schema.validateAsync(block, { abortEarly: false })
  }

  calculateHash() {
    const hash = CryptoJS.SHA256(this.index + this.prevHash + this.timestamp + this.transactions).toString()
    return hash
  }
}

export { Block }