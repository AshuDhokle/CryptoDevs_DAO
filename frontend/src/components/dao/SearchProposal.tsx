'use client'
import Web3Context from '@/Context/ContractContext';
import React, { useContext, useState } from 'react';
import Proposal from './Proposal';
import { FcSearch } from "react-icons/fc";
import { IProposal } from '@/app/utils/interfaces';
import AllProposals from './AllProposals';

const SearchProposals = () => {
  const { allProposals } = useContext(Web3Context) || {};

  const [id, setId] = useState<string>('');
  const [proposals, setProposals] = useState<Array<IProposal> | null>(null);
  const [showAllProposals, setShowAllProposals] = useState(false);

  const searchProposal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const proposals = allProposals?.filter((p: IProposal) => p.nftTokenId === parseInt(id));
    setProposals(proposals || null); 
  };

  return (
    <div className="p-4 rounded-xl mb-4">
      {showAllProposals && <AllProposals proposals={proposals} onClose={()=>setShowAllProposals(false)}/> }
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
          <FcSearch className="size-6" />
        </button>
      </form>
      <div className='flex flex-col items-center justify-center'>
        {
          proposals &&
          <Proposal proposal={proposals.length > 0 ? proposals[proposals.length - 1] : null} />
        }
        {
          proposals?.length && proposals?.length > 1 && <button onClick={()=>setShowAllProposals(true)} className='m-2 mt-4 underline font-sans'>Show All</button>
        }
      </div>
    </div>
  );
};

export default SearchProposals;
