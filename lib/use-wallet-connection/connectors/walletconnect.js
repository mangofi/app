import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import Ethereum from "./ethereum"

export default class Walletconnect extends Ethereum {
  provider = null
  web3 = null
  connected = false

  async load() {
    if (super.hasWeb3Provider()) {
      await super.load()
    } else {
      this.provider = new WalletConnectProvider({
        infuraId: process.env.INFURA_KEY,
      });
      this.web3 = new Web3(this.provider);
    }
  }
  
  async connect() {
    if (super.hasWeb3Provider()) {
      await super.connect()
    } else {
      await this.provider.enable();
      this.connected = true
    }
  }
  
  async getAccounts() {
    let accounts = []

    if (super.hasWeb3Provider()) {
      accounts = await super.getAccounts()
    } else if (this.web3) {
      await this.ensureConnection()

      accounts = await this.web3.eth.getAccounts();
    }
    return accounts
  }
  
  async getNetworkId() {
    let networkId = null
    if (super.hasWeb3Provider()) {
      networkId = await super.getNetworkId()
    } else if (this.web3) {
      await this.ensureConnection()

      networkId = await this.web3.eth.net.getId();
    } else {
      console.log('no provider found')
    }

    return networkId
  }
  
  buildContract(abi, networkAddress) {
    let contract = null

    if (super.hasWeb3Provider()) {
      contract =  super.buildContract(abi, networkAddress)
    } else if (this.web3) {
      // NOTE: May need to ensure connection is already established outside
      contract = new this.web3.eth.Contract(abi, networkAddress)
    }
    
    return contract
  }
  
  async ensureConnection() {
    if (!this.connected) {
      await this.connect()
    }
  }
}