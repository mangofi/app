export default class BaseConnector {
  async load() {
    throw 'load() method not implemented'
  }
  
  async connect(callback) {
    throw 'connect() method not implemented'
  }
  
  async getAccounts() {
    throw 'getAccounts() method not implemented'
  }
}