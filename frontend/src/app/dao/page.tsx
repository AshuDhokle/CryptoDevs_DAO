'use client'

import HeroSection from "@/components/dao/HeroSection";
import ProposalSection from "@/components/dao/ProposalSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Web3Context from "@/Context/ContractContext";
import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";

export default function DAOPage() {
  
  const {address} = useAccount();

  const web3Context = useContext(Web3Context);

  if(!web3Context) return(<></>)
  
  const {connectContract, nftBalance} = web3Context;

  useEffect(()=>{
    if(address){
      connectContract(address);
    }
  },[address])

  return (
    <div>
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
