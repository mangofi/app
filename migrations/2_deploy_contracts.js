const MangoToken = artifacts.require('MangoToken');
const SaltToken = artifacts.require('SaltToken');
const MangoTree = artifacts.require('MangoTree');

const MANGO_PER_BLOCK = '40000000000000000000';

module.exports = async (deployer, networks, accounts) => {
  const mangoToken = await deployer.deploy(MangoToken);
  const saltToken = await deployer.deploy(SaltToken, MangoToken.address);

  const owner = accounts[0];
  const block = await web3.eth.getBlock('latest');

  const mangoTree = await deployer.deploy(
    MangoTree,
    MangoToken.address,
    SaltToken.address,
    owner,
    MANGO_PER_BLOCK,
    block.number,
  );
};
