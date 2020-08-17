// SPDX-License-Identifier: MIT

pragma solidity >0.4.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "./Product.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract DeveloperProductFactory is Ownable {

    using SafeMath for uint;
    uint public productCreationFees;
    address[] public products;
    mapping(uint => address) private _productToOwner;
    mapping(uint => string)public productToOwnerName;
    mapping(address => Product)public deployedProductContracts;
    event DeveloperProductFactoryInitialized(uint indexed productCreationFees);
    event DeveloperProductCreated(uint indexed productId, address indexed newProductAddress);
    event ProductDetails(string productName, uint indexed productPrice);

    constructor(uint _productCreationFees) public {
        productCreationFees = _productCreationFees;
        emit DeveloperProductFactoryInitialized(productCreationFees);
    }

    modifier notTheOwner(){
        require(msg.sender != owner(),"DeveloperProductFactory: restricted");
        _;
    }

    function createProduct(string memory productName , uint productPrice , string memory productOwnerName) external notTheOwner  payable returns(uint productId, address newProductAddress) {
        require(msg.value > productCreationFees,"DeveloperProductFactory: Not enough ethers");
        uint productReward = msg.value.sub(productCreationFees);
        Product  newProduct = new Product{value:productReward}(msg.sender , productName , productPrice);
        newProductAddress = address(newProduct);
        products.push(newProductAddress);
        deployedProductContracts[newProductAddress] = newProduct;
        productId = products.length - 1;
        _productToOwner[productId] = msg.sender;
        productToOwnerName[productId] = productOwnerName;
        emit DeveloperProductCreated(productId, newProductAddress);
    }

    function getProductDetails(address _productAddress) public view returns(string memory productName , uint price){
        Product checkProduct = deployedProductContracts[_productAddress];
        productName = checkProduct.getProductName();
        price = checkProduct.getProductPrice();
        //emit ProductDetails(productName , price);
    }

    function getProductUsers(address _productAddress) public view returns(string[] memory){
        Product checkProduct = deployedProductContracts[_productAddress];
        return checkProduct.getProductUsers();
    }

    function buyProduct(address _productAddress , string memory _productOwnerName) public payable returns(bool result){
        Product getProduct = deployedProductContracts[_productAddress];
        result = getProduct.addUserProduct{value:msg.value}(msg.sender , _productOwnerName);
    }

    function getProductAddress() public view returns(address[] memory){
        return products;
    }

}
