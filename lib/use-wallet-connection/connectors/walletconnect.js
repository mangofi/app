import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import Ethereum from "./ethereum"

export default class Walletconnect extends Ethereum {
  connector = null
  accounts = []
  chainId = null
  provider = null
  web3 = null

  async load() {
    if (super.hasWeb3Provider()) {
      await super.load()
    } else {
      this.provider = new WalletConnectProvider({
        infuraId: process.env.INFURA_KEY,
      });
    }
  }
  
  async connect() {
    if (super.hasWeb3Provider()) {
      await super.connect()
    } else {
      await this.provider.enable();
      this.web3 = new Web3(this.provider);
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
}