var CryptoJS = require('crypto-js')

class Block {
  constructor(index, prevHash, data) {
    this.index = 0
    this.prevHash = prevHash
    this.timestamp = new Date().getTime() / 1000
    this.data = data
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return CryptoJS.SHA256(this.index + this.prevHash + this.timestamp + this.data).toString()
  }
}

export default Block