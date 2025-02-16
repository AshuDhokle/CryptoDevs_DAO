import { network } from "hardhat";
import Ihre from "../utils/Ihre";
import { verify } from "../scripts/01_verify_NFT";

export default async function ({getNamedAccounts, deployments} : Ihre){
   const {deploy, log} = deployments;
   const {deployer} = await getNamedAccounts();
   const networkName = network.name
   // const chainId = network.config.chainId
   
   const args : string[] = ['CryptoDev', 'CyDev'];
   
   console.log(`Deploying CryptoDev__NFT`);
   
   const contract = await deploy('CryptoDevs', {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations : 2
   })
   
   const address = contract.address;

   console.log(`CryptoDevs__NFT deployed at: ${address}`);

}

module.exports.tags = ['All', 'Nft']