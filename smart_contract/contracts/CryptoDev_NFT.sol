// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error CRYPTODEVS__NOT_ENOUGH_ETH();

contract CryptoDevs is ERC721Enumerable, Ownable{
    uint256 public constant _PRICE = 0.01 ether;

    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) Ownable(msg.sender){
        _safeMint(msg.sender, totalSupply());  
    }
     
    function mint() public payable{
       if(msg.value < _PRICE){
        revert CRYPTODEVS__NOT_ENOUGH_ETH();
       }

       _safeMint(msg.sender, totalSupply());
    }

    function withdraw() public payable onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}