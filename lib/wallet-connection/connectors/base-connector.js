import SmartContracts, {SmartContract} from "../../smart-contracts"

export default class BaseConnector {
  options = {}
  contracts = {}

  async load() {
    throw 'load() method not implemented'
  }
  
  async connect(callback) {
    throw 'connect() method not implemented'
  }
  
  async getAccounts() {
    throw 'getAccounts() method not implemented'
  }
  
  onConnect() {
    if (this.options.onConnect) {
      this.options.onConnect()
    }
  }
  
  onAccountChange(accounts) {
    if (this.options.onAccountChange) {
      this.options.onAccountChange(accounts)
    }
  }
  
  onNetworkChange(networkId) {
    if (this.options.onNetworkChange) {
      this.options.onNetworkChange(networkId)
    }
  }
  
  onSessionUpdate() {
    if (this.options.onSessionUpdate) {
      this.options.onSessionUpdate()
    }
  }
  
  buildContracts(networkId) {
    if (!networkId) {
      console.warn("networkId does not exist")
      return
    }

    this.contracts = {}

    Object.keys(SmartContracts).forEach((key) => {
      const smartContract = SmartContracts[key]
      let networkData = null

      if (smartContract.networks) {
        networkData = smartContract.networks[networkId]
      } else {
        // When using the BSC abi
        // https://testnet.bscscan.com/address/0xc6884f397ea41ad3c828d52f2ecb74eb17da365c
        networkData = { address: "0xc6884F397eA41ad3C828D52F2ecB74eB17dA365c" }
      }

      if (networkData && networkData.address) {
        this.contracts[key] = new SmartContract(
          this.buildContract(smartContract.abi, networkData.address, { from: networkData.address }),
          networkData.address
        )
      }
    });
  }
}