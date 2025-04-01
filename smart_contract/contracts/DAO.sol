// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

interface ICryptoDevs {
    function balanceOf(address owner) external view returns (uint256);

    function tokenOfOwnerByIndex(
        address owner,
        uint256 index
    ) external view returns (uint256);
}

interface IFakeNFTMarketplace {
    function getPrice() external view returns (uint256);

    function available(uint256 _tokenId) external view returns (bool);

    function purchase(uint256 _tokenId) external payable;
}

error DAO__NOT_DAO_MEMBER();
error DAO__TOKEN_NOT_AVAILABLE();
error DAO__DEADLINE_EXCEEDED();
error DAO__ALREADY_VOTED();
error DAO_DEADLINE_NOT_EXCEEDED();
error DAO_ALREADY_EXCECUTED();
error DAO_NOT_ENOUGH_ETH();
error DAO_PropoalAlreadyRunning();
error DAO__NO_NFT_BALANCE();

contract DAO is Ownable, AutomationCompatibleInterface {
    ICryptoDevs cryptodevs;
    IFakeNFTMarketplace nftMarket;
    enum Vote {
        YAY,
        NAY
    }

    event ProposalCreated(uint256 indexed proposalID);
    event ProposalEnded(uint256 indexed proposalID, bool indexed result);
    event VoteSubmitted(
        uint256 indexed proposalID,
        address indexed voter,
        Vote indexed vote
    ); //include the vote

    struct Proposal {
        uint256 nftTokenId;
        uint256 deadline;
        uint256 yayVotes;
        uint256 nayVotes;
        bool executed;
        mapping(address => bool) voters;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public numProposals;
    bool public proposalRunning;

    constructor(
        address _cryptoDevsAddress,
        address _fakeNftMarketaddress
    ) Ownable(msg.sender) {
        cryptodevs = ICryptoDevs(_cryptoDevsAddress);
        nftMarket = IFakeNFTMarketplace(_fakeNftMarketaddress);
    }

    modifier nftHolderOnly() {
        if (cryptodevs.balanceOf(msg.sender) < 1) {
            revert DAO__NOT_DAO_MEMBER();
        }
        _;
    }

    modifier activeProposalOnly(uint256 _idx) {
        if (proposals[_idx].executed) {
            revert DAO_ALREADY_EXCECUTED();
        }
        _;
    }

    modifier proposalAlreadyRunning() {
        if (proposalRunning) {
            revert DAO_PropoalAlreadyRunning();
        }
        _;
    }

    function createProposal(
        uint256 _nftTokenId,
        uint256 _deadline
    ) public nftHolderOnly proposalAlreadyRunning returns (uint256) {
        if (!nftMarket.available(_nftTokenId)) {
            revert DAO__TOKEN_NOT_AVAILABLE();
        }

        Proposal storage proposal = proposals[numProposals];

        proposal.nftTokenId = _nftTokenId;
        proposal.deadline = block.timestamp + _deadline;
        numProposals++;
        proposalRunning = true;
        emit ProposalCreated(numProposals - 1);
        return numProposals - 1;
    }

    function voteOnProposal(
        uint256 _idx,
        Vote vote
    ) public nftHolderOnly activeProposalOnly(_idx) {
        Proposal storage proposal = proposals[_idx];

        if (proposal.voters[msg.sender]) {
            revert DAO__ALREADY_VOTED();
        }

        uint256 voterNFTBalance = cryptodevs.balanceOf(msg.sender);

        require(voterNFTBalance > 0, "Not enough balance");

        if (vote == Vote.YAY) {
            proposal.yayVotes += voterNFTBalance;
        } else {
            proposal.nayVotes += voterNFTBalance;
        }
        proposal.voters[msg.sender] = true;
        emit VoteSubmitted(_idx, msg.sender, vote);
    }

    function executeProposal(uint256 _idx) public {
        Proposal storage proposal = proposals[_idx];
        bool result = proposal.yayVotes > proposal.nayVotes;
        if (result) {
            uint256 nftPrice = nftMarket.getPrice();
            if (address(this).balance < nftPrice) {
                revert DAO_NOT_ENOUGH_ETH();
            }
            nftMarket.purchase{value: nftPrice}(proposal.nftTokenId);
        }
        proposal.executed = true;
        proposalRunning = false;
        emit ProposalEnded(_idx, result);
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        if (numProposals == 0) {
            return (false, "");
        }
        Proposal storage proposal = proposals[numProposals - 1];
        upkeepNeeded =
            !proposal.executed &&
            proposalRunning &&
            block.timestamp >= proposal.deadline;
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        executeProposal(numProposals - 1);
    }

    receive() external payable {}
    fallback() external payable {}

}
