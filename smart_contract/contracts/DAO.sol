// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ICryptoDevs {
    function balanceOf(address owner) external view returns(uint256);

    function tokenOfOwnerByIndex(address owner, uint256 index)
    external view returns(uint256);
}

interface IFakeNFTMarketplace {
    /// @dev getPrice() returns the price of an NFT from the FakeNFTMarketplace
    /// @return Returns the price in Wei for an NFT
    function getPrice() external view returns (uint256);

    /// @dev available() returns whether or not the given _tokenId has already been purchased
    /// @return Returns a boolean value - true if available, false if not
    function available(uint256 _tokenId) external view returns (bool);

    /// @dev purchase() purchases an NFT from the FakeNFTMarketplace
    /// @param _tokenId - the fake NFT tokenID to purchase
    function purchase(uint256 _tokenId) external payable;
}

error DAO__NOT_DAO_MEMBER();
error DAO__TOKEN_NOT_AVAILABLe();
error DAO__DEADLINE_EXCEEDED();
error DAO__ALREADY_VOTED();
error DAO_DEADLINE_NOT_EXCEEDED();
error DAO_ALREADY_EXCECUTED();
error DAO_NOT_ENOUGH_ETH();

contract DAO is Ownable{

    ICryptoDevs cryptodevs;     
    IFakeNFTMarketplace nftMarket;

    struct Proposal {
        uint256 nftTokenId;
        uint256 deadline;
        uint256 yayVotes;
        uint256 nayVotes;
        bool executed;

        mapping(uint256 => bool) voters;
    }
    
    mapping(uint256 => Proposal) public proposals;
    uint256 public numProposals;

    enum Vote{
        YAY,
        NAY
    }

    constructor(address _cryptoDevsAddress, address _fakeNftMarketaddress) Ownable(msg.sender){
        cryptodevs = ICryptoDevs(_cryptoDevsAddress);    
        nftMarket = IFakeNFTMarketplace(_fakeNftMarketaddress);
    }
    
    modifier nftHolderOnly(){
        if(cryptodevs.balanceOf(msg.sender) < 1){
            revert DAO__NOT_DAO_MEMBER();
        }
        _;
    }
    
    modifier activeProposalOnly(uint256 _idx){
        if(block.timestamp >= proposals[_idx].deadline){
            revert DAO__DEADLINE_EXCEEDED();
        }
        _;
    }

    modifier inActiveProposalOnly(uint256 _idx){
        if(block.timestamp < proposals[_idx].deadline){
            revert DAO_DEADLINE_NOT_EXCEEDED();
        }
        if(proposals[_idx].executed == true){
            revert DAO_ALREADY_EXCECUTED();
        }
        _;
    }

    function createProposal(uint256 _nftTokenId) public nftHolderOnly returns(uint256) {
        if(!nftMarket.available(_nftTokenId)){
            revert DAO__TOKEN_NOT_AVAILABLe();
        }

        Proposal storage proposal = proposals[numProposals];
        
        proposal.nftTokenId = _nftTokenId;
        proposal.deadline = block.timestamp + 10 minutes;
        
        numProposals++;

        return numProposals - 1;
    }

    function voteOnProposal(uint256 _idx, Vote vote) 
    public nftHolderOnly activeProposalOnly(_idx) {
        Proposal storage proposal = proposals[_idx];

        uint256 voterNFTBalance = cryptodevs.balanceOf(msg.sender);
        uint256 numVotes = 0;

        for(uint256 i = 0; i<voterNFTBalance; i++){
            uint256 tokenId = cryptodevs.tokenOfOwnerByIndex(msg.sender, i);
            if(proposal.voters[tokenId] == false){
                numVotes++;
                proposal.voters[tokenId] = true;
            }
        }

        if(numVotes == 0){
            revert DAO__ALREADY_VOTED();
        }

        if(vote == Vote.YAY){
            proposal.yayVotes += numVotes;
        }else {
            proposal.nayVotes += numVotes;
        }
    }
     
    function executeProposal(uint256 _idx) 
    public nftHolderOnly onlyOwner inActiveProposalOnly(_idx){
      Proposal storage proposal = proposals[_idx];

      if(proposal.yayVotes > proposal.nayVotes){
        uint256 nftPrice = nftMarket.getPrice();
        if(address(this).balance < nftPrice){
            revert DAO_NOT_ENOUGH_ETH();
        }
        nftMarket.purchase{value : nftPrice}(proposal.nftTokenId);
      }
      proposal.executed = true;
    } 
}