'use client'

import Navbar from "@/components/Navbar";
import { useContext } from "react";
import Web3Context from "@/Context/ContractContext";
import {DotLoader} from 'react-spinners'
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const web3Context = useContext(Web3Context);
  
  if(!web3Context) return (<></>);
  
  const {loadMinting, buyNft, nftBalance} = web3Context;
  
  return (
    <div>
      <Navbar />
      <div className="sticky w-fit z-10 shadow-lg top-10 p-2 m-2 border-2 border-yellow-400 rounded-lg">
        <h1 className="font-bold">Nfts Hold: {nftBalance}</h1>
      </div>
      <div className="flex flex-col items-center mb-20">
        <div className="p-10 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left md:mb-36 lg:mb-10">
          <div className="lg:mr-10 max-w-lg">
            <h1 className="m-2 text-7xl font-extrabold">Buy, Hold, Vote</h1>
            <h1 className="m-2 mt-10 text-3xl font-bold">Your CryptoDev NFT is Your Voice</h1>
            <h1 className="mx-2 text-xl font-semibold text-gray-500">
              You can be part of our organization
            </h1>
            <h1 className="mx-2 text-xl font-semibold text-gray-500">
              Just buy our CryptoDev NFT at just 0.01 ETH
            </h1>
          </div>
          <img 
            src="bg_img.jpeg" 
            alt="bg" 
            className="hidden md:hidden lg:block w-[400px] h-[400px] lg:ml-10" 
          />
        </div>
          
        <div className="flex flex-row">
        <button onClick={()=>router.push('/dao')}
          className="p-2 mx-2 h-12 w-48 border-2 border-gray-400 hover:bg-yellow-400 hover:text-white rounded-lg text-2xl transition-all duration-300">
            Go to Dao
          </button>
        <div className="flex flex-col items-center ">
          <button onClick={()=>buyNft()}
          className="p-2 mx-2 w-48 border-2 border-gray-400 hover:bg-yellow-400 hover:text-white rounded-lg text-2xl transition-all duration-300">
            Buy Now!
          </button>
          <h1 className="m-2 text-xl font-bold">Price: 0.01 Ether</h1>
          {loadMinting && <DotLoader color="#14abe6" />}
        </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
}
