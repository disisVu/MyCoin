/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as bip39 from 'bip39'
import HDNode from 'hdkey'
import { ec as EC } from 'elliptic'
const ec = new EC('secp256k1')

class Account {
  constructor(privateKey) {
    this.address = Account.getPublicKey(privateKey)
    this.balance = 0
    this.nonce = 0
  }

  static generateSeedPhrase() {
    return bip39.generateMnemonic()
  }

  static async getPrivateKeyFromSeed(seedPhrase, password = '') {
    const seed = await bip39.mnemonicToSeed(seedPhrase, password)
    const root = HDNode.fromMasterSeed(seed)
    const addrNode = root.derive('m/44\'/0\'/0\'/0/0')
    return addrNode.privateKey.toString('hex')
  }

  static getPublicKey(privateKey) {
    const keyPair = ec.keyFromPrivate(privateKey, 'hex')
    return keyPair.getPublic().encode('hex', true)
  }

  // Credit the account (add amount)
  credit(amount) {
    if (amount <= 0) {
      throw new Error('Credit amount is negative')
    }
    this.balance += amount
    console.log(`Credited ${amount} to account ${this.address}. New balance: ${this.balance}`)
  }

  // Debit the account (subtract amount)
  debit(amount) {
    if (amount <= 0) {
      throw new Error('Debit amount is negative')
    }

    if (this.balance >= amount) {
      this.balance -= amount
      console.log(`Debited ${amount} from account ${this.address}. New balance: ${this.balance}`)
    } else {
      throw new Error('Insufficient balance')
    }
  }

  increaseNonce() {
    this.nonce += 1
  }
}

// (async () => {
//   const seedPhrase = Account.generateSeedPhrase()
//   console.log('Seed Phrase:', seedPhrase)

//   const privateKey = await Account.getPrivateKeyFromSeed(seedPhrase)
//   console.log('Private Key:', privateKey)

//   const publicKey = Account.getPublicKey(privateKey)
//   console.log('Public Key:', publicKey)
// })()

export { Account }