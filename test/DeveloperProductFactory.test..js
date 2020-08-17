const {
  CommonVariables,
  Product,
  DeveloperProductFactory,
  BigNumber,
  should,
} = require("./helpers/commons");
const truffleAssert = require("truffle-assertions");

contract("DeveloperProductFactory", (_accounts) => {
  const commonVars = new CommonVariables(_accounts);

  let accounts = commonVars.accounts;

  const _appOwner = commonVars.appOwner;
  const _productMaker = commonVars.productMaker;
  const _participants = commonVars.participants;

  const _productCreationCost = commonVars.productCreationCost;
  const _productReward = commonVars.productReward;
  const _productRewardAndCreationCost = commonVars.productRewardAndCreationCost;

  let surveyFactory;

  beforeEach(async () => {
    developerProductFactory = await DeveloperProductFactory.new(_productCreationCost, {
      from: _appOwner,
    });
  });

  describe("test cases for createProduct function", () => {
    it("The developer should have product ID and product address", async () => {
      return developerProductFactory.createProduct
        .call("Product1" , 2 , {
          value: _productRewardAndCreationCost,
          from: _productMaker,
        })
        .should.eventually.have.keys("productId", "0", "1", "newProductAddress");
    });
    it("Developer should be the owner of the newly created product contract", async () => {
      developerProductFactory.createProduct
        .sendTransaction("Product1" , 1 , {
          value: _productRewardAndCreationCost,
          from: _productMaker,
        })
        .then((createProductTx) => {
          return Product.at(
            createProductTx.receipt.logs[0].args["newProductAddress"]
          );
        })
        .then((instance) => {
          return instance.productName.call();
        })
        .should.eventually.equal("Product2");
    });
  });
});
