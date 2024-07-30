import { Wallet } from '~/models/classes/Wallet'
import CryptoJS from 'crypto-js'
import { ec as EC } from 'elliptic'
const ec = new EC('secp256k1')

class TxIn {
  public txOutId: string
  public txOutIndex: number
  public signature: string

  constructor(txOutId: string, txOutIndex: number, signature: string) {
    this.txOutId = txOutId
    this.txOutIndex = txOutIndex
    this.signature = signature
  }

  static signTxIn(
    transaction: Transaction,
    txOutIndex: number,
    privateKey: string,
    allUnspentTxOuts: UnspentTxOut[]
  ) : string {
    const txIn = transaction.txIns[txOutIndex]
    const dataToSign = CryptoJS.SHA256(transaction.id).toString()
    const referencedUnspentTxOut = UnspentTxOut.findUnspentTxOutById(txIn.txOutId, txIn.txOutIndex, allUnspentTxOuts)
    if (referencedUnspentTxOut == null) {
      throw new Error('Could not find referenced txOut')
    }
    const referencedAddress = referencedUnspentTxOut.address
    if (Wallet.getPublicKey(privateKey) !== referencedAddress) {
      throw new Error('Not match the referenced address in txIn')
    }
    const key = ec.keyFromPrivate(privateKey, 'hex')
    const signature: string = key.sign(dataToSign).toDER('hex').toString()
    return signature
  }
}

class TxOut {
  public address: string
  public amount: number

  constructor(address: string, amount: number) {
    this.address = address
    this.amount = amount
  }
}

class UnspentTxOut {
  public readonly txOutId: string
  public readonly txOutIndex: number
  public readonly address: string
  public readonly amount: number

  constructor(txOutId: string, txOutIndex: number, address: string, amount: number) {
    this.txOutId = txOutId
    this.txOutIndex = txOutIndex
    this.address = address
    this.amount = amount
  }

  static findUnspentTxOutById(txOutId: string, txOutIndex: number, allUnspentTxOuts: UnspentTxOut[]): UnspentTxOut | null {
    return allUnspentTxOuts.find(utxo => utxo.txOutId === txOutId && utxo.txOutIndex === txOutIndex) || null
  }

  static findUnspentTxOutsByAddress(address: string, allUnspentTxOuts: UnspentTxOut[]): UnspentTxOut[] | null {
    return allUnspentTxOuts.filter((utxo: UnspentTxOut) => utxo.address === address) || null
  }

  static findTxOutsForAmount(amount: number, myUnspentTxOuts: UnspentTxOut[])
    : { includedUnspentTxOuts: UnspentTxOut[], leftOverAmount: number } | undefined
  {
    let currentAmount = 0
    const includedUnspentTxOuts = []
    for (const myUnspentTxOut of myUnspentTxOuts) {
      includedUnspentTxOuts.push(myUnspentTxOut)
      currentAmount = currentAmount + myUnspentTxOut.amount
      if (currentAmount >= amount) {
        const leftOverAmount = currentAmount - amount
        return { includedUnspentTxOuts, leftOverAmount }
      }
    }
  }
}

class Transaction {
  public id: string
  public txIns: TxIn[]
  public txOuts: TxOut[]

  constructor(txIns: TxIn[], txOuts: TxOut[]) {
    this.txIns = txIns
    this.txOuts = txOuts
    this.id = this.getTransactionId()
  }

  getTransactionId() : string {
    const txInContent: string = this.txIns
      .map((txIn) => txIn.txOutId + txIn.txOutIndex)
      .reduce((a, b) => a + b, '')
    const txOutContent: string = this.txOuts
      .map((txOut) => txOut.address + txOut.amount)
      .reduce((a, b) => a + b, '')
    return CryptoJS.SHA256(txInContent + txOutContent).toString()
  }

  createTransaction(privateKey: string, receiverAddress: string, amount: number, allUnspentTxOuts: UnspentTxOut[]) : Transaction {
    const senderAddress = Wallet.getPublicKey(privateKey)
    const senderBalance = Wallet.getBalance(senderAddress, allUnspentTxOuts)

    // Amount check
    if (amount == 0 || senderBalance < amount) {
      throw new Error('Insufficient amount')
    }

    // Get sender's UnspentTxOuts
    const senderUnspentTxOuts = UnspentTxOut.findUnspentTxOutsByAddress(senderAddress, allUnspentTxOuts)!

    // Select UnspentTxOuts preferring to amount
    const result = UnspentTxOut.findTxOutsForAmount(amount, senderUnspentTxOuts)
    if (!result) {
      throw new Error('Not enough UTXOs to cover the amount')
    }
    const { includedUnspentTxOuts, leftOverAmount } = result

    // Create TxIns from selected UTXOs
    const txIns = includedUnspentTxOuts.map(utxo => new TxIn(utxo.txOutId, utxo.txOutIndex, ''))

    const txOuts = [
      new TxOut(receiverAddress, amount),
      new TxOut(senderAddress, leftOverAmount)
    ]

    // Create the transaction
    const transaction = new Transaction(txIns, txOuts)

    // Sign each TxIn
    transaction.txIns.forEach((txIn) => {
      txIn.signature = TxIn.signTxIn(transaction, txIn.txOutIndex, privateKey, allUnspentTxOuts)
    })

    return transaction
  }

  // Function to verify a signature
  static verifySignature(publicKey: string, transactionId: string, signature: string) : boolean {
    const signedData = CryptoJS.SHA256(transactionId).toString()
    return ec.keyFromPublic(publicKey, 'hex').verify(signedData, signature)
  }
}

export {
  TxIn,
  TxOut,
  UnspentTxOut,
  Transaction
}