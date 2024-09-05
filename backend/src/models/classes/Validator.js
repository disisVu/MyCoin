class Validator {
  constructor(account) {
    this.account = account
    this.stake = 0
  }

  addStake(amount) {
    this.stake += amount
  }
}

export { Validator }