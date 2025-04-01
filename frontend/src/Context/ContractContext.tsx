'use client'

import React, { createContext, useEffect, useState } from "react"
import { ethers, Contract } from "ethers";
import { nft_abi, nft_address } from "@/app/utils/nftContractInfo";
import { dao_abi, dao_address } from "@/app/utils/daoContractInfo";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";

interface IWeb3Context {
  nftContract: Contract | null;
  daoContract: Contract | null,
  allProposals: any;
  fetchProposals: ()=> Promise<void>;
  voteOnProposal: (id: number, vote: string) => Promise<void>;
  nftBalance: string;
  myNfts: Array<string> | null;
  updateBalance: ()=>Promise<void>;
  isOwner : boolean;
  withdraw: () => Promise<string>;
  transfer: () => Promise<string>;
 }

const Web3Context = createContext<IWeb3Context | null>(null);
export default Web3Context;


export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  
  const {address} = useAccount();

  const [nftContract, setNftContract] = useState<Contract | null>(null);
  const [daoContract, setDaoContract] = useState<Contract | null>(null);
  const [allProposals, setAllProposals] = useState<any>();
  const [nftBalance, setNftBalance] = useState<string>('0')
  const [myNfts, setMyNfts] = useState<Array<string> | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  useEffect(()=>{
    if(address)
      connectContract();  
  },[address])
  
  useEffect(()=>{
    if(nftContract && address){
      updateBalance();
    }
  },[nftContract, address])
  
  useEffect(()=>{
    if(nftContract && address && nftBalance){
      getMyNfts();
    }
  },[nftContract, address, nftBalance])

  useEffect(()=>{
    if(daoContract && address){
      fetchProposals();
    }
  },[daoContract, address])
  
  useEffect(() => {
    if (!daoContract) return;
  
    const handleProposalCreated = (proposalID : number) => {
      toast.success(`Proposal Created id: ${proposalID}`);
    };
  
    const handleVoteSubmitted = (_:any,  vote : number) => {
      toast.success(`Voted submitted : ${vote === 0 ? 'YAY' : 'NAY'}`);
    };
  
    const handleProposalEnded = (proposalID : number, result : boolean) => {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Proposal Ended
                </p>
                <p className="mt-1 text-sm text-gray-500">ID : {proposalID}</p>
                <p className="mt-1 text-sm text-gray-500">
                  Result : {result ? "Accepted" : "Declined"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
    };
  
    // Attach event listeners
    daoContract.on("ProposalCreated", handleProposalCreated);
    daoContract.on("VoteSubmitted", handleVoteSubmitted);
    daoContract.on("ProposalEnded", handleProposalEnded);
  
    // Cleanup function to remove listeners on unmount
    return () => {
      daoContract.off("ProposalCreated", handleProposalCreated);
      daoContract.off("VoteSubmitted", handleVoteSubmitted);
      daoContract.off("ProposalEnded", handleProposalEnded);
    };
  }, [daoContract]);

  const connectContract = async () => {
    if (address) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const block = await provider.getBlock('latest');
      const time = await block?.timestamp
      console.log(time);
      
      const signer = await provider.getSigner();
      let tempContract = new Contract(nft_address, nft_abi, signer);
      setNftContract(tempContract);
      const owner = await tempContract.owner();
      const temp = owner === address 
      setIsOwner(temp);      
      tempContract = new Contract(dao_address, dao_abi, signer);
      setDaoContract(tempContract);
      
    }
  }
  
  const updateBalance = async()=>{
    if(nftContract && address){
      const tbalance = await nftContract.balanceOf(address);
      setNftBalance(tbalance.toString());
    }
  }

  
  const getMyNfts = async()=>{
    if(nftContract){
      let tempNfts : Array<string> = []

      for(let i = 0; i<Number(nftBalance); i++){
        const response = await nftContract.tokenOfOwnerByIndex(address, i);
        tempNfts.push(response.toString()); 
      }
      setMyNfts(tempNfts);
      
    }
  }

  const fetchProposals = async () => {
    try {
      const nProposals = await daoContract?.numProposals();
      const numProposals = parseInt(nProposals.toString());
       console.log(numProposals);
       
      const tempAllProposals = [];
      for (let i = 0; i < numProposals; i++) {
        const tempProposal = await daoContract?.proposals(i);
        
        const formattedProposal = {
          proposalId: Number(i),
          nftTokenId: Number(tempProposal[0]),
          deadline: Number(tempProposal[1]),
          yay: Number(tempProposal[2]),
          nay: Number(tempProposal[3]),
          isActive: tempProposal[4],
        };

        tempAllProposals.push(formattedProposal);
      }
      
      
      console.log(tempAllProposals);
      
      setAllProposals(tempAllProposals);
    } catch (error) {
      console.log(error);
    }
  };

  const voteOnProposal = async (id: number, vote: string) => {
    if (daoContract && nftContract) {
      try {
        const tx = await daoContract.voteOnProposal(id, vote);
        const receipt = await tx.wait();
        // console.log("Transaction Successful:", receipt);
      } catch (error: any) {
        console.error("Transaction failed:", error);
      }
    }
  };
  
  const withdraw = async (): Promise<string> => {
    if (nftContract && isOwner) {
      try {
        const tx = await nftContract.withdraw();
        await tx.wait();
        return "ok";
      } catch (error) {
        throw error;
      }
    }
    throw new Error("Contract not available or not owner");
  };
   
  const transfer = async (): Promise<string> => {
    if (nftContract && isOwner) {
      
      try {
        const tx = await nftContract.transferFunds(dao_address);
        await tx.wait();
        return "ok";
      } catch (error) {
        throw error;
      }
    }
    throw new Error("Contract not available or not owner");
  };

  
  return (
    <Web3Context.Provider value={{ nftContract, daoContract, allProposals, fetchProposals, voteOnProposal, nftBalance, myNfts, updateBalance, isOwner, withdraw, transfer }}>
      {children}
    </Web3Context.Provider>
  );
}
