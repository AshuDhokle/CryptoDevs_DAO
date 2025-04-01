import { network } from "hardhat";
import Ihre from "../utils/Ihre";

export default async function ({getNamedAccounts, deployments} : Ihre){
   const {deploy, log} = deployments;
   const {deployer} = await getNamedAccounts();
   const networkName = network.name
//    const chainId = network.config.chainId
   
   const args: string[] = [];
   
   console.log(`Deploying FakeNFTMarket......`);
   
   const contract = await deploy('FakeNFTMarketplace', {
    from: deployer,
    log: true,
    args: args,
    // waitConfirmations : 2
   })
   
   const address = contract.address;

   console.log(`FakeNFTMarket deployed at: ${address}`);

   
}

module.exports.tags = ['All', 'Market']