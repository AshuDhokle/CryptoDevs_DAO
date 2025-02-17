import Web3Context from "@/Context/ContractContext";
import { useContext, useState } from "react";

const CreateProposal = () => {
  const [nftId, setNftId] = useState("");

  const web3Context = useContext(Web3Context)
  if(!web3Context) {
    return (<></>)
  }
  const {createProposal} = web3Context;
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProposal(nftId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className=" max-w-2xl p-6 bg-opacity-10 backdrop-blur-md border border-gray-700 
                      rounded-2xl shadow-lg text-white">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-600 
                       text-transparent bg-clip-text mb-6">
          Create a New Proposal
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Proposal Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-300">Token Id</label>
            <input 
              type="text" 
              className="w-full mt-2 px-4 py-3 text-white bg-transparent border-2 
                         border-gray-600 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
              placeholder="Enter the token id..." 
              value={nftId} 
              onChange={(e) => setNftId(e.target.value)} 
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3 mt-4 text-lg font-semibold text-white 
                       bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg 
                       hover:from-purple-600 hover:to-blue-500 transition-all 
                       duration-300 shadow-md active:scale-95"
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProposal;
