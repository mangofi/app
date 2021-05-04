const MangoToken = artifacts.require('MangoToken');
const MangoTree = artifacts.require('MangoTree');
const SaltToken = artifacts.require('SaltToken');

module.exports = function (deployer) {
  deployer.deploy(MangoToken);
  // deployer.deploy(SaltToken);
  // deployer.deploy(MangoTree);
};
