class SmartContract {
  constructor(contract, address) {
    this.contract = contract;
    this.address = address;

    Object.keys(contract.methods).forEach((method) => {
      this[method] = (...args) => contract.methods[method](...args);
    });
  }
}

export default SmartContract;
