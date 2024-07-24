import * as CryptoTS from 'crypto-ts'
import { Transaction } from '~/models/classes/Transaction'

class Block {
  public index: number
  public prevHash: string
  public timestamp: number
  public data: Transaction[]
  public hash: string

  constructor(index: number, prevHash: string, data: Transaction[]) {
    this.index = index
    this.prevHash = prevHash
    this.timestamp = new Date().getTime() / 1000
    this.data = data
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return CryptoTS.SHA256(this.index + this.prevHash + this.timestamp + this.data).toString()
  }
}

export { Block }