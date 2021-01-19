import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import Ethereum from "./ethereum"

let QR_OPENED = false
let CONNECTED = false

export default class Walletconnect extends Ethereum {
  provider = null
  web3 = null

  async load() {
    if (super.hasWeb3Provider()) {
      await super.load()
    } else {
      this.provider = new WalletConnectProvider({
        infuraId: process.env.INFURA_KEY
      });
      this.web3 = new Web3(this.provider);
    }
  }
  
  async connect(callback) {
    if (super.hasWeb3Provider()) {
      await super.connect(callback)
    } else if (!QR_OPENED && !CONNECTED) {
      this.provider.connector.on("display_uri", (err, payload) => {
        QR_OPENED = true
      });

      if (callback) {
        this.provider.on("accountsChanged", (accounts) => {
          callback()
          if (accounts.length === 0) {
            CONNECTED = false
          }
        });
        this.provider.on("disconnect", () => {
          callback()
          CONNECTED = false
        });
      }

      await this.provider.enable();
      QR_OPENED = false
      CONNECTED = true
    }
  }
  
  async getAccounts() {
    let accounts = []

    if (super.hasWeb3Provider()) {
      accounts = await super.getAccounts()
    } else if (this.web3 && CONNECTED) {
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
    if (!CONNECTED) {
      // TODO: Look for another way to refresh connection when obtaining, for ex., the networkId
      // await this.connect()
    }
  }
}