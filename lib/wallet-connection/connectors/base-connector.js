export default class BaseConnector {
  options = {}

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
  
  onSessionUpdate() {
    if (this.options.onSessionUpdate) {
      this.options.onSessionUpdate()
    }
  }
}