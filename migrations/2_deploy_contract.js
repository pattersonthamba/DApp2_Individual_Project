const DeveloperProductFactory = artifacts.require("DeveloperProductFactory");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(DeveloperProductFactory, web3.utils.toBN("1", "wei"));
};
