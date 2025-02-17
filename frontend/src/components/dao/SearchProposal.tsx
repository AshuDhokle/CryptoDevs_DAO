'use client'
import Web3Context from '@/Context/ContractContext';
import React, { useContext, useState } from 'react';
import Proposal from './Proposal';
import { FcSearch } from "react-icons/fc";
const SearchProposals = () => {
  const web3Context = useContext(Web3Context);
  
  if (!web3Context) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-400">Loading...</div>;
  }
  
  const {allProposals} = web3Context;

  const [id, setId] = useState('');
  const [proposal, setProposal] = useState<any | null>()
  const searchProposal = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const len = allProposals.length
    for(let i = 0;i< len; i++){
      if(allProposals[i].nftTokenId === parseInt(id)){
        setProposal(allProposals[i]);
        break;
      }
    }
  }

  return (
    <div className="p-4 rounded-xl mb-4">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-300">Search Proposals</h2>
      
      <form onSubmit={searchProposal}
      className='flex flex-row items-center justify-center bg-white rounded-lg w-fit p-2' >
        <input type='text' value={id} onChange={(e:any)=>setId(e.target.value)}
         placeholder='Search proposal by NFT id....'
         className='text-black p-2 rounded-xl mx-2 w-64 border-b-2 focus:outline-none' />
        <button type='submit'><FcSearch className='size-6'/></button>
      </form>

      { proposal && <Proposal proposal={proposal}/> }
    </div>
  );
};

export default SearchProposals;
