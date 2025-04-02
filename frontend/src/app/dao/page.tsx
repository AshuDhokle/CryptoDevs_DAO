'use client'

import HeroSection from "@/components/dao/HeroSection";
import ProposalSection from "@/components/dao/ProposalSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Web3Context from "@/Context/ContractContext";
import { useContext, useEffect } from "react";
import { Toaster } from 'react-hot-toast'
import {handleProposalCreated, handleProposalEnded, handleVoteSubmitted} from '../utils/HelperFunction/toastFunctions'

export default function DAOPage() {

  const web3Context = useContext(Web3Context);

  const { nftBalance, daoContract } = web3Context || {};

  useEffect(() => {
    daoContract?.on("ProposalEnded", handleProposalEnded);
    daoContract?.on("ProposalCreated", handleProposalCreated);
    daoContract?.on("VoteSubmitted", handleVoteSubmitted);

    // Cleanup function to remove listeners on unmount
    return () => {
      daoContract?.off("ProposalEnded", handleProposalEnded)
      daoContract?.off("ProposalCreated", handleProposalCreated);
      daoContract?.off("VoteSubmitted", handleVoteSubmitted);
    };
  }, [daoContract])

  return (
    <div className="">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="sticky w-fit z-10 shadow-lg top-10 left-8 p-2 m-2 border-2 border-blue-400 rounded-lg">
        <h1 className="font-bold text-gray-300">Nfts Hold: {nftBalance}</h1>
      </div>
      <div className="">
        <HeroSection />
        <ProposalSection />
      </div>
      <Footer />
    </div>
  );
}
