import { network } from "hardhat";
import Ihre from "../utils/Ihre";
import { verify } from "../scripts/03_verify_DAO";

export default async function ({getNamedAccounts, deployments} : Ihre){
   const {deploy, log, get} = deployments;
   const {deployer} = await getNamedAccounts();
   const networkName = network.name
//    const chainId = network.config.chainId
   
   const nftAddress = (await get('CryptoDevs')).address
   const marketAddress = (await get('FakeNFTMarketplace')).address

   const args : string[] = [nftAddress, marketAddress];
   
   console.log(`Deploying DAO`);
   
   const contract = await deploy('DAO', {
    from: deployer,
    log: true,
    args: args,
    // waitConfirmations : 2
   })
   
   const address = contract.address;

   console.log(`DAO deployed at: ${address}`);

   
}

module.exports.tags = ['All', 'Nft']