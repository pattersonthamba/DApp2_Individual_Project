import Web3 from "web3";
import DeveloperProductFactory from "./contracts/DeveloperProductFactory.json";

const options = {
  web3: {
    block: false,
    // customProvider: new Web3("ws://localhost:8545"),
    customProvider: new Web3("http://127.0.0.1:7545"),
  },
  contracts: [DeveloperProductFactory],
  events: {
    DeveloperProductFactory: ["DeveloperProductFactoryInitialized", "DeveloperProductCreated" , "ProductDetails"],
  },
};

export default options;
