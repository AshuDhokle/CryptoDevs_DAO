'use client'
import Web3Context from '@/Context/ContractContext'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useContext, useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { withdraw, transferEth } from '@/app/utils/HelperFunction/contractInteraction'
import { dao_address } from '@/app/utils/Abi/daoContractInfo'
import { usePathname } from 'next/navigation'
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const pathname = usePathname()
  const { isOwner, nftContract, daoEthBalance, cryptoDevEthBalance } = useContext(Web3Context) || {};
  const [loading, setLoading] = useState(false);
  const [isDao, setIsDao] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    setIsDao(pathname === '/dao');
  },[pathname])

  const handleWithdraw = async () => {
    await withdraw(nftContract, isOwner, setLoading);
  }

  const handleTransfer = async () => {
    await transferEth(nftContract, isOwner, dao_address, setLoading);
  }

  return (
    <div className='p-4 flex flex-row items-center justify-between'>
      <div className='flex flex-row items-center'>
        <img src="nft_icon.png" alt="" className='w-[100px]' />
        <h1 className='text-3xl font-bold'>CryptoDevs</h1>
      </div>
      
      <div className='hidden md:flex flex-row items-center justify-center gap-4'>
        {loading && <HashLoader color='#EFEFEF' />}
        <h1 className='font-sans m-2 text-gray-400'>{Number(isDao ? daoEthBalance : cryptoDevEthBalance) / 1e18} Eth</h1>
        {isOwner && <div className='flex flex-row items-center justify-center gap-4'>
          <button onClick={handleWithdraw} className='p-2 rounded-lg text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500'>Withdraw</button>
          <button onClick={handleTransfer} className='p-2 rounded-lg text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500'>Transfer</button>
        </div>}
        <ConnectButton />
      </div>

      <div className='md:hidden'>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <RxCross2 size={28} /> : <IoIosMenu size={28} />}
        </button>
      </div>

      <div 
        className={`absolute top-16 right-4 bg-white shadow-md p-4 rounded-lg w-64 flex flex-col items-center z-50 md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {loading && <HashLoader color='#EFEFEF'/>}
        <h1 className='font-sans m-2 text-gray-400'>{Number(isDao ? daoEthBalance : cryptoDevEthBalance) / 1e18} Eth</h1>
        {isOwner && <>
          <button onClick={handleWithdraw} className='p-2 rounded-lg text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 w-full mt-2'>Withdraw</button>
          <button onClick={handleTransfer} className='p-2 rounded-lg text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 w-full mt-2'>Transfer</button>
        </>}
        <ConnectButton />
      </div>
    </div>
  )
}

export default Navbar
