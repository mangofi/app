const MangoToken = artifacts.require("MangoToken");

module.exports = function(deployer) {
  deployer.deploy(MangoToken);
};
