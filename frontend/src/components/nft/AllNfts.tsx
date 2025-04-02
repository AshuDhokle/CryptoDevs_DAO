import Web3Context from '@/Context/ContractContext'
import React, { useContext } from 'react'

const AllNfts = ({ showAllNfts, onClose }: { showAllNfts: boolean, onClose : () => void} ) => {

    const { myNfts } = useContext(Web3Context) || {};

    if (!showAllNfts) return (<></>)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-[1000] p-6">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white text-2xl bg-gray-800 p-2 rounded-full hover:bg-gray-700"
            >
                ✕
            </button>
            <div className={` ${myNfts && myNfts?.length < 3 ? 'flex flex-row' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} items-center justify-center`}>
                {
                    myNfts?.map((nft: string, index: number) => (
                        <div key={index} className='flex flex-col items-center justify-center'>
                            <img className='size-56 m-2 blink' src='bg_img.jpeg' alt={nft} />
                            <h1 className='m-2 w-56 text-center p-2 px-4 border border-gray-300 text-gray-200 font-sans'># {nft}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllNfts