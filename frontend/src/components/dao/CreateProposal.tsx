import Web3Context from "@/Context/ContractContext";
import { useContext, useState } from "react";
import { HashLoader } from "react-spinners";

const CreateProposal = () => {
  const web3Context = useContext(Web3Context)
  const { daoContract, fetchProposals } = web3Context || {};

  const [nftId, setNftId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (daoContract) {
      try {
        const tx = await daoContract?.createProposal(nftId, deadline);
        await tx.wait();
        await fetchProposals?.();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
          <div>
            <label className="block text-lg font-semibold text-gray-300">Deadline <span className="text-pretty font-thin">(in seconds)</span></label>
            <input
              type="text"
              className="w-full mt-2 px-4 py-3 text-white bg-transparent border-2 
                         border-gray-600 rounded-lg focus:outline-none focus:ring-2 
                         focus:ring-blue-500"
              placeholder="Give the deadline in seconds"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>
          {/* Submit Button */}
          <div className={`grid ${loading ? 'grid-cols-2' : 'grid-cols-1'} items-center justify-center gap-4`}>
            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg font-semibold text-white 
                       bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg 
                       hover:from-purple-600 hover:to-blue-500 transition-all 
                       duration-300 shadow-md active:scale-95 "
            >
              Submit Proposal
            </button>
            {loading && <HashLoader className="mt-4" color="#57B4BA" />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProposal;
