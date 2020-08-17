// SPDX-License-Identifier: MIT

pragma solidity ^0.6.10;
pragma experimental ABIEncoderV2;

contract Product {

    address public owner;
    address public factory;
    string public productName;
    uint public productPrice;
    address[] private _productCustomers;
    string[] public productAccountNames;

    event ProductInitialized(address indexed owner, uint indexed surveyReward);

    constructor(address _owner , string memory _productName , uint _productPrice) payable public {
        require(_owner != address(0),"Product: Invalid owner address");
        require(msg.value > 0, "Product: amount greater than zero");
        owner = _owner;
        factory = msg.sender;
        productName = _productName;
        productPrice = _productPrice;
        emit ProductInitialized(owner,msg.value);
    }

    function addUserProduct(address _userAddress , string memory _userAccount) external payable returns(bool){
        require(msg.value == productPrice, "Product:Insufficient funds.");
        require(msg.sender != owner , "Product:Owner cannot buy the product");
        _productCustomers.push(_userAddress);
        productAccountNames.push(_userAccount);
        address payable customer = msg.sender;
        bool result = customer.send(msg.value);
        return result;
    }

    function getProductName() public view returns(string memory){
        return productName;
    }

    function getProductPrice() public view returns(uint){
        return productPrice;
    }

    function getProductUsers() public view returns(string[] memory){
        return productAccountNames;
    }
}