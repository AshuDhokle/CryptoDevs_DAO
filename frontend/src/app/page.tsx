'use client'
import Navbar from "@/components/Navbar";
import { useContext, useState } from "react";
import Web3Context from "@/Context/ContractContext";
import { HashLoader } from "react-spinners";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Confetti from 'react-confetti';
import AllNfts from "@/components/nft/AllNfts";
import TransferNFT from "@/components/nft/TransferNft";
import { Toaster } from "react-hot-toast";
import { buyNft } from "./utils/HelperFunction/contractInteraction";
export default function Home() {
  const router = useRouter();
  const web3Context = useContext(Web3Context);

  const {nftBalance, nftContract, updateBalance } = web3Context || {};
  const [loading, setLoading] = useState(false);
  const [confettiOn, setConfettiOn] = useState(false);
  const [showAllNfts, setShowAllNfts] = useState(false);  
  const [openTransferNft, setOpenTransferNft] = useState(false);

  const handleBuyNft = async () => {
    await buyNft(nftContract, setConfettiOn, setLoading);
    updateBalance?.()
  }

  return (
    <div>
      <Navbar />
      {/* <Toaster/> */}
      {confettiOn && <Confetti
        width={innerWidth}
        height={innerHeight}
      />}
      <Toaster/>
      <TransferNFT isOpen = {openTransferNft} onClose={()=>setOpenTransferNft(false)}/>
      <div className="ml-8 sticky w-fit z-10 shadow-lg top-10 p-2 m-2 border-2 border-yellow-400 rounded-lg">
        <h1 className="font-bold">NFTs Held: {nftBalance}</h1>
      </div>
      <AllNfts showAllNfts = {showAllNfts} onClose = {()=>setShowAllNfts(false)}/>
      <div className="flex flex-col items-center mb-20 p-4 lg:p-16">
        <div className="p-10 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left mb-8">
          <div className="lg:mr-10 max-w-lg">
            <h1 className="m-2 text-7xl font-extrabold text-yellow-500">Buy, Hold, Vote</h1>
            <h1 className="hidden lg:block m-2 mb-6 text-3xl font-bold">
              Your CryptoDev NFT is Your Voice
            </h1>
            <h1 className="hidden lg:block mx-2 text-xl font-semibold text-gray-500">
              You can be part of our organization
            </h1>
            <h1 className="hidden lg:block mx-2 text-xl font-semibold text-gray-500">
              Just buy our CryptoDev NFT at just 0.01 ETH
            </h1>
          </div>

          <div className="ml-14 mt-12 mb-4 flex flex-col items-center justify-center">
            <img
              src="/bg_img.jpeg" 
              alt="bg"
              width={200}
              height={200}
              className="lg:block lg:ml-10 mr-8 rounded-lg shadow-xl shadow-yellow-400 blink"
            />
            <div className="mt-6 mr-8 flex flex-row items-center justify-center">
            <h1 className="text-xl font-bold">X {nftBalance}</h1>
            {nftBalance && Number(nftBalance) > 1 && <h1 onClick={()=>setShowAllNfts(true)} className=" underline font-sans text-gray-400 cursor-pointer mx-2">Show All</h1> }
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <button
            onClick={() => router.push("/dao")}
            className="px-6 py-3 mx-2 text-xl font-sans font-semibold border border-gray-400 rounded-lg shadow-md transition-all duration-300 
            bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 
            hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg 
            active:scale-95 active:shadow-md"
          >
            Go to DAO
          </button>

          <div className="flex flex-row items-center">
            <button
              onClick={() => handleBuyNft()}
              className="px-6 py-3 mx-2 text-xl font-sans font-semibold border border-gray-400 rounded-lg shadow-md transition-all duration-300 
              bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 
              hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg 
              active:scale-95 active:shadow-md"
            >
              Buy Now!
            </button>
            <button onClick={()=>setOpenTransferNft(true)}
              className="px-6 py-3 mx-2 text-xl font-sans font-semibold border border-gray-400 rounded-lg shadow-md transition-all duration-300 
              bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 
              hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg 
              active:scale-95 active:shadow-md">
              Transfer NFT
            </button>
            {loading && <HashLoader color="#14abe6" />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
