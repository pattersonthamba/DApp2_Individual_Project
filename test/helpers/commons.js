const _ = require("lodash");
const Product = artifacts.require("Product");
const DeveloperProductFactory = artifacts.require("DeveloperProductFactory");
const BigNumber = web3.utils.BN;

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should(); //To enable should chai style

class CommonVariables {
  constructor(_accounts) {
    this.accounts = _accounts;
    this.productMaker = _accounts[0];
    this.appOwner = _accounts[1];
    this.participants = _.difference(_accounts, [_accounts[0], _accounts[1]]);

    this.productCreationCost = web3.utils.toWei("1", "ether");
    this.productReward = web3.utils.toWei("1", "ether");
    this.productRewardAndCreationCost = web3.utils.toWei("2", "ether");
  }
}

module.exports = {
  CommonVariables,
  Product,
  DeveloperProductFactory,
  BigNumber,
  should,
};
