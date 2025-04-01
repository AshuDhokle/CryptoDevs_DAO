'use client'
import Web3Context from '@/Context/ContractContext'
import React, { useContext } from 'react'
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai'
interface ProposalProps {
  proposal: ProposalType;
}

interface ProposalType {
  proposalId: number
  nftTokenId: number;
  yay: number;
  nay: number;
  isActive: boolean;
}

const Proposal = ({ proposal }: ProposalProps) => {
  const web3Context = useContext(Web3Context);
  const { voteOnProposal } = web3Context || {};

  const handleVote = async (proposalId: number, isYay: boolean) => {
    console.log(proposalId);
    
    if (!proposal.isActive){
      voteOnProposal && voteOnProposal(proposalId, isYay === true ? '1' : '0');   
    }
    else alert(`Can't vote: Deadline Exceeded`);
  };

  return (
    <div className='m-2 p-4 bg-white rounded-lg shadow-lg hover:shadow-purple-600 transition max-w-xl mx-auto'>
      <h1 className='text-xl font-mono text-gray-800 mb-2'>NFT Token Id: {proposal.nftTokenId}</h1>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <AiTwotoneLike
              onClick={() => handleVote(proposal.proposalId , true)}
              className='text-blue-600 cursor-pointer hover:text-blue-800 transition duration-200 size-8'
            />
            <p className='text-lg font-medium text-black'>{proposal.yay}</p>
          </div>
          <div className='flex items-center space-x-2'>
            <AiTwotoneDislike
              onClick={() => handleVote(proposal.proposalId , false)}
              className='text-red-600 cursor-pointer hover:text-red-800 transition duration-200 size-8'
            />
            <p className='text-lg font-medium text-black'>{proposal.nay}</p>
          </div>
        </div>
        <h1 className={`text-md mx-6 font-medium ${!proposal.isActive ? 'text-green-600' : 'text-red-600'}`}>
          {!proposal.isActive ? 'Active' : 'executed'}
        </h1>
      </div>
    </div>
  );
};

export default Proposal