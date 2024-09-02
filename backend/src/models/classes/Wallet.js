/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as bip39 from 'bip39'
import HDNode from 'hdkey'
import { ec as EC } from 'elliptic'
import { UnspentTxOut } from './Transaction'
const ec = new EC('secp256k1')

class Wallet {
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
    const publicKey = keyPair.getPublic().encode('hex', true)
    return publicKey
  }

  static getBalance(address, allUnspentTxOuts) {
    const unspentTxOuts = UnspentTxOut.findUnspentTxOutsByAddress(address, allUnspentTxOuts)
    if (unspentTxOuts != null) {
      return unspentTxOuts.reduce((sum, utxo) => sum + utxo.amount, 0)
    }
    return 0
  }
}

(async () => {
  const seedPhrase = Wallet.generateSeedPhrase()
  console.log('Seed Phrase:', seedPhrase)

  const privateKey = await Wallet.getPrivateKeyFromSeed(seedPhrase)
  console.log('Private Key:', privateKey)

  const publicKey = Wallet.getPublicKey(privateKey)
  console.log('Public Key:', publicKey)
})()

export { Wallet }