'use client'
import React, { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { HashLoader } from "react-spinners";
import Web3Context from "@/Context/ContractContext";
import { transferNft } from "@/app/utils/HelperFunction/contractInteraction";
const TransferNFT = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void}) => {
    const { address } = useAccount();
    const { nftContract, myNfts, updateBalance } = useContext(Web3Context) || {}
    const [recipient, setRecipient] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [loading, setLoading] = useState(false);
    const handleTransfer = async () => { 
       await transferNft(nftContract, address, recipient, tokenId, setLoading)
       updateBalance?.();
       onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed w-screen h-screen inset-0 bg-black backdrop-blur-2xl flex items-center justify-center z-[1000] p-6">
            <div className="w-[380px] md:w-[450px] p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl relative transform transition-all duration-500 scale-90 hover:scale-100 text-white">
                <button className="absolute cursor-pointer top-4 left-4 text-2xl hover:text-red-400 transition-all" onClick={onClose}>
                    x
                </button>


                <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-cyan-400">Transfer NFT</h2>

                <div className="w-[400px] flex flex-col space-y-5">
                    <input
                        type="text"
                        placeholder="Recipient Address"
                        className="w-full mb-4 p-2 rounded-xl bg-white/20 border border-white/30 text-white outline-none focus:ring-2 focus:ring-cyan-400 transition-all shadow-lg"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />

                    <select
                        name="token"
                        id="token"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        className="w-full p-3 pl-4 pr-10  bg-white/10 backdrop-blur-xl border  border-white/20 rounded-xl  text-white outline-none focus:ring-2  focus:ring-cyan-400 transition-all shadow-lg text-base appearance-none custom-select">
                        <option value="" disabled className="bg-gray-800 text-gray-400">
                            Select a Token
                        </option>
                        {myNfts?.map((tokenID, idx) => (
                            <option
                                key={idx}
                                value={tokenID}
                                className="bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                                {tokenID}
                            </option>
                        ))}
                    </select>
                    <div className={`grid ${loading ? 'grid-cols-2' : 'grid-cols-1'} items-center justify-center`}>
                        <button
                            onClick={handleTransfer}
                            className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-semibold tracking-wider text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                        >
                            Transfer NFT
                        </button>
                        {loading && <HashLoader className=" justify-self-center mt-4 " color="#22d4ce" />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferNFT;
