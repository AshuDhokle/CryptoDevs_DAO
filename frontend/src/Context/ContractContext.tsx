'use client'

import React, {createContext, useState, useEffect} from "react"
import { ethers, Contract } from "ethers";
import { nft_abi, nft_address } from "@/app/utils/nftContractInfo";
import { market_abi, market_address } from "@/app/utils/marketContractInfo";
import { dao_abi, dao_address } from "@/app/utils/daoContractInfo";
import { useAccount } from "wagmi";
import { setBalance } from "viem/actions";
interface IWeb3Context {
  value : number;
  connectContract: (walletAddress : string | undefined)=> Promise<void>;
  buyNft: () => Promise<void>;
  loadMinting: boolean;
  createProposal: (id : string)=> Promise<void>; 
  allProposals: any;
  voteOnProposal : (id: number, vote: number)=> Promise<void>;
  nftBalance: string;
}

const Web3Context = createContext<IWeb3Context | null>(null);
export default Web3Context;


export const Web3Provider = ({ children } : {children: React.ReactNode}) => {
  
  const {address} = useAccount()

  const [value, setValue] = useState<number>(0);
  const [nftContract, setNftContract] = useState<Contract | null>(null);
  const [marketContract, setMarketContract] = useState<Contract | null> (null);
  const [daoContract, setDaoContract] = useState<Contract | null>(null);
  const [loadMinting, setLoadMinting] = useState(false);
  const [allProposals, setAllProposals] = useState<any>();
  const [activeProposals, setActiveProposals] = useState<any>();
  const [nftBalance, setNftBalance] = useState<string>('0')
  const connectContract = async(walletAddress : string | undefined)=>{
   
  if(walletAddress){
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    
    let tempContract = new Contract(nft_address, nft_abi, signer);
    setNftContract(tempContract);
    
    const tbalance = await tempContract.balanceOf(walletAddress);
    setNftBalance(tbalance.toString());
    tempContract = new Contract(market_address, market_abi, signer);
    setMarketContract(tempContract)
    
    tempContract = new Contract(dao_address, dao_abi, signer);
    setDaoContract(tempContract);
    if(tempContract)
      fetchProposals(tempContract);
   } 
  }
  
  const buyNft = async() => {
    if(nftContract){
        setLoadMinting(true);
        try {
            const _price = ethers.parseEther('0.01');
            const response = await nftContract?.mint({value: _price})
        } catch (error) {
            console.log(error);
        } finally {
            setLoadMinting(false);
        }
    }
  }
  
  const createProposal = async (id : string) => {
    try {
      const response = await daoContract?.createProposal(id);
      console.log(response);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  const fetchProposals = async (tempContract: Contract) => {
    try {
      const nProposals = await tempContract?.numProposals();
      const numProposals = parseInt(nProposals.toString());
  
      const tempAllProposals = [];
      const tempActiveProposals = [];
      for (let i = 0; i < numProposals; i++) {
        const tempProposal = await tempContract.proposals(i);
        
        const formattedProposal = {
          nftTokenId: Number(tempProposal[0]), 
          timestamp: Number(tempProposal[1]), 
          yay: Number(tempProposal[2]),
          nay: Number(tempProposal[3]),
          isActive: tempProposal[4], 
        };
        
        if(!formattedProposal.isActive){
          tempActiveProposals.push(formattedProposal);
        }

        tempAllProposals.push(formattedProposal);
      }

      setActiveProposals(tempActiveProposals);
      setAllProposals(tempAllProposals);
    } catch (error) {
      console.log(error);
    }
  };
  
  const voteOnProposal = async (id: number, vote: number) => {
    if (daoContract && nftContract) {
     
      try {
        const v = ethers.toBigInt(vote)
        await daoContract.voteOnProposal(id-1, vote);  
      } catch (error) {
        console.log(error)
      }
    }
  };
  
  

  return (
    <Web3Context.Provider value={{ value, connectContract, buyNft, loadMinting, createProposal, allProposals, voteOnProposal, nftBalance}}>
      {children}
    </Web3Context.Provider>
  );
}
