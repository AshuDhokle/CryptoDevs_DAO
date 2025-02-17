'use client'
import Web3Context from '@/Context/ContractContext'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'

const Navbar = () => {
  const {address} = useAccount();
  const web3Context = useContext(Web3Context);
  
  if(!web3Context) return (<></>);
  
  const {connectContract} = web3Context;
  useEffect(()=>{
    connectContract(address);
  },[address])

  return (
    <div className='p-4 flex flex-row items-center justify-between'>
      <div className=' flex flex-row items-center'>
      <img src="nft_icon.png" alt="" className='w-[100px]' />
      <h1 className='text-3xl font-bold'>CryptoDevs</h1>  
      </div>
      <ConnectButton/>
    </div>
  )
}

export default Navbar