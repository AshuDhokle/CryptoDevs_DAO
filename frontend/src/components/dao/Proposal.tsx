'use client'
import Web3Context from '@/Context/ContractContext'
import React, { useContext, useState } from 'react'
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai'
import { IProposal } from '@/app/utils/interfaces'
import { voteOnProposal } from '@/app/utils/HelperFunction/contractInteraction'
const Proposal = ({ proposal }: { proposal: IProposal | null }) => {
  const {daoContract, nftContract} = useContext(Web3Context) || {}
  const [loading, setLoading] = useState(false);
  
  const handleVote = async (proposalId: number, isYay: boolean) => {
    if (!proposal?.executed) {
      await voteOnProposal(proposalId, isYay === true ? '0' : '1', daoContract, nftContract, setLoading);
    }
    else alert(`Can't vote: Deadline Exceeded`);
  };

  return (
    <>
      {
        proposal &&
        <div>
          <div className='w-[310] m-2 p-4 bg-white rounded-lg shadow-lg hover:shadow-purple-600 transition max-w-xl mx-auto'>
            <h1 className='text-xl font-mono text-gray-800 mb-2'>NFT Token Id: {proposal.nftTokenId}</h1>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <AiTwotoneLike
                    onClick={() => handleVote(proposal.proposalId, true)}
                    className='text-blue-600 cursor-pointer hover:text-blue-800 transition duration-200 size-8'
                  />
                  <p className='text-lg font-medium text-black'>{proposal.yay}</p>
                </div>
                <div className='flex items-center space-x-2'>
                  <AiTwotoneDislike
                    onClick={() => handleVote(proposal.proposalId, false)}
                    className='text-red-600 cursor-pointer hover:text-red-800 transition duration-200 size-8'
                  />
                  <p className='text-lg font-medium text-black'>{proposal.nay}</p>
                </div>
              </div>
              <h1 className={`text-md mx-6 font-medium ${proposal.executed ? 'text-red-600' : 'text-green-600' }`}>
                {proposal.executed ? 'executed' : 'Active' }
              </h1>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Proposal