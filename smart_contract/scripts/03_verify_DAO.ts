import { run } from "hardhat";
import { deployments } from "hardhat";
export const verify = async()=>{
    const address = (await deployments.get('DAO')).address
    console.log(`Verifying DAO at: ${address}`);
    
    const nftAddress = (await deployments.get('CryptoDevs')).address
    const marketAddress = (await deployments.get('FakeNFTMarketplace')).address
    const args : string[] = [nftAddress, marketAddress];
    
    try {
        await run('verify:verify', {
         address: address,
         constructorArguments: args,
        })
    } catch (error) {
        console.log(error);
    }
}

verify()
.then(()=>process.exit(1))
.catch((e:any)=>{
    console.log(e)
    process.exit(1)
})