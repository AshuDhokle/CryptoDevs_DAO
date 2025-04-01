'use client'

import HeroSection from "@/components/dao/HeroSection";
import ProposalSection from "@/components/dao/ProposalSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Web3Context from "@/Context/ContractContext";
import { useContext } from "react";
import { Toaster } from 'react-hot-toast'

export default function DAOPage() {
  
  const web3Context = useContext(Web3Context);

  const { nftBalance } = web3Context || {};

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="sticky w-fit z-10 shadow-lg top-10 p-2 m-2 border-2 border-blue-400 rounded-lg">
        <h1 className="font-bold text-yellow-600">Nfts Hold: {nftBalance}</h1>
      </div>
      <div className="">
        <HeroSection/>
        <ProposalSection/>        
      </div>
      <Footer/>
    </div>
  );
}
