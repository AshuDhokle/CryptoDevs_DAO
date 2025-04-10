import { ethers, Contract } from "ethers";
import toast from "react-hot-toast";
import { nft_abi, nft_address } from "../Abi/nftContractInfo";
import { dao_abi, dao_address } from "../Abi/daoContractInfo";

export const connectContract = async (address: string, setNftContract: (val:Contract)=>void, setDaoContract:(val: Contract)=>void, setIsOwner: (val: boolean)=>void) => {
    if (address) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            let tempContract = new Contract(nft_address, nft_abi, signer);
            setNftContract(tempContract);
            
            const owner = await tempContract.owner();
            const temp = owner === address
            console.log(owner,temp);
            
            setIsOwner(temp);
            tempContract = new Contract(dao_address, dao_abi, signer);
            setDaoContract(tempContract)
            

        } catch (error) {
            console.log(error);
        }
    } else toast.error('Please connect wallet')
}

export const getMyNfts = async(nftContract : Contract, setMyNfts :(val: Array<string>)=>void, nftBalance : string, address: string)=>{
   try {
    const tempNfts : Array<string> = []

      for(let i = 0; i<Number(nftBalance); i++){
        const response = await nftContract.tokenOfOwnerByIndex(address, i);
        tempNfts.push(response.toString()); 
      }
      setMyNfts(tempNfts);
   } catch (error) {
    console.log(error);
   }
}

export const voteOnProposal = async (id: number, vote: string, daoContract: Contract | null | undefined, nftContract: Contract | null | undefined, setLoading: (val: boolean) => void) => {
    if (daoContract && nftContract) {
        setLoading(true);
        try {
            const tx = await daoContract.voteOnProposal(id, vote);
            await tx.wait();
        } catch (error: unknown) {
            console.error("Transaction failed:", error);
        } finally {
            setLoading(false);
        }
    }
    else toast.error('Something went wrong! Reload the site')
}

export const withdraw = async (nftContract: Contract | null | undefined, isOwner: boolean | undefined, setLoading: (val: boolean) => void) => {
    if (nftContract && isOwner) {
        setLoading(true);
        try {
            const tx = await nftContract.withdraw();
            await tx.wait();
        } catch (error) {
            console.error("Transaction failed:", error);
        } finally {
            setLoading(false);
        }
    }
    else toast.error('Not a owner')
}

export const transferEth = async (nftContract: Contract | null | undefined, isOwner: boolean | undefined, dao_address: string, setLoading: (val: boolean) => void) => {
    if (nftContract && isOwner) {
        setLoading(true);
        try {
            const tx = await nftContract.transferFunds(dao_address);
            await tx.wait();
        } catch (error) {
            console.error("Transaction failed:", error);
        } finally {
            setLoading(false);
        }
    }
    else toast.error('Not a owner')
};

export const transferNft = async (nftContract: Contract | null | undefined, address: string | undefined, to: string, tokenID: string, setLoading: (val: boolean) => void) => {
    if (nftContract && address && to && tokenID) {
        setLoading(true);
        try {
            const tx = await nftContract.safeTransferFrom(address, to, parseInt(tokenID));
            await tx.wait();
            toast.success(`Nft id: ${tokenID} successfully transfered to ${to}`)
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!')
        } finally {
            setLoading(false);

        }
    }
    toast.error('Enter the details. If all details are entered then reload the site and try again.')
}

export const buyNft = async (nftContract: Contract | null | undefined, setConfettiOn: (val: boolean) => void, setLoding: (val: boolean) => void) => {
    if (nftContract) {
        setLoding(true);
        try {
            const _price = ethers.parseEther('0.01');
            const tx = await nftContract?.mint({ value: _price });
            await tx.wait();
            setConfettiOn(true);
            setTimeout(() => {
                setConfettiOn(false);
            }, (10000))
            toast.success(`Nft bought successfully!`)
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!')
        } finally {
            setLoding(false);
        }
    }
}