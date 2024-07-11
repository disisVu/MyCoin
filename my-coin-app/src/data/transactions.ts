export interface TransactionSchema {
  hash: string,
  sender: string,
  receiver: string,
  amount: number,
  time: number,
}

export const transactionData: TransactionSchema[] = [
  {
    hash: '0x776584b7575da153b5f8f86a63ae255162b9c6e8082e28435e32c8bdb8aebddc',
    sender: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    receiver: '0xA47d433F544E85D16063260d322fF9f0e2149431',
    amount: 0.14406,
    time: 6
  },
  {
    hash: '0x1a2b3c4d5e6f7890123456789abcdef0123456789abcdef0123456789abcdef0',
    sender: '0x1234567890ABCDEF1234567890ABCDEF12345678',
    receiver: '0x9ABCDEF01234567890ABCDEF01234567890ABCDF',
    amount: 0.312,
    time: 12
  },
  {
    hash: '0xabcdef01234567890abcdef01234567890abcdef01234567890abcdef01234567',
    sender: '0xABCDEF01234567890ABCDEF01234567890ABCDEF',
    receiver: '0x1234567890ABCDEF1234567890ABCDEF12345679',
    amount: 0.5234,
    time: 24
  },
  {
    hash: '0x7890abcdef01234567890abcdef01234567890abcdef01234567890abcdef0123',
    sender: '0x567890ABCDEF1234567890ABCDEF1234567890AB',
    receiver: '0x7890ABCDEF1234567890ABCDEF1234567890ABCD',
    amount: 1.005,
    time: 48
  },
  {
    hash: '0x4567890abcdef01234567890abcdef01234567890abcdef01234567890abcdef1',
    sender: '0x234567890ABCDEF1234567890ABCDEF123456789',
    receiver: '0x4567890ABCDEF1234567890ABCDEF1234567890A',
    amount: 0.8593,
    time: 60
  }
]