'use client'
import { useRouter } from "next/navigation";
import React from "react";

const HeroSection = () => {
  const router = useRouter()

  const scrollToBottom = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="p-24 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left md:mb-20 lg:mb-10">
        <div className="lg:mr-10 ">
          <h1 className="m-2 p-2 text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Shape the Future of CryptoDev</h1>
          <h2 className="m-2 ml-6 mb-10 text-2xl font-bold">Decentralized Decisions, Powered by You</h2>
          <p className="mx-2 ml-6 text-xl font-semibold text-gray-500">
            CryptoDev DAO is community-driven—every NFT holder has a voice in decision-making.
          </p>
          <p className="mx-2 ml-6 text-xl font-semibold text-gray-500">
            Submit proposals, vote on key initiatives, and help shape the future of CryptoDev.
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center">
      <button
        onClick={scrollToBottom}
        className="mt-4 mx-2 text-xl font-semibold border border-gray-500 px-6 py-3 rounded-xl 
           shadow-md transition-all duration-300 
           bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 
           hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg 
           active:scale-95 active:shadow-md"
      >
        Proposals
      </button>
      <button onClick={()=>{router.push('/')}}
          className="mt-4 mx-2 text-xl font-semibold border border-gray-500 px-6 py-3 rounded-xl 
          shadow-md transition-all duration-300 
          bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 
          hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg 
          active:scale-95 active:shadow-md">
            But CryptoDevs
      </button>

      </div>
    </div>
  );
};

export default HeroSection;
