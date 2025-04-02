'use client'

import React, { createContext, useEffect, useState } from "react"
import { ethers, Contract } from "ethers";
import { useAccount } from "wagmi";
import { IProposal } from "@/app/utils/interfaces";
import { connectContract, getMyNfts } from "@/app/utils/HelperFunction/contractInteraction";
interface IWeb3Context {
  nftContract: Contract | null;
  daoContract: Contract | null,
  allProposals: Array<IProposal>;
  fetchProposals: ()=> Promise<void>;
  nftBalance: string;
  myNfts: Array<string> | null;
  updateBalance: ()=>Promise<void>;
  isOwner : boolean;
  daoEthBalance : string | null | undefined;
  cryptoDevEthBalance: string | null | undefined;
 }

const Web3Context = createContext<IWeb3Context | null>(null);
export default Web3Context;


export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  
  const {address} = useAccount();

  const [nftContract, setNftContract] = useState<Contract | null>(null);
  const [daoContract, setDaoContract] = useState<Contract | null>(null);
  const [allProposals, setAllProposals] = useState<Array<IProposal>>([]);
  const [nftBalance, setNftBalance] = useState<string>('0')
  const [myNfts, setMyNfts] = useState<Array<string> | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [daoEthBalance, setDaoEthBalance] = useState<string | null>();
  const [cryptoDevEthBalance, setCryptoDevEthBalance] = useState<string | null>();

  useEffect(()=>{
    if(address)
      connectContract(address, setNftContract, setDaoContract, setIsOwner);  
  },[address])
  
  useEffect(()=>{
    if(nftContract && address){
      updateBalance();
      updateCryptoDevEthBalance();
    }
  },[nftContract, address])
  
  useEffect(()=>{
    if(nftContract && address && nftBalance){
      getMyNfts(nftContract, setMyNfts, nftBalance, address);
    }
  },[nftContract, address, nftBalance])

  useEffect(()=>{
    if(daoContract && address){
      fetchProposals();
    }
  },[daoContract, address])
  
  useEffect(()=>{
    if(daoContract){
     updateDaoEthBalance();
    }
  },[daoContract])

  
  const updateBalance = async()=>{
    if(nftContract && address){
      const tbalance = await nftContract.balanceOf(address);
      setNftBalance(tbalance.toString());
    }
  }
  
  const updateDaoEthBalance = async()=>{
    if(daoContract){
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(daoContract);
      setDaoEthBalance(balance.toString());
    }
  }
  
  const updateCryptoDevEthBalance = async()=>{
    if(nftContract){
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(nftContract);
      setCryptoDevEthBalance(balance.toString()); 
    }
  }


  const fetchProposals = async () => {
    try {
      const nProposals = await daoContract?.numProposals();
      const numProposals = parseInt(nProposals.toString());
       
      const tempAllProposals = [];
      for (let i = 0; i < numProposals; i++) {
        const tempProposal = await daoContract?.proposals(i);
        
        const formattedProposal = {
          proposalId: Number(i),
          nftTokenId: Number(tempProposal[0]),
          deadline: Number(tempProposal[1]),
          yay: Number(tempProposal[2]),
          nay: Number(tempProposal[3]),
          executed: tempProposal[4],
        };

        tempAllProposals.push(formattedProposal);
      } 
      setAllProposals(tempAllProposals);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Web3Context.Provider value={{ nftContract, daoContract, allProposals, fetchProposals, nftBalance, myNfts, updateBalance, isOwner, daoEthBalance, cryptoDevEthBalance }}>
      {children}
    </Web3Context.Provider>
  );
}
