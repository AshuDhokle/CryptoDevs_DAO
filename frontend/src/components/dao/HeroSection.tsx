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
      <div className="p-10 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left md:mb-20 lg:mb-10">
        <div className="lg:mr-10 max-w-lg">
          <h1 className="m-2 text-7xl font-extrabold">Shape the Future of CryptoDev</h1>
          <h2 className="m-2 mt-10 text-2xl font-bold">Decentralized Decisions, Powered by You</h2>
          <p className="mx-2 text-xl font-semibold text-gray-500">
            CryptoDev DAO is community-driven—every NFT holder has a voice in decision-making.
          </p>
          <p className="mx-2 text-xl font-semibold text-gray-500">
            Submit proposals, vote on key initiatives, and help shape the future of CryptoDev.
          </p>
        </div>
        <img src="dao.png" alt="" className="hidden lg:block w-[400px] h-[400px] lg:ml-10" />
      </div>

      <div className="flex flex-row items-center justify-center">
      <button
        onClick={scrollToBottom}
        className="mt-4 mx-2 text-2xl font-semibold border-2 border-gray-500 px-6 py-3 rounded-lg 
               shadow-lg transition-all duration-300 
               hover:bg-yellow-400 hover:shadow-xl active:scale-95"
      >
        Proposals
      </button>
      <button onClick={()=>{router.push('/')}}
          className="mt-4 mx-2 text-2xl font-semibold border-2 border-gray-500 px-6 py-3 rounded-lg 
               shadow-lg transition-all duration-300 
               hover:bg-yellow-400 hover:shadow-xl active:scale-95">
            But CryptoDevs
      </button>

      </div>
    </div>
  );
};

export default HeroSection;
