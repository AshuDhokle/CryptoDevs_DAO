import { network } from "hardhat";
import Ihre from "../utils/Ihre";

export default async function ({getNamedAccounts, deployments} : Ihre){
   const {deploy, log} = deployments;
   const {deployer} = await getNamedAccounts();
   const networkName = network.name
   // const chainId = network.config.chainId
   
   const args : string[] = ['https://ipfs.io/ipfs/bafybeidz76hbafxwcwieygeorazjhz6j2cnjlradbhf6bji6ev3swynlb4/'];
   
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