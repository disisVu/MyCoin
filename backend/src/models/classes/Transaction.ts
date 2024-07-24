import * as CryptoTS from 'crypto-ts'

class TxIn {
  constructor(
    public TxOutId: string,
    public TxOutIndex: number,
    public signature: string
  ) {}

  signtxIn(
    transaction: Transaction,
    txInIndex: number,
    privateKey: string,
    allUnspentTxOuts: UnspentTxOut[]
  ) : string {
    const txIn = transaction.txIns[txInIndex]
    const dataToSign = transaction.id
    //const referencedUnspentTxOut = findUnspentTxOut(txIn.txOutId, txIn.txOutIndex,)
    var result = ''
    return result
  }
}

class TxOut {
  constructor(
    public address: string,
    public amount: number
  ) {}
}

class UnspentTxOut {
  constructor(
    public readonly txOutId: string,
    public readonly txOutIndex: number,
    public readonly address: string,
    public readonly amount: number
  ) {}
}

class Transaction {
  constructor(
    public id: string,
    public txIns: TxIn[],
    public txOuts: TxOut[],
  ) {}

  getTransactionId() : string {
    const txInContent: string = this.txIns
      .map((txIn) => txIn.TxOutId + txIn.TxOutIndex)
      .reduce((a, b) => a + b, '')
    const txOutContent: string = this.txOuts
      .map((txOut) => txOut.address + txOut.amount)
      .reduce((a, b) => a + b, '')
    return CryptoTS.SHA256(txInContent + txOutContent).toString()
  }
}

export {
  TxIn,
  TxOut,
  Transaction
}