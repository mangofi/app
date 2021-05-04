import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import Ethereum from "./ethereum"

export default class Walletconnect extends Ethereum {
  provider = null
  web3 = null
  currentQrUri = null

  async load(options = {}) {
    this.options = options

    if (super.hasWeb3Provider()) {
      await super.load()
    } else {
      this.provider = new WalletConnectProvider({
        infuraId: process.env.INFURA_KEY,
        qrcodeModal: QRCodeModal,
        qrcode: false
      });
      this.web3 = new Web3(this.provider);
      
      this.addEventListeners()
      this.connect(false)
    }
  }
  
  async connect(displayQr = true) {
    if (super.hasWeb3Provider()) {
      await super.connect()
    } else {
      this.provider.enable();

      if (displayQr) {
        this.openQrModal()
      }
    }
  }
  
  async getAccounts() {
    let accounts = []

    if (super.hasWeb3Provider()) {
      accounts = await super.getAccounts()
    } else if (this.web3) {
      accounts = await this.web3.eth.getAccounts();
    }

    return accounts
  }
  
  async getNetworkId() {
    let networkId = null

    if (super.hasWeb3Provider()) {
      networkId = await super.getNetworkId()
    } else if (this.web3) {
      networkId = await this.web3.eth.net.getId();
    } else {
      console.debug('No provider found on WalletConnect')
    }

    return networkId
  }
  
  buildContract(abi, networkAddress) {
    let contract = null

    if (super.hasWeb3Provider()) {
      contract = super.buildContract(abi, networkAddress)
    } else if (this.web3) {
      contract = new this.web3.eth.Contract(abi, networkAddress)
    }

    return contract
  }
  
  openQrModal() {
    if (!this.currentQrUri) {
      return
    }

    QRCodeModal.open(this.currentQrUri);
  }
  
  addEventListeners() {
    this.provider.connector.on("connect", (err, payload) => {
      this.onConnect()
      QRCodeModal.close()
    });
    this.provider.connector.on("disconnect", (err, payload) => {
      this.onAccountChange([])
    });
    this.provider.connector.on("display_uri", (err, payload) => {
      const uri = payload.params[0];
      this.currentQrUri = uri
    });
    this.provider.on("accountsChanged", (accounts) => {
      this.onAccountChange(accounts)
    });
    this.provider.connector.on("session_update", () => {
      this.onSessionUpdate()
    });
  }
}