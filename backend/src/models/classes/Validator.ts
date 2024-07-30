class Validator {
  public address: string
  public stake: number

  constructor(address: string, stake: number) {
    this.address = address
    this.stake = stake
  }
}

export { Validator }