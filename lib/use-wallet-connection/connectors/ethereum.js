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
  }
  
  async connect() {
    await window.ethereum.enable()
  }
  
  async getAccounts() {
    const accounts = await window.web3.eth.getAccounts()

    return accounts
  }
  
  async getNetworkId() {
    const networkId = await window.web3.eth.net.getId()

    return networkId
  }
  
  buildContract(abi, networkAddress) {
    const contract = new window.web3.eth.Contract(abi, networkAddress)
    return contract
  }
  
  hasWeb3Provider() {
    return window.ethereum || window.web3
  }
}