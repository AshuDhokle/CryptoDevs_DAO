'use client'
import Web3Context from '@/Context/ContractContext'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useContext, useState } from 'react'
import { HashLoader } from 'react-spinners'

const Navbar = () => {
  const web3Context = useContext(Web3Context)

  const { isOwner, withdraw, transfer } = web3Context || {};
  const [loading, setLoading] = useState(false);
  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await withdraw?.();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  const handleTransfer = async () => {
    setLoading(true);
    try {
      await transfer?.();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='p-4 flex flex-row items-center justify-between'>
      <div className=' flex flex-row items-center'>
        <img src="nft_icon.png" alt="" className='w-[100px]' />
        <h1 className='text-3xl font-bold'>CryptoDevs</h1>
      </div>
      <div className='flex flex-row items-center justify-center gap-4'>
        {
          loading && <HashLoader color='#EFEFEF' />
        }
        {isOwner && <div className='flex flex-row items-center justify-center gap-4'>
          <button onClick={() => handleWithdraw()} className='p-2 rounded-lg text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500'>
            Withdraw
          </button>
          <button onClick={() => handleTransfer()} className='p-2 rounded-lg text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500'>
            Transfer
          </button>
        </div>
        }
        <ConnectButton />
      </div>
    </div>
  )
}

export default Navbar