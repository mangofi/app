import Web3 from 'web3'

export default class WalletConnection {
  async load() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      console.warn('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async connect() {
    await window.ethereum.enable()
  }
  
  async getAccounts() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()

    return accounts
  }
}