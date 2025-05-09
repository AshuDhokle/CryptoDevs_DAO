import React from 'react';
import CreateProposal from './CreateProposal';
import SearchProposals from './SearchProposal';

const ProposalSection = () => {
  return (
      <div className="mt-20 flex flex-col lg:flex-row justify-center items-center min-h-screen 
                bg-[#0d0d0d] px-6 pt-20 text-white gap-10">
      <div className="p-6 lg:max-w-lg bg-[#1a1a1a] shadow-lg rounded-xl font-sans">
        <CreateProposal />
      </div>
      
      <div className="font-sans">
        <SearchProposals />
      </div>
      </div>
  );
};

export default ProposalSection;
