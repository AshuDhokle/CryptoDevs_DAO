// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error CRYPTODEVS__NOT_ENOUGH_ETH();

contract CryptoDevs is ERC721Enumerable, Ownable{
    using Strings for uint256;
    
    event NFT_Minted(address indexed minter, uint256 indexed tokenID);
    event FundTransfered();

    uint256 public constant _PRICE = 0.01 ether;
    uint256 public constant _MAX_SUPPLY = 30;
    string _baseTokenURI;

    constructor (string memory baseURI) ERC721("CryptoDevs", "CYPDEV") Ownable(msg.sender){
        _baseTokenURI = baseURI;  
    }
     
    function mint() public payable{
       if(msg.value < _PRICE){
        revert CRYPTODEVS__NOT_ENOUGH_ETH();
       }  

       _safeMint(msg.sender, totalSupply());
       
       uint256 tokenID = totalSupply();
       emit NFT_Minted(msg.sender, tokenID);
    }

    function withdraw() public payable onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
    
    function transferFunds(address receiver) public payable onlyOwner {
        require(address(this).balance != 0, "Not enough eth");

        (bool sent, ) = payable(receiver).call{value: address(this).balance}("");
        require(sent, "Failed to transfer");

        emit FundTransfered();
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    } 

    function tokenURI(uint256 tokenId) public view virtual override returns(string memory){
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI,tokenId.toString(), ".json")) : "";
    } 

    receive() external payable {}
    fallback() external payable {}
}