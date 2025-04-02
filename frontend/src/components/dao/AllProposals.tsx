'use client'

import { IProposal } from '@/app/utils/interfaces'
import React from 'react'
import Proposal from './Proposal'

const AllProposals = ({proposals, onClose} : {proposals : Array<IProposal> | null, onClose : ()=>void}) => {
  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-[1000] p-6'>
       <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white text-2xl bg-gray-800 p-2 rounded-full hover:bg-gray-700"
            >
                ✕
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {proposals &&
                    proposals.map((proposal: IProposal, index: number) => (<Proposal key={index} proposal={proposal}/>))}
        </div> 
    </div>
  )
}

export default AllProposals