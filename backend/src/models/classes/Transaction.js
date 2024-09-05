import CryptoJS from 'crypto-js'
import { ec as EC } from 'elliptic'
const ec = new EC('secp256k1')

class Transaction {
  constructor(sender, recipient, amount, nonce, signature) {
    this.sender = sender
    this.recipient = recipient
    this.amount = amount
    this.nonce = nonce
    this.signature = signature
  }

  calculateHash() {
    return CryptoJS.SHA256(this.sender + this.recipient + this.amount + this.nonce).toString()
  }

  signTransaction(privateKey) {
    const keyPair = ec.keyFromPrivate(privateKey)

    if (keyPair.getPublic('hex') !== this.sender) {
      throw new Error('Cannot sign transactions for other wallets!')
    }

    const hashTx = this.calculateHash()
    const signature = keyPair.sign(hashTx, 'base64')
    this.signature = signature.toDER('hex')
  }

  verifySignature() {
    if (!this.signature) {
      throw new Error('No signature in this transaction')
    }

    const keyPair = ec.keyFromPublic(this.sender, 'hex')
    return keyPair.verify(this.calculateHash(), this.signature)
  }
}

export {
  Transaction
}