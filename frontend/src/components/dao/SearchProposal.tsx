'use client'
import Web3Context from '@/Context/ContractContext';
import React, { useContext, useState } from 'react';
import Proposal from './Proposal';
import { FcSearch } from "react-icons/fc";

interface ProposalType {
  proposalId: number,
  nftTokenId: number;
  yay: number;
  nay: number;
  isActive: boolean;
}

const SearchProposals = () => {
  const web3Context = useContext(Web3Context);
  
  
  const { allProposals } = web3Context || {};

  // Specify types correctly
  const [id, setId] = useState<string>('');
  const [proposal, setProposal] = useState<ProposalType | null>(null);

  const searchProposal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const proposalFound = allProposals.find((p: ProposalType) => p.nftTokenId === parseInt(id));
    setProposal(proposalFound || null); // Ensures state is reset if no proposal is found
  };

  return (
    <div className="p-4 rounded-xl mb-4">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-300">Search Proposals</h2>
      
      <form onSubmit={searchProposal}
        className="flex flex-row items-center justify-center bg-white rounded-lg w-fit p-2">
        <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)}
          placeholder="Search proposal by NFT id..."
          className="text-black p-2 rounded-xl mx-2 w-64 border-b-2 focus:outline-none"
        />
        <button type="submit">
          <FcSearch className="size-6"/>
        </button>
      </form>

      {proposal && <Proposal proposal={proposal} />}
    </div>
  );
};

export default SearchProposals;
