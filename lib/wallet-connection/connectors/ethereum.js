import Web3 from 'web3'
import BaseConnector from './base-connector'

export default class Ethereum extends BaseConnector {
  async load() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      console.warn('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    
    window.ethereum.on('accountsChanged', this.onAccountChange.bind(this))
    
    const accounts = await this.getAccounts()
    this.onAccountChange(accounts)
  }
  
  async connect() {
    await window.ethereum.enable()
  }
  
  async getAccounts() {
    const accounts = await window.web3.eth.getAccounts()

    return accounts
  }
  
  async getNetworkId() {
    let networkId = null

    if (window.web3 && window.web3.eth) {
      networkId = await window.web3.eth.net.getId()
    }

    return networkId
  }
  
  buildContract(abi, networkAddress) {
    let contract = null

    if (window.web3 && window.web3.eth) {
      contract = new window.web3.eth.Contract(abi, networkAddress)
    }
    
    return contract
  }
  
  hasWeb3Provider() {
    return window.ethereum || window.web3
  }
}