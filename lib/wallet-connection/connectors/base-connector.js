import SmartContracts, {SmartContract} from "../../smart-contracts"

export default class BaseConnector {
  options = {}
  contracts = {}

  async load() {
    throw 'load() method not implemented'
  }
  
  async connect() {
    const accounts = await this.getAccounts();
    this.onAccountChange(accounts);
    const networkId = await this.getNetworkId();
    this.onNetworkChange(networkId);
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
      const {abi: smartContract, address} = SmartContracts[key]
      let networkData = null

      if (address) {
        // When using the BSC abis, for example
        networkData = { address }
      } else if (smartContract && smartContract.networks) {
        networkData = smartContract.networks[networkId]
      }

      if (networkData && networkData.address) {
        this.contracts[key] = new SmartContract(
          this.buildContract(smartContract.abi, networkData.address, { from: networkData.address }),
          networkData.address
        )
      }
    });
    console.log(`Loaded on Network ID '${networkId}':`, this.contracts)
  }
}